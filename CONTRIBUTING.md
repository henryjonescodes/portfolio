# Work board

<details><summary><b>About this board</b> · updated 2026-10-04 20:48 UTC · 9 live branches · 0 PRs open · 16 waiting on you</summary>

| | |
|---|---|
| Generated | 2026-10-04 20:48 UTC by `bw board` on `` |
| Trunk | `staging` |
| Live branches | 9 |
| Open PRs | none |
| Waiting on you | 16 |
| Merged, not yet landed | `feat/entry-tabs`, `fix/modal-nav-mini` (run `bw land <branch> --into <next>`) |
| Source of truth | each branch's seed in `.work/branches/`; this file is regenerated, never edited |

</details>

```mermaid
flowchart LR
  n_staging([staging])
  n_feat_entry_tabs([feat/entry-tabs])
  n_bw_inbox["<b>One inbox for the owner's answers</b><br/>bw/inbox<br/>planned · 0/6<br/><i>next: bw renders INBOX.md with one answer s…</i>"]
  class n_bw_inbox planned
  n_staging --> n_bw_inbox
  n_entry_cleanup["<b>Tidy after the entry merge</b><br/>entry/cleanup<br/>planned · 0/2<br/><i>next: Merge carousel.spec into modal.spec; …</i>"]
  class n_entry_cleanup planned
  n_entry_open --> n_entry_cleanup
  n_entry_list["<b>One list that is a carousel on phones</b><br/>entry/list<br/>planned · 0/3<br/><i>next: EntryList with the list and tile pres…</i>"]
  class n_entry_list planned
  n_entry_window --> n_entry_list
  n_entry_open["<b>One open morph, the carousel's, at every width</b><br/>entry/open<br/>planned · 0/5<br/><i>next: Closed and open layouts keep the same…</i>"]
  class n_entry_open planned
  n_entry_list --> n_entry_open
  n_entry_window["<b>One window for every open entry</b><br/>entry/window<br/>planned · 6/6"]
  class n_entry_window planned
  n_staging --> n_entry_window
  n_feat_content_requests["<b>Mock media and a list of content to source</b><br/>feat/content-requests<br/>planned · 0/11 · 🙋 8<br/><i>next: Request ids on mock media and drafted…</i>"]
  class n_feat_content_requests planned
  n_feat_entry_tabs --> n_feat_content_requests
  n_feat_crosshair_cursor["<b>A crosshair cursor</b><br/>feat/crosshair-cursor<br/>planned · 3/3"]
  class n_feat_crosshair_cursor planned
  n_staging --> n_feat_crosshair_cursor
  n_fix_about_card["<b>About card tidy</b><br/>fix/about-card<br/>planned · 3/3"]
  class n_fix_about_card planned
  n_staging --> n_fix_about_card
  n_release_promote_main["<b>Promote the new site to main</b><br/>release/promote-main<br/>planned · 2/11 · 🙋 8<br/><i>next: PR staging into main</i>"]
  class n_release_promote_main planned
  n_staging --> n_release_promote_main
  classDef planned fill:#eef,stroke:#88a,color:#223
  classDef active fill:#dfd,stroke:#3a3,stroke-width:3px,color:#132
  classDef blocked fill:#fdd,stroke:#c33,color:#311
  classDef review fill:#ffd,stroke:#cc3,color:#331
  classDef current stroke:#06c,stroke-width:4px
```

<details><summary><b>Legend</b></summary>

- 🟩 active: being worked on now
- 🟨 review: a PR is open and waiting on CI, review or a merge
- 🟦 planned: sketched as a branch with a seed, not started
- 🟥 blocked: waiting on something outside the branch
- Blue outline: the branch checked out in the working copy
- `3/4`: todos done out of total · 🙋 n: questions on that branch waiting on you
- Arrows point from a branch to the branches built on top of it

</details>

## 🟢 Happening now

Nothing checked out or active.

## 🕘 Just happened

**feat(entries): phone tiles open the shared window, full screen, image first** · 2026-10-04 20:42 · `entry/window` · `b89de966`
Phone tiles open the same window as wide screens. On phones it takes the whole screen over the site nav, the image sits first under the bar on Overview, and Expand is hidden. Sections drop the entry heading the bar already shows; an effort shows dates only when it has its own. A closed window over a source with no image hides the pane, so it grows in as it opens. The window takes focus as it opens, traps Tab and returns focus to its source. The carousel keeps only its tiles.

- **fix(cursor): hide the system cursor only while the crosshair tracks the pointer** · 20:31 · `feat/crosshair-cursor` · `ed401577`
- **fix(about): NYC, tags on one row, fixed-width sliders, two rows of links** · 20:28 · `fix/about-card` · `250dbac3`
- **fix(modal): the window bar is the main nav: mini items, the name on the right** · 20:24 · [#84](https://github.com/henryjonescodes/portfolio/pull/84) · `d6f7dca5`

<details><summary><b>Earlier</b> (full notes for every landed branch are in the <a href="https://github.com/henryjonescodes/portfolio/blob/staging/.work/CHANGELOG.md">changelog</a>)</summary>

| When | What | Where |
|---|---|---|
| 2026-10-04 20:18 | feat(cursor): a crosshair pointer with dashed guides behind the content | `feat/crosshair-cursor` · `21cece7c` |
| 2026-10-04 20:13 | fix(modal): the close button sits inside the title bar, with the frame as its edge | `fix/about-card` · `e0c96483` |
| 2026-10-04 20:06 | fix(modal): the title bar reads like the main nav: home, the entry's name, icon tabs | [#82](https://github.com/henryjonescodes/portfolio/pull/82) · `be7fc0f6` |
| 2026-10-04 20:06 | fix(modal): the title bar holds the section tabs, stays pinned, and only the body scrolls | [#82](https://github.com/henryjonescodes/portfolio/pull/82) · `d6eb511a` |
| 2026-10-04 20:06 | feat(entries): subpages as nav tabs, a masonry gallery, and a windowed scroll | [#82](https://github.com/henryjonescodes/portfolio/pull/82) · `1881a411` |

</details>

## 🙋 Questions for you

### Facts to confirm

**1. User notifier sends about 250,000 notifications a month**
- *Why:* The User notifier effort leads with this figure, shown as unverified on the live site until you confirm it.
- `claim` · `feat/content-requests` · from `feat/efforts` · [experience.ts](https://github.com/henryjonescodes/portfolio/blob/staging/src/data/experience.ts)

**2. User notifier delivers at a 99.99% success rate**
- *Why:* The second headline figure on the User notifier effort, also marked unverified until confirmed.
- `claim` · `feat/content-requests` · from `feat/efforts` · [experience.ts](https://github.com/henryjonescodes/portfolio/blob/staging/src/data/experience.ts)

### Writing

**3. Almanac summary: a skill manager for the team's AI coding agents, one catalogue of shared skills kept in step across every repo**
- *Why:* Drafted from the existing entry text; you want most prose human-written and lightly edited.
- `prose` · `feat/content-requests` · from `feat/efforts` · [experience.ts](https://github.com/henryjonescodes/portfolio/blob/staging/src/data/experience.ts)

**4. Kiki UI summary: the design system behind ChannelAI's iOS app (components, color, typography)**
- *Why:* Drafted from the existing entry text; you want most prose human-written and lightly edited.
- `prose` · `feat/content-requests` · from `feat/efforts` · [experience.ts](https://github.com/henryjonescodes/portfolio/blob/staging/src/data/experience.ts)

**5. User notifier summary: a real-time email notification system that shows Arbor users what they are saving**
- *Why:* Drafted from the existing entry text; you want most prose human-written and lightly edited.
- `prose` · `feat/content-requests` · from `feat/efforts` · [experience.ts](https://github.com/henryjonescodes/portfolio/blob/staging/src/data/experience.ts)

**6. Review the Arbor and project blurbs (written from existing descriptions)**
- *Why:* They were rewritten from older descriptions and are the first thing visitors read in each entry.
- `prose` · `release/promote-main` · from `content/real-copy` · [experience.ts](https://github.com/henryjonescodes/portfolio/blob/staging/src/data/experience.ts)

### Decisions

**7. Approve per-entry preview images, or generate them**
- *Why:* Shared links show a per-page title and description, but one site-wide image for every entry.
- `decision` · `feat/content-requests` · from `feat/shareable-urls` · [og-image.png](https://github.com/henryjonescodes/portfolio/blob/staging/public/og-image.png)

**8. Which page titles should link to entries? Map lines and prose mentions do now; headings are plain**
- *Why:* Map lines and prose mentions open entries anywhere on the site; headings are still plain text.
- `decision` · `feat/content-requests` · from `feat/global-modal` · [index.tsx](https://github.com/henryjonescodes/portfolio/blob/staging/src/components/EntryLink/index.tsx)

**9. Decide where /links appears (home menu, nav bar, or as home like the old branch)**
- *Why:* The page exists and About links to it, but nothing else on the site leads there.
- `decision` · `release/promote-main` · from `content/real-copy` · [index.tsx](https://github.com/henryjonescodes/portfolio/blob/staging/src/pages/links/index.tsx)

**10. Pick one background-primary: static CSS uses #043030, the knobs' runtime default is #003838 (read from a commented SCSS line)**
- *Why:* The colour shifts slightly when a knob first moves, because static CSS and the knobs start from different shades.
- `decision` · `release/promote-main` · from `design/retro-chrome` · [_colors.scss](https://github.com/henryjonescodes/portfolio/blob/staging/src/styles/_colors.scss#L12)

**11. Allow lossy WebP for the colour bake (q85 saves about 0.8 MB more) after a visual check**
- *Why:* The 3D colour texture could be about 0.8 MB smaller, but only if it still looks right to you.
- `decision` · `release/promote-main` · from `perf/assets` · [images](https://github.com/henryjonescodes/portfolio/blob/staging/public/3D/images)

**12. Approve the share image and description, and confirm the canonical domain is henryjones.xyz**
- *Why:* Every shared link shows this card; it also settles which domain is canonical.
- `decision` · `release/promote-main` · from `seo/meta` · [og-image.png](https://github.com/henryjonescodes/portfolio/blob/staging/public/og-image.png)

### Files to send

**13. Replace each 'Image to come' placeholder (5 experience entries, 3 efforts); the label says what belongs there**
- *Why:* Every entry, effort and gallery shows a labelled stand-in until a real image or video arrives.
- `media` · `feat/content-requests` · from `feat/entry-dock` · [experience.ts](https://github.com/henryjonescodes/portfolio/blob/staging/src/data/experience.ts)

**14. The resume PDF is the 2024 copy from the old site and predates Arbor**
- *Why:* The linked resume predates Arbor; send a new PDF or keep the old one for now.
- `media` · `release/promote-main` · from `content/real-copy` · [Henry-Jones-Resume.pdf](https://github.com/henryjonescodes/portfolio/blob/staging/public/pdf/Henry-Jones-Resume.pdf)

**15. Curate real panel content (screenshots, galleries, stats) per project**
- *Why:* Project modals show panels built from existing copy only; screenshots, galleries and stats make them worth opening.
- `media` · `release/promote-main` · from `feat/modal-panels` · [projects.ts](https://github.com/henryjonescodes/portfolio/blob/staging/src/data/projects.ts)

### Reviews

**16. Design review in 3D and lite mode**
- *Why:* main still serves the old site, and you promote by hand once staging looks right: walk 3D, lite and a phone, including the list and modal, retro chrome, the carousel, tabs and gallery.
- `review` · `release/promote-main` · from `design/retro-chrome`

<details><summary><b>Plans</b></summary>

| Plan | Progress |
|---|---|
| [2026-10-content-and-inbox.md](https://github.com/henryjonescodes/portfolio/blob/staging/.work/plans/2026-10-content-and-inbox.md) | 1 of 3 branches done |
| [2026-10-entry-reconcile.md](https://github.com/henryjonescodes/portfolio/blob/staging/.work/plans/2026-10-entry-reconcile.md) | 0 of 4 branches done |
| [2026-10-mobile-efforts.md](https://github.com/henryjonescodes/portfolio/blob/staging/.work/plans/2026-10-mobile-efforts.md) | 7 of 7 branches done (complete) |
| [2026-10-roadmap.md](https://github.com/henryjonescodes/portfolio/blob/staging/.work/plans/2026-10-roadmap.md) | 3 of 4 branches done |

</details>

<details><summary><b>All branches</b></summary>

| Branch | Title | Status | PR | Todos | Commits | Remote | Next |
|---|---|---|---|---|---|---|---|
| `bw/inbox` | One inbox for the owner's answers | planned |  | 0/6 | 0 | local only | bw renders INBOX.md with one answer slot per open question |
| `entry/cleanup` | Tidy after the entry merge | planned |  | 0/2 | 0 | local only | Merge carousel.spec into modal.spec; drop dead styles and tunables |
| `entry/list` | One list that is a carousel on phones | planned |  | 0/3 | 0 | local only | EntryList with the list and tile presentations from CSS container queries |
| `entry/open` | One open morph, the carousel's, at every width | planned |  | 0/5 | 0 | local only | Closed and open layouts keep the same elements in the same order, with shared layoutIds |
| `entry/window` | One window for every open entry | planned |  | 6/6 | 7 | pushed |  |
| `feat/content-requests` | Mock media and a list of content to source | planned |  | 0/11 | 0 | local only | Request ids on mock media and drafted prose |
| `feat/crosshair-cursor` | A crosshair cursor | planned |  | 3/3 | 2 | pushed |  |
| `fix/about-card` | About card tidy | planned |  | 3/3 | 6 | pushed |  |
| `release/promote-main` | Promote the new site to main | planned |  | 2/11 | 0 | 18 to push | PR staging into main |

<details><summary><code>bw/inbox</code>: One inbox for the owner's answers (0/6)</summary>

Every open question and claim across branches is gathered into INBOX.md on the board branch, answerable from GitHub's editor. bw pulls answers back into the right branch's seed as a todo to act on, so the session on that workstream picks it up.

- [ ] bw renders INBOX.md with one answer slot per open question
- [ ] bw ingests answers (from origin/board) into seeds and logs them
- [ ] branchwork-loop applies the inbox at the start of a session
- [ ] bw stats: a STATS.md beside the board with lines added and removed, commits, PRs and files changed since a base, plus a before and after file tree (files on unmerged branches marked 🚧, sketched branches listed as planned)
- [ ] Board layout from the approved sample: metadata and legend folded, Happening now with motivation, what, how and a table, Just happened (one full, three short, earlier folded with changelog links), questions grouped by kind with why, ask and file links, instructions folded
- [ ] Ambient branchwork-quiz skill: offer a quiz at natural pauses without blocking, ask the juiciest few open questions (max 4) with AskUserQuestion, record answers with bw answer

</details>

<details><summary><code>entry/cleanup</code>: Tidy after the entry merge (0/2)</summary>

Specs, skills and docs describe one entry component.

- [ ] Merge carousel.spec into modal.spec; drop dead styles and tunables
- [ ] Update the layout-modal, carousel-spec and entry-panels skills and CLAUDE.md

</details>

<details><summary><code>entry/list</code>: One list that is a carousel on phones (0/3)</summary>

Experience and projects render one EntryList. A container query turns it from a vertical list into a scroll-snapped row of tiles on narrow widths; the items are the same Entry list items with tile styles, painting in the same way. useAsCarousel and its width check go.

- [ ] EntryList with the list and tile presentations from CSS container queries
- [ ] One paint-in (border, typewriter, stagger) for list items and tiles
- [ ] Resizing across the breakpoint keeps the same elements (e2e)

</details>

<details><summary><code>entry/open</code>: One open morph, the carousel's, at every width (0/5)</summary>

Opening any entry mounts the window over its source in the closed layout and opens it to a target box the CSS decides (full height on phones, a centred window with a desktop margin on wide screens), with the carousel's per-part clocks (title, date, media, details). Closing morphs back and unmounts on completion. The carousel's own overlay code goes.

- [ ] Closed and open layouts keep the same elements in the same order, with shared layoutIds
- [ ] Per-part timings from the carousel tunables, shared by every width
- [ ] Remove EntryCarousel and EntryCard; one provider opens everything
- [ ] e2e: open and close at both widths, and a resize while open
- [ ] The 'content never ahead of the window' check fails on the CI runner only (6 to 10px overhang) since #84; passes locally even CPU-throttled. Re-check once the morph is rebuilt

</details>

<details><summary><code>entry/window</code>: One window for every open entry (6/6)</summary>

The open entry, modal or phone, renders one EntryWindow: the main nav bar with the sections and Close, then media under the bar on phones and beside the text on wide screens, then the body. The phone open view takes the full height over the site nav. Visual change on desktop is nil.

- [x] EntryWindow: bar, media, body and sections, used by the modal and the phone open view
- [x] Phone open view covers the full height, nav included; Close reads clearly
- [x] Media sits under the bar on phones, beside the text on wide screens, by CSS
- [x] e2e: the same window on both widths
- [x] The entry's main image shows only on Overview, never on an effort or the gallery
- [x] Sections (efforts, gallery) drop the entry heading the nav already shows; an effort shows dates only when it has its own

</details>

<details><summary><code>feat/content-requests</code>: Mock media and a list of content to source (0/11)</summary>

Layouts are built against mock images and drafted prose, each tagged with a request id. A generated REQUESTS page lists everything the owner needs to source (images, links, prose, icons) with the draft beside it and where to drop the real thing; dropping a file or prose named by its id replaces the mock or draft with no code change.

- [ ] Request ids on mock media and drafted prose
- [ ] Sourced files and prose resolve by id at build time
- [ ] npm run requests renders the list; bw publishes it next to the board
- [ ] 🙋 Approve per-entry preview images, or generate them (from feat/shareable-urls)
- [ ] 🙋 Which page titles should link to entries? Map lines and prose mentions do now; headings are plain (from feat/global-modal)
- [ ] 🙋 claim: User notifier sends about 250,000 notifications a month (from feat/efforts) (from feat/global-modal)
- [ ] 🙋 claim: User notifier delivers at a 99.99% success rate (from feat/efforts) (from feat/global-modal)
- [ ] 🙋 claim: Almanac summary: a skill manager for the team's AI coding agents, one catalogue of shared skills kept in step across every repo (from feat/efforts) (from feat/global-modal)
- [ ] 🙋 claim: Kiki UI summary: the design system behind ChannelAI's iOS app (components, color, typography) (from feat/efforts) (from feat/global-modal)
- [ ] 🙋 claim: User notifier summary: a real-time email notification system that shows Arbor users what they are saving (from feat/efforts) (from feat/global-modal)
- [ ] 🙋 media: Replace each 'Image to come' placeholder (5 experience entries, 3 efforts); the label says what belongs there (from feat/entry-dock)

</details>

<details><summary><code>feat/crosshair-cursor</code>: A crosshair cursor (3/3)</summary>

The pointer becomes a small crosshair, with dashed guide lines running to every edge of the screen. The lines sit behind the page content and in front of the background; the small mark rides on top with a blend mode so it reads against anything.

- [x] Guide lines follow the pointer behind the content, in front of the background
- [x] Small crosshair on top with a difference blend; grows over anything clickable
- [x] Fine pointers only; touch and reduced motion keep the plain cursor where it matters

</details>

<details><summary><code>fix/about-card</code>: About card tidy (3/3)</summary>

The About card says NYC, keeps its two info lines on one row, gives the skill sliders a fixed width, and shows two rows of links.

- [x] NYC as the location; info lines share a row
- [x] Fixed-width skill sliders
- [x] Two rows of links under the bio

</details>

<details><summary><code>release/promote-main</code>: Promote the new site to main (2/11)</summary>

Retire the old webpack site once staging carries everything above.

- [x] Confirm Netlify deploy settings for main and staging
- [ ] PR staging into main
- [ ] 🙋 Review the Arbor and project blurbs (written from existing descriptions) (from content/real-copy)
- [ ] 🙋 Decide where /links appears (home menu, nav bar, or as home like the old branch) (from content/real-copy)
- [ ] 🙋 The resume PDF is the 2024 copy from the old site and predates Arbor (from content/real-copy)
- [ ] 🙋 Design review in 3D and lite mode (from design/retro-chrome)
- [ ] 🙋 Pick one background-primary: static CSS uses #043030, the knobs' runtime default is #003838 (read from a commented SCSS line) (from design/retro-chrome)
- [ ] 🙋 Curate real panel content (screenshots, galleries, stats) per project (from feat/modal-panels)
- [x] Confirm the first CI run is green on every stacked PR (from modalize-leva-work)
- [ ] 🙋 Allow lossy WebP for the colour bake (q85 saves about 0.8 MB more) after a visual check (from perf/assets)
- [ ] 🙋 Approve the share image and description, and confirm the canonical domain is henryjones.xyz (from seo/meta)

</details>

</details>

<details><summary><b>How to use this board</b></summary>

- **Start at Happening now.** It says why the current work matters, what is being built, how, and where to look. The diagram above it maps everything in flight.
- **Just happened** is newest first: one full entry, three short ones, the rest folded with links to the changelog, which keeps the full notes for every landed branch.
- **Questions are grouped** by what they need from you: a fact, some writing, a decision, a file, a check or a review. Each says why it is asked and links the file it is about, so you can decide without opening a session.
- **Answering:** reply in chat for now; a single INBOX.md you can answer on GitHub is on the way.
- **This file is generated** on every commit from the branches' seeds, so edits here are overwritten. To change what is tracked, ask in chat or edit a seed with `bw`.

</details>
