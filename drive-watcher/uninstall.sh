#!/bin/bash
# Remove the drive-watcher LaunchAgent. State/logs/manifest are kept
# (chain-of-custody) — delete ~/Library/Application Support/drive-watcher
# yourself if you really want them gone.
set -euo pipefail

LABEL="com.drivewatcher"
PLIST="$HOME/Library/LaunchAgents/$LABEL.plist"

launchctl bootout "gui/$(id -u)/$LABEL" 2>/dev/null || true
rm -f "$PLIST"
echo "Unloaded and removed $LABEL. State and manifest left in place."
