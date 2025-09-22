#!/usr/bin/env bash

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
OUTPUT_ROOT="${OUTPUT_ROOT:-$PROJECT_ROOT/artifacts/nightly-cli}"
GOLDEN_ROOT="$PROJECT_ROOT/goldens/cli"

GRAPHS=(
  "$PROJECT_ROOT/packages/examples/graphs/simple-box.bflow.json"
  "$PROJECT_ROOT/packages/examples/graphs/enclosure.bflow.json"
)

RUN_WITH_MOCK_FALLBACK=${BFP_SMOKE_ALLOW_MOCK:-false}

echo "🔧 Building CLI package"
pnpm --filter @brepflow/cli run build

echo "🧹 Preparing output directory at $OUTPUT_ROOT"
rm -rf "$OUTPUT_ROOT"
mkdir -p "$OUTPUT_ROOT"

run_render() {
  local graph_path="$1"
  local output_dir="$2"
  shift 2
  pnpm --filter @brepflow/cli exec -- node -r ../../scripts/node-worker-polyfill.cjs dist/index.mjs render "$graph_path" \
    --out "$output_dir" \
    --export step,stl \
    --manifest "$@"
}

for GRAPH in "${GRAPHS[@]}"; do
  if [ ! -f "$GRAPH" ]; then
    echo "⚠️  Graph file not found: $GRAPH" >&2
    continue
  fi

  NAME="$(basename "$GRAPH" .bflow.json)"
  DEST="$OUTPUT_ROOT/$NAME"
  mkdir -p "$DEST"

  echo "🚀 Rendering $NAME with real OCCT (if available)"

  if run_render "$GRAPH" "$DEST"; then
    echo "✅ Completed render for $NAME using OCCT"
  else
    echo "⚠️  Real OCCT render failed for $NAME"
    if [ "$RUN_WITH_MOCK_FALLBACK" != "true" ]; then
      echo "💥 Set BFP_SMOKE_ALLOW_MOCK=true to permit fallback to mock geometry" >&2
      exit 1
    fi

    echo "🔁 Falling back to mock geometry for $NAME"
    run_render "$GRAPH" "$DEST" --mock
  fi
done

node <<'NODE'
const fs = require('fs');
const path = require('path');

const projectRoot = path.join(__dirname, '..');
const outputRoot = process.env.OUTPUT_ROOT || path.join(projectRoot, 'artifacts', 'nightly-cli');
const goldenRoot = path.join(projectRoot, 'goldens', 'cli');
const allowMockFallback = process.env.BFP_SMOKE_ALLOW_MOCK === 'true';

const summary = {};
const failures = [];

if (!fs.existsSync(outputRoot)) {
  console.warn('No CLI smoke outputs found.');
  process.exit(0);
}

for (const dir of fs.readdirSync(outputRoot)) {
  const manifestPath = path.join(outputRoot, dir, 'manifest.json');
  if (!fs.existsSync(manifestPath)) {
    failures.push(`Missing manifest for ${dir}`);
    continue;
  }

  try {
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    const exports = (manifest.exports || []).map((entry) => ({
      filename: entry.filename,
      format: entry.format,
      size: entry.size || 0,
      exists: fs.existsSync(path.join(outputRoot, dir, entry.filename))
    }));

    summary[dir] = {
      graph: manifest.graph,
      mockGeometry: Boolean(manifest.mockGeometry),
      exports,
      evaluationTime: manifest.evaluationTime
    };

    const goldenPath = path.join(goldenRoot, `${dir}.json`);
    if (fs.existsSync(goldenPath)) {
      const golden = JSON.parse(fs.readFileSync(goldenPath, 'utf8'));
      const actualFormats = exports.map((entry) => entry.format).sort();
      const expectedFormats = (golden.exports || []).slice().sort();
      if (JSON.stringify(actualFormats) !== JSON.stringify(expectedFormats)) {
        failures.push(`Export formats mismatch for ${dir}: expected ${expectedFormats.join(',')}, got ${actualFormats.join(',')}`);
      }

      for (const entry of exports) {
        if (!entry.exists || entry.size === 0) {
          failures.push(`Missing or empty export ${entry.filename} for ${dir}`);
        }
      }

      if (golden.allowMock === false && manifest.mockGeometry) {
        if (!allowMockFallback) {
          failures.push(`Mock geometry fallback detected for ${dir} but goldens require real OCCT`);
        } else {
          summary[dir].mockFallback = true;
        }
      }
    } else {
      console.warn(`No golden baseline found for ${dir}; skipping comparison.`);
    }
  } catch (error) {
    summary[dir] = { error: String(error) };
    failures.push(`Failed to parse manifest for ${dir}: ${error.message}`);
  }
}

const summaryPath = path.join(outputRoot, 'summary.json');
fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2));
console.log(`📄 CLI smoke summary written to ${summaryPath}`);

if (failures.length > 0) {
  console.error('❌ CLI smoke validation failed:');
  failures.forEach((failure) => console.error(`  • ${failure}`));
  process.exit(1);
}

console.log('✅ CLI smoke validation passed');
NODE

echo "✅ CLI smoke run complete"
