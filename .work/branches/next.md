---
branch: next
parent: staging
status: active
title: Integration branch: the stream's second staging merge
pr: null
updated: 2026-10-05
motivation: null
---

## Goal

Every work-in-progress branch merges here instead of staging, so this stream reaches staging in two merges (the first was #88) and spends fewer build minutes. No Netlify deploy. Merges to staging once the stream is done.

## Todo

- [x] EntryList with the list and tile presentations from CSS container queries (from entry/list)
- [x] One paint-in (border, typewriter, stagger) for list items and tiles (from entry/list)
- [x] Crossing the breakpoint replays line draws quickly, not from scratch (from entry/list)
- [x] Resizing across the breakpoint keeps the same elements (e2e) (from entry/list)
- [ ] 2D knob, mini slider and key controls, keyboard and mouse (from feat/control-panel)
- [x] Panel shell from the gear in the nav; pages switch from tabs and the model's buttons (from feat/control-panel)
- [x] Colour page with presets (from feat/control-panel)
- [x] Type page (families, size, typewriter) (from feat/control-panel)
- [x] FX page (CRT, grain, motion speed, sound) (from feat/control-panel)
- [x] Which fonts are in bounds? Proposal: Pixelify Sans, a mono (JetBrains Mono or IBM Plex Mono) and a grotesk (Inter or Space Grotesk) (from feat/control-panel)
  - why: The Type page swaps the site's face; a short list keeps it on-brand and fast to load.
  - kind: decision
  - answer: Stay full retro, and maybe add one synthwave face
- [x] Sound: synthesised clicks (no files) or recorded samples you pick? (from feat/control-panel)
  - why: Synthesised sounds need no files and stay tiny; samples sound richer but you would choose them.
  - kind: decision
  - answer: A real or emulated synth powers every interaction sound, toggled globally, with sounds the visitor can tweak; start simple, and only gate it behind an experimental mode if it turns out heavy
- [x] Should the panel be on phones, or desktop only? (from feat/control-panel)
  - why: Knobs and sliders are fiddly on touch; a desktop-only panel keeps phones simple.
  - kind: decision
  - answer: Yes, phones too where possible: the site is a resume but a toy at heart
- [x] Request ids on mock media and drafted prose (from feat/content-requests)
- [x] Sourced files and prose resolve by id at build time (from feat/content-requests)
- [ ] npm run requests renders the list; bw publishes it next to the board (from feat/content-requests)
- [?] Approve per-entry preview images, or generate them (from feat/shareable-urls) (from feat/content-requests)
  - why: Shared links show a per-page title and description, but one site-wide image for every entry.
  - kind: decision
  - file: public/og-image.png
- [?] Which page titles should link to entries? Map lines and prose mentions do now; headings are plain (from feat/global-modal) (from feat/content-requests)
  - why: Map lines and prose mentions open entries anywhere on the site; headings are still plain text.
  - kind: decision
  - file: src/components/EntryLink/index.tsx
- [?] claim: User notifier sends about 250,000 notifications a month (from feat/efforts) (from feat/global-modal) (from feat/content-requests)
  - why: The User notifier effort leads with this figure, shown as unverified on the live site until you confirm it.
  - kind: claim
  - file: src/data/experience.ts
- [?] claim: User notifier delivers at a 99.99% success rate (from feat/efforts) (from feat/global-modal) (from feat/content-requests)
  - why: The second headline figure on the User notifier effort, also marked unverified until confirmed.
  - kind: claim
  - file: src/data/experience.ts
- [?] claim: Almanac summary: a skill manager for the team's AI coding agents, one catalogue of shared skills kept in step across every repo (from feat/efforts) (from feat/global-modal) (from feat/content-requests)
  - why: Drafted from the existing entry text; you want most prose human-written and lightly edited.
  - kind: prose
  - file: src/data/experience.ts
- [?] claim: Kiki UI summary: the design system behind ChannelAI's iOS app (components, color, typography) (from feat/efforts) (from feat/global-modal) (from feat/content-requests)
  - why: Drafted from the existing entry text; you want most prose human-written and lightly edited.
  - kind: prose
  - file: src/data/experience.ts
- [?] claim: User notifier summary: a real-time email notification system that shows Arbor users what they are saving (from feat/efforts) (from feat/global-modal) (from feat/content-requests)
  - why: Drafted from the existing entry text; you want most prose human-written and lightly edited.
  - kind: prose
  - file: src/data/experience.ts
- [?] media: Replace each 'Image to come' placeholder (5 experience entries, 3 efforts); the label says what belongs there (from feat/entry-dock) (from feat/content-requests)
  - why: Every entry, effort and gallery shows a labelled stand-in until a real image or video arrives.
  - kind: media
  - file: src/data/experience.ts
- [x] Act on the answer to "Which fonts are in bounds? Proposal: Pixelify Sans, a mono (JetBrains Mono or IBM Plex Mono) and a grotesk (Inter or Space Grotesk) (from feat/control-panel)": Stay full retro, and maybe add one synthwave face
- [ ] Act on the answer to "Sound: synthesised clicks (no files) or recorded samples you pick? (from feat/control-panel)": A real or emulated synth powers every interaction sound, toggled globally, with sounds the visitor can tweak; start simple, and only gate it behind an experimental mode if it turns out heavy
- [ ] Act on the answer to "Should the panel be on phones, or desktop only? (from feat/control-panel)": Yes, phones too where possible: the site is a resume but a toy at heart
- [ ] Phones: the 3D view always renders landscape, whatever the device rotation (rotate the canvas in portrait and map pointer input to match)
  - why: The owner wants the 3D toy on phones in landscape; iOS cannot lock orientation, so the page has to rotate itself
  - file: src/pages/landing/Scene.tsx
- [x] Placeholder e2e test looks inside the dialog, not the first match on the page
  - why: Bugbot on #88: the list's hidden copy of the placeholder can be the first match
  - file: e2e/modal.spec.ts
- [ ] Drafted prose gets request ids too, so REQUESTS.md lists writing to approve beside the images
  - file: scripts/build-requests.mjs
- [x] Entry tabs use the shared useRovingFocus hook
- [ ] Modal window gets a max width on wide screens
- [ ] Window bar: the entry name has no left divider in the modal
- [ ] Nav item hover: the underline collapses smoothly when the pointer leaves
- [ ] Close button: full size, border-colour fill with the X knocked out
- [ ] Phones: the entry image animates between list and window, and fills its space
- [ ] StripedPanel: the placeholder's dashed frame with wide low-opacity stripes, as a general wrapper
- [ ] Retro grid background: wide dashed grid (dashes about 80% of a cell), circular mask, full page below the header, layered with the existing effects
- [ ] 3D view socials: smaller, no Instagram, two rows of three
- [ ] Page toolkit: layout ideas and components for building pages with content, delivered as skills

## Log

- 2026-10-05: seeded
- 2026-10-05: carried 4 open todo(s) from entry/list
- 2026-10-05: carried 8 open todo(s) from feat/control-panel
- 2026-10-05: carried 11 open todo(s) from feat/content-requests
- 2026-10-05: answered "Which fonts are in bounds? Proposal: Pixelify Sans, a mono (JetBrains Mono or IBM Plex Mono) and a grotesk (Inter or Space Grotesk) (from feat/control-panel)": Stay full retro, and maybe add one synthwave face
- 2026-10-05: answered "Sound: synthesised clicks (no files) or recorded samples you pick? (from feat/control-panel)": A real or emulated synth powers every interaction sound, toggled globally, with sounds the visitor can tweak; start simple, and only gate it behind an experimental mode if it turns out heavy
- 2026-10-05: answered "Should the panel be on phones, or desktop only? (from feat/control-panel)": Yes, phones too where possible: the site is a resume but a toy at heart
- 2026-10-05: done "EntryList with the list and tile presentations from CSS container queries (from entry/list)" at c16a0721
- 2026-10-05: done "One paint-in (border, typewriter, stagger) for list items and tiles (from entry/list)" at 72fc4a56
- 2026-10-05: done "Crossing the breakpoint replays line draws quickly, not from scratch (from entry/list)" at 410d170d
- 2026-10-05: done "Resizing across the breakpoint keeps the same elements (e2e) (from entry/list)" at e64b5f53
- 2026-10-05: done "Panel shell from the gear in the nav; pages switch from tabs and the model's buttons (from feat/control-panel)" at 126027bd
- 2026-10-05: done "Colour page with presets (from feat/control-panel)" at 26849088
- 2026-10-05: done "Type page (families, size, typewriter) (from feat/control-panel)" at 216bbb4f
- 2026-10-05: done "FX page (CRT, grain, motion speed, sound) (from feat/control-panel)" at 6232ae9f
- 2026-10-05: done "Request ids on mock media and drafted prose (from feat/content-requests)" at 20040d4d
- 2026-10-05: done "Sourced files and prose resolve by id at build time (from feat/content-requests)" at 8e04965b
- 2026-10-05: done "Entry tabs use the shared useRovingFocus hook" at ad9e6486
- 2026-10-05: done "Placeholder e2e test looks inside the dialog, not the first match on the page" at b0467dda
- 2026-10-05: done "Act on the answer to "Which fonts are in bounds? Proposal: Pixelify Sans, a mono (JetBrains Mono or IBM Plex Mono) and a grotesk (Inter or Space Grotesk) (from feat/control-panel)": Stay full retro, and maybe add one synthwave face" at 84a8c8a2
