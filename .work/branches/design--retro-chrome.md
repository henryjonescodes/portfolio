---
branch: design/retro-chrome
parent: chore/foundation
status: review
title: Retro tablet chrome pass
pr: https://github.com/henryjonescodes/portfolio/pull/65
updated: 2026-10-04
---

## Goal

Make the site read as a fun retro tablet OS: one bevel mixin and one radius scale applied to title bars, entries and buttons.

## Todo

- [x] One bevel mixin and radius tokens shared by SCSS and layout.constants.ts
- [x] Apply to the nav bar, entry headers and nav buttons
- [?] Design review in 3D and lite mode
- [?] Pick one background-primary: static CSS uses #043030, the knobs' runtime default is #003838 (read from a commented SCSS line)

## Log

- 2026-10-04: seeded
- 2026-10-04: done "One bevel mixin and radius tokens shared by SCSS and layout.constants.ts" at 8038de04
- 2026-10-04: done "Apply to the nav bar, entry headers and nav buttons" at 703109cd
