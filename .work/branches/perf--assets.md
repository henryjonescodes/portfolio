---
branch: perf/assets
parent: feat/mobile-carousel
status: active
title: Faster loads: lazy 3D and lighter assets
pr: null
updated: 2026-10-04
---

## Goal

Phones and lite mode never download three.js, and the 3D scene's 13 MB of textures and model load in a fraction of the time, so the 8 second lite fallback fires less.

## Todo

- [x] Lazy-load the 3D Scene so lite mode and phones skip three.js and React Three Fiber
- [x] Convert the baked textures from PNG to WebP (or KTX2) with no visible loss
- [ ] Compress the GLB (meshopt or Draco) and load it with the matching decoder
- [ ] Measure before and after: chunk sizes, total transfer, time to scene ready
- [x] e2e: lite mode loads no three.js chunk

## Log

- 2026-10-04: seeded
- 2026-10-04: done "Lazy-load the 3D Scene so lite mode and phones skip three.js and React Three Fiber" at 3727e7e0
- 2026-10-04: done "e2e: lite mode loads no three.js chunk" at b5d8a303
- 2026-10-04: done "Convert the baked textures from PNG to WebP (or KTX2) with no visible loss" at 40000ba1
