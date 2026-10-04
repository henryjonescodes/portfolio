---
branch: feat/modal-panels
parent: feat/projects-carousel
status: active
title: Modal panels and an expanded size
pr: null
updated: 2026-10-04
---

## Goal

Expanded entries show configurable panels (text, media, gallery, links, stats) laid out on a grid from data, and the modal can grow from its cozy size to fill the view with one button.

## Todo

- [x] Panel types, registry and PanelGrid with span layout
- [x] Panels render in the open modal, fading in after the morph
- [x] Cozy and expanded modal sizes with an Expand/Restore button in the title bar
- [ ] Expanding resets any drag offset; Escape and Close still work
- [ ] Seed project panels from existing content only
- [ ] e2e: panels render; expand fills the overlay and restores
- [ ] Self-maintain portfolio skills for panels and modal sizes
- [?] Curate real panel content (screenshots, galleries, stats) per project

## Log

- 2026-10-04: seeded
- 2026-10-04: done "Panel types, registry and PanelGrid with span layout" at c81cd113
- 2026-10-04: done "Panels render in the open modal, fading in after the morph" at 5ddff52d
- 2026-10-04: done "Cozy and expanded modal sizes with an Expand/Restore button in the title bar" at 0dc528fd
