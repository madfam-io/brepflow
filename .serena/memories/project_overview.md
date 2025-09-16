# BrepFlow Project Overview

## Purpose
BrepFlow is a web-first, node-based parametric CAD application with exact B-Rep/NURBS geometry. Built by Aureo Labs (a MADFAM company), it provides Grasshopper-style visual parametrics with manufacturing-grade geometry that runs in the browser.

## Key Features
- **Exact geometry**: OCCT-class B-Rep/NURBS with real fillets, shells, drafts, clean STEP AP242
- **Web-native**: No installs, runs in browser with WASM workers
- **Visual + Scriptable**: Node graphs for designers, CLI/SDK for automation
- **Interoperable**: STEP/IGES export with 3DM/USD/glTF planned

## Status (September 2025)
MVP (v0.1) ~95% Complete
- ✅ Working: Complete node editor, 30+ geometry nodes, real-time evaluation, CLI tools
- 🔄 In Progress: OCCT.wasm compilation for real geometry operations

## Architecture
Monorepo structure using pnpm workspaces with Turborepo:
- `/apps/studio`: React app with node editor and viewport
- `/packages/engine-core`: DAG evaluation, dirty propagation, hashing
- `/packages/engine-occt`: Worker bindings to occt.wasm
- `/packages/viewport`: Three.js/WebGL2 renderer
- `/packages/nodes-core`: Built-in node set
- `/packages/cli`: Headless runner (Node.js)
- `/packages/types`: Shared TypeScript types

## Tech Stack
- **Frontend**: React 18, TypeScript, Reactflow for node editor
- **3D**: Three.js, WebGL2, optional WebGPU support
- **Build**: Vite, Turborepo, pnpm workspaces
- **Testing**: Vitest, Playwright for E2E
- **Geometry**: OCCT compiled to WASM with Emscripten
- **Workers**: Web Workers with SharedArrayBuffer support