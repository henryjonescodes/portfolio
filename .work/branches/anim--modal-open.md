---
branch: anim/modal-open
parent: feat/mobile-carousel
status: active
title: Modal opens as cleanly as it closes
pr: null
updated: 2026-10-04
---

## Goal

Opening the entry modal runs every layout change on one timing, so the inner content never reflows ahead of the window and clips; closing stays as it is.

## Todo

- [ ] Capture open and close frames as a baseline
- [ ] One MotionConfig timing for every layout animation in the entry; drop per-element layout transitions
- [ ] e2e: inner content tracks the container during the open morph
- [?] Feel check of the new open in lite and 3D

## Log

- 2026-10-04: seeded
