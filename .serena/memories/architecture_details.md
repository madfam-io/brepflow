# BrepFlow Architecture Details

## Core Architecture Principles

### Execution Model
- **Dirty Propagation**: Node changes mark downstream nodes dirty for re-evaluation
- **Deterministic**: Evaluation order from DAG, content-addressed hashing
- **Memoization**: Outputs cached by `(nodeId, inputHashes, paramHash)`
- **Worker-based**: Geometry operations isolated in WASM workers

### Graph Format (.bflow.json)
- Versioned JSON with UUIDv7 identifiers
- Embedded units and tolerances
- Node structure: inputs, outputs, parameters
- Content-addressed for deterministic builds

### Performance Targets
- Cold load ≤ 3.0s
- Viewport ≥ 60 FPS for ≤ 2M triangles
- Boolean ops < 1s p95 for < 50k faces
- Memory ceiling: 1.5-2.0 GB per tab

## Package Responsibilities

### apps/studio
- React 18 application
- Reactflow node editor
- Three.js viewport integration
- UI components and layout management
- Onboarding and user guidance

### packages/engine-core
- DAG evaluation engine
- Dirty propagation system
- Content hashing
- Persistence layer
- Graph execution coordinator

### packages/engine-occt
- WASM worker bindings
- C++/TypeScript glue code
- Geometry operation dispatch
- Memory management for WASM

### packages/viewport
- Three.js renderer
- WebGL2 with WebGPU option
- Mesh display and interaction
- Camera controls
- Performance optimization

### packages/nodes-core
- Built-in node implementations
- 30+ geometry nodes
- Node registration system
- Type definitions

### packages/cli
- Headless graph runner
- Batch processing
- Export functionality
- Parameter sweeping

## Security & Isolation
- Workers isolated from main thread
- Sandboxed plugin execution
- Capability whitelists
- COOP/COEP headers for SharedArrayBuffer
- CSP strict mode, no inline eval

## Memory Management
- LRU caches for meshes
- Worker restart on memory pressure
- Streaming geometry for large models
- Incremental evaluation

## Development Patterns
- Mock geometry provider for development
- Real OCCT integration via WASM
- Progressive enhancement approach
- Feature flags for experimental features