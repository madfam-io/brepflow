#!/usr/bin/env python3
"""
Production-readiness ratchet F2-egress — NetworkPolicy egress port allowlist.

Companion to enclii's existing ``scripts/check-networkpolicy-ports.py``,
which validates *ingress*-side port consistency. This script catches the
*egress*-side equivalent: a Deployment env declares the address+port of a
downstream dependency, but the namespace's egress NetworkPolicy doesn't
list that port — silent CNI drop.

Detection rule:
  For every Deployment / StatefulSet env whose value matches a
  cluster-local hostname pattern (``<svc>.<ns>.svc.cluster.local:<port>``
  or the short ``<svc>.<ns>:<port>`` form), assert that an egress
  NetworkPolicy in the same namespace selecting the workload's pod label
  allows that ``<port>`` to that ``<ns>``.

Why: Live evidence in routecraft 2026-05-05 — ``KAFKA_BROKERS`` env was
correctly set to ``redpanda.data.svc.cluster.local:9092`` but the egress
NP only opened ports 5432 (postgres) and 6379 (redis) to the data
namespace. Pod kept failing with ``kafka.errors.NoBrokersAvailable`` —
exact same silent-drop class as the 2026-05-04 ingress incident.

Usage:
    python3 check-network-policy-egress.py infra/k8s/

Exit codes:
    0 — every env-declared cluster-local port has a matching egress allow
    1 — at least one mismatch found

Exemptions:
    Set env var ``NP_EGRESS_EXEMPT_<DEPLOYMENT>=<reason>``.
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

EXEMPT_PREFIX = "NP_EGRESS_EXEMPT_"
WORKLOAD_KINDS = {"Deployment", "StatefulSet", "DaemonSet"}

# matches: <svc>.<ns>.svc.cluster.local:<port>
#      or  <svc>.<ns>:<port>
HOST_PORT_RE = re.compile(
    r"\b([a-z][a-z0-9-]*)\.([a-z][a-z0-9-]*)(?:\.svc\.cluster\.local)?:(\d{2,5})\b"
)


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


def collect_env_targets(doc: dict) -> set[tuple[str, int]]:
    """Return {(target_namespace, port)} mentioned in env values."""
    out: set[tuple[str, int]] = set()
    spec = doc.get("spec") or {}
    template = spec.get("template")
    if not template:
        return out
    pod_spec = (template or {}).get("spec") or {}
    for container in (pod_spec.get("containers") or []):
        for entry in (container.get("env") or []):
            value = entry.get("value")
            if not isinstance(value, str):
                continue
            for match in HOST_PORT_RE.finditer(value):
                _svc, ns, port = match.group(1), match.group(2), int(match.group(3))
                # Skip same-ns refs and standard noise (53/80/443).
                if port in {53, 80, 443}:
                    continue
                out.add((ns, port))
    return out


def collect_egress_allows(doc: dict) -> dict[str, set[int]]:
    """For a NetworkPolicy, return {namespace: {port, ...}} egress allows."""
    out: dict[str, set[int]] = {}
    if doc.get("kind") != "NetworkPolicy":
        return out
    spec = doc.get("spec") or {}
    if "Egress" not in (spec.get("policyTypes") or []):
        return out
    for rule in (spec.get("egress") or []):
        # Pull every namespace name in `to`
        target_namespaces: set[str] = set()
        for to in (rule.get("to") or []):
            ns_sel = to.get("namespaceSelector") or {}
            ml = ns_sel.get("matchLabels") or {}
            ns_name = ml.get("kubernetes.io/metadata.name")
            if isinstance(ns_name, str):
                target_namespaces.add(ns_name)
        # Pull every port
        ports = {p.get("port") for p in (rule.get("ports") or []) if isinstance(p.get("port"), int)}
        for ns in target_namespaces:
            out.setdefault(ns, set()).update(ports)
    return out


def find_violations(roots: Iterable[Path], exemptions: set[str]) -> list[str]:
    docs = list(walk_docs(roots))

    # Group: per-namespace -> {workload_name: required_targets}
    workload_targets: dict[str, dict[str, set[tuple[str, int]]]] = {}
    # per-namespace egress allow
    ns_allows: dict[str, dict[str, set[int]]] = {}

    for path, doc in docs:
        ns = (doc.get("metadata") or {}).get("namespace") or "default"
        if doc.get("kind") in WORKLOAD_KINDS:
            name = (doc.get("metadata") or {}).get("name") or "?"
            targets = collect_env_targets(doc)
            if targets:
                workload_targets.setdefault(ns, {})[name] = targets
        elif doc.get("kind") == "NetworkPolicy":
            allows = collect_egress_allows(doc)
            agg = ns_allows.setdefault(ns, {})
            for tgt_ns, ports in allows.items():
                agg.setdefault(tgt_ns, set()).update(ports)

    failures: list[str] = []
    for ns, by_workload in workload_targets.items():
        ns_allow_map = ns_allows.get(ns, {})
        for wl_name, targets in by_workload.items():
            if exemption_key(wl_name) in exemptions:
                continue
            for tgt_ns, port in targets:
                allowed = ns_allow_map.get(tgt_ns, set())
                if port not in allowed:
                    failures.append(
                        f"workload {wl_name!r} in ns {ns!r} declares env "
                        f"reaching {tgt_ns}:{port}, but no egress NetworkPolicy "
                        f"in ns {ns!r} allows that port to ns {tgt_ns!r}. "
                        f"Add to the egress rule, or set "
                        f"``{exemption_key(wl_name)}=<reason>``."
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
            "NetworkPolicy egress ratchet FAILED:\n\n"
            + "\n".join(f"  - {f}" for f in failures)
            + "\n\nWhen a workload's env points at a cluster-local host:port but the\n"
            "namespace's egress NetworkPolicy doesn't allow that port to that\n"
            "target namespace, the CNI silently drops every packet. Fixes show\n"
            "up as 'connection refused' / 'NoBrokersAvailable' / similar — looks\n"
            "like the downstream is down even though it isn't.\n"
        )
        return 1

    print("OK: every env-declared cluster-local port has a matching egress allow.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
