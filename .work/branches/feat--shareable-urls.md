---
branch: feat/shareable-urls
parent: staging
status: planned
title: Shareable state and per-link previews
pr: null
updated: 2026-10-04
---

## Goal

URL parameters capture as much state as possible (open entry, effort, size), and link previews reflect the shared state.

## Todo

- [x] Modal, effort and expanded state in URL parameters, restored on load
- [ ] Per-URL Open Graph (title, description, image) via a Netlify edge function
- [?] Approve per-entry preview images, or generate them

## Log

- 2026-10-04: seeded
- 2026-10-04: done "Modal, effort and expanded state in URL parameters, restored on load" at ec7a827b
