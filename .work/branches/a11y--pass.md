---
branch: a11y/pass
parent: feat/mobile-carousel
status: active
title: Accessibility pass
pr: null
updated: 2026-10-04
---

## Goal

Run axe in the e2e suite on every page and the open modal, fix what it finds, and allow pinch zoom.

## Todo

- [x] Add @axe-core/playwright checks for each page in lite mode and for the open modal
- [ ] Fix the violations it reports (contrast, names, roles, landmarks)
- [ ] Allow pinch zoom: drop maximum-scale and user-scalable=no from the viewport meta
- [ ] Visible focus styles on every interactive element

## Log

- 2026-10-04: seeded
- 2026-10-04: done "Add @axe-core/playwright checks for each page in lite mode and for the open modal" at d42f75f6
