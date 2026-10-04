# Foundation and polish, October 2026

## chore/foundation
parent: feat/modal-panels
title: Foundation: DRY, code splitting, cleanup
goal: Leave the codebase lean and consistent before more features land: no unused code or dependencies, one way to do each thing, checks that keep it that way.
- [ ] Drop unused dependencies (react-spring, @use-gesture/react, concurrently) and list three-stdlib
- [ ] Delete unused exports, dead constants and leftover variants (knip report), and the stale SESSION_LOG.md
- [ ] One debug logger hook in place of the eight console.log calls, silent unless ?debug=true
- [ ] One EntryMedia view shared by the projects list and the media panel
- [ ] Remove commented-out code and SCSS across src
- [ ] Split context modules so component files export only components (fast-refresh warnings)
- [ ] Refactor the remaining hook dependencies in Loading, Map and useDebouncedEffect, behind tests
- [ ] knip config that understands the SCSS alias and types/, and an npm run check (lint, tsc, knip)
- [ ] Self-maintain CLAUDE.md and the portfolio skills

## chore/ci
parent: chore/foundation
title: CI gate on pull requests
goal: Run lint, type check, knip and the lite-mode e2e suite on every PR into staging, so the stack has a real green check.
- [ ] GitHub Actions workflow: install, npm run check, Playwright in lite mode
- [ ] Cache npm and Playwright browsers
- [?] Approve adding a workflow that runs on every PR

## design/retro-chrome
parent: chore/foundation
title: Retro tablet chrome pass
goal: Make the site read as a fun retro tablet OS: one bevel mixin and one radius scale applied to title bars, entries and buttons.
- [ ] One bevel mixin and radius tokens shared by SCSS and layout.constants.ts
- [ ] Apply to the nav bar, entry headers and nav buttons
- [?] Design review in 3D and lite mode
