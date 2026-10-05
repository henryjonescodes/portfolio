# Work stats

_From `origin/main` to `origin/staging`, generated 2026-10-05 00:08 UTC by `bw stats`._

| | |
|---|---|
| Commits | 505 |
| Pull requests merged | 25 |
| Lines added | +15,339 |
| Lines removed | -15,672 |
| Branches in flight | 8 |

## Lines by file type

| Type | Files | Added | Removed |
|---|---|---|---|
| `.svg` | 71 | +208 | -11,894 |
| `.tsx` | 89 | +5,637 | -1,189 |
| `.scss` | 50 | +4,344 | -1,955 |
| `.ts` | 64 | +3,642 | -320 |
| `.md` | 22 | +892 | -33 |
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
│   ├── 3D/  🆕
│   ├── AnimatedBorderBox/  🆕
│   ├── AnimatedLine/  🆕
│   ├── AnimatedOutlet/  🆕
│   ├── Background/  🆕
│   ├── Crosshair/  🆕
│   ├── Efforts/  🆕  🚧
│   ├── EntryCarousel/  🆕  🚧
│   ├── EntryLink/  🆕
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
│   ├── Page/  🆕
│   ├── Panels/  🆕
│   ├── TypewriterText/  🆕
├── config/  🆕
│   ├── animation/  🆕
├── context/  🚧
├── data/  🆕
├── debug/  🆕
├── hooks/  🆕
├── pages/
│   ├── about/  🆕
│   ├── experience/  🆕
│   ├── home/  🆕
│   ├── landing/  🆕
│   ├── links/  🆕
│   ├── projects/  🆕
├── styles/  🚧
├── utils/  🆕  🚧
```

📝 **Planned, not started:**

- `bw/inbox`: One inbox for the owner's answers
- `entry/cleanup`: Tidy after the entry merge
- `entry/list`: One list that is a carousel on phones
- `entry/open`: One open morph, the carousel's, at every width
- `entry/window`: One window for every open entry
- `feat/content-requests`: Mock media and a list of content to source
- `feat/control-panel`: A control panel for colour, type and effects
- `release/promote-main`: Promote the new site to main
