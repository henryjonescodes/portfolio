---
branch: feat/control-panel
parent: staging
status: planned
title: A control panel for colour, type and effects
pr: null
updated: 2026-10-04
motivation: Let visitors play with the device, and give the model's knobs and buttons a reason to exist outside 3D.
---

## Goal

A gear in the main nav opens a three-page panel (colour, type, FX) built from a 2D knob, a mini slider and a key. The model's three buttons switch pages and its knobs drive the open page. Settings persist in the URL and local storage.

## Todo

- [ ] 2D knob, mini slider and key controls, keyboard and mouse
- [ ] Panel shell from the gear in the nav; pages switch from tabs and the model's buttons
- [ ] Colour page with presets
- [ ] Type page (families, size, typewriter)
- [ ] FX page (CRT, grain, motion speed, sound)
- [?] Which fonts are in bounds? Proposal: Pixelify Sans, a mono (JetBrains Mono or IBM Plex Mono) and a grotesk (Inter or Space Grotesk)
- [?] Sound: synthesised clicks (no files) or recorded samples you pick?
- [?] Should the panel be on phones, or desktop only?

## Log

- 2026-10-04: seeded
