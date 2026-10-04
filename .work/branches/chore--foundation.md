---
branch: chore/foundation
parent: feat/modal-panels
status: active
title: Foundation: DRY, code splitting, cleanup
pr: null
updated: 2026-10-04
---

## Goal

Leave the codebase lean and consistent before more features land: no unused code or dependencies, one way to do each thing, checks that keep it that way.

## Todo

- [x] Drop unused dependencies (react-spring, @use-gesture/react, concurrently) and list three-stdlib
- [x] Delete unused exports, dead constants and leftover variants (knip report), and the stale SESSION_LOG.md
- [ ] One debug logger hook in place of the eight console.log calls, silent unless ?debug=true
- [ ] One EntryMedia view shared by the projects list and the media panel
- [ ] Remove commented-out code and SCSS across src
- [ ] Split context modules so component files export only components (fast-refresh warnings)
- [ ] Refactor the remaining hook dependencies in Loading, Map and useDebouncedEffect, behind tests
- [ ] knip config that understands the SCSS alias and types/, and an npm run check (lint, tsc, knip)
- [ ] Self-maintain CLAUDE.md and the portfolio skills

## Log

- 2026-10-04: seeded
- 2026-10-04: done "Drop unused dependencies (react-spring, @use-gesture/react, concurrently) and list three-stdlib" at b125d1ef
- 2026-10-04: done "Delete unused exports, dead constants and leftover variants (knip report), and the stale SESSION_LOG.md" at ab9645b5
