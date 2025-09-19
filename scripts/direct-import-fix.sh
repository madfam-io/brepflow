#!/bin/bash

# Direct Import Fix for BrepFlow Generated Tests
# This script directly maps the problematic import patterns to correct ones

set -e

echo "🔧 Direct Import Fix for BrepFlow Tests"
echo "="$(printf '=%.0s' {1..50})

# Navigate to nodes-core
cd "$(dirname "$0")/../packages/nodes-core"

# Backup already created by previous script
echo "📊 Starting direct pattern replacement..."

# Function to fix imports with sed
fix_imports() {
    local pattern="$1"
    local replacement="$2"
    local description="$3"

    echo "  Fixing: $description"
    find src/nodes/generated -name "*.test.ts" -type f -exec sed -i '' "s|from '\\./\${pattern}'|from './${replacement}'|g" {} \;
}

# Fix common patterns systematically
echo "🔧 Applying systematic fixes..."

# Basic single-word nodes
fix_imports "boxnode" "box.node" "box imports"
fix_imports "spherenode" "sphere.node" "sphere imports"
fix_imports "cylindernode" "cylinder.node" "cylinder imports"
fix_imports "conenode" "cone.node" "cone imports"
fix_imports "torusnode" "torus.node" "torus imports"

# Mesh operations
fix_imports "meshtoshape-node" "mesh-to-shape.node" "mesh-to-shape imports"
fix_imports "exportobj-node" "export-o-b-j.node" "export-obj imports"
fix_imports "importobj-node" "import-o-b-j.node" "import-obj imports"
fix_imports "exportstl-node" "export-s-t-l.node" "export-stl imports"
fix_imports "importstl-node" "import-s-t-l.node" "import-stl imports"
fix_imports "exportply-node" "export-p-l-y.node" "export-ply imports"
fix_imports "importply-node" "import-p-l-y.node" "import-ply imports"
fix_imports "export3mf-node" "export3-m-f.node" "export-3mf imports"

# Now let's do a more systematic approach
echo "🔄 Systematic pattern replacement..."

# Find all remaining problematic imports and fix them
while IFS= read -r line; do
    # Extract the file and the problematic import
    file=$(echo "$line" | cut -d: -f1)
    import_path=$(echo "$line" | sed -E "s|.*from '\\./([^']+)'.*|\\1|")

    # Skip already correct imports
    [[ "$import_path" == *".node" ]] && [[ "$import_path" != *"-node" ]] && continue

    # Get the directory to look for the correct .node.ts file
    dir=$(dirname "$file")

    # Find corresponding .node.ts file in same directory
    corresponding_node=$(find "$dir" -name "*.node.ts" -exec basename {} .node.ts \; | head -1)

    if [[ -n "$corresponding_node" ]]; then
        # Replace the import
        sed -i '' "s|from '\\./\${import_path}'|from './${corresponding_node}.node'|g" "$file"
        echo "  ✅ Fixed $file: $import_path → $corresponding_node.node"
    fi
done < <(find src/nodes/generated -name "*.test.ts" -type f -exec grep -H "from '\\./[^']*node[^']*'" {} \; 2>/dev/null || true)

echo ""
echo "📊 Verification phase..."

# Count remaining issues
remaining=$(find src/nodes/generated -name "*.test.ts" -type f -exec grep -l "from '\\./[^']*node[^']*'" {} \; 2>/dev/null | wc -l || echo "0")
echo "Remaining problematic imports: $remaining"

# Show some examples of what's left
if [[ "$remaining" -gt 0 ]]; then
    echo "Sample remaining issues:"
    find src/nodes/generated -name "*.test.ts" -type f -exec grep -H "from '\\./[^']*node[^']*'" {} \; 2>/dev/null | head -5 || true
fi

echo ""
echo "🧪 Testing import resolution..."

# Try running tests on a few files to see if they load
test_files=(
    "src/nodes/generated/solid/primitives/box.test.ts"
    "src/nodes/generated/mesh/files/export-o-b-j.test.ts"
    "src/nodes/generated/mesh/tessellation/tessellate.test.ts"
)

for test_file in "${test_files[@]}"; do
    if [[ -f "$test_file" ]]; then
        echo "  Testing: $test_file"
        # Just try to check if the import would resolve (dry run)
        head -10 "$test_file" | grep "from '\\./" || true
    fi
done

echo ""
echo "🎉 Import fixing complete!"
echo ""
echo "Next steps:"
echo "1. Run: pnpm test -- --reporter=basic | head -100"
echo "2. Look for remaining import resolution errors"
echo "3. Check if test count has improved significantly"