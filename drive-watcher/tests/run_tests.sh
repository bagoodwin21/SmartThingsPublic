#!/bin/bash
# Logic-level test harness for drivewatch.py. Runs anywhere (Linux/macOS) by
# pointing volumes_dir at a fake directory — exercises detection, debounce,
# ignore-list, unmount handling, the read-only profiler (incl. encrypted-file
# detection), chooser fallback, runner gating, real rsync execution into a
# fake staging dir, idempotent re-run, and the manifest.
# macOS-specific integration (launchd, diskutil, notifications) is NOT
# covered here — that's the live checkpoint on the Mac.
set -euo pipefail

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DW="$DIR/../drivewatch.py"
TMP="$(mktemp -d /tmp/dwtest.XXXXXX)"
trap 'rm -rf "$TMP"' EXIT
VOLS="$TMP/Volumes"
STATE="$TMP/state"
LOGS="$TMP/logs"
STAGING="$TMP/nas-staging"
mkdir -p "$VOLS" "$STATE" "$LOGS" "$STAGING"

export DRIVEWATCH_CONFIG="$TMP/config.json"
cat > "$DRIVEWATCH_CONFIG" <<EOF
{
  "volumes_dir": "$VOLS",
  "state_dir": "$STATE",
  "log_dir": "$LOGS",
  "debounce_seconds": 2,
  "require_mountpoint": false,
  "execution_enabled": false,
  "ignore_volumes": ["Macintosh HD", "Shuttle-A", "com.apple.TimeMachine.*"],
  "nas": {"staging_root": null, "free_check_cmd": null, "min_free_gb": 200}
}
EOF

PASS=0; FAIL=0
check() { # check <desc> <grep-pattern> <file-or-string>
    local desc="$1" pat="$2" hay="$3"
    if grep -qE "$pat" <<<"$hay"; then
        echo "  ok: $desc"; PASS=$((PASS+1))
    else
        echo "  FAIL: $desc (pattern '$pat' not found)"; FAIL=$((FAIL+1))
        echo "----- haystack -----"; echo "$hay" | head -40; echo "-----"
    fi
}

make_fake_drive() {
    local v="$VOLS/CLIENT_TEST_1"
    mkdir -p "$v/DCIM/100CANON" "$v/videos" "$v/docs" "$v/stuff"
    for i in 1 2 3 4 5; do
        head -c 2048 /dev/urandom > "$v/DCIM/100CANON/IMG_000$i.JPG"
    done
    touch -d '2019-03-04 10:00' "$v/DCIM/100CANON/IMG_0001.JPG" \
        2>/dev/null || touch -t 201903041000 "$v/DCIM/100CANON/IMG_0001.JPG"
    head -c 4096 /dev/urandom > "$v/videos/tape01.mp4"
    head -c 1024 /dev/urandom > "$v/videos/clip.mov"
    printf '%%PDF-1.4 plain doc' > "$v/docs/plain.pdf"
    printf '%%PDF-1.4 secret /Encrypt 12 0 R trailer' > "$v/docs/locked.pdf"
    echo "hello" > "$v/docs/notes.txt"
    ( cd "$v/stuff" && echo data > a.txt \
        && zip -q plain.zip a.txt \
        && zip -q -P sekrit locked.zip a.txt )
    # Minimal RAR4 with header-encryption flag (0x0080) on the main header.
    python3 - "$v/stuff/locked.rar" <<'PY'
import struct, sys
sig = b"Rar!\x1a\x07\x00"
main = struct.pack("<HBHH", 0x6152, 0x73, 0x0080, 13) + b"\x00" * 6
open(sys.argv[1], "wb").write(sig + main)
PY
}

echo "== 1. detection + ignore-list =="
mkdir -p "$VOLS/Macintosh HD" "$VOLS/Shuttle-A"
make_fake_drive
OUT="$(python3 "$DW" watch 2>&1)"
check "client drive detected" "NEW CLIENT DRIVE DETECTED: .*CLIENT_TEST_1" "$OUT"
check "boot volume ignored" "ignored volume \(ignore-list\): Macintosh HD" "$OUT"
check "shuttle ignored" "ignored volume \(ignore-list\): Shuttle-A" "$OUT"
check "profile written" "profile written" "$OUT"

echo "== 2. profiler content =="
PROF="$(find "$STATE/profiles" -name profile.json | sort | head -1)"
PJ="$(cat "$PROF")"
check "5 images counted" '"images"' "$PJ"
python3 - "$PROF" <<'PY'
import json, sys
p = json.load(open(sys.argv[1]))
cats = p["categories"]
assert cats["images"]["count"] == 5, cats["images"]
assert cats["video"]["count"] == 2, cats["video"]
assert cats["documents"]["count"] == 4, cats["documents"]  # 2 pdf, txt, a.txt
enc = {(e["type"], e["path"].split("/")[-1]) for e in p["encrypted_items"]}
assert ("zip", "locked.zip") in enc, enc
assert ("pdf", "locked.pdf") in enc, enc
assert ("rar", "locked.rar") in enc, enc
assert not any(n in {"plain.zip", "plain.pdf"} for _, n in enc), enc
assert "media_date_range" in p and p["media_date_range"]["oldest"].startswith("2019-03-04")
print("  ok: category counts, encrypted zip/pdf/rar detected, plain files clean, date range")
PY
PASS=$((PASS+1))

echo "== 3. duplicate event debounced; unmount; remount re-detected =="
OUT="$(python3 "$DW" watch 2>&1)"
check "second event is a no-op" "no new volumes" "$OUT"
rm -rf "$VOLS/CLIENT_TEST_1"
OUT="$(python3 "$DW" watch 2>&1)"
check "unmount logged, no action" "volume unmounted: CLIENT_TEST_1 \(no action\)" "$OUT"
make_fake_drive
OUT="$(python3 "$DW" watch 2>&1)"
check "fast remount debounced" "debounced duplicate event" "$OUT"
sleep 3
rm -rf "$VOLS/CLIENT_TEST_1"; python3 "$DW" watch >/dev/null 2>&1
make_fake_drive
OUT="$(python3 "$DW" watch 2>&1)"
check "remount after debounce window re-detected" "NEW CLIENT DRIVE DETECTED" "$OUT"

echo "== 4. chooser (plain fallback) preselection =="
JOB="$(python3 "$DW" status | tail -1 | awk '{print $1}')"
OUT="$(echo r | python3 "$DW" choose "$JOB" 2>&1)"
check "recommends rsync" "rsync_to_staging" "$OUT"
check "recommends media steps" "blake3_dedup" "$OUT"
check "recommends docs routing" "route_documents" "$OUT"
check "recommends password recovery (encrypted items)" "password_recovery_flag" "$OUT"
check "steps recorded" "Chosen: rsync_to_staging" "$OUT"

echo "== 5. runner: dry-run by default, gated, blocked without config =="
OUT="$(python3 "$DW" run "$JOB" 2>&1)"
check "dry run banner" "DRY RUN ONLY" "$OUT"
check "missing staging blocks rsync" "staging_root not set" "$OUT"
check "unmapped scripts reported" "no script configured" "$OUT"
OUT="$(python3 "$DW" run "$JOB" --execute 2>&1 || true)"
check "execute refused while gate closed" "REFUSING: execution_enabled is false" "$OUT"

snapshot_drive() { # portable (BSD find has no -printf)
    python3 -c '
import os, sys
for root, _, files in os.walk(sys.argv[1]):
    for f in sorted(files):
        p = os.path.join(root, f); st = os.lstat(p)
        print(p, st.st_size, st.st_mtime)' "$VOLS/CLIENT_TEST_1" | sort
}
BEFORE="$(snapshot_drive)"

echo "== 6. runner: gate open + configured -> executes, ZFS floor enforced =="
python3 - "$DRIVEWATCH_CONFIG" "$STAGING" <<'PY'
import json, sys
cfg = json.load(open(sys.argv[1]))
cfg["execution_enabled"] = True
cfg["nas"] = {"staging_root": sys.argv[2],
              "free_check_cmd": "echo 100",   # 100GB free < 200GB floor
              "min_free_gb": 200}
cfg["scripts"] = {
    "sort_media_by_date": "echo sorted {staging} > /dev/null",
    "blake3_dedup": "echo dedup {job_id} > /dev/null",
    "nsfw_scan": "echo scan > /dev/null",
    "immich_index": "echo index > /dev/null",
    "route_documents": "echo route > /dev/null",
}
json.dump(cfg, open(sys.argv[1], "w"), indent=2)
PY
OUT="$(python3 "$DW" run "$JOB" --execute 2>&1 || true)"
check "ZFS floor violation blocks rsync" "ZFS floor violation" "$OUT"
sed -i 's/echo 100/echo 5000/' "$DRIVEWATCH_CONFIG"
OUT="$(python3 "$DW" run "$JOB" --execute 2>&1)"
check "run completed" "Run done" "$OUT"
[[ -d "$STAGING" ]] && D="$(find "$STAGING" -name 'IMG_0003.JPG' | wc -l)"
check "rsync actually staged files" "^1$" "$D"
F="$(find "$STATE"/profiles/*/password_recovery_flag.json | wc -l)"
check "password-recovery flag file written" "^1$" "$F"

echo "== 7. idempotency: re-run skips completed steps =="
OUT="$(python3 "$DW" run "$JOB" --execute 2>&1)"
check "completed steps skipped" "already done" "$OUT"

echo "== 8. client drive untouched (read-only invariant) =="
AFTER="$(snapshot_drive)"
if [[ "$BEFORE" == "$AFTER" ]]; then
    echo "  ok: client drive byte-identical (paths, sizes, mtimes)"
    PASS=$((PASS+1))
else
    echo "  FAIL: client drive changed during run"; FAIL=$((FAIL+1))
    diff <(echo "$BEFORE") <(echo "$AFTER") | head
fi

echo "== 9. manifest chain-of-custody =="
M="$(cat "$STATE/manifest.jsonl")"
for ev in detected profiled steps-chosen run-started step-finished run-finished step-blocked; do
    check "manifest has '$ev'" "\"event\": \"$ev\"" "$M"
done
python3 -c "
import json,sys
[json.loads(l) for l in open('$STATE/manifest.jsonl')]
print('  ok: manifest is valid JSONL')"
PASS=$((PASS+1))

echo
echo "RESULT: $PASS passed, $FAIL failed"
exit $((FAIL > 0))
