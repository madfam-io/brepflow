#!/bin/bash

# BrepFlow Core OCCT Bindings Compilation Script
# Compiles core geometry operations without complex dependencies

set -e

# Configuration
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_ROOT="$( cd "$SCRIPT_DIR/.." && pwd )"
BUILD_DIR="$PROJECT_ROOT/build-occt"
OUTPUT_DIR="$PROJECT_ROOT/packages/engine-occt/wasm"
BINDINGS_DIR="$PROJECT_ROOT/packages/engine-occt/src"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}BrepFlow Core OCCT Bindings Compilation${NC}"
echo "============================================"

# Activate Emscripten if needed
if ! command -v emcc &> /dev/null; then
    echo -e "${YELLOW}Activating Emscripten...${NC}"
    source "$PROJECT_ROOT/third_party/emsdk/emsdk_env.sh"
fi

# Create output directory
mkdir -p "$OUTPUT_DIR"

# Collect core OCCT libraries (minimal set for basic operations)
echo -e "${YELLOW}Collecting core OCCT libraries...${NC}"
CORE_LIBS=(
    "TKernel"
    "TKMath"
    "TKG2d"
    "TKG3d"
    "TKGeomBase"
    "TKBRep"
    "TKGeomAlgo"
    "TKTopAlgo"
    "TKPrim"
    "TKShHealing"
    "TKMesh"
    "TKBO"
)

OCCT_LIBS=""
for lib in "${CORE_LIBS[@]}"; do
    LIB_PATH="$BUILD_DIR/lin32/clang/lib/lib${lib}.a"
    if [ -f "$LIB_PATH" ]; then
        OCCT_LIBS="$OCCT_LIBS $LIB_PATH"
        echo "  Found: lib${lib}.a"
    else
        echo -e "${YELLOW}  Warning: lib${lib}.a not found${NC}"
    fi
done

echo -e "${YELLOW}Compiling core OCCT bindings to WASM...${NC}"

# Compile with core libraries only
EMSDK_QUIET=1 em++ "$BINDINGS_DIR/occt-core.cpp" \
    -I"$BUILD_DIR/include/opencascade" \
    $OCCT_LIBS \
    -o "$OUTPUT_DIR/occt-core.js" \
    -s WASM=1 \
    -s ALLOW_MEMORY_GROWTH=1 \
    -s MAXIMUM_MEMORY=1GB \
    -s EXPORT_ES6=1 \
    -s MODULARIZE=1 \
    -s EXPORT_NAME='createOCCTCoreModule' \
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
    || { echo -e "${RED}Failed to compile core OCCT bindings${NC}"; exit 1; }

echo -e "${GREEN}✅ Core OCCT bindings compiled successfully!${NC}"
echo "Output files:"
ls -lh "$OUTPUT_DIR/"

echo ""
echo -e "${GREEN}Features available:${NC}"
echo "✅ Basic primitives (box, sphere, cylinder, cone, torus)"
echo "✅ Boolean operations (union, subtract, intersect)"
echo "✅ Real tessellation and mesh generation"
echo "✅ Memory management and shape tracking"

echo ""
echo -e "${GREEN}Next steps:${NC}"
echo "1. Update TypeScript bindings to use the core WASM module"
echo "2. Test all geometry operations in browser"
echo "3. Add advanced features incrementally"