#!/bin/bash

# BrepFlow OCCT Production Build Script
# Optimized WebAssembly module generation

set -e

echo -e "\033[0;32mBrepFlow OCCT Production WebAssembly Build\033[0m"
echo "============================================"

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
OCCT_BUILD_DIR="$(dirname "$(dirname "$PACKAGE_DIR")")/build-occt"

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

# Configure with CMake - Production optimizations
echo -e "\033[1;33mConfiguring production build with CMake...\033[0m"
cd "$BUILD_DIR"

# Production flags for optimization
export EMCC_CFLAGS="-O3 -flto"

cmake "$CPP_DIR" \
    -DCMAKE_BUILD_TYPE=Release \
    -DCMAKE_TOOLCHAIN_FILE="$EMSDK/upstream/emscripten/cmake/Modules/Platform/Emscripten.cmake" \
    -DCMAKE_CROSSCOMPILING_EMULATOR="$EMSDK_NODE" \
    -DCMAKE_CXX_FLAGS="-O3 -flto -DNDEBUG" \
    -DCMAKE_EXE_LINKER_FLAGS="-O3 --closure 1 -flto"

# Build the bindings
echo -e "\033[1;33mBuilding optimized OCCT WebAssembly module...\033[0m"
make -j$(nproc 2>/dev/null || sysctl -n hw.ncpu 2>/dev/null || echo 4)

# Check if build succeeded
if [ ! -f "$WASM_DIR/occt.js" ] || [ ! -f "$WASM_DIR/occt.wasm" ]; then
    echo -e "\033[0;31mError: Build failed - output files not found\033[0m"
    exit 1
fi

# Run wasm-opt for additional optimization
if command -v wasm-opt &> /dev/null; then
    echo -e "\033[1;33mOptimizing WebAssembly module with wasm-opt...\033[0m"
    ORIGINAL_SIZE=$(ls -l "$WASM_DIR/occt.wasm" | awk '{print $5}')

    wasm-opt -O3 \
        --enable-simd \
        --enable-threads \
        --strip-debug \
        --strip-producers \
        "$WASM_DIR/occt.wasm" \
        -o "$WASM_DIR/occt.optimized.wasm"

    if [ -f "$WASM_DIR/occt.optimized.wasm" ]; then
        mv "$WASM_DIR/occt.optimized.wasm" "$WASM_DIR/occt.wasm"
        OPTIMIZED_SIZE=$(ls -l "$WASM_DIR/occt.wasm" | awk '{print $5}')
        REDUCTION=$((100 - (OPTIMIZED_SIZE * 100 / ORIGINAL_SIZE)))
        echo -e "\033[0;32m✓ Size reduced by ${REDUCTION}%\033[0m"
    fi
else
    echo -e "\033[1;33mNote: wasm-opt not found. Install for additional optimizations.\033[0m"
fi

# Display file sizes
echo -e "\033[0;32m✓ Production build completed successfully!\033[0m"
echo
echo "Generated files:"
echo "  $(ls -lh "$WASM_DIR/occt.js" | awk '{print $5 " " $9}')"
echo "  $(ls -lh "$WASM_DIR/occt.wasm" | awk '{print $5 " " $9}')"

# Show total size
TOTAL_SIZE=$(du -ch "$WASM_DIR/occt.js" "$WASM_DIR/occt.wasm" | grep total | cut -f1)
echo "  Total size: $TOTAL_SIZE"

# Generate build report
REPORT_FILE="$PACKAGE_DIR/build-report.md"
echo "# WebAssembly Build Report" > "$REPORT_FILE"
echo "" >> "$REPORT_FILE"
echo "## Build Information" >> "$REPORT_FILE"
echo "- **Date**: $(date)" >> "$REPORT_FILE"
echo "- **Build Type**: Production (Optimized)" >> "$REPORT_FILE"
echo "- **Emscripten Version**: $(emcc --version | head -1)" >> "$REPORT_FILE"
echo "" >> "$REPORT_FILE"
echo "## Optimization Flags" >> "$REPORT_FILE"
echo "- Compiler: \`-O3 -flto -DNDEBUG\`" >> "$REPORT_FILE"
echo "- Linker: \`-O3 --closure 1 -flto\`" >> "$REPORT_FILE"
echo "- wasm-opt: \`-O3 --enable-simd --enable-threads --strip-debug\`" >> "$REPORT_FILE"
echo "" >> "$REPORT_FILE"
echo "## Output Files" >> "$REPORT_FILE"
echo "| File | Size |" >> "$REPORT_FILE"
echo "|------|------|" >> "$REPORT_FILE"
echo "| occt.js | $(ls -lh "$WASM_DIR/occt.js" | awk '{print $5}') |" >> "$REPORT_FILE"
echo "| occt.wasm | $(ls -lh "$WASM_DIR/occt.wasm" | awk '{print $5}') |" >> "$REPORT_FILE"
echo "| **Total** | **$TOTAL_SIZE** |" >> "$REPORT_FILE"
echo "" >> "$REPORT_FILE"
echo "## API Functions" >> "$REPORT_FILE"
echo "- \`makeBox(dx, dy, dz)\` - Create box primitive" >> "$REPORT_FILE"
echo "- \`makeSphere(radius)\` - Create sphere primitive" >> "$REPORT_FILE"
echo "- \`makeCylinder(radius, height)\` - Create cylinder primitive" >> "$REPORT_FILE"
echo "- \`booleanUnion(shape1, shape2)\` - Boolean union operation" >> "$REPORT_FILE"
echo "- \`booleanSubtract(shape1, shape2)\` - Boolean subtract operation" >> "$REPORT_FILE"
echo "- \`booleanIntersect(shape1, shape2)\` - Boolean intersect operation" >> "$REPORT_FILE"
echo "- \`tessellate(shape, precision, angle)\` - Generate mesh for rendering" >> "$REPORT_FILE"
echo "- \`makeFillet(shape, radius)\` - Apply fillet to edges" >> "$REPORT_FILE"
echo "- \`makeChamfer(shape, distance)\` - Apply chamfer to edges" >> "$REPORT_FILE"

echo
echo -e "\033[0;32mBuild report generated: $REPORT_FILE\033[0m"
echo
echo -e "\033[0;32mProduction WebAssembly module is ready for deployment!\033[0m"