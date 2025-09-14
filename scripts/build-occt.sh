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

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}BrepFlow OCCT.wasm Build Script${NC}"
echo "==============================="

# Check for Emscripten
if ! command -v emcc &> /dev/null; then
    echo -e "${RED}Error: Emscripten not found!${NC}"
    echo "Please install and activate Emscripten SDK:"
    echo "  git clone https://github.com/emscripten-core/emsdk.git"
    echo "  cd emsdk && ./emsdk install latest && ./emsdk activate latest"
    echo "  source ./emsdk_env.sh"
    exit 1
fi

echo -e "${GREEN}✓ Emscripten found:${NC} $(emcc --version | head -n1)"

# Check/Download OCCT
OCCT_VERSION="7.7.0"
OCCT_DIR="$THIRD_PARTY_DIR/occt"

if [ ! -d "$OCCT_DIR" ]; then
    echo -e "${YELLOW}Downloading Open CASCADE Technology v${OCCT_VERSION}...${NC}"
    mkdir -p "$THIRD_PARTY_DIR"
    cd "$THIRD_PARTY_DIR"

    # Download OCCT (adjust URL as needed for actual source)
    echo "TODO: Add actual OCCT download URL and extraction"
    # wget https://github.com/Open-Cascade-SAS/OCCT/archive/refs/tags/V${OCCT_VERSION}.tar.gz
    # tar -xzf V${OCCT_VERSION}.tar.gz
    # mv OCCT-${OCCT_VERSION} occt

    echo -e "${RED}Note: OCCT download not implemented yet${NC}"
    echo "Please manually download OCCT ${OCCT_VERSION} to $OCCT_DIR"
    exit 1
fi

echo -e "${GREEN}✓ OCCT source found at:${NC} $OCCT_DIR"

# Create build directory
mkdir -p "$BUILD_DIR"
cd "$BUILD_DIR"

# Configure with CMake for Emscripten
echo -e "${YELLOW}Configuring OCCT with CMake...${NC}"

emcmake cmake "$OCCT_DIR" \
    -DCMAKE_BUILD_TYPE=Release \
    -DBUILD_SHARED_LIBS=OFF \
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
    -DCMAKE_CXX_FLAGS="-s WASM=1 -s USE_PTHREADS=1 -s ALLOW_MEMORY_GROWTH=1 -s MAXIMUM_MEMORY=2GB -s EXPORT_ES6=1 -s MODULARIZE=1 -s EXPORT_NAME='createOCCTModule' -O3" \
    -DCMAKE_EXE_LINKER_FLAGS="-s WASM=1 -s USE_PTHREADS=1 -s ALLOW_MEMORY_GROWTH=1" \
    || { echo -e "${RED}CMake configuration failed${NC}"; exit 1; }

# Build
echo -e "${YELLOW}Building OCCT.wasm (this may take a while)...${NC}"
emmake make -j$(nproc) || { echo -e "${RED}Build failed${NC}"; exit 1; }

# Create output directory
mkdir -p "$OUTPUT_DIR"

# Copy built files
echo -e "${YELLOW}Copying WASM output files...${NC}"
# TODO: Identify and copy actual WASM output files
# cp "$BUILD_DIR/..."/*.wasm "$OUTPUT_DIR/"
# cp "$BUILD_DIR/..."/*.js "$OUTPUT_DIR/"

echo -e "${GREEN}✅ OCCT.wasm build complete!${NC}"
echo "Output directory: $OUTPUT_DIR"

# Create TypeScript bindings scaffold
cat > "$OUTPUT_DIR/../src/occt-bindings.ts" << 'EOF'
// OCCT.wasm TypeScript Bindings
// Auto-generated scaffold - implement actual bindings

export interface OCCTModule {
  // Geometry operations
  makeBox(dx: number, dy: number, dz: number): Promise<ShapeHandle>;
  makeSphere(radius: number): Promise<ShapeHandle>;
  makeCylinder(radius: number, height: number): Promise<ShapeHandle>;

  // Boolean operations
  booleanUnion(shape1: ShapeHandle, shape2: ShapeHandle): Promise<ShapeHandle>;
  booleanSubtract(shape1: ShapeHandle, shape2: ShapeHandle): Promise<ShapeHandle>;
  booleanIntersect(shape1: ShapeHandle, shape2: ShapeHandle): Promise<ShapeHandle>;

  // Tessellation
  tessellate(shape: ShapeHandle, deflection: number): Promise<MeshData>;

  // STEP I/O
  importSTEP(data: ArrayBuffer): Promise<ShapeHandle[]>;
  exportSTEP(shapes: ShapeHandle[]): Promise<ArrayBuffer>;
}

export interface ShapeHandle {
  id: string;
  type: 'solid' | 'surface' | 'curve';
}

export interface MeshData {
  positions: Float32Array;
  normals: Float32Array;
  indices: Uint32Array;
}

// Module loader
let occtModule: OCCTModule | null = null;

export async function loadOCCT(): Promise<OCCTModule> {
  if (occtModule) return occtModule;

  // @ts-ignore - WASM module import
  const createModule = await import('./wasm/occt.js');
  const module = await createModule.default();

  // TODO: Wrap actual OCCT C++ API
  occtModule = {
    makeBox: async (dx, dy, dz) => {
      // Implement actual OCCT binding
      throw new Error('Not implemented');
    },
    // ... implement other methods
  } as OCCTModule;

  return occtModule;
}
EOF

echo -e "${GREEN}✅ TypeScript bindings scaffold created${NC}"