---
branch: perf/glb-draco
parent: staging
status: active
title: Draco-compressed 3D model
pr: null
updated: 2026-10-04
---

## Goal

Shrink the 1.66 MB scene model with Draco, which decodes to full-precision positions so SiteMixer's hand-placed meshes stay correct; host the decoder locally.

## Todo

- [ ] Draco-compress the GLB and compare sizes
- [ ] Serve the Draco decoder from public and point useGLTF at it
- [ ] Check the scene by eye in 3D; e2e stays green

## Log

- 2026-10-04: seeded
