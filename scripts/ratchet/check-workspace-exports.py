#!/usr/bin/env python3
"""
Production-readiness ratchet F3 — workspace export conditions.

Fails the build when a workspace ``package.json`` declares subpath exports
under ``exports.*`` with an ``import`` condition but no ``require`` (or
``default``) condition.

Why: Most ecosystem TS packages compile via ``tsc --module Node16`` which
emits CommonJS at runtime. Consumer bundlers (Turbopack/Next, Jest) that
walk via Node's require algorithm fall through the conditions in order
(``types``, ``import``, ``require``, ``default``). When only ``import``
is declared, a CJS consumer cannot resolve the subpath — the symptom is
always ``Module not found: Can't resolve '@org/pkg/sub'`` despite the
file clearly existing on disk.

Live evidence: enclii ``@enclii/ui-components`` produced 147 Turbopack
errors of this exact shape — fixed in enclii#241 by adding ``require`` /
``default`` mirrors of every ``import`` entry.

Usage:
    python3 check-workspace-exports.py [REPO_ROOT]

If REPO_ROOT is omitted, scans the current working directory. Looks for
``packages/*/package.json`` and any ``package.json`` declaring a
``"workspaces"`` array.

Exit codes:
    0 — all subpath exports have both `import` AND `require` (or `default`)
    1 — at least one subpath export is import-only

Exemptions:

  Set env var ``WORKSPACE_EXPORTS_EXEMPT_<PACKAGE>=<reason>`` where
  ``<PACKAGE>`` is the uppercase-snake-case of the package name's last
  path segment, e.g. ``WORKSPACE_EXPORTS_EXEMPT_UI_COMPONENTS``.
"""

from __future__ import annotations

import argparse
import json
import os
import re
import sys
from pathlib import Path
from typing import Iterable

EXEMPT_PREFIX = "WORKSPACE_EXPORTS_EXEMPT_"


def exemption_key(pkg_name: str) -> str:
    leaf = pkg_name.rsplit("/", 1)[-1]
    return EXEMPT_PREFIX + re.sub(r"[^A-Z0-9]", "_", leaf.upper())


def find_workspace_packages(root: Path) -> Iterable[Path]:
    """Return every package.json under root that's part of a workspace."""
    seen: set[Path] = set()

    # Convention 1: explicit packages/*/package.json
    for pkg in sorted(root.glob("packages/*/package.json")):
        seen.add(pkg)
        yield pkg

    # Convention 2: pnpm-workspace.yaml + glob expansion
    pnpm_ws = root / "pnpm-workspace.yaml"
    if pnpm_ws.exists():
        try:
            import yaml
            with pnpm_ws.open() as fh:
                data = yaml.safe_load(fh) or {}
            for pattern in (data.get("packages") or []):
                if not isinstance(pattern, str):
                    continue
                # `packages/*` and similar
                for pkg in sorted(root.glob(f"{pattern}/package.json")):
                    if pkg not in seen:
                        seen.add(pkg)
                        yield pkg
        except ImportError:
            pass  # yaml optional for this tool

    # Convention 3: root package.json with `workspaces` field
    root_pkg = root / "package.json"
    if root_pkg.exists():
        try:
            with root_pkg.open() as fh:
                doc = json.load(fh)
            workspaces = doc.get("workspaces")
            if isinstance(workspaces, dict):
                workspaces = workspaces.get("packages") or []
            if isinstance(workspaces, list):
                for pattern in workspaces:
                    if not isinstance(pattern, str):
                        continue
                    for pkg in sorted(root.glob(f"{pattern}/package.json")):
                        if pkg not in seen:
                            seen.add(pkg)
                            yield pkg
        except json.JSONDecodeError:
            pass


def violation_for(path: Path, exemptions: set[str]) -> list[str]:
    """Return per-export-entry violation strings for one package.json."""
    try:
        with path.open() as fh:
            doc = json.load(fh)
    except (json.JSONDecodeError, OSError) as exc:
        return [f"{path}: could not parse package.json ({exc})"]

    name = doc.get("name") or "?"
    if exemption_key(name) in exemptions:
        return []

    exports = doc.get("exports")
    if not isinstance(exports, dict):
        return []

    issues: list[str] = []
    for subpath, conds in exports.items():
        if not isinstance(conds, dict):
            # Sugar form (string) maps to a single resolution — fine.
            continue
        has_import = "import" in conds
        has_require = "require" in conds or "default" in conds
        if has_import and not has_require:
            issues.append(
                f"{path}: package {name!r} export {subpath!r} declares "
                f"`import` but no `require`/`default`. CJS consumers can't "
                f"resolve. Add a mirror: "
                f'`"require": "{conds["import"]}"` (or `default`). '
                f"Set ``{exemption_key(name)}=<reason>`` to acknowledge."
            )
    return issues


def main() -> int:
    p = argparse.ArgumentParser(description=__doc__.split("\n\n")[0])
    p.add_argument(
        "root",
        nargs="?",
        default=".",
        help="Repo root (default: cwd). Scans packages/*/package.json + workspaces field.",
    )
    args = p.parse_args()

    root = Path(args.root).resolve()
    exemptions = {
        k for k, v in os.environ.items() if k.startswith(EXEMPT_PREFIX) and v.strip()
    }

    failures: list[str] = []
    n_packages = 0
    for pkg_json in find_workspace_packages(root):
        n_packages += 1
        failures.extend(violation_for(pkg_json, exemptions))

    if failures:
        sys.stderr.write(
            "Workspace exports ratchet FAILED:\n\n"
            + "\n".join(f"  - {f}" for f in failures)
            + "\n\nWhen `exports.*` declares `import` without `require`/`default`, "
            "CJS consumers (Jest test runners, Turbopack walking via require, "
            "etc.) silently fail with `Module not found: Can't resolve '@org/pkg/sub'` "
            "even though the file exists. Mirror every `import` entry with a "
            "`require` (or `default`) entry pointing at the same file.\n"
        )
        return 1

    if n_packages == 0:
        print(
            f"WARN: no workspace packages discovered under {root}. "
            f"Check for packages/*/package.json or a `workspaces` field in root package.json."
        )
        return 0
    print(
        f"OK: {n_packages} workspace package(s) checked; all subpath "
        f"exports declare both import and require/default conditions."
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
