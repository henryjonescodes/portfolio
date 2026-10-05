---
branch: entry/window
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
- [x] Phone open view covers the full height, nav included; Close reads clearly
- [x] Media sits under the bar on phones, beside the text on wide screens, by CSS
- [x] e2e: the same window on both widths
- [x] The entry's main image shows only on Overview, never on an effort or the gallery
- [x] Sections (efforts, gallery) drop the entry heading the nav already shows; an effort shows dates only when it has its own

## Log

- 2026-10-04: seeded
- 2026-10-04: done "EntryWindow: bar, media, body and sections, used by the modal and the phone open view" at b89de966
- 2026-10-04: done "Phone open view covers the full height, nav included; Close reads clearly" at a874d9d8
- 2026-10-04: done "Media sits under the bar on phones, beside the text on wide screens, by CSS" at ef26577a
- 2026-10-04: done "The entry's main image shows only on Overview, never on an effort or the gallery" at 943fe25e
- 2026-10-04: done "Sections (efforts, gallery) drop the entry heading the nav already shows; an effort shows dates only when it has its own" at 806212d1
- 2026-10-04: done "e2e: the same window on both widths" at 7038e047
