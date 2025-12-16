# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A React + Three.js portfolio that integrates traditional 2D UI with interactive 3D graphics. The site features a virtual "mixer" interface with rotatable knobs and pressable buttons that control navigation and theming, with graceful degradation to a 2D-only mode for mobile devices or slow connections.

**Stack**: React 18 + TypeScript, Three.js + React Three Fiber, Framer Motion, SASS Modules, Vite

## Development Commands

```bash
# Install dependencies
npm install

# Development server (with QR code for mobile testing)
npm run dev

# Build for production (runs TypeScript check + SASS export + Vite build)
npm run build

# Export SASS variables to TypeScript (run before dev if colors.scss changed)
npm run export-sass-variables

# Generate QR code for mobile testing on local network
npm run generate-qr-code
```

**Important**: The build process automatically exports SASS variables before building. If you modify `src/styles/_colors.scss`, run `npm run export-sass-variables` to update `sass-variables.ts`.

## Development Guidelines

**DO NOT obsessively run TypeScript checks or builds:**
- Don't run `npm run build` or `tsc` after every small change
- Type errors can be fixed later as needed
- Focus on implementing features, not validating constantly
- Only build when explicitly requested or when there's a specific reason to verify compilation

## Architecture Overview

### 2D/3D Integration Strategy

The application uses a **dual-render approach** where the same UI can exist in two modes:

1. **Full 3D Mode** (desktop): Three.js Canvas renders a 3D mixer model with 2D React UI embedded inside the 3D scene via `CustomHTML` component (uses `@react-three/drei`'s Html with context bridging)

2. **Lite Mode** (mobile/slow loading): Traditional 2D-only React without 3D overhead, activated automatically on mobile or when loading times out (8s default, 30s user-initiated)

**Key Integration Point**: `/src/pages/landing/Screen.tsx` bridges the 2D/3D boundary by rendering React components inside Three.js using `CustomHTML`.

**Context Bridging**: `/src/components/3D/CustomHTML.tsx` uses `its-fine` package to share React context between Canvas and DOM (critical for LoadingContext, ZoomContext, ColorsContext).

### State Management: Context-First Architecture

Six specialized contexts handle global state (no Redux/Zustand):

- **ColorsContext** (`/src/context/ColorsContext.tsx`): Dynamic theming synced with 3D knobs, updates CSS custom properties in real-time with debouncing
- **ZoomContext** (`/src/context/ZoomContext.tsx`): Camera positions (`fullscreen | wide | handheld | info`) synced with routes
- **LoadingContext** (`/src/context/LoadingContext.tsx`): 3D asset loading with auto-timeout fallback to lite mode
- **InteractionContext** (`/src/context/InteractionContext.tsx`): Active 3D object tracking, provides `InteractiveElement` HOC
- **WindowDimensionContext** (`/src/context/WindowDimensionContext.tsx`): Responsive breakpoints and zoom position calculations
- **SettingsContext** (`/src/context/SettingsContext.tsx`): Debug mode (`?debug=true`), Leva panel integration

All providers nest in `/src/pages/landing/index.tsx`.

### Animation System: Three Libraries, Three Purposes

1. **Framer Motion**: 2D UI animations (page transitions, text animations, staggered children)
2. **@react-spring/three**: 3D object physics (button presses, knob rotation)
3. **react-spring**: Camera position interpolation and smooth zoom transitions

This separation is intentional: each library optimizes for its rendering domain.

### Styling: SASS + Dynamic CSS Custom Properties

**SASS Organization** (`/src/styles/`):
- `_colors.scss` → Exported to `sass-variables.ts` via build script
- `_typography.scss`, `_layout.scss`, `_mixins.scss` → Global utilities
- All components use CSS Modules (`*.module.scss`)

**Design Token Sharing**:
1. Define colors in `_colors.scss`
2. Run `npm run export-sass-variables` (or build)
3. Import in JS: `import { colors } from '@styles/sass-variables'`
4. Update CSS custom properties dynamically via ColorsContext

**Dynamic Theming Flow**:
User rotates 3D knob → Updates `primaryHues` state → Derives color variants → Updates `:root` CSS variables → UI re-renders with new colors

### Camera & Zoom System

**Zoom Levels** (managed by ZoomContext):
- `fullscreen`: Page fills entire viewport (traditional 2D)
- `wide`: Zoomed out view of entire mixer
- `handheld`: Close-up of mixer (default page view)
- `info`: Close-up of small info panel

**Responsive Positions**: Camera positions adjust per screen size breakpoint (tiny/small/medium/large/xlarge) - see `/src/styles/layout.constants.ts`

**Route-Zoom Sync**: Navigating to `/about` automatically sets zoom to `handheld` and renders content on the 3D screen mesh.

### 3D Scene Hierarchy

**Location**: `/src/pages/landing/Gizmo.tsx`

```
Canvas
└── Gizmo
    ├── Lights (ambient + directional)
    └── PresentationControls (interactive global rotation)
        └── Group (scale: 3)
            ├── Screen (CustomHTML with embedded React pages)
            ├── InfoPanel (small screen)
            └── SiteMixer (main model from GLTF)
                ├── Mesh (handheld base)
                ├── Button × 6 (InteractiveElement HOC, onChange callbacks)
                ├── Knob × 3 (drag/scroll rotation, color control)
                └── Screens mesh
```

**Material System**: GLTF model with baked textures (bake texture, normal map, roughness map from Blender). No custom shaders currently.

### Path Aliases

Configured in both `vite.config.ts` and `tsconfig.json`:

- `@components/*` → `./src/components/*`
- `@styles/*` → `./src/styles/*`
- `@pages/*` → `./src/pages/*`
- `@assets/*` → `./src/assets/*`
- `@hooks/*` → `./src/hooks/*`
- `@context/*` → `./src/context/*`
- `$three` → `./src/three-exports.ts` (optimized Three.js imports for tree-shaking)

### Routing Structure

**Router**: React Router v6 with BrowserRouter (`/src/App.tsx`)

All content routes nest under Landing (`/*`) to share 3D scene context:
- `/` → Home (menu)
- `/about` → About page
- `/experience` → Experience page
- `/projects` → Projects page

**Lazy Loading**: Secondary routes use `React.lazy()` for code splitting.

**URL Parameters**:
- `?lite=true` → Force 2D-only mode
- `?debug=true` → Show Leva debug panel
- Preserved across navigation via `useNavigatePreserveQuery` hook

## Key Files for Understanding Flow

1. **Entry**: `/src/App.tsx` - Router setup
2. **3D Scene**: `/src/pages/landing/Scene.tsx` - Canvas configuration
3. **Main Model**: `/src/components/3D/SiteMixer.tsx` - Button/knob interaction logic
4. **2D/3D Bridge**: `/src/components/3D/CustomHTML.tsx` - Context bridging
5. **Camera**: `/src/components/3D/CustomControls.tsx` - Zoom/position logic
6. **Theming**: `/src/context/ColorsContext.tsx` - Dynamic color system

## Common Workflows

### Adding a New Page

1. Create page component in `/src/pages/[name]/index.tsx`
2. Import and add route to `/src/App.tsx` (with `React.lazy()` for code splitting)
3. Add corresponding button in `/src/components/3D/SiteMixer.tsx` or menu
4. No zoom level configuration needed - handled automatically by route

### Adding a New 3D Component

1. Create in `/src/components/3D/[ComponentName].tsx`
2. Wrap interactive elements with `<InteractiveElement>` HOC from InteractionContext
3. Use `@react-spring/three` for physics-based animations
4. Import Three.js modules from `$three` alias for tree-shaking

### Modifying Colors/Theme

1. Edit `/src/styles/_colors.scss`
2. Run `npm run export-sass-variables`
3. Use colors in JS via `import { colors } from '@styles/sass-variables'`
4. Dynamic runtime changes go through ColorsContext

### Debugging 3D Scene

1. Add `?debug=true` to URL
2. Use Leva panel to adjust camera, animation timings, object positions
3. Toggle OrbitControls for manual camera control
4. Check InteractionContext for active object state

## Performance Considerations

- **Texture Preloading**: Use `useLoader.preload()` to prevent pop-in
- **Optimized Three.js Imports**: Always import from `$three` alias (e.g., `import { Vector3 } from '$three'`) instead of `'three'` for better tree-shaking
- **Debounced Updates**: Color changes debounced to prevent excessive re-renders
- **Code Splitting**: Routes lazy-loaded, visualizer plugin generates bundle analysis
- **Graceful Degradation**: Auto-fallback to 2D mode prevents poor UX on slow connections

## Mobile Development

1. Run `npm run dev` to start dev server with QR code generation
2. Server runs on `0.0.0.0:5173` (accessible on local network)
3. Scan QR code with phone to test on device
4. Lite mode automatically activates on mobile viewport sizes
5. Landscape orientation adjusts camera positions (see CustomControls)

## Component Organization

- **3D Components**: `/src/components/3D/` - Three.js specific (Button, Knob, CustomControls, SiteMixer, CustomHTML)
- **2D Components**: All other component directories - Standard React
- **Each component folder contains**: `index.tsx` + `*.module.scss` (CSS Modules with camelCase conversion)

## TypeScript Notes

- Project uses TypeScript with strict mode
- Some GLTF node types use `any` (acceptable for Three.js scene graph traversal)
- Path aliases resolve in both TS and Vite
- Build runs `tsc -b` before Vite bundling to catch errors

## Critical Patterns to Maintain

1. **Context Bridging**: Always include all required contexts in CustomHTML's `useContextBridge()` when adding new global state
2. **Zoom-Route Sync**: ZoomContext listens to route changes; ensure new routes have appropriate zoom level mapping
3. **CSS Custom Properties**: Dynamic theme colors must update CSS variables in `:root`, not just React state
4. **InteractiveElement HOC**: All clickable 3D objects must use this pattern to prevent event conflicts
5. **Lite Mode Compatibility**: All UI must work in both 3D and 2D modes (test with `?lite=true`)
