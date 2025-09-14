#!/bin/bash

# BrepFlow OCCT C++ Bindings Build Script
# Compiles C++ wrapper functions with OCCT libraries

set -e

echo -e "\033[0;32mBrepFlow OCCT C++ Bindings Build\033[0m"
echo "===================================="

# Check if Emscripten is available
if ! command -v emcc &> /dev/null; then
    echo -e "\033[0;31mError: Emscripten not found. Please install and source emsdk_env.sh\033[0m"
    exit 1
fi

echo -e "\033[0;32m✓ Emscripten found:\033[0m $(emcc --version | head -1)"

# Set directories
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PACKAGE_DIR="$(dirname "$SCRIPT_DIR")"
CPP_DIR="$PACKAGE_DIR/cpp"
BUILD_DIR="$PACKAGE_DIR/build-bindings"
WASM_DIR="$PACKAGE_DIR/wasm"
OCCT_BUILD_DIR="$(dirname "$(dirname "$(dirname "$PACKAGE_DIR")")")/build-occt"

echo "Package dir: $PACKAGE_DIR"
echo "C++ source dir: $CPP_DIR"
echo "Build dir: $BUILD_DIR"
echo "WASM output dir: $WASM_DIR"
echo "OCCT build dir: $OCCT_BUILD_DIR"

# Check if OCCT build exists
if [ ! -d "$OCCT_BUILD_DIR" ]; then
    echo -e "\033[0;31mError: OCCT build directory not found at $OCCT_BUILD_DIR\033[0m"
    echo "Please run the OCCT build first: bash scripts/build-occt.sh"
    exit 1
fi

if [ ! -d "$OCCT_BUILD_DIR/lin32/clang/lib" ]; then
    echo -e "\033[0;31mError: OCCT libraries not found\033[0m"
    echo "Please ensure OCCT build completed successfully"
    exit 1
fi

echo -e "\033[0;32m✓ OCCT build found at:\033[0m $OCCT_BUILD_DIR"

# Create build directory
mkdir -p "$BUILD_DIR"
mkdir -p "$WASM_DIR"

# Configure with CMake
echo -e "\033[1;33mConfiguring C++ bindings with CMake...\033[0m"
cd "$BUILD_DIR"

cmake "$CPP_DIR" \
    -DCMAKE_BUILD_TYPE=Release \
    -DCMAKE_TOOLCHAIN_FILE="$EMSDK/upstream/emscripten/cmake/Modules/Platform/Emscripten.cmake" \
    -DCMAKE_CROSSCOMPILING_EMULATOR="$EMSDK_NODE"

# Build the bindings
echo -e "\033[1;33mBuilding OCCT C++ bindings (this may take a while)...\033[0m"
make -j$(nproc 2>/dev/null || sysctl -n hw.ncpu 2>/dev/null || echo 4)

# Check if build succeeded
if [ ! -f "$WASM_DIR/occt.js" ] || [ ! -f "$WASM_DIR/occt.wasm" ]; then
    echo -e "\033[0;31mError: Build failed - output files not found\033[0m"
    exit 1
fi

# Display file sizes
echo -e "\033[0;32m✓ Build completed successfully!\033[0m"
echo
echo "Generated files:"
echo "  $(ls -lh "$WASM_DIR/occt.js" | awk '{print $5 " " $9}')"
echo "  $(ls -lh "$WASM_DIR/occt.wasm" | awk '{print $5 " " $9}')"

# Show total size
TOTAL_SIZE=$(du -ch "$WASM_DIR/occt.js" "$WASM_DIR/occt.wasm" | grep total | cut -f1)
echo "  Total size: $TOTAL_SIZE"

echo
echo -e "\033[0;32mOCCT C++ bindings are ready!\033[0m"
echo -e "\033[0;32mThe bindings provide real OCCT geometry operations.\033[0m"
