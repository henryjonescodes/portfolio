---
branch: a11y/pass
parent: feat/mobile-carousel
status: review
title: Accessibility pass
pr: null
updated: 2026-10-04
---

## Goal

Run axe in the e2e suite on every page and the open modal, fix what it finds, and allow pinch zoom.

## Todo

- [x] Add @axe-core/playwright checks for each page in lite mode and for the open modal
- [x] Fix the violations it reports (contrast, names, roles, landmarks)
- [x] Allow pinch zoom: drop maximum-scale and user-scalable=no from the viewport meta
- [x] Visible focus styles on every interactive element

## Log

- 2026-10-04: seeded
- 2026-10-04: done "Add @axe-core/playwright checks for each page in lite mode and for the open modal" at d42f75f6
- 2026-10-04: done "Fix the violations it reports (contrast, names, roles, landmarks)" at 722978ea
- 2026-10-04: done "Allow pinch zoom: drop maximum-scale and user-scalable=no from the viewport meta" at c5a5eb0c
- 2026-10-04: done "Visible focus styles on every interactive element" at 4210d9de
