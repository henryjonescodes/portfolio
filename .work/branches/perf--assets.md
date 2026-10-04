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
- [x] Measure before and after: chunk sizes, total transfer, time to scene ready
- [x] e2e: lite mode loads no three.js chunk
- [ ] Compress the GLB: meshopt quantization moves a correction into node transforms that SiteMixer's hand-written meshes ignore, so render the glTF's node transforms (or regenerate SiteMixer with gltfjsx --transform) first
- [?] Allow lossy WebP for the colour bake (q85 saves about 0.8 MB more) after a visual check

## Log

- 2026-10-04: seeded
- 2026-10-04: done "Lazy-load the 3D Scene so lite mode and phones skip three.js and React Three Fiber" at 3727e7e0
- 2026-10-04: done "e2e: lite mode loads no three.js chunk" at b5d8a303
- 2026-10-04: done "Convert the baked textures from PNG to WebP (or KTX2) with no visible loss" at 40000ba1
- 2026-10-04: dropped "Compress the GLB (meshopt or Draco) and load it with the matching decoder"
- 2026-10-04: Measured: lite mode no longer fetches the 877 kB (242 kB gzip) Scene chunk; 3D textures 12.3 MB to 6.5 MB lossless
- 2026-10-04: done "Measure before and after: chunk sizes, total transfer, time to scene ready" at 8c152dc2
