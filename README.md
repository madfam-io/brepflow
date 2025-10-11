# BrepFlow

**Web-first, node-based parametric CAD (alpha)**
by **Aureo Labs** — a **MADFAM** company

[![CI](https://img.shields.io/badge/ci-alpha-orange)](#) [![License: MPL‑2.0](https://img.shields.io/badge/license-MPL--2.0-blue.svg)](#license)

> BrepFlow now speaks directly to **OCCT.wasm**. You must build the OCCT artefacts before running Studio or the CLI. Expect rough edges while we finish polishing the SDK, node catalogue, and collaboration layers.

* **Site**: [https://brepflow.com](https://brepflow.com)
* **Studio (app)**: `/apps/studio`
* **Docs**: `docs/`

---

## Why BrepFlow?

- **Vision:** a web-first, node-based CAD environment backed by OCCT so designers and automation pipelines share the same geometry kernel.
- **Reality today:** an interactive graph editor, CLI scaffolding, and a comprehensive type system running on a mocked geometry backend.
- **Roadmap:** see [docs/project/ROADMAP.md](docs/project/ROADMAP.md) for the honest plan to bring real OCCT geometry, STEP I/O, and collaboration online.

If you come from OpenSCAD or Grasshopper, think of BrepFlow as an experiment toward that fusion rather than a finished replacement.

---

## Status

**Alpha · real OCCT backend · breaking changes expected**

What works:
- Studio launches, supports undo/redo, and every primitive/boolean/fillet call routes through the OCCT WASM module.
- CLI commands (`render`, `sweep`, `validate`, `info`) share the same OCCT-backed evaluation engine.
- STEP/STL/IGES export uses OCCT translators; tessellation feeds the viewport via real mesh data.

Still in flux:
- Generated node catalogue (`packages/nodes-core/src/nodes/generated`) is not yet validated and remains disabled in the palette.
- Collaboration, plugin marketplace, monitoring dashboards, and advanced diagnostics are scaffolding only.
- `pnpm typecheck` still reports errors in the collaboration package while we migrate its OT/types.

See the [roadmap](docs/project/ROADMAP.md) for the remaining clean-up and ecosystem work before a broader release.

---

## Quick Start

```bash
# Install dependencies
pnpm install

# Build OCCT.wasm artefacts (required for Studio & CLI)
pnpm run build:wasm

# Start the Studio dev server (real OCCT backend)
pnpm run dev      # http://localhost:5173

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

* **Node.js** 20.11.x, **pnpm** 8.6.x
* Modern browser (Chrome/Edge/Safari TP, Firefox ≥ 120). For WASM threads enable cross‑origin isolation (dev server handles this).
* (Optional) Enable **WebGPU** in `chrome://flags` or Safari TP.

### Clone & Install

```bash
git clone https://github.com/aureolabs/brepflow.git
cd brepflow
pnpm i
```

### Build packages and run Studio

```bash
# Build all packages (uses mock geometry today)
pnpm run build

# Start the development server (mock OCCT backend)
pnpm run dev
# Opens http://localhost:5173 with node editor + placeholder geometry
```

**Note**: OCCT.wasm builds are optional today. Studio and CLI still route through the mock geometry adapter until the real bindings are finished.

### Experimental OCCT build scripts

Scripts such as `pnpm run build:wasm` exist for developers experimenting with OCCT.wasm locally. They produce artefacts, but the runtime still returns mock results until Horizon A is delivered.

### CLI smoke test (mock output)

```bash
pnpm -w --filter @brepflow/cli run build
node packages/cli/dist/index.js render examples/enclosure.bflow.json --out out/
# STEP/STL files are placeholders for now.
```

---

## Monorepo Layout

```
/ brepflow
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

* **React app** (Studio) with **React Flow** canvas + inspector.
* **Engine** (TypeScript) orchestrates the DAG and forwards every evaluation to the OCCT wrapper.
* **OCCT.wasm** provides primitives, booleans, fillets, tessellation, and STEP/STL/IGES I/O via compiled bindings.
* **Renderer**: Three.js (WebGL2) renders tessellated meshes produced by OCCT.
* **Persistence**: `.bflow.json` (versioned) and manifest plumbing are stable.
* **CLI** runs in Node.js with the same OCCT-backed evaluation pipeline.

---

## Building `occt.wasm`

You must compile OCCT with Emscripten (pthreads) before running Studio or the CLI. The scripts in `scripts/` automate the process and place artefacts under `packages/engine-occt/wasm`.

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
    {"id":"sk1","type":"Sketch2D"},
    {"id":"ex1","type":"Extrude","inputs":{"profile":"sk1:face"},"params":{"distance":25}}
  ],
  "edges": [{"from":"sk1:face","to":"ex1:profile"}]
}
```

See [`/packages/schemas`](./packages/schemas) for the full JSON Schema.

---

## CLI Usage

```bash
# render a graph and export STEP/STL
brepflow render mypart.bflow.json --export step,stl --out out/

# set parameters at runtime
brepflow render enclosure.bflow.json --set L=160 --set wall=3.2

# sweep over a CSV matrix of variants
brepflow sweep --graph enclosure.bflow.json --matrix variants.csv --out dist/
```

Outputs include content‑addressed filenames and a `manifest.json` with provenance.

---

## Developing Nodes

Create a new node in `packages/nodes-core` or an external plugin via the **SDK**.

```ts
registerNode({
  type: "Example::Extrude",
  params: { distance: NumberParam({min:0}) },
  inputs: { profile: "Shape" },
  outputs: { shape: "Shape" },
  evaluate: async (ctx, I, P) => ctx.geom.invoke("MAKE_EXTRUDE", { face: I.profile, distance: P.distance })
});
```

Plugins run in a sandboxed worker and cannot access DOM/network without explicit capability grants.

---

## Interoperability

* **STEP AP242/IGES** import/export.
* **3DM (openNURBS), USD, glTF** planned.
* Downstream tested with: Onshape, SolidWorks, FreeCAD (via CI import checks).

---

## Performance Notes

* Typical boolean (≤50k faces) targets **≤ 1s p95** on M1‑class laptops.
* Mesh LODs derived from bbox/pixel density; switch quality in the status bar.
* For huge graphs, enable **compute on edit delay** (Preferences) and increase cache size.

---

## Troubleshooting

* **WASM threads disabled**: ensure dev server shows `Cross‑Origin‑Opener‑Policy: same-origin` and `Cross‑Origin‑Embedder‑Policy: require-corp`.
* **STEP import fails**: check console for `IMPORT_ERROR`; attach the offending file and `manifest.json` in an issue.
* **Slow viewport**: disable edges or switch to WebGPU (if available).

---

## Documentation

All project documentation is organized in the `docs/` directory:

- **[Documentation Index](docs/README.md)** - Complete documentation overview
- **[Architecture](docs/technical/ARCHITECTURE.md)** - System design and technical architecture
- **[API Reference](docs/technical/API.md)** - Complete API documentation
- **[Setup Guide](docs/development/SETUP.md)** - Development environment setup
- **[Contributing](docs/development/CONTRIBUTING.md)** - Contribution guidelines
- **[Roadmap](docs/product/ROADMAP.md)** - Product roadmap and milestones
- **[Implementation Guides](docs/implementation/)** - Feature implementation details
- **[Business Strategy](docs/business/)** - Go-to-market and business planning

---

## Contributing

We welcome issues, PRs, and node plugins.

1. Read [docs/development/CONTRIBUTING.md](docs/development/CONTRIBUTING.md) and **CODE\_OF\_CONDUCT.md**.
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

* Workers isolated; geometry ops cannot access host resources.
* Plugin registry requires **signed packages (ed25519)**.
* Report vulnerabilities to **[security@aureolabs.dev](mailto:security@aureolabs.dev)** (PGP key in `SECURITY.md`).

---

## Telemetry (opt‑in)

Anonymous aggregates only (compute timings, feature usage). Off by default. Enable via Settings → Privacy or `BFP_TELEMETRY=1`. See `PRIVACY.md`.

---

## License

* **Core:** Mozilla Public License 2.0 (MPL‑2.0) — see `LICENSE`.
* **Geometry kernel:** Open CASCADE Technology (OCCT) — LGPL‑2.1 with exception, dynamically linked via WASM.
* External libraries retain their respective licenses.

**Copyright ©** Aureo Labs, a MADFAM company.

---

## Roadmap & Community

* **Roadmap**: See [docs/project/ROADMAP.md](docs/project/ROADMAP.md) for detailed development timeline
* **Architecture**: See [docs/technical/ARCHITECTURE.md](docs/technical/ARCHITECTURE.md) for system design details
* **API Reference**: See [docs/technical/API.md](docs/technical/API.md) for complete API documentation
* **Contributing**: See [docs/development/CONTRIBUTING.md](docs/development/CONTRIBUTING.md) for contribution guidelines
* **Setup**: See [docs/development/SETUP.md](docs/development/SETUP.md) for detailed development environment setup

* Join the conversation on **Discord** (link soon) and **GitHub Discussions**.
* Follow updates: @aureolabs on X/GitHub; blog at [https://aureolabs.dev](https://aureolabs.dev).

---

## Acknowledgments

Open CASCADE, Three.js, React Flow, the wider FOSS CAD community — thank you. Special inspiration from Grasshopper, Dynamo, and the OpenSCAD community.
