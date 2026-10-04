---
branch: anim/motion-idioms
parent: modalize-leva-work
status: planned
title: Framer Motion idioms pass
pr: null
updated: 2026-10-04
---

## Goal

Finish the animation cleanup the refactor started, behind the e2e net and the layout-modal rules.

## Todo

- [ ] MotionConfig reducedMotion="user" at the app root
- [ ] Memoize ExperienceEntry variants; drop no-op variants and dead commented code
- [ ] Replace setTimeout sequencing in PageContents, Page, MapSlider, ZoomContext with when/delayChildren or cleaned-up effects
- [ ] Walk the regression checklist in 3D and lite mode
- [ ] Write the portfolio-animation-system and portfolio-regression-checklist skills
- [ ] Resolve the 27 lint warnings (hook deps, fast-refresh exports)

## Log

- 2026-10-04: seeded
