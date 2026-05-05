# PENDING — feat(security): allow Selva Atrium to iframe this app via CSP frame-ancestors

This commit lands the patch description only. The actual code changes are
parked in `claudedocs/PENDING_CSP_ATRIUM.patch` because the repo's
`pre-commit` hook (lint-staged → `eslint --fix`) fails on **pre-existing**
errors in unrelated code:

- `apps/studio/vite.config.production.ts` — 3× `no-secrets/no-secrets`
  false positives on `process.env.ENABLE_MOCK_GEOMETRY` etc. (entropy 4.13)
- `apps/studio/vite.config.ts` — `no-secrets/no-secrets` on a docs path
  string + `complexity` (23 vs max 15) on `manualChunks`
- `tests/security/csp-enforcement.test.ts` — `max-lines-per-function`
  (282 vs 100) + 3× `max-nested-callbacks` (4 vs 3) — all outside the
  block this change touches

Per the rollout ticket, `--no-verify` is **not used**. Operator action
needed: either bump the rule allowances for these specific lines, or
allow a one-time bypass for the CSP rollout.

## Apply the patch from repo root

```bash
git apply claudedocs/PENDING_CSP_ATRIUM.patch
```

## What the patch does

Permits the Selva Atrium (selva-office consumer feature) to iframe the
Studio across all three CSP emission points (dev server, preview server,
production server) and updates the contract test that previously asserted
`frame-ancestors: 'none'`. `X-Frame-Options` downgraded from `DENY` to
`SAMEORIGIN` as a legacy fallback.

```
frame-ancestors 'self' https://selva.town https://*.selva.town https://*.madfam.io
```

Same operator (Innovaciones MADFAM) on both Selva and Sim4D — no
third-party trust boundary is being relaxed.
