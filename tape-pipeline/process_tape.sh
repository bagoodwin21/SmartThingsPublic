#!/bin/bash
# process_tape.sh — non-destructive single-file processor for ClearClick
# tape captures (MP4). The original is NEVER touched: cleaned copy + sidecars
# go to a separate output directory.
#
# Default mode is --analyze: print the idet result, proposed head/tail trim
# points, and measured loudness, then STOP. Run again with --process only
# after the analysis has been reviewed/approved (validation checkpoint).
#
# Pipeline (per spec):
#   * idet interlace detection -> bwdif=mode=1 (~59.94p) only if interlaced
#   * dead-air trim from HEAD and TAIL ONLY (black + uniform-color/blue +
#     snow detection via signalstats; ClearClick dead air is often blue or
#     snow, not pure black). Never cuts mid-file. Max 90s per end.
#   * two-pass loudnorm, target -16 LUFS (TP -1.5, LRA 11)
#   * H.264 high profile CRF 18, +faststart, AAC 192k
#   * QC flags (never fail the file): long mid-file black, freezedetect
#     hits, idet verdict, runtime anomalies — one line per file
#   * appends a JSONL entry to the job manifest
#
# Usage:
#   process_tape.sh [--analyze|--process] [--out-dir DIR] [--manifest FILE]
#                   [--crf N] [--max-trim SECS] INPUT.mp4
#
# Output layout (date-folder convention; adjust OUT_ROOT per CLAUDE.md):
#   $OUT_ROOT/YYYY-MM-DD/<name>_clean.mp4
#   $OUT_ROOT/YYYY-MM-DD/<name>.analysis.json
#   $OUT_ROOT/YYYY-MM-DD/qc_flags.txt          (one line per file, appended)
set -euo pipefail

MODE="analyze"
OUT_ROOT="${TAPE_OUTPUT_ROOT:-$PWD/tape-output}"
OUT_DIR=""
MANIFEST="${TAPE_MANIFEST:-}"
CRF=18
MAX_TRIM=90
FORCE_INTERLACE=""
TARGET_I=-16
TARGET_TP=-1.5
TARGET_LRA=11

while [[ $# -gt 0 ]]; do
    case "$1" in
        --analyze) MODE="analyze"; shift ;;
        --process) MODE="process"; shift ;;
        --out-dir) OUT_DIR="$2"; shift 2 ;;
        --manifest) MANIFEST="$2"; shift 2 ;;
        --crf) CRF="$2"; shift 2 ;;
        --max-trim) MAX_TRIM="$2"; shift 2 ;;
        --force-deinterlace) FORCE_INTERLACE="yes"; shift ;;
        --no-deinterlace) FORCE_INTERLACE="no"; shift ;;
        -h|--help) grep '^#' "$0" | sed 's/^# \{0,1\}//'; exit 0 ;;
        -*) echo "unknown option: $1" >&2; exit 2 ;;
        *) INPUT="$1"; shift ;;
    esac
done

[[ -n "${INPUT:-}" && -f "$INPUT" ]] || { echo "input file required" >&2; exit 2; }
INPUT="$(cd "$(dirname "$INPUT")" && pwd)/$(basename "$INPUT")"
[[ -n "$OUT_DIR" ]] || OUT_DIR="$OUT_ROOT/$(date +%Y-%m-%d)"
mkdir -p "$OUT_DIR"
OUT_DIR="$(cd "$OUT_DIR" && pwd)"
[[ "$OUT_DIR" != "$(dirname "$INPUT")" ]] || {
    echo "REFUSING: output dir equals the input dir — originals stay untouched." >&2
    exit 2
}
[[ -n "$MANIFEST" ]] || MANIFEST="$OUT_DIR/manifest.jsonl"

BASE="$(basename "$INPUT")"; BASE="${BASE%.*}"
OUT_FILE="$OUT_DIR/${BASE}_clean.mp4"
ANALYSIS="$OUT_DIR/${BASE}.analysis.json"
QC_FILE="$OUT_DIR/qc_flags.txt"
LOG="$OUT_DIR/${BASE}.process.log"

say() { echo "[$(date +%H:%M:%S)] $*" | tee -a "$LOG" >&2; }

if [[ "$MODE" == "process" && -s "$OUT_FILE" ]]; then
    say "SKIP (idempotent): $OUT_FILE already exists"
    exit 0
fi

# ---------------------------------------------------------------- probe ----
DUR="$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$INPUT")"
say "input: $INPUT (${DUR}s)"

# ----------------------------------------------------------------- idet ----
# Sample up to three 30s windows (start/middle/end) and aggregate the
# multi-frame counters. Verdict: interlaced if >20% of determined frames are.
idet_window() { # idet_window <start-sec>
    ffmpeg -hide_banner -nostats -ss "$1" -t 30 -i "$INPUT" \
        -vf idet -an -f null - 2>&1 |
        grep "Multi frame detection" | tail -1
}
W_MID="$(awk -v d="$DUR" 'BEGIN{m=d/2-15; print (m<0)?0:m}')"
W_END="$(awk -v d="$DUR" 'BEGIN{e=d-35; print (e<0)?0:e}')"
IDET_RAW="$(idet_window 0; idet_window "$W_MID"; idet_window "$W_END")"
read -r TFF BFF PROG UNDET <<<"$(echo "$IDET_RAW" | python3 -c '
import re, sys
t = b = p = u = 0
for line in sys.stdin:
    m = re.search(r"TFF:\s*(\d+)\s*BFF:\s*(\d+)\s*Progressive:\s*(\d+)\s*Undetermined:\s*(\d+)", line)
    if m:
        t += int(m.group(1)); b += int(m.group(2))
        p += int(m.group(3)); u += int(m.group(4))
print(t, b, p, u)')"
# Majority vote among determined frames. ClearClick captures are uniformly
# interlaced or progressive, so this is robust; --force-deinterlace /
# --no-deinterlace override the verdict after reviewing the analysis.
INTERLACED="$(awk -v t="$TFF" -v b="$BFF" -v p="$PROG" \
    'BEGIN{print (t+b>p)?"yes":"no"}')"
[[ -n "$FORCE_INTERLACE" ]] && INTERLACED="$FORCE_INTERLACE"
say "idet: TFF=$TFF BFF=$BFF Progressive=$PROG Undetermined=$UNDET -> interlaced=$INTERLACED${FORCE_INTERLACE:+ (forced)}"

# ----------------------------------------------------- head/tail dead air ----
# signalstats per frame over the first/last (MAX_TRIM+30)s. A frame is "dead"
# if uniform (black OR blue OR any flat color: luma spread < 48) or snow
# (temporal luma noise YDIF > 25). Trim = contiguous dead run anchored at the
# very start (or end), >= 2s, capped at MAX_TRIM. HEAD AND TAIL ONLY.
scan_window() { # scan_window <start> <dur>
    ffmpeg -hide_banner -nostats -ss "$1" -t "$2" -i "$INPUT" \
        -vf signalstats,metadata=mode=print:file=- -an -f null - 2>/dev/null
}
WIN="$(awk -v m="$MAX_TRIM" 'BEGIN{print m+30}')"
TAIL_START="$(awk -v d="$DUR" -v w="$WIN" 'BEGIN{t=d-w; print (t<0)?0:t}')"

TRIMS="$( { scan_window 0 "$WIN"; echo "===TAIL==="; \
            scan_window "$TAIL_START" "$WIN"; } | \
    python3 -c '
import sys, re
MAX_TRIM = float(sys.argv[1]); DUR = float(sys.argv[2])
TAIL_START = float(sys.argv[3])
MIN_RUN = 2.0      # ignore blips shorter than this
GAP_TOL = 1.0      # a run must be anchored within this of the edge

def parse(lines):
    frames, cur = [], {}
    for line in lines:
        m = re.match(r"frame:\d+\s+pts:\S+\s+pts_time:([\d.]+)", line)
        if m:
            if cur.get("t") is not None:
                frames.append(cur)
            cur = {"t": float(m.group(1))}
        m = re.match(r"lavfi.signalstats.(YMIN|YMAX|YDIF)=([\d.-]+)", line)
        if m and cur:
            cur[m.group(1)] = float(m.group(2))
    if cur.get("t") is not None:
        frames.append(cur)
    return frames

def dead(f):
    spread = f.get("YMAX", 255) - f.get("YMIN", 0)
    return spread < 48 or f.get("YDIF", 0) > 25

text = sys.stdin.read().split("===TAIL===")
head = parse(text[0].splitlines())
tail = parse(text[1].splitlines()) if len(text) > 1 else []

def head_trim(frames):
    end = 0.0
    started = False
    for f in frames:
        if dead(f):
            if not started and f["t"] > GAP_TOL:
                break
            started = True
            end = f["t"]
        elif started:
            break
    return min(end, MAX_TRIM) if started and end >= MIN_RUN else 0.0

def tail_trim(frames):
    if not frames:
        return 0.0
    last = frames[-1]["t"]
    if (TAIL_START + last) < DUR - 3.0 - GAP_TOL:
        return 0.0   # scan window never reached the end of the file
    start = None
    for f in reversed(frames):
        if dead(f):
            start = f["t"]
        else:
            break
    if start is None or (last - start) < MIN_RUN:
        return 0.0
    return min(DUR - (TAIL_START + start), MAX_TRIM)

print("%.1f %.1f" % (head_trim(head), tail_trim(tail)))
' "$MAX_TRIM" "$DUR" "$TAIL_START")"
read -r HEAD_TRIM TAIL_TRIM <<<"$TRIMS"
KEEP="$(awk -v d="$DUR" -v h="$HEAD_TRIM" -v t="$TAIL_TRIM" \
    'BEGIN{printf "%.3f", d-h-t}')"
say "dead-air: head=${HEAD_TRIM}s tail=${TAIL_TRIM}s (keep ${KEEP}s of ${DUR}s; cap ${MAX_TRIM}s/end)"

# ------------------------------------------------------ loudnorm pass one ----
say "loudnorm pass 1 (measuring trimmed range)…"
LN_JSON="$(ffmpeg -hide_banner -nostats -ss "$HEAD_TRIM" -t "$KEEP" -i "$INPUT" \
    -af "loudnorm=I=$TARGET_I:TP=$TARGET_TP:LRA=$TARGET_LRA:print_format=json" \
    -vn -f null - 2>&1 | python3 -c '
import sys, json, re
text = sys.stdin.read()
start = text.rfind("{")
# loudnorm prints the JSON block last; find the matching opening brace
m = re.search(r"\{[^{}]*\"input_i\".*?\}", text, re.S)
print(json.dumps(json.loads(m.group(0))) if m else "{}")')"
IN_I="$(echo "$LN_JSON" | jq -r '.input_i // "n/a"')"
IN_TP="$(echo "$LN_JSON" | jq -r '.input_tp // "n/a"')"
IN_LRA="$(echo "$LN_JSON" | jq -r '.input_lra // "n/a"')"
IN_TH="$(echo "$LN_JSON" | jq -r '.input_thresh // "n/a"')"
OFFSET="$(echo "$LN_JSON" | jq -r '.target_offset // "0"')"
if [[ "$IN_I" == "n/a" ]]; then
    say "ERROR: loudnorm measurement failed (no audio stream?) — see $LOG"
    exit 1
fi
say "loudness measured: I=${IN_I} LUFS, TP=${IN_TP} dBTP, LRA=${IN_LRA} LU"

# ------------------------------------------------------------- analysis ----
python3 - "$ANALYSIS" <<EOF
import json, sys, datetime
json.dump({
    "input": "$INPUT",
    "analyzed_at": datetime.datetime.now().astimezone().isoformat(timespec="seconds"),
    "duration_s": float("$DUR"),
    "idet": {"tff": $TFF, "bff": $BFF, "progressive": $PROG,
             "undetermined": $UNDET, "interlaced": "$INTERLACED" == "yes"},
    "trim": {"head_s": float("$HEAD_TRIM"), "tail_s": float("$TAIL_TRIM"),
             "keep_s": float("$KEEP"), "cap_per_end_s": $MAX_TRIM},
    "loudness_input": $LN_JSON,
    "targets": {"I": $TARGET_I, "TP": $TARGET_TP, "LRA": $TARGET_LRA,
                "crf": $CRF},
}, open(sys.argv[1], "w"), indent=2)
EOF
say "analysis written: $ANALYSIS"

if [[ "$MODE" == "analyze" ]]; then
    cat <<EOF

================ ANALYSIS ONLY — NOTHING PROCESSED ================
  File        : $INPUT
  Duration    : ${DUR}s
  Interlace   : $INTERLACED  (TFF=$TFF BFF=$BFF Prog=$PROG Undet=$UNDET)
                $( [[ $INTERLACED == yes ]] && echo "-> will deinterlace with bwdif=mode=1 (~59.94p)" || echo "-> progressive, no deinterlace" )
  Trim        : head ${HEAD_TRIM}s, tail ${TAIL_TRIM}s (head/tail only, cap ${MAX_TRIM}s/end)
  Loudness    : I=${IN_I} LUFS  TP=${IN_TP} dBTP  LRA=${IN_LRA} LU
                -> two-pass loudnorm to ${TARGET_I} LUFS
  Output would be: $OUT_FILE
Review the numbers above; if they look right, re-run with --process.
===================================================================
EOF
    exit 0
fi

# -------------------------------------------------------------- process ----
VF=""
[[ "$INTERLACED" == "yes" ]] && VF="-vf bwdif=mode=1"
AF="loudnorm=I=$TARGET_I:TP=$TARGET_TP:LRA=$TARGET_LRA"
AF+=":measured_I=$IN_I:measured_TP=$IN_TP:measured_LRA=$IN_LRA"
AF+=":measured_thresh=$IN_TH:offset=$OFFSET:linear=true"

say "encoding -> $OUT_FILE"
# shellcheck disable=SC2086  # $VF is intentionally word-split
ffmpeg -hide_banner -nostats -y -ss "$HEAD_TRIM" -t "$KEEP" -i "$INPUT" \
    $VF -af "$AF" \
    -c:v libx264 -profile:v high -crf "$CRF" -preset slow -pix_fmt yuv420p \
    -c:a aac -b:a 192k -movflags +faststart \
    "${OUT_FILE}.part.mp4" >>"$LOG" 2>&1
mv "${OUT_FILE}.part.mp4" "$OUT_FILE"

# ------------------------------------------------------------------- QC ----
say "QC pass (flags only, never fails the file)…"
OUT_DUR="$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$OUT_FILE")"
QC_RAW="$(ffmpeg -hide_banner -nostats -i "$OUT_FILE" \
    -vf "blackdetect=d=5:pix_th=0.10,freezedetect=n=0.003:d=5" \
    -an -f null - 2>&1 || true)"
BLACKS="$(echo "$QC_RAW" | grep -c "black_start" || true)"
FREEZES="$(echo "$QC_RAW" | grep -c "freeze_start" || true)"
FLAGS=""   # plain string: macOS /bin/bash 3.2 + set -u dislike empty arrays
[[ "$BLACKS"  -gt 0 ]] && FLAGS+="mid-black x$BLACKS; "
[[ "$FREEZES" -gt 0 ]] && FLAGS+="freeze x$FREEZES; "
DRIFT="$(awk -v o="$OUT_DUR" -v k="$KEEP" \
    'BEGIN{d=o-k; if (d<0) d=-d; print (d>2)?1:0}')"
[[ "$DRIFT" == "1" ]] && FLAGS+="runtime-anomaly out=${OUT_DUR}s expected=${KEEP}s; "
[[ "$INTERLACED" == "yes" ]] && FLAGS+="was-interlaced; "
FLAGS="${FLAGS%; }"
QC_LINE="$BASE: ${FLAGS:-clean} | idet TFF=$TFF BFF=$BFF P=$PROG | trim ${HEAD_TRIM}/${TAIL_TRIM}s | in_I=${IN_I}LUFS"
echo "$QC_LINE" >> "$QC_FILE"
say "QC: $QC_LINE"

# ------------------------------------------------------------- manifest ----
python3 - "$MANIFEST" <<EOF
import json, sys, datetime, fcntl
entry = {
    "ts": datetime.datetime.now().astimezone().isoformat(timespec="seconds"),
    "event": "tape-processed",
    "input": "$INPUT",
    "output": "$OUT_FILE",
    "analysis": "$ANALYSIS",
    "interlaced": "$INTERLACED" == "yes",
    "trim_head_s": float("$HEAD_TRIM"), "trim_tail_s": float("$TAIL_TRIM"),
    "input_loudness_lufs": "$IN_I",
    "output_duration_s": float("$OUT_DUR"),
    "qc": "${FLAGS:-clean}",
}
with open(sys.argv[1], "a") as fh:
    fcntl.flock(fh, fcntl.LOCK_EX)
    fh.write(json.dumps(entry) + "\n")
EOF
say "done: $OUT_FILE"
