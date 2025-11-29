# Portfolio
<div style="text-align: center;">
    <img src="./public/gif/Avatar-ASCII-Clear.gif" alt="Description of GIF" width="350"/>
</div>

## About
A personal site created as a space to experiment with new styles and refine my animation skills. It represents my first serious effort to integrate traditional UI with react-three-fiber, blending standard design elements with 3D graphics. Through this project, I aim to push my skills to new heights and explore the creative potential of interactive animations.

## Page Transition Timeline

All animation timings are defined in `src/config/animations.ts` and can be adjusted globally or via the Leva debug panel (`?debug=true`).

```
User clicks navigation link
│
├─ 0s: Current page starts fading out
├─ 0s to PAGE_FADE_OUT: Page opacity 1 → 0
├─ PAGE_FADE_OUT: Route changes (URL updates)
├─ PAGE_FADE_OUT to (PAGE_FADE_OUT + PAGE_ENTER_DELAY): Wait period
├─ (PAGE_FADE_OUT + PAGE_ENTER_DELAY): New page starts fading in
├─ (PAGE_FADE_OUT + PAGE_ENTER_DELAY) to END: Page opacity 0 → 1
└─ END = PAGE_FADE_OUT + PAGE_ENTER_DELAY + PAGE_FADE_IN: Animation complete

Total transition time: ~0.8s (default values)
```

**Default Values** (can be customized):
- `PAGE_FADE_OUT`: 0.2s
- `PAGE_ENTER_DELAY`: 0.1s
- `PAGE_FADE_IN`: 0.5s


## Stack

- **Framework**: React (TypeScript)
- **3D Graphics**: Three.js, React-Three-Fiber, Drei
- **2D Graphics**: Framer Motion, SVG
- **Styling**: Sass, Sass Modules
- **Build**: Vite

## Icons

- **[Pixel Icon Library](https://www.figma.com/community/file/1278952394341234192/pixel-icon-library-1440-pixelated-icons-by-hackernoon)**: By Hackernoon

## Credits
- **[STL to ASCII Generator](https://andrewsink.github.io/STL-to-ASCII-Generator/)**:  Special thanks to [Andrew Sink](https://github.com/AndrewSink) for his 3D model to ASCII art shader tool.



<!-- 1. **Installation**: Provide steps for installing dependencies.
1. **Run**: How to start the project locally or on a server.
2. **Build**: Steps for building the project for production.

Example: -->
## Usage
```bash
# Install dependencies
npm install

# Run the development server
npm run dev

# Build for production
npm run build
