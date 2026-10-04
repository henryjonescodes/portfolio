---
branch: feat/mobile-carousels
parent: staging
status: planned
title: Experience and projects carousels on phones
pr: null
updated: 2026-10-04
---

## Goal

Both lists become the phone carousel, with the first tile centred in the available area on both axes while the scroll area stays full width, no dead space at the sides, and the older layout's paint-in (borders drawing, typewriter, stagger) on the tiles.

## Todo

- [x] One carousel component for experience and projects on phones
- [x] First tile centred on both axes; scroll area full width; no side dead space
- [x] Borrow the paint-in from the list entries: border draws, typewriter titles, staggered children
- [x] Keep the tile-to-page morph exactly as it is now
- [x] e2e for the experience carousel and centring
- [?] media: An image or video for each experience entry (Arbor, ChannelAI, Mushroom, Union, Tumblr)

## Log

- 2026-10-04: seeded
- 2026-10-04: done "One carousel component for experience and projects on phones" at cbcae99c
- 2026-10-04: done "First tile centred on both axes; scroll area full width; no side dead space" at 3492f89a
- 2026-10-04: done "Borrow the paint-in from the list entries: border draws, typewriter titles, staggered children" at 68354ea4
- 2026-10-04: done "Keep the tile-to-page morph exactly as it is now" at d1e057e9
- 2026-10-04: done "e2e for the experience carousel and centring" at 91fc26ca
