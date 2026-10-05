# Work stats

_From `origin/main` to `origin/staging`, generated 2026-10-05 13:03 UTC by `bw stats`._

| | |
|---|---|
| Commits | 549 |
| Pull requests merged | 27 |
| Lines added | +16,061 |
| Lines removed | -15,672 |
| Branches in flight | 3 |

## Lines by file type

| Type | Files | Added | Removed |
|---|---|---|---|
| `.svg` | 75 | +220 | -11,894 |
| `.tsx` | 92 | +5,740 | -1,189 |
| `.scss` | 52 | +4,430 | -1,955 |
| `.ts` | 69 | +3,935 | -320 |
| `.md` | 26 | +1,027 | -33 |
| `.js` | 5 | +242 | -156 |
| `.mjs` | 7 | +260 | -0 |
| `.json` | 5 | +125 | -82 |
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
│   ├── requests/  🆕
│   ├── svg/  🚧
├── audio/  🆕  🚧
├── components/  🚧
│   ├── 3D/  🆕  🚧
│   ├── AnimatedBorderBox/  🆕
│   ├── AnimatedLine/  🆕
│   ├── AnimatedOutlet/  🆕
│   ├── Background/  🆕  🚧
│   ├── ControlPanel/  🆕  🚧
│   ├── Crosshair/  🆕
│   ├── Efforts/  🆕  🚧
│   ├── EntryLink/  🆕
│   ├── EntryList/  🆕  🚧
│   ├── EntryMedia/  🆕  🚧
│   ├── ExperienceEntry/  🆕  🚧
│   ├── GlitchIcon/  🆕
│   ├── GlitchIconItem/  🆕
│   ├── GlitchMedia/  🆕
│   ├── GradientBackground/  🆕  🚧
│   ├── HeroNumber/  🆕
│   ├── Loading/  🆕  🚧
│   ├── MapViewer/  🆕
│   ├── MasonryGallery/  🆕
│   ├── NavBar/  🆕  🚧
│   ├── Page/  🆕  🚧
│   ├── Panels/  🆕
│   ├── StripedPanel/  🆕  🚧
│   ├── TypewriterText/  🆕
├── config/  🆕
│   ├── animation/  🆕
├── context/  🚧
├── data/  🆕
├── debug/  🆕
├── hooks/  🆕  🚧
├── pages/  🚧
│   ├── about/  🆕  🚧
│   ├── experience/  🆕
│   ├── home/  🆕
│   ├── landing/  🆕  🚧
│   ├── links/  🆕
│   ├── projects/  🆕
├── styles/
├── utils/  🆕  🚧
```

📝 **Planned, not started:**

- `entry/cleanup`: Tidy after the entry merge
- `entry/open`: One open morph, the carousel's, at every width
