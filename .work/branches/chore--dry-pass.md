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

- [x] Delete unused components, styles, tunables and assets (knip, check-assets, a manual sweep)
- [x] Merge duplicated helpers and styles
- [x] Check route and 3D code splitting in the bundle report
- [x] Move capture-modal-frames.mjs and other agent-only scripts into repertoire skills (fake-clock frames are superseded by motion-sheet)

## Log

- 2026-10-05: seeded
- 2026-10-05: done "Delete unused components, styles, tunables and assets (knip, check-assets, a manual sweep)" at f55c8db2
- 2026-10-05: done "Merge duplicated helpers and styles" at 2bf2eed0
- 2026-10-05: done "Check route and 3D code splitting in the bundle report" at 77bd22cd
- 2026-10-05: done "Move capture-modal-frames.mjs and other agent-only scripts into repertoire skills (fake-clock frames are superseded by motion-sheet)" at f9a48008
