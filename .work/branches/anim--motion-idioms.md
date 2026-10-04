---
branch: anim/motion-idioms
parent: modalize-leva-work
status: active
title: Framer Motion idioms pass
pr: null
updated: 2026-10-04
---

## Goal

Finish the animation cleanup the refactor started, behind the e2e net and the layout-modal rules.

## Todo

- [x] MotionConfig reducedMotion="user" at the app root
- [x] Memoize ExperienceEntry variants; drop no-op variants and dead commented code
- [x] Replace setTimeout sequencing in PageContents, Page, MapSlider, ZoomContext with when/delayChildren or cleaned-up effects
- [x] Walk the regression checklist in 3D and lite mode
- [ ] Write the portfolio-animation-system and portfolio-regression-checklist skills
- [ ] Resolve the 27 lint warnings (hook deps, fast-refresh exports)

## Log

- 2026-10-04: seeded
- 2026-10-04: done "MotionConfig reducedMotion="user" at the app root" at 42e8a016
- 2026-10-04: done "Replace setTimeout sequencing in PageContents, Page, MapSlider, ZoomContext with when/delayChildren or cleaned-up effects" at b6bb82a5
- 2026-10-04: done "Memoize ExperienceEntry variants; drop no-op variants and dead commented code" at 553bce2e
- 2026-10-04: done "Walk the regression checklist in 3D and lite mode" at 0c960ede
