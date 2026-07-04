# Sim4D

**Web-first, node-based parametric CAD (alpha)**
by **Innovaciones MADFAM** — a **MADFAM** company

[![Docker Tests](https://github.com/madfam/sim4d/actions/workflows/test-docker.yml/badge.svg)](https://github.com/madfam/sim4d/actions/workflows/test-docker.yml)
[![PR Quality Gate](https://github.com/madfam/sim4d/actions/workflows/pr-quality-gate.yml/badge.svg)](https://github.com/madfam/sim4d/actions/workflows/pr-quality-gate.yml)
[![CI Pipeline](https://github.com/madfam/sim4d/actions/workflows/ci.yml/badge.svg)](https://github.com/madfam/sim4d/actions/workflows/ci.yml)
[![License: MPL‑2.0](https://img.shields.io/badge/license-MPL--2.0-blue.svg)](#license)

> ✅ Sim4D now runs on **real OCCT.wasm** geometry kernel. All 25 core OCCT operations verified and functional. WASM binaries are pre-compiled and included in the repository for immediate use.

- **Site**: [https://sim4d.com](https://sim4d.com)
- **Studio (app)**: `/apps/studio`
- **Docs**: `docs/`

---

## Why Sim4D?

- **Vision:** a web-first, node-based CAD environment backed by OCCT so designers and automation pipelines share the same geometry kernel.
- **Reality today:** an **alpha** interactive graph editor with a real OCCT.wasm geometry backend, CLI tools, STEP/STL/IGES export, and a large test suite (see "Current status" below).
- **Roadmap:** see [docs/project/ROADMAP.md](docs/project/ROADMAP.md) (last substantively updated **2025-11-18**) for security hardening, code quality improvements, and ecosystem features (collaboration, plugins, marketplace).

If you come from OpenSCAD or Grasshopper, think of Sim4D as bringing that node-based workflow to the web with industrial-grade OCCT geometry.

---

## Status

**Alpha · Real OCCT WASM Backend**

### Current status (verified 2026-07-04)

Sim4D is **alpha software**. An earlier version of this section claimed
"Production Ready · Stable API" alongside the alpha label; that contradiction
is resolved here in favor of the evidence:

- Large monorepo: 15 packages + 2 apps (`studio`, `marketing`), ~4,800
  tracked files, ~1,000 test/spec files.
- Real, pre-compiled OCCT.wasm binaries ship in
  `packages/engine-occt/wasm/` (web, single-thread, and Node builds) and
  back both Studio and the CLI.
- Heavy CI: 11 GitHub Actions workflows (unit/E2E/docker tests, quality
  gate, security scan, production-readiness ratchet, container/Enclii
  builds, nightly CLI).
- Known gaps that keep this alpha: the generated ~1.8k-node catalogue is
  disabled pending type fixes; `pnpm typecheck` fails in the collaboration
  package; collaboration/marketplace/plugin ecosystem features are
  incomplete; API stability is **not** guaranteed.

The subsections below reflect the last detailed engineering snapshot
(2025-11), kept for reference:

✅ **Operational (as of 2025-11 snapshot)**:

- Studio launches with complete OCCT WASM geometry backend (55MB compiled binaries)
- All geometry operations verified: primitives, booleans, fillets, transformations
- CLI commands (`render`, `sweep`, `validate`, `info`) use real OCCT evaluation engine
- STEP/STL/IGES export through OCCT translators with exact B-Rep/NURBS geometry
- Standalone test verification: 25 OCCT exports, accurate bbox calculations, proper shape IDs
- Tessellation and mesh generation for Three.js viewport rendering
- **Node drop functionality**: Single node placement working correctly (double-node bug fixed)
- **Dev server**: Fast startup (335ms) with proper WASM worker support

🔧 **In Development**:

- Generated node catalogue optimization (1,827 nodes functional but not yet palette-optimized)
- Advanced collaboration features and plugin marketplace refinement
- Comprehensive E2E test suite expansion

**Recent Fixes (2025-11-14)**:

- ✅ Fixed double node placement bug (React state sync issue)
- ✅ Fixed Vite worker import parsing error for OCCT.wasm files
- ✅ Cleaned up duplicate component rendering
- ✅ 99.6% unit test pass rate (231/232 tests passing)

See the [roadmap](docs/project/ROADMAP.md) for the remaining clean-up and ecosystem work before a broader release.

---

## Quick Start

```bash
# Install dependencies
pnpm install

# Build OCCT.wasm artefacts (required for Studio & CLI)
pnpm run build:wasm

# Start the Studio dev server with real OCCT WASM backend
pnpm run dev      # http://localhost:5173
# ✅ All geometry operations use verified OCCT.wasm binaries

# Build and run tests
pnpm run build
pnpm run test
```

> ⚠️ `pnpm typecheck` currently fails inside the collaboration package while we migrate its OT operations. Geometry-related packages now pass.

For detailed setup instructions, see [docs/development/SETUP.md](./docs/development/SETUP.md).

## Documentation

📚 **[Documentation Index](./docs/INDEX.md)** - Complete documentation overview

- **[Getting Started](./docs/development/SETUP.md)** - Installation and setup
- **[Architecture](./docs/architecture/README.md)** - System design and structure
- **[API Reference](./docs/technical/API.md)** - Node SDK and APIs
- **[Contributing](./docs/development/CONTRIBUTING.md)** - Development guidelines

### Prerequisites

- **Node.js** 20.11.x, **pnpm** 8.6.x
- Modern browser (Chrome/Edge/Safari TP, Firefox ≥ 120). For WASM threads enable cross‑origin isolation (dev server handles this).
- (Optional) Enable **WebGPU** in `chrome://flags` or Safari TP.

### Clone & Install

```bash
git clone https://github.com/innovacionesmadfam/sim4d.git
cd sim4d
pnpm i
```

### Build packages and run Studio

```bash
# Build all packages with real OCCT geometry backend
pnpm run build

# Start the development server (real OCCT.wasm backend)
pnpm run dev
# Opens http://localhost:5173 with node editor + real OCCT geometry evaluation
# Dev server starts in ~335ms with full WASM worker support
```

**Note**: Pre-compiled OCCT.wasm binaries are included in the repository. The `build:wasm` script is only needed if you want to rebuild OCCT from source with custom configuration.

### Optional: Rebuild OCCT from source

```bash
# Only needed for custom OCCT builds or development
pnpm run build:wasm
# Requires Emscripten SDK installed (see docs/development/OCCT_BUILD_PREREQS.md)
```

### CLI usage (real OCCT output)

```bash
pnpm -w --filter @sim4d/cli run build
node packages/cli/dist/index.js render examples/enclosure.bflow.json --out out/
# Generates real STEP/STL/IGES files with exact B-Rep/NURBS geometry from OCCT
```

---

## Monorepo Layout

```
/ sim4d
  /apps
    /studio            # React app: node editor + viewport
  /packages
    /engine-core       # DAG eval, dirty‑prop, hashing, persistence
    /engine-occt       # Worker bindings to occt.wasm (C++/TS glue)
    /viewport          # Three.js/WebGL2 (+ WebGPU flag) renderer
    /nodes-core        # Built‑in node set
    /sdk               # Public SDK for custom nodes
    /cli               # Headless runner (Node.js)
    /schemas           # JSON schema for .bflow.json
    /types             # Shared types
    /examples          # Example graphs + fixtures
  /third_party         # occt, openNURBS (phase 2)
  /scripts             # build scripts (e.g., build-occt.sh)
```

---

## Try It Now

After setup you can:

1. **Explore the node editor** — drag nodes, connect edges, and watch dirty propagation feed the real OCCT evaluation engine.
2. **Inspect real geometry** — every node evaluation yields OCCT shape handles with bounding boxes, volume, and area metadata.
3. **Save and reload graphs** — `.bflow.json` persistence remains compatible with the OCCT-backed runtime.
4. **Render via CLI** — export STEP/STL/IGES directly from the command line for automated flows.

---

## Feature snapshot

**Available (alpha quality):**

- Node editor with search palette, undo/redo, inspector, and console logging.
- Real OCCT primitives, booleans, fillets/chamfers, tessellation, and STEP/STL/IGES export.
- `.bflow.json` persistence and manifest tooling.
- CLI commands (`render`, `sweep`, `validate`, `info`) sharing the same OCCT-backed engine.

**Still under active development:**

- Generated node catalogue (currently fails type checking and is disabled).
- Collaboration, marketplace, monitoring dashboards, and plugin SDK.
- Comprehensive E2E test rewrites to replace legacy mock-heavy suites.

---

## Architecture (at a glance)

- **React app** (Studio) with **React Flow** canvas + inspector.
- **Engine** (TypeScript) orchestrates the DAG and forwards every evaluation to the OCCT wrapper.
- **OCCT.wasm** provides primitives, booleans, fillets, tessellation, and STEP/STL/IGES I/O via compiled bindings.
- **Renderer**: Three.js (WebGL2) renders tessellated meshes produced by OCCT.
- **Persistence**: `.bflow.json` (versioned) and manifest plumbing are stable.
- **CLI** runs in Node.js with the same OCCT-backed evaluation pipeline.

---

## OCCT WASM Binaries

✅ **Pre-compiled OCCT WASM binaries are included** in `packages/engine-occt/wasm/`:

- `occt.wasm` (13MB) - Full threaded web version with pthread support
- `occt-core.wasm` (8.7MB) - Optimized single-thread web version
- `occt-core.node.wasm` (8.3MB) - Node.js version for CLI

**No compilation required** for standard use. The WASM binaries are pre-compiled and verified against the core OCCT operation suite (the binaries are usable as-is; this is not a claim that the overall product is production-ready — see Status).

> 📘 **Prerequisites:** See [docs/development/OCCT_BUILD_PREREQS.md](./docs/development/OCCT_BUILD_PREREQS.md) for required toolchains, environment variables, and expected outputs before invoking the build.

```bash
# scripts/build-occt.sh (simplified)
EMSDK=~/emsdk
source $EMSDK/emsdk_env.sh
cmake -S occt -B build-occt \
  -DCMAKE_TOOLCHAIN_FILE=$EMSDK/upstream/emscripten/cmake/Modules/Platform/Emscripten.cmake \
  -DBUILD_SHARED_LIBS=OFF -DUSE_FREETYPE=OFF -DUSE_TBB=OFF \
  -DOCC_BUILD_TYPE=Release -DOCC_ENABLE_CLOUD=OFF
cmake --build build-occt -j
```

Dev server sets **COOP/COEP** headers to enable WASM threads (`SharedArrayBuffer`).

---

## Graph Format (`.bflow.json`)

```json
{
  "version": "0.1",
  "units": "mm",
  "tolerance": 0.001,
  "nodes": [
    { "id": "sk1", "type": "Sketch2D" },
    {
      "id": "ex1",
      "type": "Extrude",
      "inputs": { "profile": "sk1:face" },
      "params": { "distance": 25 }
    }
  ],
  "edges": [{ "from": "sk1:face", "to": "ex1:profile" }]
}
```

See [`/packages/schemas`](./packages/schemas) for the full JSON Schema.

---

## CLI Usage

```bash
# render a graph and export STEP/STL
sim4d render mypart.bflow.json --export step,stl --out out/

# set parameters at runtime
sim4d render enclosure.bflow.json --set L=160 --set wall=3.2

# sweep over a CSV matrix of variants
sim4d sweep --graph enclosure.bflow.json --matrix variants.csv --out dist/
```

Outputs include content‑addressed filenames and a `manifest.json` with provenance.

---

## Developing Nodes

Create a new node in `packages/nodes-core` or an external plugin via the **SDK**.

```ts
registerNode({
  type: 'Example::Extrude',
  params: { distance: NumberParam({ min: 0 }) },
  inputs: { profile: 'Shape' },
  outputs: { shape: 'Shape' },
  evaluate: async (ctx, I, P) =>
    ctx.geom.invoke('MAKE_EXTRUDE', { face: I.profile, distance: P.distance }),
});
```

Plugins run in a sandboxed worker and cannot access DOM/network without explicit capability grants.

---

## Interoperability

- **STEP AP242/IGES** import/export.
- **3DM (openNURBS), USD, glTF** planned.
- Downstream tested with: Onshape, SolidWorks, FreeCAD (via CI import checks).

---

## Performance Notes

- Typical boolean (≤50k faces) targets **≤ 1s p95** on M1‑class laptops.
- Mesh LODs derived from bbox/pixel density; switch quality in the status bar.
- For huge graphs, enable **compute on edit delay** (Preferences) and increase cache size.

---

## Troubleshooting

- **WASM threads disabled**: ensure dev server shows `Cross‑Origin‑Opener‑Policy: same-origin` and `Cross‑Origin‑Embedder‑Policy: require-corp`.
- **STEP import fails**: check console for `IMPORT_ERROR`; attach the offending file and `manifest.json` in an issue.
- **Slow viewport**: disable edges or switch to WebGPU (if available).

---

## Documentation

All project documentation is organized in the `docs/` directory:

- **[Documentation Index](docs/README.md)** - Complete documentation overview
- **[Architecture](docs/technical/ARCHITECTURE.md)** - System design and technical architecture
- **[API Reference](docs/technical/API.md)** - Complete API documentation
- **[Setup Guide](docs/development/SETUP.md)** - Development environment setup
- **[Contributing](docs/development/CONTRIBUTING.md)** - Contribution guidelines
- **[Roadmap](docs/project/ROADMAP.md)** - Product roadmap and milestones (last updated 2025-11-18)
- **[Implementation Guides](docs/implementation/)** - Feature implementation details
- **[Business Strategy](docs/business/)** - Go-to-market and business planning

---

## Contributing

We welcome issues, PRs, and node plugins.

1. Read [docs/development/CONTRIBUTING.md](docs/development/CONTRIBUTING.md) and **CODE_OF_CONDUCT.md**.
2. Fork, create a feature branch, run `pnpm test` before PR.
3. For geometry changes, include a new **golden STEP** in `/packages/examples/golden/`.

### Development Scripts

```bash
pnpm -w run dev        # start Studio + workers
pnpm -w run test       # unit/integration tests
pnpm -w run build      # bundle all packages
pnpm -w run lint       # eslint
```

---

## Security

- Workers isolated; geometry ops cannot access host resources.
- Plugin registry requires **signed packages (ed25519)**.
- Report vulnerabilities to **[security@innovacionesmadfam.dev](mailto:security@innovacionesmadfam.dev)** (PGP key in `SECURITY.md`).

---

## Telemetry (opt‑in)

Anonymous aggregates only (compute timings, feature usage). Off by default. Enable via Settings → Privacy or `BFP_TELEMETRY=1`. See `PRIVACY.md`.

---

## License

- **Core:** Mozilla Public License 2.0 (MPL‑2.0) — see `LICENSE`.
- **Geometry kernel:** Open CASCADE Technology (OCCT) — LGPL‑2.1 with exception, dynamically linked via WASM.
- External libraries retain their respective licenses.

**Copyright ©** Innovaciones MADFAM.

---

## Roadmap & Community

- **Roadmap**: See [docs/project/ROADMAP.md](docs/project/ROADMAP.md) for detailed development timeline
- **Architecture**: See [docs/technical/ARCHITECTURE.md](docs/technical/ARCHITECTURE.md) for system design details
- **API Reference**: See [docs/technical/API.md](docs/technical/API.md) for complete API documentation
- **Contributing**: See [docs/development/CONTRIBUTING.md](docs/development/CONTRIBUTING.md) for contribution guidelines
- **Setup**: See [docs/development/SETUP.md](docs/development/SETUP.md) for detailed development environment setup

- Join the conversation on **Discord** (link soon) and **GitHub Discussions**.
- Follow updates: @innovacionesmadfam on X/GitHub; blog at [https://innovacionesmadfam.dev](https://innovacionesmadfam.dev).

---

## Acknowledgments

Open CASCADE, Three.js, React Flow, the wider FOSS CAD community — thank you. Special inspiration from Grasshopper, Dynamo, and the OpenSCAD community.
