# tape-pipeline

Non-destructive post-processing for ClearClick tape captures (MP4).
Originals are never modified: cleaned copies + sidecars go to a separate
output directory (the script refuses to write into the input's directory).

## Single-file processor — `process_tape.sh`

```sh
# 1. Analyze only (DEFAULT — prints idet verdict, proposed trim points,
#    measured loudness, then stops; nothing is processed):
./process_tape.sh /path/to/tape01.mp4

# 2. After the numbers are approved, process:
./process_tape.sh --process /path/to/tape01.mp4
```

That analyze-first default is the validation checkpoint: run it on ONE real
sample tape, review the output, and only then `--process`.

Per file:

1. **Interlace**: `idet` over three 30s windows (start/middle/end);
   majority vote among determined frames → `bwdif=mode=1` (field-rate,
   ~59.94p) if interlaced; progressive input is left alone.
   `--force-deinterlace` / `--no-deinterlace` override the verdict after
   you review the analysis.
2. **Dead-air trim, head and tail ONLY** (never mid-file, capped at 90s per
   end, runs <2s ignored): per-frame `signalstats` — a frame is dead if its
   luma spread is flat (<48: catches black **and** ClearClick blue) or its
   temporal noise is extreme (YDIF >25: catches snow). The trim is the
   contiguous dead run anchored at the very start/end.
3. **Loudness**: two-pass `loudnorm`, target −16 LUFS / −1.5 dBTP / LRA 11,
   pass 1 measured on the trimmed range, pass 2 `linear=true`.
4. **Encode**: H.264 High profile, CRF 18 (`--crf` to override), preset slow,
   `+faststart`, AAC 192k. Written via a `.part.mp4` rename so interrupted
   runs never leave a plausible-looking output.
5. **QC flags (never fail the file)**: long (≥5s) mid-file black,
   freezedetect hits, idet verdict, runtime anomaly (>2s drift from
   expected) — one line per file appended to `qc_flags.txt`.
6. **Manifest**: JSONL entry (`tape-processed`) with trims, loudness, QC.

Output layout (`TAPE_OUTPUT_ROOT`, default `./tape-output`), date-foldered:

```
$TAPE_OUTPUT_ROOT/YYYY-MM-DD/<name>_clean.mp4
                             <name>.analysis.json
                             <name>.process.log
                             qc_flags.txt
                             manifest.jsonl
```

> CLAUDE.md wasn't readable when this was built — if its date-folder
> convention differs from `YYYY-MM-DD`, pass `--out-dir` or adjust here.

Idempotent: re-running skips files whose `_clean.mp4` already exists.

## Whisper pairing

```sh
./setup_whisper.sh            # once, on the Mac: clone + Metal build + large-v3-turbo
./transcribe_tape.sh out/2026-06-12/tape01_clean.mp4
```

`transcribe_tape.sh` extracts a temp 16kHz mono WAV, runs whisper.cpp
locally, writes `.srt` + `.txt` next to the cleaned video, appends a
`tape-transcribed` manifest entry, and skips files already transcribed.

## Validation status

Validated in CI-like conditions on a synthetic 60s tape (12s blue lead-in +
40s interlaced TFF content with −44 LUFS audio + 8s black tail): idet said
interlaced, proposed trims were exactly 12.0s/8.0s, output came out
progressive 59.94p High-profile, 40.1s, and re-measured at **−16.05 LUFS**.
Original file checksum unchanged; re-run skipped idempotently.

NOT yet validated: a real ClearClick capture (do the `--analyze` checkpoint
on one sample first), and the whisper build (needs the Mac's Metal GPU).

**No batch wrapper exists yet — by design.** Per the checkpoint, it gets
built only after the single-file validation on a real tape is approved.
