#!/bin/bash
# setup_whisper.sh — clone/build whisper.cpp with Metal and fetch the
# large-v3-turbo model. Idempotent: skips anything already present.
# macOS only (Metal). Run on the Mac Studio, not in a container.
set -euo pipefail

if [[ "$(uname -s)" != "Darwin" ]]; then
    echo "Metal build requires macOS (this is $(uname -s))." >&2
    exit 1
fi

WHISPER_DIR="${WHISPER_DIR:-$HOME/src/whisper.cpp}"
MODEL="large-v3-turbo"

if [[ ! -d "$WHISPER_DIR/.git" ]]; then
    mkdir -p "$(dirname "$WHISPER_DIR")"
    git clone https://github.com/ggml-org/whisper.cpp "$WHISPER_DIR"
fi

cd "$WHISPER_DIR"
if [[ ! -x build/bin/whisper-cli ]]; then
    # GGML_METAL defaults ON for macOS builds; stated explicitly anyway.
    cmake -B build -DGGML_METAL=ON -DCMAKE_BUILD_TYPE=Release
    cmake --build build -j --config Release
fi

if [[ ! -f "models/ggml-$MODEL.bin" ]]; then
    ./models/download-ggml-model.sh "$MODEL"
fi

echo "whisper.cpp ready:"
echo "  binary: $WHISPER_DIR/build/bin/whisper-cli"
echo "  model : $WHISPER_DIR/models/ggml-$MODEL.bin"
echo "Sanity check (Metal init lines should mention your GPU):"
echo "  $WHISPER_DIR/build/bin/whisper-cli -m $WHISPER_DIR/models/ggml-$MODEL.bin -f $WHISPER_DIR/samples/jfk.wav"
