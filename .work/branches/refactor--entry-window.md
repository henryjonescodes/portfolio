---
branch: refactor/entry-window
parent: staging
status: planned
title: One window for every open entry
pr: null
updated: 2026-10-04
motivation: null
---

## Goal

The open entry, modal or phone, renders one EntryWindow: the main nav bar with the sections and Close, then media under the bar on phones and beside the text on wide screens, then the body. The phone open view takes the full height over the site nav. Visual change on desktop is nil.

## Todo

- [ ] EntryWindow: bar, media, body and sections, used by the modal and the phone open view
- [ ] Phone open view covers the full height, nav included; Close reads clearly
- [ ] Media sits under the bar on phones, beside the text on wide screens, by CSS
- [ ] e2e: the same window on both widths
- [ ] The entry's main image shows only on Overview, never on an effort or the gallery

## Log

- 2026-10-04: seeded
