# Performance, accessibility and sharing, October 2026

## perf/assets
parent: feat/mobile-carousel
title: Faster loads: lazy 3D and lighter assets
goal: Phones and lite mode never download three.js, and the 3D scene's 13 MB of textures and model load in a fraction of the time, so the 8 second lite fallback fires less.
- [ ] Lazy-load the 3D Scene so lite mode and phones skip three.js and React Three Fiber
- [ ] Convert the baked textures from PNG to WebP (or KTX2) with no visible loss
- [ ] Compress the GLB (meshopt or Draco) and load it with the matching decoder
- [ ] Measure before and after: chunk sizes, total transfer, time to scene ready
- [ ] e2e: lite mode loads no three.js chunk

## a11y/pass
parent: feat/mobile-carousel
title: Accessibility pass
goal: Run axe in the e2e suite on every page and the open modal, fix what it finds, and allow pinch zoom.
- [ ] Add @axe-core/playwright checks for each page in lite mode and for the open modal
- [ ] Fix the violations it reports (contrast, names, roles, landmarks)
- [ ] Allow pinch zoom: drop maximum-scale and user-scalable=no from the viewport meta
- [ ] Visible focus styles on every interactive element

## seo/meta
parent: feat/mobile-carousel
title: Sharing and search metadata
goal: Links to the site unfurl with a title, description and image, and the page has the basics search engines and browsers expect.
- [ ] Description, theme-color and canonical URL in index.html
- [ ] Open Graph and Twitter card tags with a share image
- [ ] ? Pick or approve the share image and the one-line description
