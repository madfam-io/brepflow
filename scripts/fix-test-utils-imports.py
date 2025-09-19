#!/usr/bin/env python3
"""
Fix test-utils import paths across all generated tests
"""

import os
import re
import glob
from pathlib import Path

def calculate_relative_path(from_file, to_file):
    """Calculate the correct relative import path from one file to another."""
    from_path = Path(from_file).parent
    to_path = Path(to_file).parent

    # Calculate relative path
    try:
        rel_path = os.path.relpath(to_path, from_path)
        if rel_path == '.':
            return './test-utils'
        else:
            return f'./{rel_path}/test-utils'
    except ValueError:
        # Fallback for edge cases
        return '../test-utils'

def main():
    print("🔧 Fixing test-utils import paths")
    print("=" * 40)

    # Change to packages/nodes-core directory
    if not os.path.exists("src/nodes/generated"):
        os.chdir("packages/nodes-core")

    test_files = glob.glob("src/nodes/generated/**/*.test.ts", recursive=True)
    test_utils_file = "src/nodes/generated/test-utils.ts"

    print(f"Processing {len(test_files)} test files...")
    print(f"test-utils located at: {test_utils_file}")

    fixes_applied = 0
    files_changed = 0

    for test_file in test_files:
        with open(test_file, 'r') as f:
            content = f.read()

        original_content = content

        # Calculate the correct relative path for this test file
        correct_path = calculate_relative_path(test_file, test_utils_file)

        # Replace any existing test-utils import with the correct path
        patterns = [
            r"from '[^']*test-utils'",
            r'from "[^"]*test-utils"',
        ]

        for pattern in patterns:
            content = re.sub(pattern, f"from '{correct_path}'", content)

        if content != original_content:
            with open(test_file, 'w') as f:
                f.write(content)
            files_changed += 1
            fixes_applied += 1

    print(f"Files changed: {files_changed}")
    print(f"Total fixes applied: {fixes_applied}")

    # Test the fix with a sample file
    sample_file = "src/nodes/generated/solid/primitives/box.test.ts"
    if os.path.exists(sample_file):
        with open(sample_file, 'r') as f:
            content = f.read()
        test_utils_match = re.search(r"from '([^']*test-utils)'", content)
        if test_utils_match:
            print(f"Sample fix: {sample_file} imports: {test_utils_match.group(1)}")

    return 0

if __name__ == "__main__":
    exit(main())