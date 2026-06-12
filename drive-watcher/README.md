# drive-watcher

macOS watcher for client drives in the data-recovery pipeline. When a new
volume mounts, it profiles the drive **read-only**, notifies, and waits for a
human to choose which pipeline steps run. Nothing ever runs automatically.

## Safety invariants

- **Client drive is read-only, always.** The tool only ever reads from the
  mounted volume. All state, profiles, logs, and the manifest live under
  `~/Library/Application Support/drive-watcher` and
  `~/Library/Logs/drive-watcher`. The built-in rsync has no `--delete` /
  `--remove-source-files`, and the test suite asserts the source tree is
  byte-identical (paths, sizes, mtimes) after a full run.
- **Detect and propose only.** Detection → read-only profile → notification.
  Pipeline steps run only after you pick them in `choose` *and* invoke
  `run --execute` *and* `execution_enabled` is true in config. That double
  gate is the "explicit go-ahead before anything touches the NAS" checkpoint,
  encoded.
- **ZFS floor.** Before any rsync the runner executes `nas.free_check_cmd`
  and refuses if `free − incoming < nas.min_free_gb` (default 200), or if the
  check is unconfigured/fails. Fail-closed.
- The watcher never invokes anything that conflicts with
  `dangerous-command-guard.py`; it shells out only to `diskutil info`,
  `hdiutil isencrypted`, `osascript` notifications, and the commands you map
  in config.

## Install (on the Mac)

```sh
cd drive-watcher
./install.sh        # idempotent; safe to re-run after edits
```

This renders `com.drivewatcher.plist.template` into
`~/Library/LaunchAgents/com.drivewatcher.plist` (WatchPaths on `/Volumes`,
ThrottleInterval 10s) and loads it. It also seeds
`~/Library/Application Support/drive-watcher/config.json` from
`config.example.json` on first run.

**Then edit `config.json`** — these are placeholders because this was built
without access to CLAUDE.md:

| key | what to put there |
|---|---|
| `ignore_volumes` | your shuttle drives by exact name (plus the defaults) |
| `nas.staging_root` | NAS staging path per CLAUDE.md |
| `nas.free_check_cmd` | command printing free GB of the pool, e.g. `ssh nas zfs get -Hpo value available tank \| awk '{printf "%d", $1/1e9}'` |
| `scripts.*` | command templates for the existing scripts per CLAUDE.md; placeholders `{src} {staging} {job_id} {volume_name} {profile_json} {job_dir}` |
| `execution_enabled` | leave `false` until the runner-plan checkpoint is approved |

## Workflow

1. Plug in a client drive. launchd fires `drivewatch.py watch`, which
   snapshot-diffs `/Volumes`, debounces duplicates (default 20s), ignores
   unmounts, the ignore-list, and Time Machine destinations.
2. New client drive → notification, read-only profile
   (`profiles/<job>/profile.json` + `summary.txt`): filesystem, sizes, file
   breakdown by category, encrypted/password-protected items (zip flag bits,
   PDF `/Encrypt`, RAR4/RAR5 headers, 7z AES coder id, `hdiutil isencrypted`
   for disk images), media modification-date range.
3. When you're ready (it never blocks): `drivewatch choose` — multi-select
   checklist via gum → fzf → plain prompt, pre-selected from the profile
   (mostly media → sort/dedup/NSFW/Immich; documents → routing; encrypted
   items → password-recovery flag). "Skip this drive" is always offered.
4. `drivewatch run <job>` prints the full runner plan (dry-run).
   `drivewatch run <job> --execute` runs it — only once `execution_enabled`
   is true. Steps run in pipeline order (rsync to staging first, then
   server-side), are individually logged to the job dir, and completed steps
   are skipped on re-run (idempotent; `--force` to redo).
5. Every event (detected, profiled, steps-chosen, run-started, step-finished,
   step-blocked, run-finished, skipped) is appended to the chain-of-custody
   manifest `~/Library/Application Support/drive-watcher/manifest.jsonl`.

`drivewatch status` lists all jobs. `drivewatch profile <path>` profiles any
directory ad hoc.

A convenient alias: `alias drivewatch='python3 <repo>/drive-watcher/drivewatch.py'`

## Tests

`tests/run_tests.sh` runs the whole flow against a fake volumes directory
(33 assertions) — works on Linux or macOS, no hardware needed. What it cannot
cover: launchd triggering, `diskutil`/`hdiutil` paths, notifications, gum/fzf
interactivity. Those need the live test-drive checkpoint on the Mac.
