---
branch: entry/list
parent: entry/window
status: planned
title: One list that is a carousel on phones
pr: null
updated: 2026-10-05
motivation: Resizing should re-lay out the same entries, not swap one component tree for another.
---

## Goal

Experience and projects render one EntryList. A container query turns it from a vertical list into a scroll-snapped row of tiles on narrow widths; the items are the same Entry list items with tile styles, painting in the same way. useAsCarousel and its width check go. Crossing the breakpoint replays line draws very quickly rather than from scratch.

## Todo

- [ ] EntryList with the list and tile presentations from CSS container queries
- [ ] One paint-in (border, typewriter, stagger) for list items and tiles
- [ ] Crossing the breakpoint replays line draws quickly, not from scratch
- [ ] Resizing across the breakpoint keeps the same elements (e2e)

## Log

- 2026-10-05: seeded
