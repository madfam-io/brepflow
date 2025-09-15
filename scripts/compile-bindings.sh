#!/bin/bash

# BrepFlow OCCT Bindings Compilation Script
# Compiles the C++ bindings with OCCT libraries to create the final WASM module

set -e

# Configuration
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_ROOT="$( cd "$SCRIPT_DIR/.." && pwd )"
THIRD_PARTY_DIR="$PROJECT_ROOT/third_party"
BUILD_DIR="$PROJECT_ROOT/build-occt"
OUTPUT_DIR="$PROJECT_ROOT/packages/engine-occt/wasm"
BINDINGS_DIR="$PROJECT_ROOT/packages/engine-occt/src"
OCCT_DIR="$THIRD_PARTY_DIR/occt"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}BrepFlow OCCT Bindings Compilation${NC}"
echo "===================================="

# Activate Emscripten if needed
if ! command -v emcc &> /dev/null; then
    echo -e "${YELLOW}Activating Emscripten...${NC}"
    source "$THIRD_PARTY_DIR/emsdk/emsdk_env.sh"
fi

# Create output directory
mkdir -p "$OUTPUT_DIR"

# Collect OCCT libraries
echo -e "${YELLOW}Collecting OCCT libraries...${NC}"
OCCT_LIBS=""
for lib in TKernel TKMath TKG2d TKG3d TKGeomBase TKBRep TKGeomAlgo TKTopAlgo TKPrim TKMesh TKBO TKFillet TKOffset TKDESTEP TKDEIGES TKXSBase TKShHealing; do
    LIB_PATH="$BUILD_DIR/lin32/clang/lib/lib${lib}.a"
    if [ -f "$LIB_PATH" ]; then
        OCCT_LIBS="$OCCT_LIBS $LIB_PATH"
        echo "  Found: lib${lib}.a"
    else
        echo -e "${YELLOW}  Warning: lib${lib}.a not found${NC}"
    fi
done

echo -e "${YELLOW}Compiling bindings to WASM (WITHOUT pthreads for compatibility)...${NC}"

# Compile without pthread support to match OCCT build
em++ "$BINDINGS_DIR/occt-bindings.cpp" \
    -I"$BUILD_DIR/inc" \
    -I"$OCCT_DIR/src/Standard" \
    -I"$OCCT_DIR/src/BRepPrimAPI" \
    -I"$OCCT_DIR/src/BRepPrim" \
    -I"$OCCT_DIR/src/BRepAlgoAPI" \
    -I"$OCCT_DIR/src/BRepFilletAPI" \
    -I"$OCCT_DIR/src/BRepMesh" \
    -I"$OCCT_DIR/src/BRep" \
    -I"$OCCT_DIR/src/TopExp" \
    -I"$OCCT_DIR/src/TopoDS" \
    -I"$OCCT_DIR/src/Poly" \
    -I"$OCCT_DIR/src/TColgp" \
    -I"$OCCT_DIR/src/STEPControl" \
    -I"$OCCT_DIR/src/IGESControl" \
    -I"$OCCT_DIR/src/Bnd" \
    -I"$OCCT_DIR/src/BRepBndLib" \
    -I"$OCCT_DIR/src/gp" \
    -I"$OCCT_DIR/src/TopLoc" \
    -I"$OCCT_DIR/src/Geom" \
    -I"$OCCT_DIR/src/GeomAbs" \
    -I"$OCCT_DIR/src/TColStd" \
    -I"$OCCT_DIR/src/TopAbs" \
    -I"$OCCT_DIR/src/Message" \
    -I"$OCCT_DIR/src/NCollection" \
    $OCCT_LIBS \
    -o "$OUTPUT_DIR/occt.js" \
    -s WASM=1 \
    -s ALLOW_MEMORY_GROWTH=1 \
    -s MAXIMUM_MEMORY=2GB \
    -s EXPORT_ES6=1 \
    -s MODULARIZE=1 \
    -s EXPORT_NAME='createOCCTModule' \
    -s ENVIRONMENT='web,worker' \
    -s FILESYSTEM=0 \
    -s ASSERTIONS=1 \
    -s SAFE_HEAP=0 \
    -s STACK_OVERFLOW_CHECK=1 \
    -s ERROR_ON_UNDEFINED_SYMBOLS=0 \
    -s NO_DISABLE_EXCEPTION_CATCHING \
    -s SINGLE_FILE=0 \
    -lembind \
    -O2 \
    --bind \
    || { echo -e "${RED}Failed to compile bindings${NC}"; exit 1; }

echo -e "${GREEN}✅ OCCT bindings compiled successfully!${NC}"
echo "Output files:"
ls -lh "$OUTPUT_DIR/"

echo ""
echo -e "${GREEN}Next steps:${NC}"
echo "1. Update packages/engine-occt/src/occt-bindings.ts to load the real WASM"
echo "2. Configure Vite to serve with proper COOP/COEP headers"
echo "3. Test with: pnpm run dev"