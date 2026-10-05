---
branch: chore/dry-pass
parent: next
status: planned
title: DRY and code-splitting pass after the stream
pr: null
updated: 2026-10-05
motivation: null
---

## Goal

Once the stream's work is in, one pass removes dead code and styles, merges duplicates and checks the bundle splits, so next goes to staging lean.

## Todo

- [ ] Delete unused components, styles, tunables and assets (knip, check-assets, a manual sweep)
- [ ] Merge duplicated helpers and styles
- [ ] Check route and 3D code splitting in the bundle report

## Log

- 2026-10-05: seeded
