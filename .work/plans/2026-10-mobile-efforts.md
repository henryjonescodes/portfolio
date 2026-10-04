# Mobile polish, carousels, efforts and sharing, October 2026

Ordered by weight: phone-first fixes, then the carousel and paint-in, then efforts, then sharing.

## fix/mobile-polish
parent: staging
title: Phone polish and an updated map
goal: Quick wins seen on a phone: no white behind the page in iOS Safari, a slightly larger mobile header, and the map saying where work happens now.
- [ ] iOS Safari shows the page colour behind and around the page, not white (html background, theme-color)
- [ ] Mobile site header about 15% larger
- [ ] Map: no longer on the job market; working at Arbor (remote), based in New York City
- [ ] Prune the plans whose branches have all landed

## anim/restore-timing
parent: staging
title: Restore from expanded on the window's clock
goal: Shrinking the experience modal from expanded back to cozy reflows the content with the window, the way the phone projects carousel morphs, instead of before it.
- [ ] Measure restore frame by frame and confirm the reflow runs ahead of the container
- [ ] Copy the carousel's approach (one element owns the size change, content follows) to restore
- [ ] e2e: restore keeps content inside the window and settles with it

## feat/mobile-carousels
parent: staging
title: Experience and projects carousels on phones
goal: Both lists become the phone carousel, with the first tile centred in the available area on both axes while the scroll area stays full width, no dead space at the sides, and the older layout's paint-in (borders drawing, typewriter, stagger) on the tiles.
- [ ] One carousel component for experience and projects on phones
- [ ] First tile centred on both axes; scroll area full width; no side dead space
- [ ] Borrow the paint-in from the list entries: border draws, typewriter titles, staggered children
- [ ] Keep the tile-to-page morph exactly as it is now
- [ ] e2e for the experience carousel and centring
- [ ] ? media: An image or video for each experience entry (Arbor, ChannelAI, Mushroom, Union, Tumblr)

## feat/links-retro
parent: staging
title: Links page in the retro style
goal: The links page reworked to match the old site's links page in the retro, skeuomorphic style, with a link to it from About using the old site's link icon.
- [ ] Restyle /links as raised retro keys, in theme with the old links page
- [ ] Link to /links from About, with the old site's link icon
- [ ] Axe and e2e stay green

## feat/efforts
parent: staging
title: Highlighted efforts inside experience entries
goal: Experience entries can carry efforts (projects or responsibilities) browsable with a mini nav in the modal and full-screen modes; other prose can link to an effort and open its entry's modal on just that effort.
- [ ] Effort data model and a mini nav inside the open entry
- [ ] Efforts: Almanac skill manager (Arbor), Kiki UI design system (ChannelAI), User notifier (Arbor)
- [ ] Hero numbers kit: big numbers plus simple theme charts for efforts without flashy visuals
- [ ] Deep links from prose open the entry modal on one effort
- [ ] Mark unverified data claims in the data and show it only in debug
- [ ] ? claim: User notifier sends about 250,000 notifications a month
- [ ] ? claim: User notifier delivers at a 99.99% success rate
- [ ] ? media: Screens or recordings of Almanac, Kiki UI and the notifier

## feat/shareable-urls
parent: staging
title: Shareable state and per-link previews
goal: URL parameters capture as much state as possible (open entry, effort, size), and link previews reflect the shared state.
- [ ] Modal, effort and expanded state in URL parameters, restored on load
- [ ] Per-URL Open Graph (title, description, image) via a Netlify edge function
- [ ] ? Approve per-entry preview images, or generate them

## feat/global-modal
parent: staging
title: Inline links that open any modal
goal: Later, once the rest has landed. Any text can link to an experience, project or effort and open its modal with an animation, from anywhere including the map's one-line entries.
- [ ] One global modal host and an inline link component
- [ ] The map's single-line experience entries become entry variants that open the modal
