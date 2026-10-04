# Roadmap

Work is tracked as branches. Each branch carries its own ticket in `.work/branches/`, and
`.work/BOARD.md` (generated, not committed) shows every branch, its todos and what waits on
a person. The plan behind the current branches is
[`.work/plans/2026-10-roadmap.md`](.work/plans/2026-10-roadmap.md); landed work is in
[`.work/CHANGELOG.md`](.work/CHANGELOG.md).

## Where the site stands

- `main` deploys the old webpack site (last merged 2024-09). `staging` deploys the Vite and
  React Three Fiber rewrite. Both change only through PRs.
- `modalize-leva-work` adds the experience and project modals, the Leva-tunable animation
  system, a Playwright smoke suite, and a fix for the closed modal swallowing clicks. It
  goes into `staging` as one PR.

## Phases

1. **Animation system** (`modalize-leva-work`, then `anim/motion-idioms`): one config for
   every timing, Leva only in debug, reduced-motion support, Framer Motion orchestration in
   place of timers.
2. **Content** (`content/real-copy`): real blurbs instead of lorem ipsum, the resume, and the
   Links page from the old site.
3. **Projects carousel** (`feat/projects-carousel`): the old site's card-to-page morph, in
   the new styles.
4. **Release** (`release/promote-main`): staging into main, retiring the old site.

## Later, not yet branched

- Fix the remaining lint errors and make `npm run lint` part of a CI check.
- Visual baselines (screenshot comparison) for the animation states the smoke suite only
  checks structurally.
- Unify `react-spring` and `@react-spring/three`, and revisit the camera's spring plus lerp
  smoothing once it can be judged side by side.
- Salvage what is still useful from the `noodling` branch's first modal prototype.
- Branchwork tooling: batch seed edits into one commit, a CI check that seeds parse, and
  automatic `land` on merge.
