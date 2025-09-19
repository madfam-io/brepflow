#!/usr/bin/env python3
"""
Complete Import Fix for BrepFlow Generated Tests

This script systematically fixes ALL import mismatches by:
1. Finding actual .node.ts files
2. Mapping them to test file import patterns
3. Fixing ALL problematic imports
"""

import os
import re
import glob
from pathlib import Path

def get_actual_node_files():
    """Get all actual .node.ts files and their expected import paths."""
    node_files = glob.glob("src/nodes/generated/**/*.node.ts", recursive=True)
    mapping = {}

    for node_file in node_files:
        path = Path(node_file)
        # Extract the directory and filename
        directory = path.parent
        correct_name = path.stem  # e.g., 'remesh-uniform' from 'remesh-uniform.node.ts'

        # Expected import should be './correct-name.node'
        expected_import = f'./{correct_name}.node'

        # Store relative to the directory where the test file would be
        mapping[str(directory)] = mapping.get(str(directory), {})
        mapping[str(directory)][correct_name] = expected_import

    return mapping

def find_incorrect_imports():
    """Find all test files with incorrect imports."""
    test_files = glob.glob("src/nodes/generated/**/*.test.ts", recursive=True)
    issues = []

    for test_file in test_files:
        with open(test_file, 'r') as f:
            content = f.read()

        # Find import statements
        imports = re.findall(r"from '(\./[^']+)'", content)
        for imp in imports:
            if not imp.endswith('.node') or '-node' in imp or imp.count('.') > 2:
                issues.append((test_file, imp))

    return issues

def fix_single_test_file(test_file):
    """Fix imports in a single test file."""
    with open(test_file, 'r') as f:
        content = f.read()

    original_content = content

    # Get the directory of this test file
    test_dir = Path(test_file).parent

    # Find all .node.ts files in the same directory
    node_files = list(test_dir.glob("*.node.ts"))

    # Create mapping for this directory
    local_mapping = {}
    for node_file in node_files:
        node_name = node_file.stem  # e.g., 'box' from 'box.node.ts'

        # Common incorrect patterns that should map to this file
        incorrect_patterns = [
            f'{node_name}node',  # 'boxnode'
            f'{node_name}-node', # 'box-node'
            f'{node_name.replace("-", "")}node',  # 'remeshuniformnode'
            f'{node_name.replace("-", "")}-node', # 'remeshuniform-node'
        ]

        for pattern in incorrect_patterns:
            local_mapping[pattern] = f'{node_name}.node'

    # Apply fixes
    def replace_import(match):
        import_path = match.group(1)[2:]  # Remove './' prefix
        if import_path in local_mapping:
            return f"from './{local_mapping[import_path]}'"
        return match.group(0)

    # Apply replacements
    content = re.sub(r"from '(\./[^']+)'", replace_import, content)

    if content != original_content:
        with open(test_file, 'w') as f:
            f.write(content)
        return True
    return False

def main():
    print("🔧 Complete BrepFlow Import Fix")
    print("=" * 50)

    # Change to packages/nodes-core directory
    if not os.path.exists("src/nodes/generated"):
        os.chdir("packages/nodes-core")
        if not os.path.exists("src/nodes/generated"):
            print("❌ Cannot find src/nodes/generated directory")
            return 1

    print("📊 Analyzing current state...")

    # Find all test files
    test_files = glob.glob("src/nodes/generated/**/*.test.ts", recursive=True)
    print(f"Found {len(test_files)} test files")

    # Find issues
    issues = find_incorrect_imports()
    print(f"Found {len(issues)} import issues")

    if len(issues) > 0:
        print("Sample issues:")
        for test_file, imp in issues[:5]:
            print(f"  {test_file}: {imp}")

    print(f"\n🔧 Fixing imports in {len(test_files)} files...")

    files_fixed = 0
    for test_file in test_files:
        if fix_single_test_file(test_file):
            files_fixed += 1
            print(f"  ✅ Fixed: {test_file}")

    print(f"\n📊 Results:")
    print(f"  Files processed: {len(test_files)}")
    print(f"  Files fixed: {files_fixed}")

    # Verify fixes
    print(f"\n🔍 Verification:")
    remaining_issues = find_incorrect_imports()
    print(f"Remaining issues: {len(remaining_issues)}")

    if len(remaining_issues) == 0:
        print("🎉 All import issues appear to be resolved!")
    else:
        print("⚠️  Some issues remain:")
        for test_file, imp in remaining_issues[:5]:
            print(f"  {test_file}: {imp}")

    return 0

if __name__ == "__main__":
    exit(main())