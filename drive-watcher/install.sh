#!/bin/bash
# Install the drive-watcher LaunchAgent (idempotent, macOS only).
# Runs drivewatch.py in place from this directory — no copies to drift.
set -euo pipefail

if [[ "$(uname -s)" != "Darwin" ]]; then
    echo "install.sh must run on macOS (this is $(uname -s))." >&2
    exit 1
fi

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SCRIPT="$DIR/drivewatch.py"
PYTHON="$(command -v python3)"
LABEL="com.drivewatcher"
PLIST="$HOME/Library/LaunchAgents/$LABEL.plist"
STATE_DIR="$HOME/Library/Application Support/drive-watcher"
LOG_DIR="$HOME/Library/Logs/drive-watcher"

mkdir -p "$HOME/Library/LaunchAgents" "$STATE_DIR" "$LOG_DIR"

if [[ ! -f "$STATE_DIR/config.json" ]]; then
    cp "$DIR/config.example.json" "$STATE_DIR/config.json"
    echo "Created $STATE_DIR/config.json — EDIT IT (shuttle-drive names, NAS"
    echo "staging path, script paths per CLAUDE.md) before enabling execution."
fi

sed -e "s|@PYTHON@|$PYTHON|g" \
    -e "s|@SCRIPT@|$SCRIPT|g" \
    -e "s|@LOGDIR@|$LOG_DIR|g" \
    "$DIR/com.drivewatcher.plist.template" > "$PLIST"

# Reload cleanly whether or not it was already loaded.
launchctl bootout "gui/$(id -u)/$LABEL" 2>/dev/null || true
launchctl bootstrap "gui/$(id -u)" "$PLIST"
launchctl kickstart "gui/$(id -u)/$LABEL" || true

echo "Installed and loaded $LABEL."
echo "  Watcher log : $LOG_DIR/drivewatch-$(date +%Y%m%d).log"
echo "  Agent stderr: $LOG_DIR/launchagent.err.log"
echo "Plug in a test drive and tail the watcher log to verify detection."
