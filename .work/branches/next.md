---
branch: next
parent: staging
status: active
title: Integration branch: the stream's second staging merge
pr: null
updated: 2026-10-05
motivation: null
---

## Goal

Every work-in-progress branch merges here instead of staging, so this stream reaches staging in two merges (the first was #88) and spends fewer build minutes. No Netlify deploy. Merges to staging once the stream is done.

## Todo

- [ ] EntryList with the list and tile presentations from CSS container queries (from entry/list)
- [ ] One paint-in (border, typewriter, stagger) for list items and tiles (from entry/list)
- [ ] Crossing the breakpoint replays line draws quickly, not from scratch (from entry/list)
- [ ] Resizing across the breakpoint keeps the same elements (e2e) (from entry/list)
- [ ] 2D knob, mini slider and key controls, keyboard and mouse (from feat/control-panel)
- [ ] Panel shell from the gear in the nav; pages switch from tabs and the model's buttons (from feat/control-panel)
- [ ] Colour page with presets (from feat/control-panel)
- [ ] Type page (families, size, typewriter) (from feat/control-panel)
- [ ] FX page (CRT, grain, motion speed, sound) (from feat/control-panel)
- [?] Which fonts are in bounds? Proposal: Pixelify Sans, a mono (JetBrains Mono or IBM Plex Mono) and a grotesk (Inter or Space Grotesk) (from feat/control-panel)
  - why: The Type page swaps the site's face; a short list keeps it on-brand and fast to load.
  - kind: decision
- [?] Sound: synthesised clicks (no files) or recorded samples you pick? (from feat/control-panel)
  - why: Synthesised sounds need no files and stay tiny; samples sound richer but you would choose them.
  - kind: decision
- [?] Should the panel be on phones, or desktop only? (from feat/control-panel)
  - why: Knobs and sliders are fiddly on touch; a desktop-only panel keeps phones simple.
  - kind: decision

## Log

- 2026-10-05: seeded
- 2026-10-05: carried 4 open todo(s) from entry/list
- 2026-10-05: carried 8 open todo(s) from feat/control-panel
