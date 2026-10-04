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
- [x] One debug logger hook in place of the eight console.log calls, silent unless ?debug=true
- [x] One EntryMedia view shared by the projects list and the media panel
- [x] Remove commented-out code and SCSS across src
- [x] Split context modules so component files export only components (fast-refresh warnings)
- [x] Refactor the remaining hook dependencies in Loading, Map and useDebouncedEffect, behind tests
- [x] knip config that understands the SCSS alias and types/, and an npm run check (lint, tsc, knip)
- [ ] Self-maintain CLAUDE.md and the portfolio skills

## Log

- 2026-10-04: seeded
- 2026-10-04: done "Drop unused dependencies (react-spring, @use-gesture/react, concurrently) and list three-stdlib" at b125d1ef
- 2026-10-04: done "Delete unused exports, dead constants and leftover variants (knip report), and the stale SESSION_LOG.md" at ab9645b5
- 2026-10-04: done "knip config that understands the SCSS alias and types/, and an npm run check (lint, tsc, knip)" at 943c79d6
- 2026-10-04: done "One debug logger hook in place of the eight console.log calls, silent unless ?debug=true" at 86054e9b
- 2026-10-04: done "One EntryMedia view shared by the projects list and the media panel" at 7a6f49f5
- 2026-10-04: done "Remove commented-out code and SCSS across src" at 84b81d41
- 2026-10-04: done "Split context modules so component files export only components (fast-refresh warnings)" at e9fc386a
- 2026-10-04: done "Refactor the remaining hook dependencies in Loading, Map and useDebouncedEffect, behind tests" at 8dc9c1a9
