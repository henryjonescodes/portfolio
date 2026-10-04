# A control panel: colour, type and effects, on knobs

The 3D device has three knobs (colour, today) and three unused buttons. The panel makes the
same controls reachable with a mouse from the full-screen site, and gives the buttons jobs.

**Shape.** A gear in the main nav (full screen and lite) opens a small device-styled panel with
three pages, switched by the three 3D buttons on the model and by tabs in 2D. Every page is
built from the same few controls: a 2D knob (drag or scroll, detents), a mini slider (the skill
bar, smaller) and a key (on or off). The 3D knobs drive whichever page is open, so the model
and the panel are one instrument. Settings live in the URL and in local storage.

**Pages.**
1. **Colour** (exists): the three hue knobs, plus a few presets (phosphor green, amber,
   ice blue, paper) on keys.
2. **Type**: a knob with detents across three or four families (the pixel face, a mono, a
   grotesk), a size knob within a safe range, and a key for the typewriter effect.
3. **FX**: a CRT knob (scanlines, curvature, glow), a grain or dither knob, a motion-speed knob
   (the animation system's master speed), and a sound key: small synthesised clicks and
   ticks for keys, knobs and the modal, in the spirit of Teenage Engineering.

## feat/control-panel
parent: staging
title: A control panel for colour, type and effects
motivation: Let visitors play with the device, and give the model's knobs and buttons a reason to exist outside 3D.
goal: A gear in the main nav opens a three-page panel (colour, type, FX) built from a 2D knob, a mini slider and a key. The model's three buttons switch pages and its knobs drive the open page. Settings persist in the URL and local storage.
- [ ] 2D knob, mini slider and key controls, keyboard and mouse
- [ ] Panel shell from the gear in the nav; pages switch from tabs and the model's buttons
- [ ] Colour page with presets
- [ ] Type page (families, size, typewriter)
- [ ] FX page (CRT, grain, motion speed, sound)
- [ ] ? Which fonts are in bounds? Proposal: Pixelify Sans, a mono (JetBrains Mono or IBM Plex Mono) and a grotesk (Inter or Space Grotesk)
- [ ] ? Sound: synthesised clicks (no files) or recorded samples you pick?
- [ ] ? Should the panel be on phones, or desktop only?
