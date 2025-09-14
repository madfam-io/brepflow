# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

BrepFlow is a web-first, node-based parametric CAD application with exact B-Rep/NURBS geometry. It's built by Aureo Labs (a MADFAM company) and provides Grasshopper-style visual parametrics with manufacturing-grade geometry that runs in the browser.

## Architecture

The project uses a monorepo structure with the following layout:

```
/brepflow
  /apps
    /studio            # React app: node editor + viewport
  /packages
    /engine-core       # DAG evaluation, dirty-propagation, hashing, persistence
    /engine-occt       # Worker bindings to occt.wasm (C++/TS glue)
    /viewport          # Three.js/WebGL2 (+ WebGPU flag) renderer
    /nodes-core        # Built-in node set
    /sdk               # Public SDK for custom nodes
    /cli               # Headless runner (Node.js)
    /schemas           # JSON schema for .bflow.json
    /types             # Shared types
    /examples          # Example graphs + fixtures
  /third_party         # occt, openNURBS (phase 2)
  /scripts             # build scripts (e.g., build-occt.sh)
```

## Development Commands

```bash
# Initial setup
pnpm i                              # Install dependencies

# Build WASM geometry core (one-time, downloads/compiles OCCT)
pnpm -w run build:wasm

# Development
pnpm -w run dev                     # Start Studio + workers (http://localhost:5173)
pnpm -w run test                    # Run unit/integration tests
pnpm -w run build                   # Bundle all packages
pnpm -w run lint                    # Run ESLint

# CLI usage
pnpm -w --filter @brepflow/cli run build
node packages/cli/dist/index.js render examples/enclosure.bflow.json \
  --set L=120 --set W=80 --set H=35 \
  --export step,stl --out out/
```

## Key Technical Details

### Geometry Core (occt.wasm)
- Uses OCCT (Open CASCADE Technology) compiled to WASM with Emscripten
- Runs in Web Workers with pthreads enabled
- Requires COOP/COEP headers for SharedArrayBuffer support
- Handles exact B-Rep/NURBS geometry, Booleans, fillets, STEP/IGES I/O

### Execution Model
- **Dirty Propagation**: Changes mark downstream nodes dirty for topological re-evaluation
- **Deterministic**: Evaluation order derived from DAG, content-addressed hashing
- **Memoization**: Node outputs cached by `(nodeId, inputHashes, paramHash)`
- **Worker-based**: Geometry operations isolated in WASM workers

### Graph Format (.bflow.json)
- Versioned JSON with stable UUIDv7 identifiers
- Embedded units and tolerances
- Node-based structure with inputs, outputs, and parameters
- Content-addressed for deterministic builds

### Performance Targets
- App cold load ≤ 3.0s on modern hardware
- Viewport ≥ 60 FPS for ≤ 2M triangles
- Boolean operations < 1s p95 for parts with < 50k faces
- Memory ceiling per tab: 1.5-2.0 GB

## Development Guidelines

### Node Development
Custom nodes are registered via the SDK:
```typescript
registerNode({
  type: "Example::Extrude",
  params: { distance: NumberParam({min:0}) },
  inputs: { profile: "Shape" },
  outputs: { shape: "Shape" },
  evaluate: async (ctx, I, P) => ctx.geom.invoke("MAKE_EXTRUDE", { face: I.profile, distance: P.distance })
});
```

### Testing Strategy
- **Unit tests**: Geometry adapters, hashing, expression evaluator
- **Integration tests**: Node chains with golden STEP outputs
- **E2E tests**: Playwright flows for create→edit→export workflows
- **Interoperability tests**: STEP round-trips with Onshape, FreeCAD, SolidWorks

### Security Considerations
- Workers isolated from main thread
- Plugins run in sandboxed workers with capability whitelists
- Signed plugin packages (ed25519) for registry distribution
- COOP/COEP headers required for WASM threads
- CSP strict mode, no inline eval

## Current Status

**MVP (v0.1)** - In active development (target: November 2025)
- Core geometry nodes and operations
- STEP/IGES import, STEP/STL export
- Node canvas with React Flow
- CLI for headless rendering
- WebGL2 viewport with WebGPU experimental support

**Roadmap**:
- v0.3 (Feb 2026): 3DM/USD/glTF support, node subgraphs
- v0.5 (Apr 2026): Plugin registry, constraints, hosted sync

## Important Notes

1. **WASM Threads**: Development server must serve with proper COOP/COEP headers for SharedArrayBuffer support
2. **Browser Requirements**: Modern browsers with WASM support; WebGPU optional behind flag
3. **Monorepo**: Uses pnpm workspaces with Turborepo for build orchestration
4. **Determinism**: All geometry operations must be deterministic for content-addressed caching
5. **Memory Management**: LRU caches for meshes, worker restarts on memory pressure