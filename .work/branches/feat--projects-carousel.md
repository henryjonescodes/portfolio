---
branch: feat/projects-carousel
parent: anim/motion-idioms
status: active
title: Projects carousel
pr: https://github.com/henryjonescodes/portfolio/pull/61
updated: 2026-10-04
---

## Goal

Replace the Projects list with a carousel that mimics the old card-to-page morph in the new styles (see the portfolio-carousel-spec skill).

## Todo

- [x] Extend EntryData with color, backgroundImage, logo
- [x] Carousel row with layoutScroll and mobile scroll-snap
- [x] Card-to-page morph with tunable base duration and multipliers
- [x] e2e test for the morph and close
- [?] Design review of the carousel in 3D and lite mode
- [x] Fallback unmount if onLayoutAnimationComplete never fires (reduced motion)
- [x] Remove the now unused projects path from ExperienceEntry (url and media children)
- [ ] Responsive layout: vertical list in 3D and wide lite, horizontal carousel only on mobile, one component set
- [ ] List row: window title bar with title and date, text in the left two thirds, media in the right third, tools footer; no text over media
- [ ] Paint-in like the old entries: border draws, divider line draws, typewriter title, media glitches in
- [ ] Open view: opaque window filling the whole visible content area, page darkened behind it during the morph
- [ ] Retro tablet chrome: bevelled title bars, smaller corner radius, skeuomorphic controls
- [ ] Re-sample the morph tests for both layouts

## Log

- 2026-10-04: seeded
- 2026-10-04: done "Extend EntryData with color, backgroundImage, logo" at 3d8a96f6
- 2026-10-04: done "Carousel row with layoutScroll and mobile scroll-snap" at 96ff3dae
- 2026-10-04: done "Card-to-page morph with tunable base duration and multipliers" at a2119ed1
- 2026-10-04: done "e2e test for the morph and close" at a8b92322
- 2026-10-04: EntryData gained media only; color and logo were not needed for the new style
- 2026-10-04: done "Fallback unmount if onLayoutAnimationComplete never fires (reduced motion)" at f0c814ca
- 2026-10-04: done "Remove the now unused projects path from ExperienceEntry (url and media children)" at 04abdffc
