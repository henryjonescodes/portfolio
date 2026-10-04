---
branch: anim/modal-open
parent: staging
status: review
title: Modal opens as cleanly as it closes
pr: https://github.com/henryjonescodes/portfolio/pull/70
updated: 2026-10-04
---

## Goal

Opening the entry modal runs every layout change on one timing, so the inner content never reflows ahead of the window and clips; closing stays as it is.

## Todo

- [x] Capture open and close frames as a baseline
- [x] One MotionConfig timing for every layout animation in the entry; drop per-element layout transitions
- [x] e2e: inner content tracks the container during the open morph
- [?] Feel check of the new open in lite and 3D

## Log

- 2026-10-04: seeded
- 2026-10-04: done "Capture open and close frames as a baseline" at 53a1442a
- 2026-10-04: done "One MotionConfig timing for every layout animation in the entry; drop per-element layout transitions" at 73dfeb80
- 2026-10-04: done "e2e: inner content tracks the container during the open morph" at c1c3db5a
