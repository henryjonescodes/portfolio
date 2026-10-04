# Portfolio roadmap, October 2026

## anim/motion-idioms
parent: modalize-leva-work
title: Framer Motion idioms pass
goal: Finish the animation cleanup the refactor started, behind the e2e net and the layout-modal rules.
- [ ] MotionConfig reducedMotion="user" at the app root
- [ ] Memoize ExperienceEntry variants; drop no-op variants and dead commented code
- [ ] Replace setTimeout sequencing in PageContents, Page, MapSlider, ZoomContext with when/delayChildren or cleaned-up effects
- [ ] Walk the regression checklist in 3D and lite mode
- [ ] Write the portfolio-animation-system and portfolio-regression-checklist skills

## content/real-copy
parent: modalize-leva-work
title: Real copy and missing content
goal: Replace lorem ipsum and bring over content only the old site has.
- [ ] Port real experience blurbs and responsibilities from origin/main
- [ ] Write real project blurbs
- [?] Confirm tumblr dates (old site says 2015 to present, new says 2014)
- [ ] Add the resume PDF and a link to it
- [ ] Salvage the Links page from origin/Add-Links-Page

## feat/projects-carousel
parent: anim/motion-idioms
title: Projects carousel
goal: Replace the Projects list with a carousel that mimics the old card-to-page morph in the new styles (see the portfolio-carousel-spec skill).
- [ ] Extend EntryData with color, backgroundImage, logo
- [ ] Carousel row with layoutScroll and mobile scroll-snap
- [ ] Card-to-page morph with tunable base duration and multipliers
- [ ] e2e test for the morph and close
- [?] Design review of the carousel in 3D and lite mode

## release/promote-main
parent: staging
title: Promote the new site to main
goal: Retire the old webpack site once staging carries everything above.
- [?] Confirm Netlify deploy settings for main and staging
- [ ] PR staging into main
