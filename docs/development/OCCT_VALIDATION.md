# OCCT Environment Validation

This guide captures the checks we run during **Phase 1 – Geometry Reliability** to verify that the OCCT toolchain is producing deterministic geometry.

## 1. Build the OCCT toolchain

1. Follow the build instructions in [`scripts/build-occt.sh`](../../scripts/build-occt.sh).
2. Verify that `packages/engine-occt/wasm/` contains the freshly generated `occt.js`/`occt.wasm` pair.

## 2. Run the CLI golden renders

```bash
pnpm smoke:cli
```

The smoke harness renders canonical graphs (currently `simple-box` and `enclosure`) via the CLI using the real OCCT bindings. Each run is compared against the baselines stored in `goldens/cli/`. The script will fail when:

- An expected export (STEP/STL) is missing or empty.
- The CLI falls back to the mock geometry implementation even though the golden expects real OCCT output.
- The export set diverges from the baseline definition.

### Allowing mock fallback (development only)

Set `BFP_SMOKE_ALLOW_MOCK=true` to let the harness re-run a graph with `--mock` when the real OCCT module is unavailable. This is helpful on CI runners that do not have the WASM payload yet, but the flag should be **off** for release validation so we catch regressions early.

```bash
BFP_SMOKE_ALLOW_MOCK=true pnpm smoke:cli
```

## 3. Scheduling the validation

The nightly GitHub workflow (`.github/workflows/nightly-cli.yml`) invokes the same script. Before promoting a release candidate, disable `BFP_SMOKE_ALLOW_MOCK` in that workflow so the run fails fast if OCCT cannot be initialised or drift is detected.

## 4. Investigating failures

1. Inspect `artifacts/nightly-cli/<graph>/manifest.json` for metadata about the failing export.
2. Compare the generated exports against the baselines in `goldens/cli/`.
3. If the underlying change is intentional, update the golden file and include the rationale in your commit message.
