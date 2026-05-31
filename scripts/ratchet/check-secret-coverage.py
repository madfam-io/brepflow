#!/usr/bin/env python3
"""
Production-readiness ratchet F5 — Secret coverage.

Fails the build when a Deployment ``envFrom: secretRef`` points at a Secret
whose canonical schema (``infra/k8s/base/secrets-example.yaml`` or any
``*.example.yaml``) declares keys the production cluster Secret won't
necessarily have populated — typically because the ExternalSecret manifest
that's supposed to populate it is absent from the kustomization, or the
SecretStore is broken.

This is a **schema-vs-manifest** check, not a live-cluster check (which
would require credentials). It enforces:

  1. Every ``envFrom: secretRef`` in a Deployment / StatefulSet has a
     corresponding ``Secret`` or ``ExternalSecret`` declared somewhere in
     the kustomized resource graph.
  2. If a ``secrets-example.yaml`` template exists declaring required keys
     for that Secret name, those keys MUST also appear in the
     ExternalSecret's ``data`` array (or the literal Secret's
     ``stringData`` / ``data`` block).

Why: live evidence — ``pravara-secrets`` has a single ``PLACEHOLDER`` key
because the ExternalSecret manifest sits in
``infra/k8s/base/external-secrets/external-secrets.yaml`` but the
kustomization at ``infra/k8s/base/external-secrets/kustomization.yaml``
only includes ``pravara-admin-auth.yaml``. Same gap caught
forj-secrets shipping ``DATABASE_URL=postgresql://placeholder:...``.

Usage:
    python3 check-secret-coverage.py infra/k8s/

Exit codes:
    0 — every envFrom secretRef is covered by Secret/ExternalSecret
        declaring at least the schema's required keys
    1 — at least one gap

Exemptions:
    ``SECRET_COVERAGE_EXEMPT_<SECRET>=<reason>``.

Limitations:
    - Doesn't validate live cluster state. To detect placeholder values
      in live secrets, run ``check-secret-placeholders.py`` (separate
      tool, requires kubectl).
    - Doesn't follow ESO's Vault paths. If the Vault backend itself is
      broken (e.g. invalid SecretStore), this lint won't catch that —
      Phase 3 stale-deploy alarm + ESO health metric do.
"""

from __future__ import annotations

import argparse
import os
import re
import sys
from pathlib import Path
from typing import Iterable

try:
    import yaml
except ImportError:
    sys.stderr.write("error: pyyaml is required (pip install pyyaml)\n")
    sys.exit(2)

EXEMPT_PREFIX = "SECRET_COVERAGE_EXEMPT_"
WORKLOAD_KINDS = {"Deployment", "StatefulSet", "DaemonSet"}


def exemption_key(name: str) -> str:
    return EXEMPT_PREFIX + re.sub(r"[^A-Z0-9]", "_", name.upper())


def walk_docs(roots: Iterable[Path]) -> Iterable[tuple[Path, dict]]:
    for root in roots:
        if root.is_file() and root.suffix in {".yaml", ".yml"}:
            yield from _docs(root)
        elif root.is_dir():
            for path in (*root.rglob("*.yaml"), *root.rglob("*.yml")):
                yield from _docs(path)


def _docs(path: Path) -> Iterable[tuple[Path, dict]]:
    try:
        with path.open() as fh:
            for doc in yaml.safe_load_all(fh):
                if isinstance(doc, dict):
                    yield path, doc
    except yaml.YAMLError:
        pass


def find_violations(roots: Iterable[Path], exemptions: set[str]) -> list[str]:
    docs = list(walk_docs(roots))

    # Map secret-name -> set of declared keys (from Secret + ExternalSecret + example schema)
    declared_keys: dict[str, set[str]] = {}
    schema_keys: dict[str, set[str]] = {}
    referencing_workloads: dict[str, list[str]] = {}

    for path, doc in docs:
        kind = doc.get("kind")
        meta = doc.get("metadata") or {}
        name = meta.get("name")
        if not name:
            continue

        if kind == "Secret":
            keys = set((doc.get("data") or {}).keys()) | set(
                (doc.get("stringData") or {}).keys()
            )
            declared_keys.setdefault(name, set()).update(keys)
            # Treat *.example.* and secrets-example as schemas
            if "example" in path.name.lower():
                schema_keys.setdefault(name, set()).update(keys)
        elif kind == "ExternalSecret":
            spec = doc.get("spec") or {}
            keys = {
                d.get("secretKey")
                for d in (spec.get("data") or [])
                if isinstance(d, dict) and d.get("secretKey")
            }
            target = (spec.get("target") or {}).get("name") or name
            declared_keys.setdefault(target, set()).update(keys)
        elif kind in WORKLOAD_KINDS:
            tspec = ((doc.get("spec") or {}).get("template") or {}).get("spec") or {}
            for c in (tspec.get("containers") or []):
                for ef in (c.get("envFrom") or []):
                    ref = ef.get("secretRef")
                    if isinstance(ref, dict) and ref.get("name"):
                        sec_name = ref["name"]
                        referencing_workloads.setdefault(sec_name, []).append(
                            f"{path}:{name}"
                        )

    failures: list[str] = []
    for sec_name, refs in referencing_workloads.items():
        if exemption_key(sec_name) in exemptions:
            continue
        if sec_name not in declared_keys:
            failures.append(
                f"Secret {sec_name!r} is referenced by envFrom in {len(refs)} "
                f"workload(s) ({refs[0]} ...) but no Secret/ExternalSecret "
                f"declares it in the kustomized resource graph. Add an "
                f"ExternalSecret manifest (and ensure it's in the kustomization) "
                f"or set ``{exemption_key(sec_name)}=<reason>``."
            )
            continue
        # If a schema (*.example.yaml) declares required keys for this secret,
        # the actual Secret/ExternalSecret must declare at least those keys.
        required = schema_keys.get(sec_name, set())
        actual = declared_keys.get(sec_name, set())
        missing = required - actual
        if missing:
            failures.append(
                f"Secret {sec_name!r} is missing keys {sorted(missing)!r} "
                f"required by its schema (*.example.yaml). Add them to the "
                f"ExternalSecret manifest, or set "
                f"``{exemption_key(sec_name)}=<reason>``."
            )
    return failures


def main() -> int:
    p = argparse.ArgumentParser(description=__doc__.split("\n\n")[0])
    p.add_argument("roots", nargs="+", help="Directories or files to scan")
    args = p.parse_args()

    exemptions = {
        k for k, v in os.environ.items() if k.startswith(EXEMPT_PREFIX) and v.strip()
    }
    failures = find_violations([Path(r) for r in args.roots], exemptions)
    if failures:
        sys.stderr.write(
            "Secret coverage ratchet FAILED:\n\n"
            + "\n".join(f"  - {f}" for f in failures)
            + "\n\nA Deployment that envFrom-references a Secret which isn't "
            "declared anywhere in the kustomized graph will silently start "
            "with no env (or with values from a stale earlier shape). "
            "Symptoms: 'Authentication failed... credentials for placeholder', "
            "missing JWT_SECRET on auth verification, etc.\n"
        )
        return 1

    print("OK: every envFrom secretRef is covered by a declared Secret/ExternalSecret.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
