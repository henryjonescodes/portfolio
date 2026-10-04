---
branch: release/promote-main
parent: staging
status: planned
title: Promote the new site to main
pr: null
updated: 2026-10-04
---

## Goal

Retire the old webpack site once staging carries everything above.

## Todo

- [?] Confirm Netlify deploy settings for main and staging
- [ ] PR staging into main
- [?] Feel check of the new open in lite and 3D (from anim/modal-open)
- [?] Review the Arbor and project blurbs (written from existing descriptions) (from content/real-copy)
- [?] Decide where /links appears (home menu, nav bar, or as home like the old branch) (from content/real-copy)
- [?] The resume PDF is the 2024 copy from the old site and predates Arbor (from content/real-copy)
- [?] Design review in 3D and lite mode (from design/retro-chrome)
- [?] Pick one background-primary: static CSS uses #043030, the knobs' runtime default is #003838 (read from a commented SCSS line) (from design/retro-chrome)
- [?] Design review on a phone (from feat/mobile-carousel)
- [?] Design review of the list and modal in 3D and lite mode (from feat/modal-panels)
- [?] Curate real panel content (screenshots, galleries, stats) per project (from feat/modal-panels)
- [x] Confirm the first CI run is green on every stacked PR (from modalize-leva-work)
- [?] Allow lossy WebP for the colour bake (q85 saves about 0.8 MB more) after a visual check (from perf/assets)
- [?] Approve the share image and description, and confirm the canonical domain is henryjones.xyz (from seo/meta)

## Log

- 2026-10-04: seeded
- 2026-10-04: done "Confirm the first CI run is green on every stacked PR (from modalize-leva-work)" at 3c85ce68
- 2026-10-04: dropped "Compress the GLB: meshopt quantization moves a correction into node transforms that SiteMixer's hand-written meshes ignore, so render the glTF's node transforms (or regenerate SiteMixer with gltfjsx --transform) first (from perf/assets)"
