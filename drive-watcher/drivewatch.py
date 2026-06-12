#!/usr/bin/env python3
"""drivewatch — macOS client-drive watcher for the data-recovery pipeline.

Subcommands:
  watch              Invoked by the LaunchAgent on /Volumes changes. Diffs the
                     current volume list against known state, debounces, applies
                     the ignore-list, profiles new client drives READ-ONLY,
                     notifies, and records a pending job. Never runs pipeline
                     steps on its own.
  profile PATH       Profile a directory/volume read-only; print human summary
                     and write a JSON profile.
  choose [JOB_ID]    Interactive multi-select checklist (gum -> fzf -> plain)
                     of pipeline steps for a pending job. Defaults to the most
                     recent pending job.
  run JOB_ID         Show the runner plan (dry-run by default). Executes only
                     with --execute AND execution_enabled=true in config.
  status             List jobs and their states.

Safety invariants:
  * The client drive is opened read-only, always. This tool never writes,
    moves, or deletes anything under the mounted volume.
  * Nothing runs automatically: watch only detects, profiles, and proposes.
  * All state lives under the user's Library dirs, never on the client drive.

Everything site-specific (NAS staging path, pipeline script locations, ZFS
free-space check, shuttle-drive names) comes from config.json — see
config.example.json. Until those are filled in and execution_enabled is set,
`run` only prints the plan.
"""

import argparse
import datetime as _dt
import fcntl
import fnmatch
import json
import os
import plistlib
import re
import secrets
import shlex
import shutil
import string
import struct
import subprocess
import sys
import time
import zipfile

IS_DARWIN = sys.platform == "darwin"

# --------------------------------------------------------------------------
# Pipeline step registry. Order here IS pipeline execution order:
# rsync to NAS staging always runs first, server-side steps follow.
# --------------------------------------------------------------------------
PIPELINE_STEPS = [
    ("rsync_to_staging", "Rsync drive contents to NAS staging"),
    ("sort_media_by_date", "Sort Media by Date"),
    ("blake3_dedup", "BLAKE3 dedup"),
    ("nsfw_scan", "NSFW scan"),
    ("immich_index", "Immich index"),
    ("route_documents", "Route documents to docs directory"),
    ("password_recovery_flag", "Flag for password recovery"),
]
SKIP_KEY = "skip_drive"
SKIP_LABEL = "Skip this drive (do nothing)"

MEDIA_CATEGORIES = ("images", "video", "audio")

EXT_CATEGORIES = {
    "images": {
        "jpg", "jpeg", "png", "gif", "tiff", "tif", "heic", "heif", "bmp",
        "webp", "psd", "raw", "cr2", "cr3", "nef", "arw", "dng", "orf",
        "rw2", "raf", "srw", "pef", "x3f",
    },
    "video": {
        "mp4", "mov", "avi", "mkv", "m4v", "mpg", "mpeg", "wmv", "flv",
        "mts", "m2ts", "vob", "webm", "3gp", "3g2", "mxf", "dv", "ts",
    },
    "audio": {
        "mp3", "wav", "aac", "m4a", "flac", "ogg", "oga", "wma", "aiff",
        "aif", "opus", "amr",
    },
    "documents": {
        "pdf", "doc", "docx", "xls", "xlsx", "ppt", "pptx", "txt", "rtf",
        "odt", "ods", "odp", "csv", "pages", "numbers", "key", "md", "epub",
    },
    "archives": {
        "zip", "rar", "7z", "tar", "gz", "bz2", "xz", "tgz", "tbz2", "dmg",
        "iso", "sparseimage", "sparsebundle", "sit", "sitx", "cab",
    },
}

DEFAULT_CONFIG = {
    # Where mounts appear. Overridable so the logic can be tested off-mac.
    "volumes_dir": "/Volumes",
    "state_dir": "~/Library/Application Support/drive-watcher",
    "log_dir": "~/Library/Logs/drive-watcher",
    # Seconds within which repeat mount events for the same volume are ignored.
    "debounce_seconds": 20,
    # Volume names (fnmatch globs, case-insensitive) that are never client
    # drives: boot volumes, Time Machine, shuttle drives. EDIT to taste.
    "ignore_volumes": [
        "Macintosh HD", "Macintosh HD *", "Recovery", "Preboot", "VM",
        "Update", "Data", "com.apple.TimeMachine.*",
        # TODO: add your shuttle drives by exact name, e.g. "Shuttle-A"
    ],
    # Also ignore anything that looks like a Time Machine destination.
    "ignore_timemachine": True,
    # Only treat real mountpoints as volumes (disable only in tests).
    "require_mountpoint": True,
    # If true, detection opens a Terminal window running `choose`. Default off:
    # detection only notifies; you run `drivewatch choose` yourself.
    "auto_open_chooser": False,
    # MASTER GATE for the runner. Leave false until the runner plan has been
    # reviewed and approved (see checkpoint in README). `run --execute` is
    # additionally required.
    "execution_enabled": False,
    # Soft time budget for profiling huge drives, 0 = unlimited.
    "profile_max_seconds": 0,
    "nas": {
        # Where rsync stages client data, e.g. "/Volumes/tank/staging" or
        # "nas:/tank/staging". MUST be set per CLAUDE.md before any run.
        "staging_root": None,
        # Command printing free space of the staging ZFS pool in GB
        # (a bare number), e.g. "ssh nas zfs get -Hpo value available tank"
        # piped through an awk to GB. MUST be set; rsync refuses without it.
        "free_check_cmd": None,
        # Hard floor per CLAUDE.md: never let the pool drop below this.
        "min_free_gb": 200,
    },
    # Map each pipeline step to the existing script per CLAUDE.md. Values are
    # command templates; placeholders: {src} {staging} {job_id} {volume_name}
    # {profile_json} {job_dir}. null = not configured (runner will refuse).
    "scripts": {
        "rsync_to_staging": None,   # default rsync is built in if left null
        "sort_media_by_date": None,
        "blake3_dedup": None,
        "nsfw_scan": None,
        "immich_index": None,
        "route_documents": None,
        "password_recovery_flag": None,  # built-in fallback writes a flag file
    },
}


# --------------------------------------------------------------------------
# Config / paths / logging
# --------------------------------------------------------------------------

def _merge(base, override):
    out = dict(base)
    for k, v in override.items():
        if isinstance(v, dict) and isinstance(out.get(k), dict):
            out[k] = _merge(out[k], v)
        else:
            out[k] = v
    return out


def load_config():
    path = os.environ.get("DRIVEWATCH_CONFIG")
    if not path:
        path = os.path.expanduser(
            "~/Library/Application Support/drive-watcher/config.json")
    cfg = DEFAULT_CONFIG
    if os.path.isfile(path):
        with open(path, "r", encoding="utf-8") as fh:
            cfg = _merge(DEFAULT_CONFIG, json.load(fh))
    cfg["_config_path"] = path
    cfg["state_dir"] = os.path.expanduser(cfg["state_dir"])
    cfg["log_dir"] = os.path.expanduser(cfg["log_dir"])
    return cfg


def state_paths(cfg):
    sd = cfg["state_dir"]
    return {
        "state_dir": sd,
        "known_volumes": os.path.join(sd, "known_volumes.json"),
        "jobs_dir": os.path.join(sd, "jobs"),
        "profiles_dir": os.path.join(sd, "profiles"),
        "manifest": os.path.join(sd, "manifest.jsonl"),
        "lock": os.path.join(sd, "watch.lock"),
    }


def ensure_dirs(cfg):
    sp = state_paths(cfg)
    for d in (sp["state_dir"], sp["jobs_dir"], sp["profiles_dir"],
              cfg["log_dir"]):
        os.makedirs(d, exist_ok=True)


_LOG_FH = None


def log(msg, level="INFO"):
    global _LOG_FH
    line = "%s [%s] %s" % (_dt.datetime.now().isoformat(timespec="seconds"),
                           level, msg)
    print(line, file=sys.stderr)
    if _LOG_FH:
        _LOG_FH.write(line + "\n")
        _LOG_FH.flush()


def open_log(cfg):
    global _LOG_FH
    ensure_dirs(cfg)
    path = os.path.join(
        cfg["log_dir"],
        "drivewatch-%s.log" % _dt.date.today().strftime("%Y%m%d"))
    _LOG_FH = open(path, "a", encoding="utf-8")


def now_iso():
    return _dt.datetime.now().astimezone().isoformat(timespec="seconds")


def append_manifest(cfg, entry):
    """Append one JSON-lines chain-of-custody record, flock-protected."""
    sp = state_paths(cfg)
    entry = dict(entry)
    entry.setdefault("ts", now_iso())
    entry.setdefault("host", os.uname().nodename)
    with open(sp["manifest"], "a", encoding="utf-8") as fh:
        fcntl.flock(fh, fcntl.LOCK_EX)
        fh.write(json.dumps(entry, ensure_ascii=False) + "\n")
        fcntl.flock(fh, fcntl.LOCK_UN)


# --------------------------------------------------------------------------
# Jobs
# --------------------------------------------------------------------------

def job_path(cfg, job_id):
    return os.path.join(state_paths(cfg)["jobs_dir"], job_id + ".json")


def load_job(cfg, job_id):
    with open(job_path(cfg, job_id), "r", encoding="utf-8") as fh:
        return json.load(fh)


def save_job(cfg, job):
    path = job_path(cfg, job["job_id"])
    tmp = path + ".tmp"
    with open(tmp, "w", encoding="utf-8") as fh:
        json.dump(job, fh, indent=2, ensure_ascii=False)
    os.replace(tmp, path)


def list_jobs(cfg):
    jd = state_paths(cfg)["jobs_dir"]
    jobs = []
    if os.path.isdir(jd):
        for name in sorted(os.listdir(jd)):
            if name.endswith(".json") and not name.endswith(".tmp"):
                try:
                    with open(os.path.join(jd, name), encoding="utf-8") as fh:
                        jobs.append(json.load(fh))
                except (OSError, ValueError):
                    pass
    return jobs


def new_job_id(volume_name):
    slug = re.sub(r"[^A-Za-z0-9._-]+", "_", volume_name).strip("_") or "vol"
    return "%s-%s-%s" % (_dt.datetime.now().strftime("%Y%m%d-%H%M%S"),
                         slug[:32], secrets.token_hex(2))


# --------------------------------------------------------------------------
# Volume info (read-only queries)
# --------------------------------------------------------------------------

def diskutil_info(mount):
    """Read-only `diskutil info -plist` query. Returns {} off-mac/on error."""
    if not IS_DARWIN:
        return {}
    try:
        out = subprocess.run(["diskutil", "info", "-plist", mount],
                             capture_output=True, timeout=30)
        if out.returncode != 0:
            return {}
        return plistlib.loads(out.stdout)
    except Exception:
        return {}


def volume_info(mount):
    info = {"mount": mount, "name": os.path.basename(mount.rstrip("/"))}
    try:
        st = os.statvfs(mount)
        info["total_bytes"] = st.f_frsize * st.f_blocks
        info["free_bytes"] = st.f_frsize * st.f_bavail
        info["used_bytes"] = info["total_bytes"] - st.f_frsize * st.f_bfree
    except OSError as exc:
        info["statvfs_error"] = str(exc)
    du = diskutil_info(mount)
    if du:
        info["filesystem"] = du.get("FilesystemName") or du.get(
            "FilesystemType")
        info["device"] = du.get("DeviceNode")
        info["volume_uuid"] = du.get("VolumeUUID")
        info["writable"] = du.get("WritableVolume")
        info["internal"] = du.get("Internal")
        info["protocol"] = du.get("BusProtocol")
    return info


def is_time_machine_volume(mount):
    """Heuristics for Time Machine destinations (read-only checks)."""
    base = os.path.basename(mount.rstrip("/"))
    if base.startswith("com.apple.TimeMachine"):
        return True
    for marker in ("Backups.backupdb", ".com.apple.timemachine.supported"):
        if os.path.exists(os.path.join(mount, marker)):
            return True
    return False


def is_ignored(cfg, name):
    return any(fnmatch.fnmatch(name.lower(), pat.lower())
               for pat in cfg["ignore_volumes"])


# --------------------------------------------------------------------------
# Read-only profiler
# --------------------------------------------------------------------------

def _category_of(ext):
    for cat, exts in EXT_CATEGORIES.items():
        if ext in exts:
            return cat
    return "other"


def _zip_encrypted(path):
    try:
        with zipfile.ZipFile(path) as zf:
            for zi in zf.infolist():
                if zi.flag_bits & 0x1:
                    return "encrypted"
        return "not encrypted"
    except Exception:
        return "unknown (unreadable zip)"


def _pdf_encrypted(path, size):
    """Heuristic: /Encrypt appears in the trailer/xref of protected PDFs."""
    try:
        with open(path, "rb") as fh:
            head = fh.read(16384)
            tail = b""
            if size > 16384:
                fh.seek(max(0, size - 262144))
                tail = fh.read()
        if b"/Encrypt" in head or b"/Encrypt" in tail:
            return "encrypted"
        return "not encrypted"
    except Exception:
        return "unknown (read error)"


def _read_vint(buf, pos):
    """RAR5 variable-length int. Returns (value, new_pos) or (None, pos)."""
    val = 0
    for i in range(10):
        if pos >= len(buf):
            return None, pos
        b = buf[pos]
        pos += 1
        val |= (b & 0x7F) << (7 * i)
        if not b & 0x80:
            return val, pos
    return None, pos


def _rar_encrypted(path):
    try:
        with open(path, "rb") as fh:
            buf = fh.read(1 << 20)
        if buf.startswith(b"Rar!\x1a\x07\x01\x00"):  # RAR5
            pos = 8
            for _ in range(64):
                if pos + 7 > len(buf):
                    break
                pos += 4  # header CRC
                hsize, pos = _read_vint(buf, pos)
                if hsize is None:
                    break
                hstart = pos
                htype, pos = _read_vint(buf, pos)
                if htype is None:
                    break
                if htype == 4:  # archive encryption header
                    return "encrypted (header encryption)"
                if htype == 2:  # file header: check encryption via extra area
                    # cheap fallback: data of encrypted entries is flagged in
                    # extra records; full parse is overkill — report below.
                    pass
                hflags, pos = _read_vint(buf, pos)
                extra = data = 0
                if hflags is not None and hflags & 0x1:
                    extra, pos = _read_vint(buf, pos)
                if hflags is not None and hflags & 0x2:
                    data, pos = _read_vint(buf, pos)
                if None in (extra, data):
                    break
                pos = hstart + hsize + (data or 0)
            return "not detected (RAR5; file-level passwords not fully parsed)"
        if buf.startswith(b"Rar!\x1a\x07\x00"):  # RAR4
            pos = 7
            for _ in range(64):
                if pos + 7 > len(buf):
                    break
                htype = buf[pos + 2]
                hflags = struct.unpack("<H", buf[pos + 3:pos + 5])[0]
                hsize = struct.unpack("<H", buf[pos + 5:pos + 7])[0]
                if htype == 0x73 and hflags & 0x0080:
                    return "encrypted (header encryption)"
                if htype == 0x74:
                    if hflags & 0x04:
                        return "encrypted"
                    add = struct.unpack("<I", buf[pos + 7:pos + 11])[0] \
                        if pos + 11 <= len(buf) else 0
                    pos += hsize + add
                    continue
                add = 0
                if hflags & 0x8000 and pos + 11 <= len(buf):
                    add = struct.unpack("<I", buf[pos + 7:pos + 11])[0]
                if hsize == 0:
                    break
                pos += hsize + add
            return "not encrypted"
        return "unknown (not a RAR signature)"
    except Exception:
        return "unknown (parse error)"


def _7z_encrypted(path):
    """Heuristic: AES-256 coder id 06F10701 in the (end-)header region."""
    try:
        with open(path, "rb") as fh:
            sig = fh.read(32)
            if not sig.startswith(b"7z\xbc\xaf\x27\x1c") or len(sig) < 32:
                return "unknown (bad 7z signature)"
            nh_off, nh_size = struct.unpack("<QQ", sig[12:28])
            if nh_size == 0 or nh_size > (1 << 24):
                return "unknown (oversized header)"
            fh.seek(32 + nh_off)
            hdr = fh.read(nh_size)
        if not hdr:
            return "unknown (empty header)"
        if b"\x06\xf1\x07\x01" in hdr:
            return "encrypted"
        if hdr[0] == 0x17:
            # kEncodedHeader: header itself compressed/encrypted; if it were
            # plain-compressed the coder ids live here too, so absence of the
            # AES id above usually means just LZMA-packed header.
            return "likely not encrypted (packed header, no AES coder)"
        return "not encrypted"
    except Exception:
        return "unknown (parse error)"


def _diskimage_encrypted(path):
    if not IS_DARWIN:
        return "unknown (hdiutil unavailable)"
    try:
        out = subprocess.run(["hdiutil", "isencrypted", "-plist", path],
                             capture_output=True, timeout=60)
        if out.returncode != 0:
            return "unknown (hdiutil error)"
        return "encrypted" if plistlib.loads(out.stdout).get("encrypted") \
            else "not encrypted"
    except Exception:
        return "unknown (hdiutil error)"


ENCRYPTION_CHECKS = {
    "zip": lambda p, s: _zip_encrypted(p),
    "pdf": _pdf_encrypted,
    "rar": lambda p, s: _rar_encrypted(p),
    "7z": lambda p, s: _7z_encrypted(p),
    "dmg": lambda p, s: _diskimage_encrypted(p),
    "sparseimage": lambda p, s: _diskimage_encrypted(p),
    "sparsebundle": lambda p, s: _diskimage_encrypted(p),
}

_SKIP_DIR_NAMES = {
    ".Trashes", ".Spotlight-V100", ".fseventsd", ".TemporaryItems",
    ".DocumentRevisions-V100", "System Volume Information", ".MobileBackups",
    "$RECYCLE.BIN",
}


def profile_volume(cfg, mount):
    """Walk `mount` READ-ONLY and build a structured profile."""
    started = time.time()
    budget = cfg.get("profile_max_seconds") or 0
    cats = {c: {"count": 0, "bytes": 0}
            for c in list(EXT_CATEGORIES) + ["other"]}
    encrypted = []
    errors = 0
    total_files = 0
    media_mtimes = []
    truncated = False

    def onerr(exc):
        nonlocal errors
        errors += 1

    for root, dirs, files in os.walk(mount, onerror=onerr,
                                     followlinks=False):
        dirs[:] = [d for d in dirs if d not in _SKIP_DIR_NAMES]
        for fname in files:
            if budget and time.time() - started > budget:
                truncated = True
                dirs[:] = []
                break
            path = os.path.join(root, fname)
            try:
                st = os.lstat(path)
            except OSError:
                errors += 1
                continue
            if not os.path.isfile(path) or os.path.islink(path):
                continue
            total_files += 1
            if total_files % 20000 == 0:
                log("profiling… %d files so far" % total_files)
            ext = os.path.splitext(fname)[1].lower().lstrip(".")
            cat = _category_of(ext)
            cats[cat]["count"] += 1
            cats[cat]["bytes"] += st.st_size
            if cat in MEDIA_CATEGORIES:
                media_mtimes.append(st.st_mtime)
            check = ENCRYPTION_CHECKS.get(ext)
            if check:
                status = check(path, st.st_size)
                if status.startswith("encrypted"):
                    encrypted.append({"path": os.path.relpath(path, mount),
                                      "type": ext, "status": status,
                                      "bytes": st.st_size})
        if truncated:
            break

    profile = {
        "volume": volume_info(mount),
        "profiled_at": now_iso(),
        "duration_seconds": round(time.time() - started, 1),
        "total_files": total_files,
        "categories": cats,
        "encrypted_items": encrypted,
        "walk_errors": errors,
        "truncated_by_time_budget": truncated,
    }
    if media_mtimes:
        profile["media_date_range"] = {
            "oldest": _dt.datetime.fromtimestamp(
                min(media_mtimes)).isoformat(timespec="seconds"),
            "newest": _dt.datetime.fromtimestamp(
                max(media_mtimes)).isoformat(timespec="seconds"),
        }
    return profile


def human_bytes(n):
    if n is None:
        return "?"
    for unit in ("B", "KB", "MB", "GB", "TB", "PB"):
        if n < 1024 or unit == "PB":
            return "%.1f %s" % (n, unit) if unit != "B" else "%d B" % n
        n /= 1024.0


def render_summary(profile):
    v = profile["volume"]
    lines = []
    lines.append("Drive: %s  (%s)" % (v.get("name"), v.get("mount")))
    lines.append("  Filesystem: %s   Device: %s" %
                 (v.get("filesystem", "unknown"), v.get("device", "?")))
    lines.append("  Size: %s total, %s used, %s free" %
                 (human_bytes(v.get("total_bytes")),
                  human_bytes(v.get("used_bytes")),
                  human_bytes(v.get("free_bytes"))))
    lines.append("  Files: %d  (profiled in %ss%s, %d unreadable)" %
                 (profile["total_files"], profile["duration_seconds"],
                  ", TRUNCATED by time budget"
                  if profile.get("truncated_by_time_budget") else "",
                  profile["walk_errors"]))
    lines.append("  Breakdown:")
    for cat in list(EXT_CATEGORIES) + ["other"]:
        c = profile["categories"][cat]
        if c["count"]:
            lines.append("    %-10s %7d files  %10s"
                         % (cat, c["count"], human_bytes(c["bytes"])))
    rng = profile.get("media_date_range")
    if rng:
        lines.append("  Media modified: %s … %s"
                     % (rng["oldest"], rng["newest"]))
    enc = profile["encrypted_items"]
    if enc:
        lines.append("  ⚠ ENCRYPTED / PASSWORD-PROTECTED ITEMS: %d" % len(enc))
        for e in enc[:20]:
            lines.append("    [%s] %s — %s" % (e["type"], e["path"],
                                               e["status"]))
        if len(enc) > 20:
            lines.append("    … and %d more (see profile JSON)"
                         % (len(enc) - 20))
    else:
        lines.append("  No encrypted/password-protected items detected.")
    return "\n".join(lines)


# --------------------------------------------------------------------------
# Notification
# --------------------------------------------------------------------------

def notify(title, message):
    if not IS_DARWIN:
        log("NOTIFY (no-op off macOS): %s — %s" % (title, message))
        return
    script = 'display notification %s with title %s sound name "Submarine"' % (
        json.dumps(message), json.dumps(title))
    try:
        subprocess.run(["osascript", "-e", script], timeout=15,
                       capture_output=True)
    except Exception as exc:
        log("notification failed: %s" % exc, "WARN")


# --------------------------------------------------------------------------
# Pre-selection logic
# --------------------------------------------------------------------------

def recommend_steps(profile):
    rec = ["rsync_to_staging"]
    cats = profile["categories"]
    media_count = sum(cats[c]["count"] for c in MEDIA_CATEGORIES)
    total = profile["total_files"] or 1
    if media_count > 100 or media_count / total >= 0.5:
        rec += ["sort_media_by_date", "blake3_dedup", "nsfw_scan",
                "immich_index"]
    if cats["documents"]["count"] > 0:
        rec.append("route_documents")
    if profile["encrypted_items"]:
        rec.append("password_recovery_flag")
    return rec


# --------------------------------------------------------------------------
# watch
# --------------------------------------------------------------------------

def load_known(cfg):
    path = state_paths(cfg)["known_volumes"]
    if os.path.isfile(path):
        try:
            with open(path, encoding="utf-8") as fh:
                return json.load(fh)
        except (OSError, ValueError):
            pass
    return {"volumes": {}, "recent_events": {}}


def save_known(cfg, known):
    path = state_paths(cfg)["known_volumes"]
    tmp = path + ".tmp"
    with open(tmp, "w", encoding="utf-8") as fh:
        json.dump(known, fh, indent=2)
    os.replace(tmp, path)


def current_volumes(cfg):
    vd = cfg["volumes_dir"]
    vols = []
    try:
        entries = sorted(os.listdir(vd))
    except OSError as exc:
        log("cannot list %s: %s" % (vd, exc), "ERROR")
        return vols
    for name in entries:
        if name.startswith("."):
            continue
        path = os.path.join(vd, name)
        if os.path.islink(path) or not os.path.isdir(path):
            continue  # e.g. the "Macintosh HD" symlink to /
        if cfg.get("require_mountpoint") and not os.path.ismount(path):
            continue
        vols.append(name)
    return vols


def cmd_watch(cfg, args):
    sp = state_paths(cfg)
    ensure_dirs(cfg)
    # Serialize concurrent LaunchAgent triggers.
    lock_fh = open(sp["lock"], "a")
    try:
        fcntl.flock(lock_fh, fcntl.LOCK_EX | fcntl.LOCK_NB)
    except BlockingIOError:
        log("another watch run holds the lock; waiting up to 120s")
        try:
            lock_fh.settimeout  # no such API; emulate with alarm-free loop
        except AttributeError:
            pass
        deadline = time.time() + 120
        while time.time() < deadline:
            try:
                fcntl.flock(lock_fh, fcntl.LOCK_EX | fcntl.LOCK_NB)
                break
            except BlockingIOError:
                time.sleep(2)
        else:
            log("lock still held; exiting (event will re-fire)", "WARN")
            return 0

    known = load_known(cfg)
    vols = current_volumes(cfg)
    now = time.time()
    seen = known["volumes"]

    for name in list(seen):
        if name not in vols:
            log("volume unmounted: %s (no action)" % name)
            del seen[name]
    new = [v for v in vols if v not in seen]

    for name in new:
        mount = os.path.join(cfg["volumes_dir"], name)
        seen[name] = {"first_seen": now_iso()}
        last = known["recent_events"].get(name, 0)
        if now - last < cfg["debounce_seconds"]:
            log("debounced duplicate event for %s (%.0fs ago)"
                % (name, now - last))
            continue
        known["recent_events"][name] = now
        save_known(cfg, known)  # persist before slow profiling (re-entrancy)

        if is_ignored(cfg, name):
            log("ignored volume (ignore-list): %s" % name)
            continue
        if cfg["ignore_timemachine"] and is_time_machine_volume(mount):
            log("ignored volume (Time Machine): %s" % name)
            continue

        log("NEW CLIENT DRIVE DETECTED: %s" % mount)
        job_id = new_job_id(name)
        append_manifest(cfg, {"event": "detected", "job_id": job_id,
                              "drive": name, "mount": mount})
        notify("Drive detected: %s" % name,
               "Profiling read-only… (job %s)" % job_id)

        profile = profile_volume(cfg, mount)
        prof_dir = os.path.join(sp["profiles_dir"], job_id)
        os.makedirs(prof_dir, exist_ok=True)
        prof_json = os.path.join(prof_dir, "profile.json")
        with open(prof_json, "w", encoding="utf-8") as fh:
            json.dump(profile, fh, indent=2, ensure_ascii=False)
        summary = render_summary(profile)
        with open(os.path.join(prof_dir, "summary.txt"), "w",
                  encoding="utf-8") as fh:
            fh.write(summary + "\n")
        log("profile written: %s\n%s" % (prof_json, summary))

        job = {
            "job_id": job_id,
            "drive": name,
            "mount": mount,
            "status": "pending-choice",
            "created": now_iso(),
            "profile_json": prof_json,
            "recommended_steps": recommend_steps(profile),
            "steps": {},
        }
        save_job(cfg, job)
        append_manifest(cfg, {
            "event": "profiled", "job_id": job_id, "drive": name,
            "total_files": profile["total_files"],
            "encrypted_items": len(profile["encrypted_items"]),
            "categories": {k: v["count"]
                           for k, v in profile["categories"].items() if
                           v["count"]},
        })
        enc_note = (" ⚠ %d encrypted item(s)" % len(profile["encrypted_items"])
                    if profile["encrypted_items"] else "")
        notify("Drive profiled: %s" % name,
               "%d files.%s Run: drivewatch choose" %
               (profile["total_files"], enc_note))
        if cfg.get("auto_open_chooser") and IS_DARWIN:
            cmd = "%s %s choose %s" % (shlex.quote(sys.executable),
                                       shlex.quote(os.path.abspath(__file__)),
                                       shlex.quote(job_id))
            subprocess.run(["osascript", "-e",
                            'tell application "Terminal" to do script %s'
                            % json.dumps(cmd)], capture_output=True)

    if not new:
        log("no new volumes (current: %s)" % (", ".join(vols) or "none"))
    save_known(cfg, known)
    return 0


# --------------------------------------------------------------------------
# choose
# --------------------------------------------------------------------------

def _gum_choose(options, preselected):
    sel = ",".join(label for key, label in options if key in preselected)
    cmd = ["gum", "choose", "--no-limit",
           "--header", "Select pipeline steps (space toggles, enter confirms)"]
    if sel:
        cmd += ["--selected", sel]
    cmd += [label for _, label in options]
    out = subprocess.run(cmd, capture_output=True, text=True)
    if out.returncode != 0:
        return None
    chosen_labels = [l for l in out.stdout.splitlines() if l.strip()]
    return [k for k, l in options if l in chosen_labels]


def _fzf_choose(options, preselected):
    rec = ", ".join(l for k, l in options if k in preselected) or "none"
    cmd = ["fzf", "--multi", "--layout=reverse",
           "--header",
           "TAB to select steps, ENTER to confirm. Recommended: " + rec]
    out = subprocess.run(cmd, input="\n".join(l for _, l in options),
                         capture_output=True, text=True)
    if out.returncode != 0:
        return None
    chosen = [l for l in out.stdout.splitlines() if l.strip()]
    return [k for k, l in options if l in chosen]


def _plain_choose(options, preselected):
    print("\nSelect pipeline steps:")
    for i, (key, label) in enumerate(options, 1):
        mark = "*" if key in preselected else " "
        print("  %2d) [%s] %s" % (i, mark, label))
    print("Enter numbers separated by spaces, 'r' for recommended (*),"
          " or 's' to skip:")
    try:
        raw = input("> ").strip().lower()
    except EOFError:
        return None
    if raw == "r":
        return list(preselected)
    if raw == "s":
        return [SKIP_KEY]
    picks = []
    for tok in raw.split():
        if tok.isdigit() and 1 <= int(tok) <= len(options):
            picks.append(options[int(tok) - 1][0])
    return picks or None


def choose_steps(profile, recommended):
    options = list(PIPELINE_STEPS) + [(SKIP_KEY, SKIP_LABEL)]
    pre = set(recommended)
    if shutil.which("gum"):
        picked = _gum_choose(options, pre)
        if picked is not None:
            return picked
        log("gum cancelled/failed; falling back", "WARN")
    if shutil.which("fzf"):
        picked = _fzf_choose(options, pre)
        if picked is not None:
            return picked
        log("fzf cancelled/failed; falling back", "WARN")
    return _plain_choose(options, pre)


def cmd_choose(cfg, args):
    ensure_dirs(cfg)
    jobs = [j for j in list_jobs(cfg) if j["status"] == "pending-choice"]
    if args.job_id:
        job = load_job(cfg, args.job_id)
    elif jobs:
        job = jobs[-1]
        if len(jobs) > 1:
            print("Pending jobs: %s\n(choosing most recent: %s)"
                  % (", ".join(j["job_id"] for j in jobs), job["job_id"]))
    else:
        print("No pending jobs. `drivewatch status` to list all.")
        return 1

    with open(job["profile_json"], encoding="utf-8") as fh:
        profile = json.load(fh)
    print(render_summary(profile))
    print("\nRecommended: %s\n" % ", ".join(job["recommended_steps"]))

    picked = choose_steps(profile, job["recommended_steps"])
    if picked is None:
        print("No selection made; job stays pending.")
        return 1
    if SKIP_KEY in picked:
        if len(picked) > 1:
            print("'Skip this drive' selected with other steps — skipping.")
        job["status"] = "skipped"
        job["chosen_steps"] = []
        save_job(cfg, job)
        append_manifest(cfg, {"event": "skipped", "job_id": job["job_id"],
                              "drive": job["drive"]})
        print("Drive skipped. Nothing will run.")
        return 0

    ordered = [k for k, _ in PIPELINE_STEPS if k in picked]
    job["chosen_steps"] = ordered
    job["status"] = "chosen"
    job["chosen_at"] = now_iso()
    save_job(cfg, job)
    append_manifest(cfg, {"event": "steps-chosen", "job_id": job["job_id"],
                          "drive": job["drive"], "steps": ordered})
    print("\nChosen: %s" % ", ".join(ordered))
    print("Review the plan:   drivewatch run %s" % job["job_id"])
    print("Execute (gated):   drivewatch run %s --execute" % job["job_id"])
    return 0


# --------------------------------------------------------------------------
# run
# --------------------------------------------------------------------------

def _staging_dir(cfg, job):
    root = (cfg["nas"] or {}).get("staging_root")
    if not root:
        return None
    date = _dt.date.today().isoformat()
    return os.path.join(root, "%s_%s_%s" % (date, job["drive"],
                                            job["job_id"]))


def build_plan(cfg, job):
    """Resolve each chosen step to a concrete command (or builtin)."""
    staging = _staging_dir(cfg, job)
    subs = {
        "src": job["mount"].rstrip("/") + "/",
        "staging": staging or "<NAS staging_root NOT CONFIGURED>",
        "job_id": job["job_id"],
        "volume_name": job["drive"],
        "profile_json": job["profile_json"],
        "job_dir": os.path.dirname(job["profile_json"]),
    }
    plan, problems = [], []
    for step in job["chosen_steps"]:
        tmpl = (cfg["scripts"] or {}).get(step)
        if tmpl:
            try:
                cmd = tmpl.format(**subs)
            except KeyError as exc:
                problems.append("%s: bad placeholder %s in config" %
                                (step, exc))
                continue
            plan.append({"step": step, "kind": "script", "cmd": cmd})
        elif step == "rsync_to_staging":
            if not staging:
                problems.append("rsync_to_staging: nas.staging_root not set "
                                "in config (see CLAUDE.md for the path)")
                continue
            cmd = ("rsync -rtv --info=progress2 --partial "
                   "--log-file={log} {src} {dst}/").format(
                log=shlex.quote(os.path.join(subs["job_dir"], "rsync.log")),
                src=shlex.quote(subs["src"]), dst=shlex.quote(staging))
            plan.append({"step": step, "kind": "builtin-rsync", "cmd": cmd,
                         "note": "source is the client drive — read-only; "
                                 "no --delete, no --remove-source-files"})
        elif step == "password_recovery_flag":
            plan.append({"step": step, "kind": "builtin-flag",
                         "cmd": "(builtin) write password_recovery_flag.json "
                                "into the job dir + manifest entry"})
        else:
            problems.append("%s: no script configured in config.json "
                            "(map it to the existing script per CLAUDE.md)"
                            % step)
    return plan, problems, staging


def _zfs_floor_check(cfg, job):
    nas = cfg["nas"] or {}
    cmd = nas.get("free_check_cmd")
    floor = nas.get("min_free_gb", 200)
    if not cmd:
        return (False, "nas.free_check_cmd not configured — refusing to rsync "
                       "without verifying the %dGB ZFS floor" % floor)
    try:
        out = subprocess.run(cmd, shell=True, capture_output=True, text=True,
                             timeout=120)
        free_gb = float(out.stdout.strip().split()[0])
    except Exception as exc:
        return (False, "free-space check failed (%s) — refusing rsync" % exc)
    try:
        with open(job["profile_json"], encoding="utf-8") as fh:
            used = json.load(fh)["volume"].get("used_bytes") or 0
    except Exception:
        used = 0
    incoming_gb = used / 1e9
    if free_gb - incoming_gb < floor:
        return (False, "ZFS floor violation: %.0fGB free - %.0fGB incoming "
                       "< %dGB floor" % (free_gb, incoming_gb, floor))
    return (True, "ZFS pool ok: %.0fGB free, ~%.0fGB incoming, floor %dGB"
            % (free_gb, incoming_gb, floor))


def cmd_run(cfg, args):
    ensure_dirs(cfg)
    job = load_job(cfg, args.job_id)
    if job["status"] not in ("chosen", "running", "failed", "done"):
        print("Job %s is '%s' — choose steps first." %
              (job["job_id"], job["status"]))
        return 1
    plan, problems, staging = build_plan(cfg, job)

    print("=" * 72)
    print("RUNNER PLAN — job %s  (drive: %s)" % (job["job_id"], job["drive"]))
    print("=" * 72)
    for item in plan:
        st = job["steps"].get(item["step"], {}).get("status")
        flag = "  [already done — will skip]" if st == "done" and \
            not args.force else ""
        print("  %-24s %s%s" % (item["step"], item["cmd"], flag))
        if item.get("note"):
            print("  %-24s ^ %s" % ("", item["note"]))
    for p in problems:
        print("  ✗ BLOCKED: %s" % p)
    print("-" * 72)

    if not args.execute:
        print("DRY RUN ONLY. Nothing was executed.")
        print("To execute: set \"execution_enabled\": true in %s (after the "
              "runner-plan checkpoint is approved) and re-run with --execute."
              % cfg["_config_path"])
        return 0
    if not cfg.get("execution_enabled"):
        print("REFUSING: execution_enabled is false in %s.\n"
              "This gate exists for the explicit go-ahead checkpoint before "
              "anything touches the NAS." % cfg["_config_path"])
        return 2
    if problems:
        print("REFUSING: unresolved plan problems above.")
        return 2

    job["status"] = "running"
    save_job(cfg, job)
    append_manifest(cfg, {"event": "run-started", "job_id": job["job_id"],
                          "drive": job["drive"],
                          "steps": [p["step"] for p in plan]})
    job_dir = os.path.dirname(job["profile_json"])
    rc_all = 0
    for item in plan:
        step = item["step"]
        rec = job["steps"].setdefault(step, {})
        if rec.get("status") == "done" and not args.force:
            log("step %s already done — skipping (idempotent)" % step)
            continue
        if step == "rsync_to_staging":
            ok, msg = _zfs_floor_check(cfg, job)
            log(msg, "INFO" if ok else "ERROR")
            if not ok:
                rec.update(status="blocked", error=msg, ts=now_iso())
                save_job(cfg, job)
                append_manifest(cfg, {"event": "step-blocked",
                                      "job_id": job["job_id"], "step": step,
                                      "reason": msg})
                rc_all = 2
                break
        rec.update(status="running", started=now_iso())
        save_job(cfg, job)
        if item["kind"] == "builtin-flag":
            with open(job["profile_json"], encoding="utf-8") as fh:
                enc = json.load(fh)["encrypted_items"]
            flag_path = os.path.join(job_dir, "password_recovery_flag.json")
            with open(flag_path, "w", encoding="utf-8") as fh:
                json.dump({"job_id": job["job_id"], "drive": job["drive"],
                           "flagged_at": now_iso(), "items": enc}, fh,
                          indent=2)
            rc = 0
            log("password-recovery flag written: %s" % flag_path)
        else:
            log("running %s: %s" % (step, item["cmd"]))
            step_log = os.path.join(job_dir, "step-%s.log" % step)
            with open(step_log, "a", encoding="utf-8") as lf:
                lf.write("\n--- %s ---\n$ %s\n" % (now_iso(), item["cmd"]))
                lf.flush()
                rc = subprocess.run(item["cmd"], shell=True, stdout=lf,
                                    stderr=subprocess.STDOUT).returncode
        rec.update(status="done" if rc == 0 else "failed", rc=rc,
                   finished=now_iso())
        save_job(cfg, job)
        append_manifest(cfg, {"event": "step-finished",
                              "job_id": job["job_id"], "drive": job["drive"],
                              "step": step, "rc": rc,
                              "status": rec["status"]})
        if rc != 0:
            log("step %s FAILED (rc=%d) — stopping pipeline" % (step, rc),
                "ERROR")
            rc_all = rc
            break

    job["status"] = "done" if rc_all == 0 else "failed"
    save_job(cfg, job)
    append_manifest(cfg, {"event": "run-finished", "job_id": job["job_id"],
                          "drive": job["drive"], "status": job["status"]})
    notify("Pipeline %s: %s" % (job["status"], job["drive"]),
           "Job %s" % job["job_id"])
    print("Run %s. See logs in %s" % (job["status"], job_dir))
    return rc_all


# --------------------------------------------------------------------------
# status / profile
# --------------------------------------------------------------------------

def cmd_status(cfg, args):
    jobs = list_jobs(cfg)
    if not jobs:
        print("No jobs recorded.")
        return 0
    for j in jobs:
        steps = j.get("chosen_steps") or []
        print("%-40s %-15s %s  steps: %s"
              % (j["job_id"], j["status"], j["drive"],
                 ", ".join(steps) or "—"))
    return 0


def cmd_profile(cfg, args):
    ensure_dirs(cfg)
    mount = os.path.abspath(args.path)
    if not os.path.isdir(mount):
        print("Not a directory: %s" % mount, file=sys.stderr)
        return 1
    profile = profile_volume(cfg, mount)
    print(render_summary(profile))
    if args.json_out:
        with open(args.json_out, "w", encoding="utf-8") as fh:
            json.dump(profile, fh, indent=2, ensure_ascii=False)
        print("\nJSON written: %s" % args.json_out)
    return 0


# --------------------------------------------------------------------------
# main
# --------------------------------------------------------------------------

def main(argv=None):
    ap = argparse.ArgumentParser(prog="drivewatch", description=__doc__)
    sub = ap.add_subparsers(dest="cmd", required=True)
    sub.add_parser("watch", help="mount-event handler (LaunchAgent)")
    p = sub.add_parser("profile", help="read-only profile of a path")
    p.add_argument("path")
    p.add_argument("--json-out", default=None)
    p = sub.add_parser("choose", help="pick pipeline steps for a job")
    p.add_argument("job_id", nargs="?")
    p = sub.add_parser("run", help="show plan / execute chosen steps")
    p.add_argument("job_id")
    p.add_argument("--execute", action="store_true",
                   help="actually run (also needs execution_enabled in "
                        "config)")
    p.add_argument("--force", action="store_true",
                   help="re-run steps already marked done")
    sub.add_parser("status", help="list jobs")

    args = ap.parse_args(argv)
    cfg = load_config()
    open_log(cfg)
    fn = {"watch": cmd_watch, "profile": cmd_profile, "choose": cmd_choose,
          "run": cmd_run, "status": cmd_status}[args.cmd]
    try:
        return fn(cfg, args)
    except Exception as exc:
        log("unhandled error: %s" % exc, "ERROR")
        raise


if __name__ == "__main__":
    sys.exit(main())
