---
branch: anim/restore-timing
parent: staging
status: planned
title: Restore from expanded on the window's clock
pr: null
updated: 2026-10-04
---

## Goal

Shrinking the experience modal from expanded back to cozy reflows the content with the window, the way the phone projects carousel morphs, instead of before it.

## Todo

- [x] Measure restore frame by frame and confirm the reflow runs ahead of the container
- [ ] Copy the carousel's approach (one element owns the size change, content follows) to restore
- [ ] e2e: restore keeps content inside the window and settles with it

## Log

- 2026-10-04: seeded
- 2026-10-04: done "Measure restore frame by frame and confirm the reflow runs ahead of the container" at 242c17fc
