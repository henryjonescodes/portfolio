---
branch: design/retro-chrome
parent: chore/foundation
status: active
title: Retro tablet chrome pass
pr: null
updated: 2026-10-04
---

## Goal

Make the site read as a fun retro tablet OS: one bevel mixin and one radius scale applied to title bars, entries and buttons.

## Todo

- [x] One bevel mixin and radius tokens shared by SCSS and layout.constants.ts
- [ ] Apply to the nav bar, entry headers and nav buttons
- [?] Design review in 3D and lite mode
- [?] Pick one background-primary: static CSS uses #043030, the knobs' runtime default is #003838 (read from a commented SCSS line)

## Log

- 2026-10-04: seeded
- 2026-10-04: done "One bevel mixin and radius tokens shared by SCSS and layout.constants.ts" at 8038de04
