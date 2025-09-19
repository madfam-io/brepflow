#!/usr/bin/env python3
"""
Quick Import Fix - Direct pattern replacement for BrepFlow test imports
"""

import os
import re
import glob
from pathlib import Path

def main():
    print("🔧 Quick Import Fix")
    print("=" * 30)

    # Change to packages/nodes-core directory
    if not os.path.exists("src/nodes/generated"):
        os.chdir("packages/nodes-core")

    test_files = glob.glob("src/nodes/generated/**/*.test.ts", recursive=True)
    print(f"Processing {len(test_files)} test files...")

    fixes_applied = 0
    files_changed = 0

    for test_file in test_files:
        with open(test_file, 'r') as f:
            content = f.read()

        original_content = content

        # Direct pattern replacements
        patterns = [
            # Common single-word cases
            (r"from '\.\/(\w+)node'", r"from './\1.node'"),
            # Hyphenated cases with '-node' suffix
            (r"from '\.\/([a-z]+)([a-z]+)-node'", r"from './\1-\2.node'"),
            # Complex cases - map specific known problematic patterns
            (r"from '\.\/exportobj-node'", r"from './export-o-b-j.node'"),
            (r"from '\.\/importobj-node'", r"from './import-o-b-j.node'"),
            (r"from '\.\/exportstl-node'", r"from './export-s-t-l.node'"),
            (r"from '\.\/importstl-node'", r"from './import-s-t-l.node'"),
            (r"from '\.\/exportply-node'", r"from './export-p-l-y.node'"),
            (r"from '\.\/importply-node'", r"from './import-p-l-y.node'"),
            (r"from '\.\/export3mf-node'", r"from './export3-m-f.node'"),
            (r"from '\.\/meshtoshape-node'", r"from './mesh-to-shape.node'"),
        ]

        for pattern, replacement in patterns:
            new_content = re.sub(pattern, replacement, content, flags=re.IGNORECASE)
            if new_content != content:
                content = new_content
                fixes_applied += 1

        if content != original_content:
            with open(test_file, 'w') as f:
                f.write(content)
            files_changed += 1

    print(f"Files changed: {files_changed}")
    print(f"Total fixes applied: {fixes_applied}")

    # Quick verification
    issues = 0
    for test_file in test_files[:50]:  # Check first 50 files
        with open(test_file, 'r') as f:
            content = f.read()
        if re.search(r"from '\.\/[^']*node[^']*'", content) and not re.search(r"from '\.\/[^']*\.node'", content):
            issues += 1

    print(f"Remaining issues in sample of 50 files: {issues}")
    return 0

if __name__ == "__main__":
    exit(main())