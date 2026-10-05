---
branch: fix/fullscreen-url
parent: staging
status: planned
title: Full screen survives a refresh
pr: null
updated: 2026-10-04
motivation: null
---

## Goal

The full-screen view is in the URL (?view=full), so a refresh or a shared link keeps it instead of relaunching into the 3D device.

## Todo

- [x] view=full read on load and kept in sync with the toggle

## Log

- 2026-10-04: seeded
- 2026-10-04: done "view=full read on load and kept in sync with the toggle" at 85092fc6
