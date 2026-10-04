---
branch: refactor/entry-window
parent: staging
status: planned
title: One window for every open entry
pr: null
updated: 2026-10-04
motivation: Phone and desktop open views should be the same window, so a fix or a polish lands once.
---

## Goal

The open entry, modal or phone, renders one EntryWindow: the main nav bar with the sections and Close, then media under the bar on phones and beside the text on wide screens, then the body. The phone open view takes the full height over the site nav. Visual change on desktop is nil.

## Todo

- [x] EntryWindow: bar, media, body and sections, used by the modal and the phone open view
- [ ] Phone open view covers the full height, nav included; Close reads clearly
- [ ] Media sits under the bar on phones, beside the text on wide screens, by CSS
- [ ] e2e: the same window on both widths
- [ ] The entry's main image shows only on Overview, never on an effort or the gallery
- [ ] Sections (efforts, gallery) drop the entry heading the nav already shows; an effort shows dates only when it has its own

## Log

- 2026-10-04: seeded
- 2026-10-04: done "EntryWindow: bar, media, body and sections, used by the modal and the phone open view" at b89de966
