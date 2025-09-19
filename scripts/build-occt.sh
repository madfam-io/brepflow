#!/bin/bash

# BrepFlow OCCT.wasm Build Script
# Compiles Open CASCADE Technology to WebAssembly with Emscripten
# Requirements: Emscripten SDK installed and activated

set -e

# Configuration
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_ROOT="$( cd "$SCRIPT_DIR/.." && pwd )"
THIRD_PARTY_DIR="$PROJECT_ROOT/third_party"
BUILD_DIR="$PROJECT_ROOT/build-occt"
OUTPUT_DIR="$PROJECT_ROOT/packages/engine-occt/wasm"
BINDINGS_DIR="$PROJECT_ROOT/packages/engine-occt/src"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}BrepFlow OCCT.wasm Build Script${NC}"
echo "==============================="

# Check for Emscripten or activate it
if ! command -v emcc &> /dev/null; then
    echo -e "${YELLOW}Emscripten not found in PATH, attempting to activate from third_party...${NC}"
    if [ -f "$THIRD_PARTY_DIR/emsdk/emsdk_env.sh" ]; then
        source "$THIRD_PARTY_DIR/emsdk/emsdk_env.sh"
        echo -e "${GREEN}✓ Emscripten activated from third_party${NC}"
    else
        echo -e "${RED}Error: Emscripten not found!${NC}"
        echo "Please install Emscripten SDK first"
        exit 1
    fi
fi

echo -e "${GREEN}✓ Emscripten found:${NC} $(emcc --version | head -n1)"

# Check/Download OCCT
OCCT_VERSION="7.8.0"
OCCT_DIR="$THIRD_PARTY_DIR/occt"

if [ ! -d "$OCCT_DIR" ]; then
    echo -e "${RED}Error: OCCT source not found at $OCCT_DIR${NC}"
    echo "OCCT source should already be downloaded. Please check third_party/occt"
    exit 1
fi

echo -e "${GREEN}✓ OCCT source found at:${NC} $OCCT_DIR"

# Create build directory
mkdir -p "$BUILD_DIR"
cd "$BUILD_DIR"

# First, build OCCT as static libraries
echo -e "${YELLOW}Configuring OCCT with CMake for Emscripten...${NC}"

emcmake cmake "$OCCT_DIR" \
    -DCMAKE_BUILD_TYPE=Release \
    -DBUILD_LIBRARY_TYPE=Static \
    -DBUILD_MODULE_ApplicationFramework=OFF \
    -DBUILD_MODULE_DataExchange=ON \
    -DBUILD_MODULE_Draw=OFF \
    -DBUILD_MODULE_FoundationClasses=ON \
    -DBUILD_MODULE_ModelingAlgorithms=ON \
    -DBUILD_MODULE_ModelingData=ON \
    -DBUILD_MODULE_Visualization=OFF \
    -DUSE_FREETYPE=OFF \
    -DUSE_TCL=OFF \
    -DUSE_TK=OFF \
    -DUSE_VTK=OFF \
    -DUSE_FREEIMAGE=OFF \
    -DUSE_RAPIDJSON=OFF \
    -DUSE_TBB=OFF \
    -DUSE_OPENGL=OFF \
    -DUSE_GLES2=OFF \
    -DCMAKE_CXX_FLAGS="-O3 -fPIC -pthread -s USE_PTHREADS=1 -matomics -mbulk-memory" \
    -DCMAKE_C_FLAGS="-O3 -fPIC -pthread -s USE_PTHREADS=1 -matomics -mbulk-memory" \
    || { echo -e "${RED}CMake configuration failed${NC}"; exit 1; }

# Build OCCT libraries
echo -e "${YELLOW}Building OCCT libraries (this may take a while)...${NC}"
emmake make -j$(nproc) || emmake make -j1 || { echo -e "${RED}Build failed${NC}"; exit 1; }

echo -e "${GREEN}✓ OCCT libraries built successfully${NC}"

# Create output directory
mkdir -p "$OUTPUT_DIR"

# Now compile our bindings with OCCT libraries
echo -e "${YELLOW}Compiling BrepFlow OCCT bindings to WASM...${NC}"

OCCT_LIBS=""
for lib in TKernel TKMath TKG2d TKG3d TKGeomBase TKBRep TKGeomAlgo TKTopAlgo TKPrim TKMesh TKBO TKFillet TKOffset TKShHealing TKXSBase TKDESTEP TKDEIGES; do
    if [ -f "$BUILD_DIR/lin32/clang/lib/lib${lib}.a" ]; then
        OCCT_LIBS="$OCCT_LIBS $BUILD_DIR/lin32/clang/lib/lib${lib}.a"
    elif [ -f "$BUILD_DIR/lib/lib${lib}.a" ]; then
        OCCT_LIBS="$OCCT_LIBS $BUILD_DIR/lib/lib${lib}.a"
    fi
done

em++ "$BINDINGS_DIR/occt-bindings.cpp" \
    -I"$BUILD_DIR/include/opencascade" \
    $OCCT_LIBS \
    -o "$OUTPUT_DIR/occt.js" \
    -s WASM=1 \
    -s USE_PTHREADS=1 \
    -s PTHREAD_POOL_SIZE=4 \
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
    -lembind \
    -O3 \
    --bind \
    || { echo -e "${RED}Failed to compile bindings${NC}"; exit 1; }

echo -e "${GREEN}✅ OCCT.wasm build complete!${NC}"
echo "Output files:"
ls -lh "$OUTPUT_DIR/"

echo -e "${GREEN}✅ Build process complete!${NC}"
echo ""
echo "Next steps:"
echo "1. Update packages/engine-occt/src/occt-bindings.ts to use the real WASM module"
echo "2. Test the integration with: pnpm run dev"
echo "3. Verify geometry operations work in the browser"