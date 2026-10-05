# Work board

<details><summary><b>About this board</b> · updated 2026-10-05 02:17 UTC · 6 live branches · 0 PRs open · 16 waiting on you</summary>

| | |
|---|---|
| Generated | 2026-10-05 02:17 UTC by `bw board` on `next` |
| Trunk | `staging` |
| Live branches | 6 |
| Open PRs | none |
| Waiting on you | 16 |
| Merged, not yet landed | `feat/control-panel` (run `bw land <branch> --into <next>`) |
| Source of truth | each branch's seed in `.work/branches/`; this file is regenerated, never edited |

</details>

```mermaid
flowchart LR
  n_staging([staging])
  class n_staging trunk
  subgraph plan_0["📋 Entry tabs"]
    n_bw_inbox["<b>One inbox for the owner's<br/>answers</b><br/>🟦 planned<br/><code>bw/inbox</code><br/>▰▰▰▰▱▱▱▱ 3/6<br/><i>next: bw renders INBOX.md with one answ…</i>"]
    class n_bw_inbox planned
    n_feat_content_requests["<b>Mock media and a list of<br/>content to source</b><br/>🟦 planned<br/><code>feat/content-requests</code><br/>▱▱▱▱▱▱▱▱ 0/11 · 🙋 8<br/><i>next: Request ids on mock media and dra…</i>"]
    class n_feat_content_requests planned
  end
  style plan_0 fill:#e0f2fe,stroke:#64748b,color:#0f172a
  subgraph plan_1["📋 One entry component: list"]
    n_entry_cleanup["<b>Tidy after the entry merge</b><br/>🟦 planned<br/><code>entry/cleanup</code><br/>▱▱▱▱▱▱▱▱ 0/2<br/><i>next: Merge carousel.spec into modal.sp…</i>"]
    class n_entry_cleanup planned
    n_entry_open["<b>One open morph, the<br/>carousel's, at every width</b><br/>🟦 planned<br/><code>entry/open</code><br/>▱▱▱▱▱▱▱▱ 0/6<br/><i>next: Closed and open layouts keep the …</i>"]
    class n_entry_open planned
  end
  style plan_1 fill:#fce7f3,stroke:#64748b,color:#0f172a
  subgraph plan_2["📋 Portfolio roadmap"]
    n_release_promote_main["<b>Promote the new site to<br/>main</b><br/>🟦 planned<br/><code>release/promote-main</code><br/>▰▱▱▱▱▱▱▱ 2/11 · 🙋 8<br/><i>next: PR staging into main</i>"]
    class n_release_promote_main planned
  end
  style plan_2 fill:#ecfccb,stroke:#64748b,color:#0f172a
  subgraph loose["🧩 Not in a plan"]
    n_next["<b>Integration branch: the<br/>stream's second staging<br/>merge</b><br/>🟩 active<br/><code>next</code><br/>▱▱▱▱▱▱▱▱ 0/4<br/><i>next: EntryList with the list and tile …</i>"]
    class n_next active,current
  end
  style loose fill:#f1f5f9,stroke:#94a3b8,color:#0f172a
  n_staging --> n_bw_inbox
  n_entry_open --> n_entry_cleanup
  n_staging --> n_entry_open
  n_staging --> n_feat_content_requests
  n_staging --> n_next
  n_staging --> n_release_promote_main
  classDef planned fill:#c7d2fe,stroke:#4f46e5,color:#1e1b4b
  classDef active fill:#bbf7d0,stroke:#16a34a,stroke-width:3px,color:#052e16
  classDef review fill:#fde68a,stroke:#d97706,stroke-width:3px,color:#451a03
  classDef blocked fill:#fecaca,stroke:#dc2626,stroke-width:3px,color:#450a0a
  classDef trunk fill:#1e293b,stroke:#0f172a,color:#f8fafc
  classDef current stroke:#0ea5e9,stroke-width:5px
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

**What.** Every work-in-progress branch merges here instead of staging, so this stream reaches staging in two merges (the first was #88) and spends fewer build minutes. No Netlify deploy. Merges to staging once the stream is done.

**How, next.**

- EntryList with the list and tile presentations from CSS container queries (from entry/list)
- One paint-in (border, typewriter, stagger) for list items and tiles (from entry/list)
- Crossing the breakpoint replays line draws quickly, not from scratch (from entry/list)

| Branch | PR | Status | Progress | Next | Plan |
|---|---|---|---|---|---|
| `next` |  | active, local only | 0/4 | EntryList with the list and tile presentations from CSS container queries (from entry/list) |  |

## 🕘 Just happened

**test(panel): skip the full screen round trip on CI, which cannot load the 3D scene** · 2026-10-05 02:09 · `next` · `945a067b`
Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>

- **fix(panel): the floating panel's tab line draws, and Escape only closes it from inside** · 01:25 · `next` · `6a20899f`
- **feat(requests): request ids on placeholders, resolved by file name, and a generated REQUESTS list** · 01:23 · `next` · `3b71cf90`
- **fix(entries): tile bar line draws, 3D list stays stacked, phone window header line shows** · 01:04 · `next` · `2b953f12`

<details><summary><b>Earlier</b> (full notes for every landed branch are in the <a href="https://github.com/henryjonescodes/portfolio/blob/staging/.work/CHANGELOG.md">changelog</a>)</summary>

| When | What | Where |
|---|---|---|
| 2026-10-05 00:24 | fix(entries): tile media shows and fills the tile on phones | `next` · `f6a2d263` |
| 2026-10-05 00:20 | fix(panel): real tabs, a keyboard font row, and a modal floating window | `next` · `6385b4c8` |
| 2026-10-05 00:20 | fix(prefs): ignore out-of-range stored values and apply before paint | `next` · `f6b075a5` |
| 2026-10-05 00:15 | test: tiles use the list markup; crossing the breakpoint keeps the elements | `next` · `9cd6eff6` |
| 2026-10-05 00:15 | feat(entries): one CSS-switched list for rows and tiles | [#88](https://github.com/henryjonescodes/portfolio/pull/88) · `c00d0c46` |
| 2026-10-05 00:15 | feat(border): redraw a border or line quickly on demand | [#88](https://github.com/henryjonescodes/portfolio/pull/88) · `b6f49807` |
| 2026-10-05 00:15 | test: make the e2e port configurable | [#88](https://github.com/henryjonescodes/portfolio/pull/88) · `2425db0f` |
| 2026-10-05 00:11 | feat(panel): colour, type and FX control panel in 3D and 2D | [#88](https://github.com/henryjonescodes/portfolio/pull/88) · `3d6f0049` |
| 2026-10-05 00:08 | feat(prefs): type, motion speed and CRT preferences with persistence | [#88](https://github.com/henryjonescodes/portfolio/pull/88) · `8e9b356a` |
| 2026-10-05 00:07 | test: let the e2e port come from E2E_PORT | [#88](https://github.com/henryjonescodes/portfolio/pull/88) · `b2165509` |
| 2026-10-05 00:06 | fix(entries): a phone-sized window drops any drag offset | [#86](https://github.com/henryjonescodes/portfolio/pull/86) · `7de48b4c` |
| 2026-10-05 00:02 | test: skip the open-sync check on CI only until the morph is rebuilt | [#86](https://github.com/henryjonescodes/portfolio/pull/86) · `0d2e49d1` |

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
| [2026-10-entry-reconcile.md](https://github.com/henryjonescodes/portfolio/blob/staging/.work/plans/2026-10-entry-reconcile.md) | 2 of 4 branches done |
| [2026-10-roadmap.md](https://github.com/henryjonescodes/portfolio/blob/staging/.work/plans/2026-10-roadmap.md) | 3 of 4 branches done |

</details>

<details><summary><b>All branches</b></summary>

| Branch | Title | Status | PR | Todos | Commits | Remote | Next |
|---|---|---|---|---|---|---|---|
| `bw/inbox` | One inbox for the owner's answers | planned |  | 3/6 | 0 | local only | bw renders INBOX.md with one answer slot per open question |
| `entry/cleanup` | Tidy after the entry merge | planned |  | 0/2 | 0 | local only | Merge carousel.spec into modal.spec; drop dead styles and tunables |
| `entry/open` | One open morph, the carousel's, at every width | planned |  | 0/6 | 0 | local only | Closed and open layouts keep the same elements in the same order, with shared layoutIds |
| `feat/content-requests` | Mock media and a list of content to source | planned |  | 0/11 | 0 | 24 to push, 85 to pull | Request ids on mock media and drafted prose |
| `next` ◀ | Integration branch: the stream's second staging merge | active |  | 0/4 | 18 | local only | EntryList with the list and tile presentations from CSS container queries (from entry/list) |
| `release/promote-main` | Promote the new site to main | planned |  | 2/11 | 0 | 23 to push | PR staging into main |

<details><summary><code>bw/inbox</code>: One inbox for the owner's answers (3/6)</summary>

Every open question and claim across branches is gathered into INBOX.md on the board branch, answerable from GitHub's editor. bw pulls answers back into the right branch's seed as a todo to act on, so the session on that workstream picks it up.

- [ ] bw renders INBOX.md with one answer slot per open question
- [ ] bw ingests answers (from origin/board) into seeds and logs them
- [ ] branchwork-loop applies the inbox at the start of a session
- [x] bw stats: a STATS.md beside the board with lines added and removed, commits, PRs and files changed since a base, plus a before and after file tree (files on unmerged branches marked 🚧, sketched branches listed as planned)
- [x] Board layout from the approved sample: metadata and legend folded, Happening now with motivation, what, how and a table, Just happened (one full, three short, earlier folded with changelog links), questions grouped by kind with why, ask and file links, instructions folded
- [x] Ambient branchwork-quiz skill: offer a quiz at natural pauses without blocking, ask the juiciest few open questions (max 4) with AskUserQuestion, record answers with bw answer

</details>

<details><summary><code>entry/cleanup</code>: Tidy after the entry merge (0/2)</summary>

Specs, skills and docs describe one entry component.

- [ ] Merge carousel.spec into modal.spec; drop dead styles and tunables
- [ ] Update the layout-modal, carousel-spec and entry-panels skills and CLAUDE.md

</details>

<details><summary><code>entry/open</code>: One open morph, the carousel's, at every width (0/6)</summary>

Opening any entry mounts the window over its source in the closed layout and opens it to a target box the CSS decides (full height on phones, a centred window with a desktop margin on wide screens), with the carousel's per-part clocks (title, date, media, details). Closing morphs back and unmounts on completion. The carousel's own overlay code goes.

- [ ] Closed and open layouts keep the same elements in the same order, with shared layoutIds
- [ ] Per-part timings from the carousel tunables, shared by every width
- [ ] Remove EntryCarousel and EntryCard; one provider opens everything
- [ ] e2e: open and close at both widths, and a resize while open
- [ ] The 'content never ahead of the window' check fails on the CI runner only (6 to 10px overhang) since #84; passes locally even CPU-throttled. Re-check once the morph is rebuilt
- [ ] Re-enable the CI skip on the open-sync check in e2e/modal.spec.ts

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

<details><summary><code>next</code>: Integration branch: the stream's second staging merge (0/4)</summary>

Every work-in-progress branch merges here instead of staging, so this stream reaches staging in two merges (the first was #88) and spends fewer build minutes. No Netlify deploy. Merges to staging once the stream is done.

- [ ] EntryList with the list and tile presentations from CSS container queries (from entry/list)
- [ ] One paint-in (border, typewriter, stagger) for list items and tiles (from entry/list)
- [ ] Crossing the breakpoint replays line draws quickly, not from scratch (from entry/list)
- [ ] Resizing across the breakpoint keeps the same elements (e2e) (from entry/list)

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

- **Answer in the inbox.** `INBOX.md` on this branch lists every open question with a slot for the answer. Edit it on GitHub; the next publish moves each answer into its branch as work to do.
- **Start at Happening now.** It says why the current work matters, what is being built, how, and where to look. The diagram above it maps everything in flight.
- **Just happened** is newest first: one full entry, three short ones, the rest folded with links to the changelog, which keeps the full notes for every landed branch.
- **Questions are grouped** by what they need from you: a fact, some writing, a decision, a file, a check or a review. Each says why it is asked and links the file it is about, so you can decide without opening a session.
- **Answering:** reply in chat for now; a single INBOX.md you can answer on GitHub is on the way.
- **This file is generated** on every commit from the branches' seeds, so edits here are overwritten. To change what is tracked, ask in chat or edit a seed with `bw`.

</details>
