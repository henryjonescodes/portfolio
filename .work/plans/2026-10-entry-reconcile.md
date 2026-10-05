# One entry component: list, tile and window, switched by CSS

Today an entry exists twice. On wide screens `ExperienceEntry` is the list item and, through
`ExperienceEntryModalProvider`, the modal window. On phones `EntryCarousel` and `EntryCard`
are a separate tile and open view with their own morph. JavaScript (`useAsCarousel`, a width
check) picks one tree or the other, so resizing swaps whole components, and the two open
animations differ in quality.

**Why the phone morph is cleaner.** The tile and its open copy share one card and one set of
layoutIds, the closed and open layouts keep the same elements in the same order, and each
part moves on its own tuned clock (title with the card, date a touch slower, media slower
still, details after). The desktop morph rebuilds the window instead: the list header sits
outside the box and the title bar appears inside it, the tabs mount, and the body re-flows,
all on one clock.

**The target.** One `Entry` with three presentations of the same markup: a list item, a
carousel tile and an open window. CSS (container queries on the list, media queries on the
window) decides the presentation, so a viewport change re-lays out the same elements and
the layout animation carries it. One open mechanism (the carousel's: mount over the source,
open to the target box, morph back, unmount on completion) serves every width. The open
window takes the full height on phones, the main nav's bar on top, media directly under the
bar, then text.

## entry/window
parent: staging
title: One window for every open entry
motivation: Phone and desktop open views should be the same window, so a fix or a polish lands once.
goal: The open entry, modal or phone, renders one EntryWindow: the main nav bar with the sections and Close, then media under the bar on phones and beside the text on wide screens, then the body. The phone open view takes the full height over the site nav. Visual change on desktop is nil.
- [ ] EntryWindow: bar, media, body and sections, used by the modal and the phone open view
- [ ] Phone open view covers the full height, nav included; Close reads clearly
- [ ] Media sits under the bar on phones, beside the text on wide screens, by CSS
- [ ] e2e: the same window on both widths

## entry/list
parent: entry/window
title: One list that is a carousel on phones
motivation: Resizing should re-lay out the same entries, not swap one component tree for another.
goal: Experience and projects render one EntryList. A container query turns it from a vertical list into a scroll-snapped row of tiles on narrow widths; the items are the same Entry list items with tile styles, painting in the same way. useAsCarousel and its width check go.
- [ ] EntryList with the list and tile presentations from CSS container queries
- [ ] One paint-in (border, typewriter, stagger) for list items and tiles
- [ ] Resizing across the breakpoint keeps the same elements (e2e)

## entry/open
parent: entry/list
title: One open morph, the carousel's, at every width
motivation: The phone morph is the reference; every open should feel like it.
goal: Opening any entry mounts the window over its source in the closed layout and opens it to a target box the CSS decides (full height on phones, a centred window with a desktop margin on wide screens), with the carousel's per-part clocks (title, date, media, details). Closing morphs back and unmounts on completion. The carousel's own overlay code goes.
- [ ] Closed and open layouts keep the same elements in the same order, with shared layoutIds
- [ ] Per-part timings from the carousel tunables, shared by every width
- [ ] Remove EntryCarousel and EntryCard; one provider opens everything
- [ ] e2e: open and close at both widths, and a resize while open

## entry/cleanup
parent: entry/open
title: Tidy after the entry merge
goal: Specs, skills and docs describe one entry component.
- [ ] Merge carousel.spec into modal.spec; drop dead styles and tunables
- [ ] Update the layout-modal, carousel-spec and entry-panels skills and CLAUDE.md
