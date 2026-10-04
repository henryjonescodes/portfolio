---
branch: feat/crosshair-cursor
parent: staging
status: planned
title: A crosshair cursor
pr: null
updated: 2026-10-04
motivation: Make the pointer part of the instrument-panel look, so moving around the site feels like operating the device.
---

## Goal

The pointer becomes a small crosshair, with dashed guide lines running to every edge of the screen. The lines sit behind the page content and in front of the background; the small mark rides on top with a blend mode so it reads against anything.

## Todo

- [x] Guide lines follow the pointer behind the content, in front of the background
- [ ] Small crosshair on top with a difference blend; grows over anything clickable
- [ ] Fine pointers only; touch and reduced motion keep the plain cursor where it matters

## Log

- 2026-10-04: seeded
- 2026-10-04: done "Guide lines follow the pointer behind the content, in front of the background" at 21cece7c
