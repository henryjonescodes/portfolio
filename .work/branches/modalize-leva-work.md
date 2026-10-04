---
branch: modalize-leva-work
parent: staging
status: review
title: Animation system refactor and test net
pr: https://github.com/henryjonescodes/portfolio/pull/57
updated: 2026-10-04
---

## Goal

Make the animations easy to tweak and idiomatic without regressing them; ship as the PR into staging.

Also carries `chore/ci`: Run lint, type check, knip and the lite-mode e2e suite on every PR into staging, so the stack has a real green check.

## Todo

- [x] GitHub Actions workflow: install, npm run check, Playwright in lite mode
- [x] Cache npm and Playwright browsers
- [x] Playwright smoke tests and lint tooling
- [x] Fix overlay swallowing clicks after modal close
- [x] Split animation config; wire dead Leva controls; lazy-load Leva
- [x] Write ROADMAP.md and update LEVA.md and CLAUDE.md
- [x] Fix the 21 lint errors
- [x] Open the PR into staging
- [ ] Confirm the first CI run is green on every stacked PR

## Log

- 2026-10-04: seeded
- 2026-10-04: Roadmap written; LEVA.md and CLAUDE.md still to update
- [chore/ci] 2026-10-04: seeded
- [chore/ci] 2026-10-04: dropped "Approve adding a workflow that runs on every PR"
- [chore/ci] 2026-10-04: Approved in chat on 2026-10-04
- [chore/ci] 2026-10-04: done "GitHub Actions workflow: install, npm run check, Playwright in lite mode" at 58668cde
- [chore/ci] 2026-10-04: done "Cache npm and Playwright browsers" at 6ad08277
- [chore/ci] 2026-10-04: dropped "Grant gh the workflow scope so the CI file can be pushed: run gh auth refresh -s workflow"
- [chore/ci] 2026-10-04: dropped "Push, open the PR on top of #63, and confirm the first run is green"
- [chore/ci] 2026-10-04: done "GitHub Actions workflow: install, npm run check, Playwright in lite mode" at 386281c3
- 2026-10-04: folded in chore/ci
