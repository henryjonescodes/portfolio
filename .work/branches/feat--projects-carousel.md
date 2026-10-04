---
branch: feat/projects-carousel
parent: anim/motion-idioms
status: review
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
- [ ] Fallback unmount if onLayoutAnimationComplete never fires (reduced motion)
- [ ] Remove the now unused projects path from ExperienceEntry (url and media children)

## Log

- 2026-10-04: seeded
- 2026-10-04: done "Extend EntryData with color, backgroundImage, logo" at 3d8a96f6
- 2026-10-04: done "Carousel row with layoutScroll and mobile scroll-snap" at 96ff3dae
- 2026-10-04: done "Card-to-page morph with tunable base duration and multipliers" at a2119ed1
- 2026-10-04: done "e2e test for the morph and close" at a8b92322
- 2026-10-04: EntryData gained media only; color and logo were not needed for the new style
