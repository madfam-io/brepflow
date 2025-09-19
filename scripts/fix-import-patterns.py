#!/usr/bin/env python3
"""
Precise Import Path Fixer for BrepFlow Generated Tests

Fixes the systematic import path mismatches in 916 generated test files.
Pattern: './somenode' or './some-thing-node' → './some-thing.node'
"""

import os
import re
import glob
import shutil
from pathlib import Path

def analyze_import_patterns():
    """Analyze current import patterns to understand the transformation needed."""
    print("🔍 Analyzing import patterns...")

    test_files = glob.glob("src/nodes/generated/**/*.test.ts", recursive=True)
    node_files = glob.glob("src/nodes/generated/**/*.node.ts", recursive=True)

    print(f"Found {len(test_files)} test files")
    print(f"Found {len(node_files)} node files")

    # Extract import patterns
    import_patterns = {}
    for test_file in test_files[:10]:  # Sample first 10
        with open(test_file, 'r') as f:
            content = f.read()
            imports = re.findall(r"from '\./([^']+)'", content)
            if imports:
                import_patterns[test_file] = imports

    print("\nSample import patterns found:")
    for file, imports in list(import_patterns.items())[:5]:
        print(f"  {file}: {imports}")

    return test_files, node_files

def create_import_mapping(node_files):
    """Create mapping from incorrect import paths to correct ones."""
    mapping = {}

    for node_file in node_files:
        # Extract the correct import name
        node_path = Path(node_file)
        correct_name = node_path.stem  # e.g., 'remesh-uniform' from 'remesh-uniform.node.ts'

        # Generate the incorrect import patterns that might be used
        incorrect_patterns = [
            correct_name.replace('-', '') + 'node',  # 'remeshuniform-node'
            correct_name.replace('-', '') + '-node',  # 'remeshuniform-node'
            correct_name + '-node',  # 'remesh-uniform-node'
        ]

        for incorrect in incorrect_patterns:
            mapping[incorrect] = correct_name + '.node'

    # Add common specific mappings
    common_mappings = {
        'boxnode': 'box.node',
        'spherenode': 'sphere.node',
        'cylindernode': 'cylinder.node',
        'conenode': 'cone.node',
        'torusnode': 'torus.node',
        'tessellate-node': 'tessellate.node',
        'remeshuniform-node': 'remesh-uniform.node',
        'adaptivetessellation-node': 'adaptive-tessellation.node',
        'quadmesh-node': 'quad-mesh.node',
        'voxelmesh-node': 'voxel-mesh.node',
    }

    mapping.update(common_mappings)
    return mapping

def fix_test_file(test_file, import_mapping):
    """Fix imports in a single test file."""
    with open(test_file, 'r') as f:
        content = f.read()

    original_content = content
    fixes_applied = 0

    # Find all import statements
    import_pattern = r"from '\./([^']+)'"

    def replace_import(match):
        nonlocal fixes_applied
        import_path = match.group(1)

        if import_path in import_mapping:
            fixes_applied += 1
            return f"from './{import_mapping[import_path]}'"
        return match.group(0)

    # Apply replacements
    content = re.sub(import_pattern, replace_import, content)

    if content != original_content:
        with open(test_file, 'w') as f:
            f.write(content)
        return fixes_applied

    return 0

def main():
    print("🔧 BrepFlow Import Path Fixer")
    print("=" * 50)

    # Change to packages/nodes-core directory
    if not os.path.exists("src/nodes/generated"):
        os.chdir("packages/nodes-core")
        if not os.path.exists("src/nodes/generated"):
            print("❌ Cannot find src/nodes/generated directory")
            return 1

    # Create backup
    backup_name = f"test-backup-{Path.cwd().name}.tar.gz"
    print(f"📦 Creating backup: {backup_name}")
    os.system(f"tar -czf ../../{backup_name} src/nodes/generated/")

    # Analyze patterns
    test_files, node_files = analyze_import_patterns()

    # Create mapping
    print("\n🗺️  Creating import mapping...")
    import_mapping = create_import_mapping(node_files)

    print(f"Generated {len(import_mapping)} import mappings")
    print("Sample mappings:")
    for incorrect, correct in list(import_mapping.items())[:5]:
        print(f"  '{incorrect}' → '{correct}'")

    # Apply fixes
    print(f"\n🔧 Applying fixes to {len(test_files)} test files...")
    total_fixes = 0
    files_fixed = 0

    for test_file in test_files:
        fixes = fix_test_file(test_file, import_mapping)
        if fixes > 0:
            files_fixed += 1
            total_fixes += fixes
            print(f"  ✅ {test_file}: {fixes} fixes")

    print(f"\n📊 Summary:")
    print(f"  Files processed: {len(test_files)}")
    print(f"  Files modified: {files_fixed}")
    print(f"  Total import fixes: {total_fixes}")

    # Verify some common patterns
    print(f"\n🔍 Verification:")
    remaining_issues = 0
    for pattern in ['boxnode', 'spherenode', 'remeshuniform-node']:
        matches = os.system(f"grep -r \"from '\./{pattern}'\" src/nodes/generated/ >/dev/null 2>&1")
        if matches == 0:  # grep found matches
            print(f"  ❌ Still found '{pattern}' imports")
            remaining_issues += 1
        else:
            print(f"  ✅ '{pattern}' imports fixed")

    if remaining_issues == 0:
        print("\n🎉 All common import patterns appear to be fixed!")
    else:
        print(f"\n⚠️  {remaining_issues} patterns still need attention")

    print(f"\nNext step: cd packages/nodes-core && pnpm test -- --reporter=basic")
    return 0

if __name__ == "__main__":
    exit(main())