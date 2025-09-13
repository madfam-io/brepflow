# BrepFlow

**Web‑first, node‑based parametric CAD on exact B‑Rep/NURBS**
by **Aureo Labs** — a **MADFAM** company

[![CI](https://img.shields.io/badge/ci-passing-brightgreen)](#) [![License: MPL‑2.0](https://img.shields.io/badge/license-MPL--2.0-blue.svg)](#license) [![Made for Web](https://img.shields.io/badge/platform-web-%2300bcd4)](#) [![Chat](https://img.shields.io/badge/community-Discord-informational)](#community)

> Build precise parts and assemblies in your browser with a Grasshopper‑style node editor. Export **STEP/STL** for manufacturing, and automate variants with a **headless CLI**.

* **Site**: [https://brepflow.com](https://brepflow.com)
* **Studio (app)**: `/apps/studio`
* **Docs**: `docs/` (coming soon)

---

## Why BrepFlow?

* **Exact geometry** — OCCT‑class B‑Rep/NURBS. Real fillets, shells, drafts. Clean **STEP AP242**.
* **Web‑native** — no installs. WASM workers, multi‑threaded where supported (COOP/COEP).
* **Visual + Scriptable** — node graphs for designers, **CLI/SDK** for automation and CI.
* **Interoperable** — STEP/IGES today; 3DM/USD/glTF next.

> If you know OpenSCAD: BrepFlow adds exact B‑Reps, fillets, and STEP while keeping deterministic, batchable workflows. If you know Grasshopper: BrepFlow brings a similar node experience, focused on manufacturable solids in the browser.

---

## Status

**MVP (v0.1) — in active development.** Expect breaking changes until v0.5.

---

## Quick Start

### Prerequisites

* **Node.js** ≥ 20, **pnpm** ≥ 9
* Modern browser (Chrome/Edge/Safari TP, Firefox ≥ 120). For WASM threads enable cross‑origin isolation (dev server handles this).
* (Optional) Enable **WebGPU** in `chrome://flags` or Safari TP.

### Clone & Install

```bash
git clone https://github.com/aureolabs/brepflow.git
cd brepflow
pnpm i
```

### Build the geometry core (WASM)

```bash
# one‑time: downloads/compiles OCCT to WASM with pthreads
pnpm -w run build:wasm
```

### Run the Studio (editor)

```bash
pnpm -w run dev
# opens http://localhost:5173 with COOP/COEP headers for WASM threads
```

### Render a graph headlessly (CLI)

```bash
pnpm -w --filter @brepflow/cli run build
node packages/cli/dist/index.js render examples/enclosure.bflow.json \
  --set L=120 --set W=80 --set H=35 \
  --export step,stl --out out/
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

## Features (MVP)

* **Node editor:** search palette, groups, undo/redo, inspector, console.
* **Modeling:** Sketch/curve nodes (Line/Circle/Arc/NURBS), Surfacing (NURBS surface/Loft/Sweep/Revolve), Solids (Extrude), Booleans, Fillet/Chamfer/Shell/Draft, Transforms, Arrays.
* **I/O:** Import **STEP/IGES**, Export **STEP/STL**.
* **Viewport:** Section planes, isolate/hide, edge display.
* **Automation:** Headless CLI, parameter sweeps, deterministic hashes.
* **SDK:** TypeScript node API; sandboxed worker execution.

Planned (v0.5): **3DM (openNURBS)**, **USD/glTF**, node subgraphs, constraint snippets, plugin registry.

---

## Architecture (at a glance)

* **React app** (Studio) with **React Flow** canvas + inspector.
* **Engine** (TypeScript) orchestrates the DAG; geometry runs in **WASM workers**.
* **OCCT.wasm** handles B‑Rep/NURBS, Booleans, fillets; **tessellation worker** streams meshes back as transferables.
* **Renderer**: Three.js (WebGL2), **WebGPU** optional behind flag.
* **Persistence**: `.bflow.json` (versioned), IndexedDB mesh cache.
* **CLI** reuses the same WASM builds for deterministic outputs.

---

## Building `occt.wasm`

We compile OCCT with Emscripten (pthreads) and selected modules: ModelingData/Algorithms, BRep, STEP/IGES, Mesh.

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

* **STEP AP242/IGES** today.
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

## Contributing

We welcome issues, PRs, and node plugins.

1. Read **CONTRIBUTING.md** and **CODE\_OF\_CONDUCT.md**.
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

* Roadmap: see **PROJECTS** board and `docs/roadmap.md`.
* Join the conversation on **Discord** (link soon) and **GitHub Discussions**.
* Follow updates: @aureolabs on X/GitHub; blog at [https://aureolabs.dev](https://aureolabs.dev).

---

## Acknowledgments

Open CASCADE, Three.js, React Flow, the wider FOSS CAD community — thank you. Special inspiration from Grasshopper, Dynamo, and the OpenSCAD community.
