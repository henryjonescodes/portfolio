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
  - why: The Type page swaps the site's face; a short list keeps it on-brand and fast to load.
  - kind: decision
- [?] Sound: synthesised clicks (no files) or recorded samples you pick?
  - why: Synthesised sounds need no files and stay tiny; samples sound richer but you would choose them.
  - kind: decision
- [?] Should the panel be on phones, or desktop only?

## Log

- 2026-10-04: seeded
