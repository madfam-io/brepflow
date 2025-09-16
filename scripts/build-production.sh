#!/bin/bash

# Build script for production deployment (Vercel)
# Only builds the studio app and necessary dependencies

set -e

echo "Building production packages..."

# Build core packages first
pnpm --filter @brepflow/types build
pnpm --filter @brepflow/engine-core build
pnpm --filter @brepflow/engine-occt build
pnpm --filter @brepflow/nodes-core build
pnpm --filter @brepflow/viewport build
pnpm --filter @brepflow/sdk build

# Build the studio app
pnpm --filter @brepflow/studio build

echo "Production build complete!"