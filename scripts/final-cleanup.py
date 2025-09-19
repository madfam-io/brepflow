#!/usr/bin/env python3
"""
Final cleanup to catch any remaining import issues
"""

import os
import re
import glob

def main():
    print("🔧 Final Cleanup - Catching remaining import issues")
    print("=" * 55)

    if not os.path.exists("src/nodes/generated"):
        os.chdir("packages/nodes-core")

    test_files = glob.glob("src/nodes/generated/**/*.test.ts", recursive=True)

    fixes = 0
    for test_file in test_files:
        with open(test_file, 'r') as f:
            content = f.read()

        original_content = content

        # Fix any remaining issues like roundedbox.node -> rounded-box.node
        patterns = [
            (r"from '\.\/roundedbox\.node'", r"from './rounded-box.node'"),
            (r"from '\.\/([a-z]+)box\.node'", r"from './\1-box.node'"),
            (r"from '\.\/([a-z]+)sphere\.node'", r"from './\1-sphere.node'"),
            # Add more patterns as needed
        ]

        for pattern, replacement in patterns:
            content = re.sub(pattern, replacement, content)

        if content != original_content:
            with open(test_file, 'w') as f:
                f.write(content)
            fixes += 1
            print(f"  Fixed: {test_file}")

    print(f"Additional fixes applied: {fixes}")
    return 0

if __name__ == "__main__":
    exit(main())