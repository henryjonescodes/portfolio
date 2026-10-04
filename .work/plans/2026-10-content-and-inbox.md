# Entry tabs, gallery, content sourcing and a question inbox, October 2026

## feat/entry-tabs
parent: feat/entry-dock
title: Entry subpages as nav tabs, and a masonry gallery
goal: An open entry's subpages use the main nav's tabs (Overview is the home icon, no text), a Gallery tab appears when an entry has one, and the gallery is a two-column masonry of square, wide (2:1) and tall (1:2) cards. A check fails the build when an effort subpage has no mention in the prose.
- [ ] Subpage tabs styled and built like the main nav items
- [ ] Gallery subpage: masonry with square, wide and tall cards, animated reflow
- [ ] check:mentions in npm run check, and a repertoire rule for it

## feat/content-requests
parent: feat/entry-tabs
title: Mock media and a list of content to source
goal: Layouts are built against mock images and drafted prose, each tagged with a request id. A generated REQUESTS page lists everything the owner needs to source (images, links, prose, icons) with the draft beside it and where to drop the real thing; dropping a file or prose named by its id replaces the mock or draft with no code change.
- [ ] Request ids on mock media and drafted prose
- [ ] Sourced files and prose resolve by id at build time
- [ ] npm run requests renders the list; bw publishes it next to the board

## bw/inbox
parent: staging
title: One inbox for the owner's answers
goal: Every open question and claim across branches is gathered into INBOX.md on the board branch, answerable from GitHub's editor. bw pulls answers back into the right branch's seed as a todo to act on, so the session on that workstream picks it up.
- [ ] bw renders INBOX.md with one answer slot per open question
- [ ] bw ingests answers (from origin/board) into seeds and logs them
- [ ] branchwork-loop applies the inbox at the start of a session
