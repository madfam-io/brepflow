#!/usr/bin/env bash

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
OUTPUT_ROOT="${OUTPUT_ROOT:-$PROJECT_ROOT/artifacts/nightly-cli}"

GRAPHS=(
  "$PROJECT_ROOT/packages/examples/graphs/simple-box.bflow.json"
  "$PROJECT_ROOT/packages/examples/graphs/enclosure.bflow.json"
)

echo "🔧 Building CLI package"
pnpm --filter @brepflow/cli run build

echo "🧹 Preparing output directory at $OUTPUT_ROOT"
rm -rf "$OUTPUT_ROOT"
mkdir -p "$OUTPUT_ROOT"

for GRAPH in "${GRAPHS[@]}"; do
  if [ ! -f "$GRAPH" ]; then
    echo "⚠️  Graph file not found: $GRAPH" >&2
    continue
  fi

  NAME="$(basename "$GRAPH" .bflow.json)"
  DEST="$OUTPUT_ROOT/$NAME"
  mkdir -p "$DEST"

  echo "🚀 Rendering $NAME"
  pnpm --filter @brepflow/cli exec brepflow render "$GRAPH" \
    --out "$DEST" \
    --export step,stl \
    --mock \
    --manifest
done

node <<'NODE'
const fs = require('fs');
const path = require('path');

const outputRoot = process.env.OUTPUT_ROOT || path.join(__dirname, '..', 'artifacts', 'nightly-cli');
const summary = {};

if (!fs.existsSync(outputRoot)) {
  process.exit(0);
}

for (const dir of fs.readdirSync(outputRoot)) {
  const manifestPath = path.join(outputRoot, dir, 'manifest.json');
  if (!fs.existsSync(manifestPath)) continue;

  try {
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    summary[dir] = {
      graph: manifest.graph,
      exports: (manifest.exports || []).map(entry => ({
        filename: entry.filename,
        format: entry.format,
        size: entry.size || 0,
      })),
      mockGeometry: Boolean(manifest.mockGeometry),
    };
  } catch (error) {
    summary[dir] = { error: String(error) };
  }
}

const summaryPath = path.join(outputRoot, 'summary.json');
fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2));
console.log(`📄 CLI smoke summary written to ${summaryPath}`);
NODE

echo "✅ CLI smoke run complete"
