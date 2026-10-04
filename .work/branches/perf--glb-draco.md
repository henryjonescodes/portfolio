---
branch: perf/glb-draco
parent: staging
status: review
title: Draco-compressed 3D model
pr: null
updated: 2026-10-04
---

## Goal

Shrink the 1.66 MB scene model with Draco, which decodes to full-precision positions so SiteMixer's hand-placed meshes stay correct; host the decoder locally.

## Todo

- [x] Draco-compress the GLB and compare sizes
- [x] Serve the Draco decoder from public and point useGLTF at it
- [x] Check the scene by eye in 3D; e2e stays green

## Log

- 2026-10-04: seeded
- 2026-10-04: done "Draco-compress the GLB and compare sizes" at e09dbfa5
- 2026-10-04: done "Serve the Draco decoder from public and point useGLTF at it" at d245c6c5
- 2026-10-04: done "Check the scene by eye in 3D; e2e stays green" at a4fad3b9
- 2026-10-04: First deploy preview raced PR creation (pull/71/head missing); re-triggered
