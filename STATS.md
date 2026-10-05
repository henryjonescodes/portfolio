# Work stats

_From `origin/main` to `origin/staging`, generated 2026-10-05 00:17 UTC by `bw stats`._

| | |
|---|---|
| Commits | 522 |
| Pull requests merged | 26 |
| Lines added | +15,252 |
| Lines removed | -15,672 |
| Branches in flight | 7 |

## Lines by file type

| Type | Files | Added | Removed |
|---|---|---|---|
| `.svg` | 71 | +208 | -11,894 |
| `.tsx` | 89 | +5,473 | -1,189 |
| `.scss` | 50 | +4,314 | -1,955 |
| `.ts` | 64 | +3,659 | -320 |
| `.md` | 24 | +982 | -33 |
| `.js` | 5 | +242 | -156 |
| `.json` | 5 | +124 | -82 |
| `.mjs` | 6 | +168 | -0 |
| `.gitignore` | 1 | +53 | -10 |
| `.html` | 2 | +29 | -33 |

## Source tree

<details><summary><b>Before</b> (`origin/main`)</summary>

```
src/
├── assets/
│   ├── fonts/  ✂️
│   ├── jobs/  ✂️
│   ├── png/  ✂️
│   ├── svg/
│   ├── video/  ✂️
├── components/
│   ├── map-viewer/  ✂️
│   ├── socials-list/  ✂️
│   ├── traced-text/  ✂️
│   ├── video-background/  ✂️
├── constants/  ✂️
├── context/
├── pages/
│   ├── Home/  ✂️
│   ├── Links/  ✂️
├── styles/
├── typings/  ✂️
```

</details>

**After** (`origin/staging`, plus work in flight): 🆕 new since before · 🚧 changed on an unmerged branch

```
src/  🚧
├── assets/  🚧
│   ├── svg/  🚧
├── components/  🚧
│   ├── 3D/  🆕  🚧
│   ├── AnimatedBorderBox/  🆕  🚧
│   ├── AnimatedLine/  🆕
│   ├── AnimatedOutlet/  🆕
│   ├── Background/  🆕
│   ├── ControlPanel/  🆕  🚧
│   ├── Crosshair/  🆕
│   ├── Efforts/  🆕
│   ├── EntryCarousel/  🆕  🚧
│   ├── EntryLink/  🆕
│   ├── EntryList/  🆕  🚧
│   ├── EntryMedia/  🆕
│   ├── ExperienceEntry/  🆕  🚧
│   ├── GlitchIcon/  🆕
│   ├── GlitchIconItem/  🆕
│   ├── GlitchMedia/  🆕
│   ├── GradientBackground/  🆕
│   ├── HeroNumber/  🆕
│   ├── Loading/  🆕
│   ├── MapViewer/  🆕
│   ├── MasonryGallery/  🆕
│   ├── NavBar/  🆕  🚧
│   ├── Page/  🆕  🚧
│   ├── Panels/  🆕
│   ├── TypewriterText/  🆕
├── config/  🆕  🚧
│   ├── animation/  🆕  🚧
├── context/  🚧
├── data/  🆕
├── debug/  🆕
├── hooks/  🆕
├── pages/  🚧
│   ├── about/  🆕
│   ├── experience/  🆕  🚧
│   ├── home/  🆕
│   ├── landing/  🆕  🚧
│   ├── links/  🆕
│   ├── projects/  🆕  🚧
├── styles/  🚧
├── utils/  🆕
```

📝 **Planned, not started:**

- `bw/inbox`: One inbox for the owner's answers
- `entry/cleanup`: Tidy after the entry merge
- `entry/list`: One list that is a carousel on phones
- `entry/open`: One open morph, the carousel's, at every width
- `feat/content-requests`: Mock media and a list of content to source
- `feat/control-panel`: A control panel for colour, type and effects
- `release/promote-main`: Promote the new site to main
