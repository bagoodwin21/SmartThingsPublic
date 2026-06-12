#!/bin/bash
# transcribe_tape.sh — pair a cleaned tape video with a local transcription.
# Extracts 16kHz mono WAV to a temp file, runs whisper.cpp (large-v3-turbo),
# writes <video>.srt and <video>.txt alongside the cleaned video. Fully local.
#
# Usage: transcribe_tape.sh VIDEO [VIDEO...]
# Env:   WHISPER_DIR   whisper.cpp checkout (default ~/src/whisper.cpp)
#        WHISPER_MODEL model file (default $WHISPER_DIR/models/ggml-large-v3-turbo.bin)
#        TAPE_MANIFEST manifest to append to (default: <video dir>/manifest.jsonl)
set -euo pipefail

WHISPER_DIR="${WHISPER_DIR:-$HOME/src/whisper.cpp}"
WHISPER_MODEL="${WHISPER_MODEL:-$WHISPER_DIR/models/ggml-large-v3-turbo.bin}"

WHISPER_BIN=""
for cand in "$WHISPER_DIR/build/bin/whisper-cli" "$WHISPER_DIR/build/bin/main" \
            "$(command -v whisper-cli || true)"; do
    [[ -n "$cand" && -x "$cand" ]] && WHISPER_BIN="$cand" && break
done
[[ -n "$WHISPER_BIN" ]] || {
    echo "whisper.cpp binary not found — run setup_whisper.sh first" >&2; exit 1; }
[[ -f "$WHISPER_MODEL" ]] || {
    echo "model not found: $WHISPER_MODEL — run setup_whisper.sh" >&2; exit 1; }

rc=0
for VIDEO in "$@"; do
    [[ -f "$VIDEO" ]] || { echo "missing: $VIDEO" >&2; rc=1; continue; }
    DIR="$(cd "$(dirname "$VIDEO")" && pwd)"
    BASE="$(basename "$VIDEO")"; BASE="${BASE%.*}"
    OUT_BASE="$DIR/$BASE"
    if [[ -s "$OUT_BASE.srt" && -s "$OUT_BASE.txt" ]]; then
        echo "SKIP (idempotent): $OUT_BASE.srt exists"
        continue
    fi
    TMPWAV="$(mktemp -t tapewav.XXXXXX).wav"
    trap 'rm -f "$TMPWAV"' EXIT
    echo "extracting 16kHz mono WAV from $VIDEO…"
    ffmpeg -hide_banner -loglevel error -y -i "$VIDEO" \
        -vn -ar 16000 -ac 1 -c:a pcm_s16le "$TMPWAV"
    echo "transcribing with $(basename "$WHISPER_BIN") ($(basename "$WHISPER_MODEL"))…"
    "$WHISPER_BIN" -m "$WHISPER_MODEL" -f "$TMPWAV" \
        -osrt -otxt -of "$OUT_BASE" --print-progress
    rm -f "$TMPWAV"
    echo "wrote $OUT_BASE.srt and $OUT_BASE.txt"

    MANIFEST="${TAPE_MANIFEST:-$DIR/manifest.jsonl}"
    python3 - "$MANIFEST" "$VIDEO" "$OUT_BASE" <<'PY'
import json, sys, datetime, fcntl, os
manifest, video, out_base = sys.argv[1:4]
entry = {
    "ts": datetime.datetime.now().astimezone().isoformat(timespec="seconds"),
    "event": "tape-transcribed",
    "video": video,
    "srt": out_base + ".srt",
    "txt": out_base + ".txt",
    "model": os.path.basename(os.environ.get("WHISPER_MODEL",
                                             "ggml-large-v3-turbo.bin")),
}
with open(manifest, "a") as fh:
    fcntl.flock(fh, fcntl.LOCK_EX)
    fh.write(json.dumps(entry) + "\n")
PY
done
exit "$rc"
