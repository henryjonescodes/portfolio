---
branch: feat/modal-panels
parent: feat/projects-carousel
status: review
title: Modal panels and an expanded size
pr: https://github.com/henryjonescodes/portfolio/pull/62
updated: 2026-10-04
---

## Goal

Expanded entries show configurable panels (text, media, gallery, links, stats) laid out on a grid from data, and the modal can grow from its cozy size to fill the view with one button.

## Todo

- [x] Panel types, registry and PanelGrid with span layout
- [x] Panels render in the open modal, fading in after the morph
- [x] Cozy and expanded modal sizes with an Expand/Restore button in the title bar
- [x] Expanding resets any drag offset; Escape and Close still work
- [x] Seed project panels from existing content only
- [x] e2e: panels render; expand fills the overlay and restores
- [x] Self-maintain portfolio skills for panels and modal sizes
- [?] Curate real panel content (screenshots, galleries, stats) per project
- [?] Expanded layout: the right-third media clips at full width; decide whether it grows or moves into a panel

## Log

- 2026-10-04: seeded
- 2026-10-04: done "Panel types, registry and PanelGrid with span layout" at c81cd113
- 2026-10-04: done "Panels render in the open modal, fading in after the morph" at 5ddff52d
- 2026-10-04: done "Cozy and expanded modal sizes with an Expand/Restore button in the title bar" at 0dc528fd
- 2026-10-04: done "Expanding resets any drag offset; Escape and Close still work" at 20ac598c
- 2026-10-04: done "Seed project panels from existing content only" at 368c1989
- 2026-10-04: done "e2e: panels render; expand fills the overlay and restores" at 65b63dfd
- 2026-10-04: done "Self-maintain portfolio skills for panels and modal sizes" at 82a86157
