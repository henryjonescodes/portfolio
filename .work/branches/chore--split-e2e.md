---
branch: chore/split-e2e
parent: staging
status: active
title: One spec file per feature
pr: null
updated: 2026-10-04
---

## Goal

Split the single e2e smoke file by feature so parallel branches stop colliding in it, with shared helpers in one place.

## Todo

- [x] Split smoke.spec.ts into feature specs with the same tests
- [ ] Confirm the suite count and results are unchanged

## Log

- 2026-10-04: seeded
- 2026-10-04: done "Split smoke.spec.ts into feature specs with the same tests" at 1be4be38
