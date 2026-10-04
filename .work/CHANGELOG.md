# Work changelog

Landed branches, newest last. Appended by `bw land`.
- 2026-10-04 **chore/ci** folded into `modalize-leva-work`: CI gate on pull requests. GitHub Actions workflow: install, npm run check, Playwright in lite mode; Cache npm and Playwright browsers
- 2026-10-04 **feat/projects-carousel** folded into `feat/modal-panels`: Projects list: carousel lessons on the list layout (https://github.com/henryjonescodes/portfolio/pull/61). Opaque open view and a darker backdrop behind the modal; Escape closes the modal; the open entry is a labelled dialog; Smaller corner radius and bevelled, skeuomorphic title bars on entries and the modal; Move project media into the project data
- 2026-10-04 **perf/assets** → `staging`: Faster loads: lazy 3D and lighter assets (https://github.com/henryjonescodes/portfolio/pull/67). Lazy-load the 3D Scene so lite mode and phones skip three.js and React Three Fiber; Convert the baked textures from PNG to WebP (or KTX2) with no visible loss; Measure before and after: chunk sizes, total transfer, time to scene ready; e2e: lite mode loads no three.js chunk
- 2026-10-04 **seo/meta** → `staging`: Sharing and search metadata (https://github.com/henryjonescodes/portfolio/pull/69). Description, theme-color and canonical URL in index.html; Open Graph and Twitter card tags with a share image
