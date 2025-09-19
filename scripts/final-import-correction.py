#!/usr/bin/env python3
"""
Final Import Correction - Fix regex artifacts and ensure all imports are correct
"""

import os
import re
import glob
from pathlib import Path

def main():
    print("🔧 Final Import Correction")
    print("=" * 30)

    # Change to packages/nodes-core directory
    if not os.path.exists("src/nodes/generated"):
        os.chdir("packages/nodes-core")

    test_files = glob.glob("src/nodes/generated/**/*.test.ts", recursive=True)
    print(f"Correcting {len(test_files)} test files...")

    fixes_applied = 0
    files_changed = 0

    for test_file in test_files:
        with open(test_file, 'r') as f:
            content = f.read()

        original_content = content

        # Fix regex artifacts and ensure correct patterns
        corrections = [
            # Fix broken single-letter patterns
            (r"from '\.\/bo-x\.node'", r"from './box.node'"),
            (r"from '\.\/con-e\.node'", r"from './cone.node'"),
            (r"from '\.\/toru-s\.node'", r"from './torus.node'"),
            (r"from '\.\/spher-e\.node'", r"from './sphere.node'"),
            (r"from '\.\/cylinde-r\.node'", r"from './cylinder.node'"),

            # Fix file-specific patterns that need exact mapping
            (r"from '\.\/exportob-j\.node'", r"from './export-o-b-j.node'"),
            (r"from '\.\/importob-j\.node'", r"from './import-o-b-j.node'"),
            (r"from '\.\/exportst-l\.node'", r"from './export-s-t-l.node'"),
            (r"from '\.\/importst-l\.node'", r"from './import-s-t-l.node'"),
            (r"from '\.\/exportpl-y\.node'", r"from './export-p-l-y.node'"),
            (r"from '\.\/importpl-y\.node'", r"from './import-p-l-y.node'"),
            (r"from '\.\/meshtoshap-e\.node'", r"from './mesh-to-shape.node'"),

            # Fix any remaining patterns with broken hyphens
            (r"from '\.\/([a-z]+)-([a-z])\.node'", r"from './\1\2.node'"),
        ]

        for pattern, replacement in corrections:
            new_content = re.sub(pattern, replacement, content)
            if new_content != content:
                content = new_content
                fixes_applied += 1

        if content != original_content:
            with open(test_file, 'w') as f:
                f.write(content)
            files_changed += 1

    print(f"Files corrected: {files_changed}")
    print(f"Total corrections applied: {fixes_applied}")

    # Now let's run a test to see how many tests can actually load
    print("\n🧪 Testing import resolution...")

    # Try to run a basic test to see if imports work
    sample_tests = [
        "src/nodes/generated/solid/primitives/box.test.ts",
        "src/nodes/generated/mesh/files/export-o-b-j.test.ts",
        "src/nodes/generated/mesh/tessellation/tessellate.test.ts"
    ]

    for test_file in sample_tests:
        if os.path.exists(test_file):
            with open(test_file, 'r') as f:
                content = f.read()
            import_match = re.search(r"from '(\./[^']+)'", content)
            if import_match:
                print(f"  {test_file}: {import_match.group(1)}")

    return 0

if __name__ == "__main__":
    exit(main())