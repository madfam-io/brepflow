#!/bin/bash

# BrepFlow Production Build Script
# Builds the application for production deployment with real OCCT geometry

set -e

echo "🚀 BrepFlow Production Build"
echo "============================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed${NC}"
    exit 1
fi

# Check if pnpm is installed
if ! command -v pnpm &> /dev/null; then
    echo -e "${RED}❌ pnpm is not installed${NC}"
    echo "Install with: npm install -g pnpm"
    exit 1
fi

# Set production environment
export NODE_ENV=production
export ENABLE_MOCK_GEOMETRY=false
export REQUIRE_REAL_OCCT=true
export VALIDATE_GEOMETRY_OUTPUT=true
export ENABLE_EXPORT_VALIDATION=true

echo -e "${YELLOW}📦 Installing dependencies...${NC}"
pnpm install --frozen-lockfile

echo -e "${YELLOW}🔨 Building OCCT WASM module...${NC}"
if [ ! -f "packages/engine-occt/wasm/occt.wasm" ]; then
    echo "Building OCCT from source (this may take 10-15 minutes)..."
    pnpm -w run build:wasm
else
    echo "OCCT WASM module already built, skipping..."
fi

echo -e "${YELLOW}🏗️ Building packages in dependency order...${NC}"
# Build in correct order to respect dependencies
pnpm --filter @brepflow/types run build
pnpm --filter @brepflow/schemas run build
pnpm --filter @brepflow/engine-core run build
pnpm --filter @brepflow/engine-occt run build
pnpm --filter @brepflow/viewport run build
pnpm --filter @brepflow/nodes-core run build
pnpm --filter @brepflow/sdk run build

echo -e "${YELLOW}🎨 Building Studio application...${NC}"
cd apps/studio

# Use production Vite config
vite build --config vite.config.production.ts

echo -e "${YELLOW}🔍 Verifying production build...${NC}"
# Check that no mock references exist in the build
if grep -r "MockGeometry" dist-production/ 2>/dev/null; then
    echo -e "${RED}❌ Warning: Found MockGeometry references in production build!${NC}"
    echo "This should not happen in a proper production build."
    exit 1
fi

# Check that WASM files are present
if [ ! -f "dist-production/occt.wasm" ]; then
    echo -e "${YELLOW}⚠️ Copying OCCT WASM files to dist...${NC}"
    cp ../../packages/engine-occt/wasm/occt.* dist-production/
fi

# Generate build manifest
echo -e "${YELLOW}📝 Generating build manifest...${NC}"
cat > dist-production/build-manifest.json << EOF
{
  "version": "$(node -p "require('./package.json').version")",
  "buildDate": "$(date -u +"%Y-%m-%dT%H:%M:%SZ")",
  "environment": "production",
  "features": {
    "mockGeometry": false,
    "realOCCT": true,
    "geometryValidation": true,
    "exportValidation": true
  },
  "wasm": {
    "present": $([ -f "dist-production/occt.wasm" ] && echo "true" || echo "false"),
    "size": $([ -f "dist-production/occt.wasm" ] && wc -c < "dist-production/occt.wasm" || echo "0")
  }
}
EOF

# Check build size
TOTAL_SIZE=$(du -sh dist-production | cut -f1)
echo -e "${GREEN}✅ Production build complete!${NC}"
echo -e "Build size: ${TOTAL_SIZE}"
echo -e "Output directory: apps/studio/dist-production"

# Optional: Run production tests
if [ "$1" == "--test" ]; then
    echo -e "${YELLOW}🧪 Running production tests...${NC}"
    cd ../..
    NODE_ENV=production pnpm test
fi

# Optional: Start preview server
if [ "$1" == "--preview" ]; then
    echo -e "${YELLOW}🌐 Starting preview server...${NC}"
    cd apps/studio
    vite preview --port 4173 --config vite.config.production.ts
fi

echo -e "${GREEN}🎉 Production build ready for deployment!${NC}"
echo ""
echo "Next steps:"
echo "1. Deploy dist-production/ to your hosting provider"
echo "2. Ensure COOP/COEP headers are configured on the server"
echo "3. Verify WebAssembly support in target browsers"
echo "4. Monitor application health at /api/health"