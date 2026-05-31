#!/usr/bin/env python3
"""
Production-readiness ratchet F1 — image pinning.

Walks every YAML file under the given root(s) and rejects the build when:

  1. A `Deployment` / `StatefulSet` / `DaemonSet` / `CronJob` / `Job`
     references an image with a tag (`:foo`, `:latest`, etc.) instead of
     a digest (`@sha256:...`).
  2. A kustomization `images:` entry uses `newTag` instead of `digest`.

Why: Kyverno's `require-image-digest` cluster policy rejects tag-pinned
images at admission time. New replica pods get stuck in
`CreateContainerConfigError` on every rollout. Tag-pinned images also
defeat content-addressing — `:v5` can silently change under your feet.

See RFC 0021 — Production Readiness Ratchet.

Usage:
    python3 check-image-pinning.py infra/k8s/

Exit codes:
    0 — all images digest-pinned (or covered by a documented exemption)
    1 — at least one tag-pinned image found

Exemptions (rotate out as upstream catches up):

  Set env var ``IMAGE_PIN_EXEMPT_<KEY>=<reason>`` where ``<KEY>`` is the
  uppercase-snake-case of the image's last path segment, e.g.

      IMAGE_PIN_EXEMPT_NGINX_INGRESS="upstream chart, no digest available"

  Exemption keys appear in the failure message so the operator knows
  exactly what to set.
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

EXEMPT_PREFIX = "IMAGE_PIN_EXEMPT_"
WORKLOAD_KINDS = {"Deployment", "StatefulSet", "DaemonSet", "CronJob", "Job"}
DIGEST_RE = re.compile(r"@sha256:[0-9a-f]{64}$")


def exemption_key(image_ref: str) -> str:
    """Convert ``ghcr.io/foo/bar`` to ``IMAGE_PIN_EXEMPT_BAR``."""
    leaf = image_ref.split("@", 1)[0].split(":", 1)[0].rsplit("/", 1)[-1]
    sanitized = re.sub(r"[^A-Z0-9]", "_", leaf.upper())
    return EXEMPT_PREFIX + sanitized


def is_pinned(image_ref: str) -> bool:
    """True if the ref ends in ``@sha256:<64 hex chars>``."""
    return bool(DIGEST_RE.search(image_ref))


def walk_yaml_files(roots: Iterable[Path]) -> Iterable[tuple[Path, dict]]:
    """Yield (path, doc) for every YAML doc in ``roots``."""
    for root in roots:
        if root.is_file() and root.suffix in {".yaml", ".yml"}:
            yield from _docs_in(root)
        elif root.is_dir():
            for path in root.rglob("*.yaml"):
                yield from _docs_in(path)
            for path in root.rglob("*.yml"):
                yield from _docs_in(path)


def _docs_in(path: Path) -> Iterable[tuple[Path, dict]]:
    try:
        with path.open() as fh:
            for doc in yaml.safe_load_all(fh):
                if isinstance(doc, dict):
                    yield path, doc
    except yaml.YAMLError as exc:
        sys.stderr.write(f"warning: skipping {path} (YAML parse error: {exc})\n")


def find_violations(
    roots: Iterable[Path], exemptions: dict[str, str]
) -> list[str]:
    failures: list[str] = []
    for path, doc in walk_yaml_files(roots):
        kind = doc.get("kind")
        # Workload pod-spec image refs
        if kind in WORKLOAD_KINDS:
            for image in _iter_pod_spec_images(doc):
                if is_pinned(image):
                    continue
                key = exemption_key(image)
                if key in exemptions:
                    continue
                failures.append(
                    f"{path}: {kind} {doc.get('metadata',{}).get('name','?')!r} "
                    f"references tag-pinned image {image!r}.\n"
                    f"  Pin by digest (`{image.split('@')[0].split(':')[0]}@sha256:...`) "
                    f"or set ``{key}=<reason>`` to acknowledge."
                )
        # Kustomization images: directive
        if kind == "Kustomization" or path.name == "kustomization.yaml":
            for img in (doc.get("images") or []):
                if not isinstance(img, dict):
                    continue
                if img.get("digest"):
                    continue
                if img.get("newTag") is not None:
                    name = img.get("newName") or img.get("name", "?")
                    key = exemption_key(name)
                    if key in exemptions:
                        continue
                    failures.append(
                        f"{path}: kustomize images entry for {name!r} uses "
                        f"`newTag: {img['newTag']!r}` — switch to "
                        f"`digest: sha256:...` or set ``{key}=<reason>``."
                    )
    return failures


def _iter_pod_spec_images(doc: dict) -> Iterable[str]:
    spec = doc.get("spec") or {}
    template = spec.get("template") or spec.get("jobTemplate", {}).get("spec", {}).get(
        "template"
    )
    if not template:
        return
    pod_spec = (template or {}).get("spec") or {}
    for container in (pod_spec.get("containers") or []):
        if image := container.get("image"):
            yield image
    for container in (pod_spec.get("initContainers") or []):
        if image := container.get("image"):
            yield image


def read_exemptions(env: dict[str, str] | None = None) -> dict[str, str]:
    src = env if env is not None else os.environ
    return {
        k: v for k, v in src.items() if k.startswith(EXEMPT_PREFIX) and v.strip()
    }


def main() -> int:
    p = argparse.ArgumentParser(description=__doc__.split("\n\n")[0])
    p.add_argument("roots", nargs="+", help="Directories or files to scan")
    args = p.parse_args()

    roots = [Path(r) for r in args.roots]
    exemptions = read_exemptions()

    failures = find_violations(roots, exemptions)
    if failures:
        sys.stderr.write(
            "Image pinning ratchet FAILED:\n\n"
            + "\n".join(f"  - {f}" for f in failures)
            + "\n\nKyverno's require-image-digest policy rejects tag-pinned images "
            "in production. Pin by digest or add an explicit exemption env var.\n"
        )
        return 1

    print(
        f"OK: all images digest-pinned (or exempt) "
        f"across {len(roots)} root(s); {len(exemptions)} exemption(s) active."
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
