# BrepFlow Project Session Context

## Project Overview
- **Name**: BrepFlow
- **Version**: 0.1.0 (MVP ~95% Complete)
- **Type**: Web-first, node-based parametric CAD application
- **Architecture**: Monorepo with pnpm workspaces + Turborepo
- **Geometry Core**: OCCT (Open CASCADE Technology) via WASM

## Project Structure
```
/brepflow
├── apps/
│   └── studio/              # React app: node editor + viewport
├── packages/
│   ├── engine-core/         # DAG evaluation, dirty-propagation, hashing
│   ├── engine-occt/         # Worker bindings to occt.wasm
│   ├── viewport/            # Three.js/WebGL2 renderer
│   ├── nodes-core/          # Built-in node set
│   ├── cli/                 # Headless runner (Node.js)
│   ├── schemas/             # JSON schema for .bflow.json
│   ├── types/               # Shared types
│   └── examples/            # Example graphs + fixtures
├── scripts/                 # Build scripts (build-occt.sh)
└── third_party/             # OCCT dependencies
```

## Development Environment
- **Package Manager**: pnpm@8.15.4
- **Node Version**: >=18.0.0
- **Build System**: Turborepo
- **Git Branch**: main (clean working directory)
- **Key Scripts**:
  - `pnpm dev`: Start Studio + workers
  - `pnpm build:wasm`: Compile OCCT WASM (one-time)
  - `pnpm test`: Run unit/integration tests
  - `pnpm lint`: ESLint
  - `pnpm typecheck`: TypeScript validation

## Technical Context
- **Execution Model**: DAG-based with dirty propagation
- **Geometry**: Exact B-Rep/NURBS via OCCT WASM workers
- **Performance Targets**: App load ≤3s, 60fps viewport, <1s booleans
- **Security**: Worker isolation, COOP/COEP headers for SharedArrayBuffer
- **File Format**: .bflow.json with UUIDv7 identifiers

## Current Status (Sep 2025)
- ✅ Complete node editor and 30+ geometry nodes
- ✅ Real-time evaluation with mock geometry
- ✅ CLI tools and comprehensive testing
- 🔄 OCCT.wasm integration in progress

## Session Initialized
- **Date**: 2025-09-14
- **Context**: Project loaded successfully
- **Ready**: Development workflow active