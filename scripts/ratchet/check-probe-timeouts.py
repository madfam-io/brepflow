#!/usr/bin/env python3
"""
Production-readiness ratchet F2 — probe timeouts.

Fails the build when a workload's livenessProbe or readinessProbe omits
explicit ``timeoutSeconds`` (Kubernetes default is 1s — too tight for
real HTTP healthchecks under load — and silently leads to SIGTERM-storm
restarts that look like app bugs).

Detection rule:
  Every ``livenessProbe`` and ``readinessProbe`` of type httpGet, exec,
  or tcpSocket MUST declare an explicit ``timeoutSeconds: >= MIN_TIMEOUT``
  (default ``MIN_TIMEOUT = 3``).

Why: see RFC 0021. Live evidence:
  - digifab-quoting-api: 35 restarts in 173 min, exit 137 (SIGTERM)
    — fixed in digifab-quoting#48 by adding timeoutSeconds: 5
  - karafiel-beat: 5+ restarts in 30 min — fixed in karafiel#55

Usage:
    python3 check-probe-timeouts.py infra/k8s/

Exit codes:
    0 — all probes have explicit timeoutSeconds
    1 — at least one probe relies on the 1s default

Exemptions:

  Set env var ``PROBE_TIMEOUT_EXEMPT_<DEPLOYMENT>=<reason>`` where
  ``<DEPLOYMENT>`` is the uppercase-snake-case of the workload's
  ``metadata.name``.
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

EXEMPT_PREFIX = "PROBE_TIMEOUT_EXEMPT_"
WORKLOAD_KINDS = {"Deployment", "StatefulSet", "DaemonSet", "CronJob", "Job"}
PROBE_KINDS = ("livenessProbe", "readinessProbe")
PROBE_TYPES = {"httpGet", "exec", "tcpSocket", "grpc"}
DEFAULT_MIN_TIMEOUT = 3


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
    except yaml.YAMLError as exc:
        sys.stderr.write(f"warning: skipping {path} (YAML parse error: {exc})\n")


def iter_containers(doc: dict) -> Iterable[dict]:
    spec = doc.get("spec") or {}
    template = spec.get("template")
    if template is None and "jobTemplate" in spec:
        template = (spec.get("jobTemplate") or {}).get("spec", {}).get("template")
    pod_spec = ((template or {}).get("spec") or {})
    for c in (pod_spec.get("containers") or []):
        if isinstance(c, dict):
            yield c


def is_probe_definition(probe: dict) -> bool:
    """A probe definition has at least one probe type key (httpGet, etc.)."""
    return isinstance(probe, dict) and any(t in probe for t in PROBE_TYPES)


def find_violations(
    roots: Iterable[Path], exemptions: set[str], min_timeout: int
) -> list[str]:
    failures: list[str] = []
    for path, doc in walk_docs(roots):
        if doc.get("kind") not in WORKLOAD_KINDS:
            continue
        name = (doc.get("metadata") or {}).get("name") or "?"
        if exemption_key(name) in exemptions:
            continue
        for container in iter_containers(doc):
            for probe_kind in PROBE_KINDS:
                probe = container.get(probe_kind)
                if not is_probe_definition(probe):
                    continue
                ts = probe.get("timeoutSeconds")
                if ts is None:
                    failures.append(
                        f"{path}: {doc.get('kind')} {name!r} container "
                        f"{container.get('name','?')!r} {probe_kind} omits "
                        f"`timeoutSeconds` — relies on K8s 1s default. "
                        f"Set explicit `timeoutSeconds: >= {min_timeout}` "
                        f"or set ``{exemption_key(name)}=<reason>``."
                    )
                elif isinstance(ts, int) and ts < min_timeout:
                    failures.append(
                        f"{path}: {doc.get('kind')} {name!r} container "
                        f"{container.get('name','?')!r} {probe_kind} has "
                        f"`timeoutSeconds: {ts}` (< minimum {min_timeout}). "
                        f"Set ``{exemption_key(name)}=<reason>`` to acknowledge."
                    )
    return failures


def read_exemptions() -> set[str]:
    return {
        k for k, v in os.environ.items() if k.startswith(EXEMPT_PREFIX) and v.strip()
    }


def main() -> int:
    p = argparse.ArgumentParser(description=__doc__.split("\n\n")[0])
    p.add_argument("roots", nargs="+", help="Directories or files to scan")
    p.add_argument(
        "--min-timeout",
        type=int,
        default=DEFAULT_MIN_TIMEOUT,
        help=f"Minimum timeoutSeconds to require (default: {DEFAULT_MIN_TIMEOUT})",
    )
    args = p.parse_args()

    failures = find_violations(
        [Path(r) for r in args.roots], read_exemptions(), args.min_timeout
    )
    if failures:
        sys.stderr.write(
            "Probe timeout ratchet FAILED:\n\n"
            + "\n".join(f"  - {f}" for f in failures)
            + "\n\nThe Kubernetes default `timeoutSeconds: 1` is too tight for "
            "HTTP healthchecks under realistic load — GC pauses, Prisma pool "
            "init, and downstream deps routinely push p99 above 1s. The result "
            "is SIGTERM-storm restarts that look like app crashes.\n"
        )
        return 1

    print("OK: all liveness/readiness probes declare explicit timeoutSeconds.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
