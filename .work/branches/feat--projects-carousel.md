---
branch: feat/projects-carousel
parent: anim/motion-idioms
status: active
title: Projects list: carousel lessons on the list layout
pr: https://github.com/henryjonescodes/portfolio/pull/61
updated: 2026-10-04
---

## Goal

Replace the Projects list with a carousel that mimics the old card-to-page morph in the new styles (see the portfolio-carousel-spec skill).

## Todo

- [?] Design review of the carousel in 3D and lite mode
- [ ] Retro tablet chrome: bevelled title bars, smaller corner radius, skeuomorphic controls
- [ ] Opaque open view and a darker backdrop behind the modal
- [ ] Escape closes the modal; the open entry is a labelled dialog

## Log

- 2026-10-04: seeded
- 2026-10-04: done "Extend EntryData with color, backgroundImage, logo" at 3d8a96f6
- 2026-10-04: done "Carousel row with layoutScroll and mobile scroll-snap" at 96ff3dae
- 2026-10-04: done "Card-to-page morph with tunable base duration and multipliers" at a2119ed1
- 2026-10-04: done "e2e test for the morph and close" at a8b92322
- 2026-10-04: EntryData gained media only; color and logo were not needed for the new style
- 2026-10-04: done "Fallback unmount if onLayoutAnimationComplete never fires (reduced motion)" at f0c814ca
- 2026-10-04: done "Remove the now unused projects path from ExperienceEntry (url and media children)" at 04abdffc
- 2026-10-04: Design feedback: overlaid text unreadable on noisy media, unused width, open view should be opaque
- 2026-10-04: dropped "Extend EntryData with color, backgroundImage, logo"
- 2026-10-04: dropped "Carousel row with layoutScroll and mobile scroll-snap"
- 2026-10-04: dropped "Card-to-page morph with tunable base duration and multipliers"
- 2026-10-04: dropped "e2e test for the morph and close"
- 2026-10-04: dropped "Fallback unmount if onLayoutAnimationComplete never fires (reduced motion)"
- 2026-10-04: dropped "Remove the now unused projects path from ExperienceEntry (url and media children)"
- 2026-10-04: dropped "Responsive layout: vertical list in 3D and wide lite, horizontal carousel only on mobile, one component set"
- 2026-10-04: dropped "List row: window title bar with title and date, text in the left two thirds, media in the right third, tools footer; no text over media"
- 2026-10-04: dropped "Paint-in like the old entries: border draws, divider line draws, typewriter title, media glitches in"
- 2026-10-04: dropped "Open view: opaque window filling the whole visible content area, page darkened behind it during the morph"
- 2026-10-04: dropped "Re-sample the morph tests for both layouts"
- 2026-10-04: Carousel retired after design review; list layout kept for its line draw-in. Carousel archived on local branch archive/projects-carousel
