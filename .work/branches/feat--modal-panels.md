---
branch: feat/modal-panels
parent: anim/motion-idioms
status: review
title: Projects list polish, modal panels and an expanded size
pr: https://github.com/henryjonescodes/portfolio/pull/62
updated: 2026-10-04
---

## Goal

Expanded entries show configurable panels (text, media, gallery, links, stats) laid out on a grid from data, and the modal can grow from its cozy size to fill the view with one button.

Also carries `feat/projects-carousel`: Replace the Projects list with a carousel that mimics the old card-to-page morph in the new styles (see the portfolio-carousel-spec skill).

## Todo

- [x] Opaque open view and a darker backdrop behind the modal
- [x] Escape closes the modal; the open entry is a labelled dialog
- [x] Smaller corner radius and bevelled, skeuomorphic title bars on entries and the modal
- [x] Move project media into the project data
- [?] Design review of the list and modal in 3D and lite mode
- [x] Panel types, registry and PanelGrid with span layout
- [x] Panels render in the open modal, fading in after the morph
- [x] Cozy and expanded modal sizes with an Expand/Restore button in the title bar
- [x] Expanding resets any drag offset; Escape and Close still work
- [x] Seed project panels from existing content only
- [x] e2e: panels render; expand fills the overlay and restores
- [x] Self-maintain portfolio skills for panels and modal sizes
- [?] Curate real panel content (screenshots, galleries, stats) per project
- [x] Expanded layout: the right-third media clips at full width; decide whether it grows or moves into a panel

## Log

- 2026-10-04: seeded
- 2026-10-04: done "Panel types, registry and PanelGrid with span layout" at c81cd113
- 2026-10-04: done "Panels render in the open modal, fading in after the morph" at 5ddff52d
- 2026-10-04: done "Cozy and expanded modal sizes with an Expand/Restore button in the title bar" at 0dc528fd
- 2026-10-04: done "Expanding resets any drag offset; Escape and Close still work" at 20ac598c
- 2026-10-04: done "Seed project panels from existing content only" at 368c1989
- 2026-10-04: done "e2e: panels render; expand fills the overlay and restores" at 65b63dfd
- 2026-10-04: done "Self-maintain portfolio skills for panels and modal sizes" at 82a86157
- 2026-10-04: done "Expanded layout: the right-third media clips at full width; decide whether it grows or moves into a panel" at b42a0d89
- 2026-10-04: Design feedback applied: media expands, panels flattened into the modal
- [feat/projects-carousel] 2026-10-04: seeded
- [feat/projects-carousel] 2026-10-04: done "Extend EntryData with color, backgroundImage, logo" at 3d8a96f6
- [feat/projects-carousel] 2026-10-04: done "Carousel row with layoutScroll and mobile scroll-snap" at 96ff3dae
- [feat/projects-carousel] 2026-10-04: done "Card-to-page morph with tunable base duration and multipliers" at a2119ed1
- [feat/projects-carousel] 2026-10-04: done "e2e test for the morph and close" at a8b92322
- [feat/projects-carousel] 2026-10-04: EntryData gained media only; color and logo were not needed for the new style
- [feat/projects-carousel] 2026-10-04: done "Fallback unmount if onLayoutAnimationComplete never fires (reduced motion)" at f0c814ca
- [feat/projects-carousel] 2026-10-04: done "Remove the now unused projects path from ExperienceEntry (url and media children)" at 04abdffc
- [feat/projects-carousel] 2026-10-04: Design feedback: overlaid text unreadable on noisy media, unused width, open view should be opaque
- [feat/projects-carousel] 2026-10-04: dropped "Extend EntryData with color, backgroundImage, logo"
- [feat/projects-carousel] 2026-10-04: dropped "Carousel row with layoutScroll and mobile scroll-snap"
- [feat/projects-carousel] 2026-10-04: dropped "Card-to-page morph with tunable base duration and multipliers"
- [feat/projects-carousel] 2026-10-04: dropped "e2e test for the morph and close"
- [feat/projects-carousel] 2026-10-04: dropped "Fallback unmount if onLayoutAnimationComplete never fires (reduced motion)"
- [feat/projects-carousel] 2026-10-04: dropped "Remove the now unused projects path from ExperienceEntry (url and media children)"
- [feat/projects-carousel] 2026-10-04: dropped "Responsive layout: vertical list in 3D and wide lite, horizontal carousel only on mobile, one component set"
- [feat/projects-carousel] 2026-10-04: dropped "List row: window title bar with title and date, text in the left two thirds, media in the right third, tools footer; no text over media"
- [feat/projects-carousel] 2026-10-04: dropped "Paint-in like the old entries: border draws, divider line draws, typewriter title, media glitches in"
- [feat/projects-carousel] 2026-10-04: dropped "Open view: opaque window filling the whole visible content area, page darkened behind it during the morph"
- [feat/projects-carousel] 2026-10-04: dropped "Re-sample the morph tests for both layouts"
- [feat/projects-carousel] 2026-10-04: Carousel retired after design review; list layout kept for its line draw-in. Carousel archived on local branch archive/projects-carousel
- [feat/projects-carousel] 2026-10-04: dropped "Retro tablet chrome: bevelled title bars, smaller corner radius, skeuomorphic controls"
- [feat/projects-carousel] 2026-10-04: dropped "Design review of the carousel in 3D and lite mode"
- [feat/projects-carousel] 2026-10-04: done "Opaque open view and a darker backdrop behind the modal" at a7a5cf4b
- [feat/projects-carousel] 2026-10-04: done "Escape closes the modal; the open entry is a labelled dialog" at 0792d78a
- [feat/projects-carousel] 2026-10-04: done "Move project media into the project data" at 49baae04
- [feat/projects-carousel] 2026-10-04: Bevel applied to the modal title bar only; entry headers unchanged pending design review
- [feat/projects-carousel] 2026-10-04: done "Smaller corner radius and bevelled, skeuomorphic title bars on entries and the modal" at e2992d43
- 2026-10-04: folded in feat/projects-carousel
