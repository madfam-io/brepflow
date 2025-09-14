# BrepFlow Setup Guide

This guide will help you get BrepFlow up and running on your local machine.

## Prerequisites

- **Node.js** ≥ 20.0.0
- **pnpm** ≥ 9.0.0
- Modern browser with WebAssembly support
- (Optional) Emscripten SDK for building OCCT.wasm

## Quick Start

### 1. Install Dependencies

```bash
# Install pnpm if you haven't already
npm install -g pnpm@9

# Install project dependencies
pnpm install
```

### 2. Build OCCT.wasm (Optional - for geometry operations)

**Note**: The OCCT source needs to be downloaded manually first.

```bash
# Install Emscripten SDK
git clone https://github.com/emscripten-core/emsdk.git
cd emsdk
./emsdk install latest
./emsdk activate latest
source ./emsdk_env.sh
cd ..

# Build OCCT.wasm
pnpm run build:wasm
```

### 3. Start Development Server

```bash
# Start the development server with COOP/COEP headers
pnpm run dev
```

The application will be available at http://localhost:5173

### 4. Build for Production

```bash
# Build all packages
pnpm run build
```

## Project Structure

```
brepflow/
├── apps/
│   └── studio/          # React-based node editor application
├── packages/
│   ├── engine-core/     # DAG evaluation engine
│   ├── engine-occt/     # OCCT.wasm bindings
│   ├── viewport/        # Three.js 3D viewport
│   ├── nodes-core/      # Built-in node implementations
│   ├── types/           # Shared TypeScript types
│   └── cli/             # Command-line interface
├── scripts/
│   └── build-occt.sh    # OCCT.wasm build script
└── third_party/         # External dependencies (OCCT, etc.)
```

## Development Commands

```bash
# Development
pnpm dev          # Start dev server
pnpm test         # Run tests
pnpm lint         # Run linting
pnpm typecheck    # Type checking
pnpm format       # Format code

# Building
pnpm build        # Build all packages
pnpm build:wasm   # Build OCCT.wasm

# Utilities
pnpm clean        # Clean build artifacts
```

## Browser Requirements

For full functionality (WASM threads), your browser needs:
- SharedArrayBuffer support
- WebAssembly support
- WebGL2 support

The development server automatically sets the required COOP/COEP headers.

## Troubleshooting

### SharedArrayBuffer not available
- Ensure you're accessing via http://localhost:5173 (not file://)
- Check that your browser supports SharedArrayBuffer
- The dev server should set proper COOP/COEP headers automatically

### Build fails
- Ensure Node.js ≥ 20 and pnpm ≥ 9 are installed
- Try cleaning and reinstalling: `pnpm clean && pnpm install`

### OCCT.wasm build fails
- Ensure Emscripten SDK is properly installed and activated
- Check that OCCT source is downloaded to `third_party/occt/`

## Next Steps

1. Explore the node editor at http://localhost:5173
2. Create geometry using the node palette
3. View 3D results in the viewport
4. Export STEP/STL files (once OCCT.wasm is built)

For more information, see:
- [README.md](README.md) - Project overview
- [PRD.md](PRD.md) - Product requirements
- [SOFTWARE_SPEC.md](SOFTWARE_SPEC.md) - Technical specification
- [ROADMAP.md](ROADMAP.md) - Development timeline