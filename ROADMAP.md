# Roadmap

Work is tracked as branches. Each branch carries its own ticket in `.work/branches/`, and
`.work/BOARD.md` (generated, not committed) shows what needs a person, what is happening and
what just happened. Plans live in `.work/plans/`; landed work is in
[`.work/CHANGELOG.md`](.work/CHANGELOG.md).

## Where the site stands

- `staging` carries the Vite and React Three Fiber rewrite and deploys on every merge.
  `main` still serves the old webpack site.
- On `staging` now: experience and project modals with panels and an expandable size, a
  phone-only projects carousel, the `/links` page and resume, one tunable animation config
  with Leva only in debug, reduced-motion support, retro chrome (one radius scale and bevel),
  an accessibility pass, sharing metadata, and lighter loads (no three.js in lite mode, WebP
  textures, a Draco model).
- Every PR runs lint, types, knip, an asset check and the Playwright suite in CI.

## Next

1. **Release.** Promote `staging` to `main` once the design passes below are signed off.
2. **Design passes.** The list and modal, the retro chrome, the phone carousel, and one
   background shade (static CSS `#043030` against the knobs' `#003838`).
3. **Content.** Real panel content per project (screenshots, galleries, stats).

## Later

- Visual baselines (screenshot comparison) for the animation states the suite checks
  structurally.
- A lossy colour bake (about 0.8 MB smaller) after a visual check.
- Branchwork: batch seed edits into one commit and a CI check that seeds parse.
