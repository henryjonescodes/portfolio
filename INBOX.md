# Inbox

Questions waiting on the owner. Edit this file on GitHub and write each answer between its two markers;
the next `bw publish --push` (or `bw inbox`) moves every answer into its branch as a todo to act on.

### next: Approve per-entry preview images, or generate them (from feat/shareable-urls) (from feat/content-requests)
<!-- bw:q {"branch":"next","text":"Approve per-entry preview images, or generate them (from feat/shareable-urls) (from feat/content-requests)"} -->
*Why it matters:* Shared links show a per-page title and description, but one site-wide image for every entry.
*Where:* `public/og-image.png`

<!-- answer below this line -->

<!-- answer above this line -->

### next: Which page titles should link to entries? Map lines and prose mentions do now; headings are plain (from feat/global-modal) (from feat/content-requests)
<!-- bw:q {"branch":"next","text":"Which page titles should link to entries? Map lines and prose mentions do now; headings are plain (from feat/global-modal) (from feat/content-requests)"} -->
*Why it matters:* Map lines and prose mentions open entries anywhere on the site; headings are still plain text.
*Where:* `src/components/EntryLink/index.tsx`

<!-- answer below this line -->

<!-- answer above this line -->

### next: claim: User notifier sends about 250,000 notifications a month (from feat/efforts) (from feat/global-modal) (from feat/content-requests)
<!-- bw:q {"branch":"next","text":"claim: User notifier sends about 250,000 notifications a month (from feat/efforts) (from feat/global-modal) (from feat/content-requests)"} -->
*Why it matters:* The User notifier effort leads with this figure, shown as unverified on the live site until you confirm it.
*Where:* `src/data/experience.ts`

<!-- answer below this line -->

<!-- answer above this line -->

### next: claim: User notifier delivers at a 99.99% success rate (from feat/efforts) (from feat/global-modal) (from feat/content-requests)
<!-- bw:q {"branch":"next","text":"claim: User notifier delivers at a 99.99% success rate (from feat/efforts) (from feat/global-modal) (from feat/content-requests)"} -->
*Why it matters:* The second headline figure on the User notifier effort, also marked unverified until confirmed.
*Where:* `src/data/experience.ts`

<!-- answer below this line -->

<!-- answer above this line -->

### next: claim: Almanac summary: a skill manager for the team's AI coding agents, one catalogue of shared skills kept in step across every repo (from feat/efforts) (from feat/global-modal) (from feat/content-requests)
<!-- bw:q {"branch":"next","text":"claim: Almanac summary: a skill manager for the team's AI coding agents, one catalogue of shared skills kept in step across every repo (from feat/efforts) (from feat/global-modal) (from feat/content-requests)"} -->
*Why it matters:* Drafted from the existing entry text; you want most prose human-written and lightly edited.
*Where:* `src/data/experience.ts`

<!-- answer below this line -->

<!-- answer above this line -->

### next: claim: Kiki UI summary: the design system behind ChannelAI's iOS app (components, color, typography) (from feat/efforts) (from feat/global-modal) (from feat/content-requests)
<!-- bw:q {"branch":"next","text":"claim: Kiki UI summary: the design system behind ChannelAI's iOS app (components, color, typography) (from feat/efforts) (from feat/global-modal) (from feat/content-requests)"} -->
*Why it matters:* Drafted from the existing entry text; you want most prose human-written and lightly edited.
*Where:* `src/data/experience.ts`

<!-- answer below this line -->

<!-- answer above this line -->

### next: claim: User notifier summary: a real-time email notification system that shows Arbor users what they are saving (from feat/efforts) (from feat/global-modal) (from feat/content-requests)
<!-- bw:q {"branch":"next","text":"claim: User notifier summary: a real-time email notification system that shows Arbor users what they are saving (from feat/efforts) (from feat/global-modal) (from feat/content-requests)"} -->
*Why it matters:* Drafted from the existing entry text; you want most prose human-written and lightly edited.
*Where:* `src/data/experience.ts`

<!-- answer below this line -->

<!-- answer above this line -->

### next: media: Replace each 'Image to come' placeholder (5 experience entries, 3 efforts); the label says what belongs there (from feat/entry-dock) (from feat/content-requests)
<!-- bw:q {"branch":"next","text":"media: Replace each 'Image to come' placeholder (5 experience entries, 3 efforts); the label says what belongs there (from feat/entry-dock) (from feat/content-requests)"} -->
*Why it matters:* Every entry, effort and gallery shows a labelled stand-in until a real image or video arrives.
*Where:* `src/data/experience.ts`

<!-- answer below this line -->

<!-- answer above this line -->

### next: Review the Arbor and project blurbs (written from existing descriptions)
<!-- bw:q {"branch":"next","text":"Review the Arbor and project blurbs (written from existing descriptions)"} -->
*Why it matters:* They were rewritten from older descriptions and are the first thing visitors read in each entry.
*Where:* `src/data/experience.ts`

<!-- answer below this line -->

<!-- answer above this line -->

### next: Decide where /links appears (home menu, nav bar, or as home like the old branch)
<!-- bw:q {"branch":"next","text":"Decide where /links appears (home menu, nav bar, or as home like the old branch)"} -->
*Why it matters:* The page exists and About links to it, but nothing else on the site leads there.
*Where:* `src/pages/links/index.tsx`

<!-- answer below this line -->

<!-- answer above this line -->

### next: The resume PDF is the 2024 copy from the old site and predates Arbor
<!-- bw:q {"branch":"next","text":"The resume PDF is the 2024 copy from the old site and predates Arbor"} -->
*Why it matters:* The linked resume predates Arbor; send a new PDF or keep the old one for now.
*Where:* `public/pdf/Henry-Jones-Resume.pdf`

<!-- answer below this line -->

<!-- answer above this line -->

### next: Design review in 3D and lite mode
<!-- bw:q {"branch":"next","text":"Design review in 3D and lite mode"} -->
*Why it matters:* main still serves the old site, and you promote by hand once staging looks right: walk 3D, lite and a phone, including the list and modal, retro chrome, the carousel, tabs and gallery.

<!-- answer below this line -->

<!-- answer above this line -->

### next: Pick one background-primary: static CSS uses #043030, the knobs' runtime default is #003838 (read from a commented SCSS line)
<!-- bw:q {"branch":"next","text":"Pick one background-primary: static CSS uses #043030, the knobs' runtime default is #003838 (read from a commented SCSS line)"} -->
*Why it matters:* The colour shifts slightly when a knob first moves, because static CSS and the knobs start from different shades.
*Where:* `src/styles/_colors.scss#L12`

<!-- answer below this line -->

<!-- answer above this line -->

### release/promote-main: Review the Arbor and project blurbs (written from existing descriptions) (from content/real-copy)
<!-- bw:q {"branch":"release/promote-main","text":"Review the Arbor and project blurbs (written from existing descriptions) (from content/real-copy)"} -->
*Why it matters:* They were rewritten from older descriptions and are the first thing visitors read in each entry.
*Where:* `src/data/experience.ts`

<!-- answer below this line -->

<!-- answer above this line -->

### release/promote-main: Decide where /links appears (home menu, nav bar, or as home like the old branch) (from content/real-copy)
<!-- bw:q {"branch":"release/promote-main","text":"Decide where /links appears (home menu, nav bar, or as home like the old branch) (from content/real-copy)"} -->
*Why it matters:* The page exists and About links to it, but nothing else on the site leads there.
*Where:* `src/pages/links/index.tsx`

<!-- answer below this line -->

<!-- answer above this line -->

### release/promote-main: The resume PDF is the 2024 copy from the old site and predates Arbor (from content/real-copy)
<!-- bw:q {"branch":"release/promote-main","text":"The resume PDF is the 2024 copy from the old site and predates Arbor (from content/real-copy)"} -->
*Why it matters:* The linked resume predates Arbor; send a new PDF or keep the old one for now.
*Where:* `public/pdf/Henry-Jones-Resume.pdf`

<!-- answer below this line -->

<!-- answer above this line -->

### release/promote-main: Design review in 3D and lite mode (from design/retro-chrome)
<!-- bw:q {"branch":"release/promote-main","text":"Design review in 3D and lite mode (from design/retro-chrome)"} -->
*Why it matters:* main still serves the old site, and you promote by hand once staging looks right: walk 3D, lite and a phone, including the list and modal, retro chrome, the carousel, tabs and gallery.

<!-- answer below this line -->

<!-- answer above this line -->

### release/promote-main: Pick one background-primary: static CSS uses #043030, the knobs' runtime default is #003838 (read from a commented SCSS line) (from design/retro-chrome)
<!-- bw:q {"branch":"release/promote-main","text":"Pick one background-primary: static CSS uses #043030, the knobs' runtime default is #003838 (read from a commented SCSS line) (from design/retro-chrome)"} -->
*Why it matters:* The colour shifts slightly when a knob first moves, because static CSS and the knobs start from different shades.
*Where:* `src/styles/_colors.scss#L12`

<!-- answer below this line -->

<!-- answer above this line -->

### release/promote-main: Curate real panel content (screenshots, galleries, stats) per project (from feat/modal-panels)
<!-- bw:q {"branch":"release/promote-main","text":"Curate real panel content (screenshots, galleries, stats) per project (from feat/modal-panels)"} -->
*Why it matters:* Project modals show panels built from existing copy only; screenshots, galleries and stats make them worth opening.
*Where:* `src/data/projects.ts`

<!-- answer below this line -->

<!-- answer above this line -->

### release/promote-main: Allow lossy WebP for the colour bake (q85 saves about 0.8 MB more) after a visual check (from perf/assets)
<!-- bw:q {"branch":"release/promote-main","text":"Allow lossy WebP for the colour bake (q85 saves about 0.8 MB more) after a visual check (from perf/assets)"} -->
*Why it matters:* The 3D colour texture could be about 0.8 MB smaller, but only if it still looks right to you.
*Where:* `public/3D/images`

<!-- answer below this line -->

<!-- answer above this line -->

### release/promote-main: Approve the share image and description, and confirm the canonical domain is henryjones.xyz (from seo/meta)
<!-- bw:q {"branch":"release/promote-main","text":"Approve the share image and description, and confirm the canonical domain is henryjones.xyz (from seo/meta)"} -->
*Why it matters:* Every shared link shows this card; it also settles which domain is canonical.
*Where:* `public/og-image.png`

<!-- answer below this line -->

<!-- answer above this line -->
