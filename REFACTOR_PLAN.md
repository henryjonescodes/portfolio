# Refactor Plan

Actionable tasks for improving codebase maintainability and developer experience.

---

## Task 1: Fix Type Safety Issues & Bugs ✅ PRIORITY: HIGHEST

### Goals
- Eliminate all `any` types
- Fix critical width/height swap bug
- Enforce type safety via ESLint

### Tasks

**1.1 Replace `any` types with proper Three.js types**

Files to update:
- `src/context/InteractionContext.tsx:38-42, 58-85` - All pointer events
- `src/components/3D/Button.tsx:60, 73, 90, 97` - Event handlers
- `src/components/3D/Knob.tsx:128` - Event handler
- `src/hooks/useDebouncedEffect.tsx:3` - Hook dependencies

Replace with:
```typescript
import { ThreeEvent } from '@react-three/fiber'

// Before: onPointerDown?: (e: any) => void
// After:  onPointerDown?: (e: ThreeEvent<PointerEvent>) => void

// Before: deps: any[]
// After:  deps: React.DependencyList
```

**1.2 Generate and integrate GLTF types**

⚠️ **Special handling required**: Current `SiteMixer.tsx` is customized

Steps:
1. Generate types to temporary file: `npx gltfjsx public/3D/models/site-mixer-1.glb --types --output src/types/generated-gltf.ts`
2. Extract type definitions from generated file
3. Manually copy types into `SiteMixer.tsx` without overwriting custom code
4. Replace: `const { nodes, materials } = useGLTF(...) as any;`
5. With: `const { nodes, materials } = useGLTF(...) as GLTFResult;`

**1.3 Fix width/height swap bug**

File: `src/context/WindowDimensionContext.tsx:129-130`

```typescript
// BEFORE (BUG):
return {
  width: screenSize.height,   // ← WRONG
  height: screenSize.width,   // ← WRONG
  // ...
};

// AFTER (FIXED):
return {
  width: screenSize.width,
  height: screenSize.height,
  // ...
};
```

**1.4 Configure ESLint to prevent `any`**

File: `eslint.config.js`

Add rules:
```javascript
{
  rules: {
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/no-unsafe-assignment": "warn",
    "@typescript-eslint/no-unsafe-member-access": "warn"
  }
}
```

---

## Task 3: Implement Error Boundaries ✅ PRIORITY: LOWEST

### Goals
- Prevent 3D crashes from breaking entire app
- Graceful fallback to lite mode
- User-friendly error messages

### Tasks

**3.1 Create base ErrorBoundary component**

Create: `src/components/ErrorBoundary/index.tsx`

Features:
- Optional custom fallback UI
- Error logging callback
- Context string for debugging
- Production-ready error tracking hook

**3.2 Create Canvas3DErrorBoundary**

Create: `src/components/3D/Canvas3DErrorBoundary.tsx`

Behavior:
- On error, automatically call `setLiteMode(true)`
- Show fallback message then switch to 2D mode

**3.3 Wrap Canvas with error boundary**

File: `src/pages/landing/Scene.tsx`

```tsx
<Canvas3DErrorBoundary>
  <Canvas>
    <Gizmo />
  </Canvas>
</Canvas3DErrorBoundary>
```

**3.4 Wrap lazy routes with error boundary**

File: `src/App.tsx`

Create `LazyRoute` wrapper component that combines:
- `<Suspense>` for loading
- `<ErrorBoundary>` for failures

**3.5 Add error logging utility**

Create: `src/utils/errorReporting.ts`

Features:
- Console logging in dev
- Hook for production error tracking (Sentry, LogRocket, etc.)
- Capture context (route, user agent, viewport)

---

## Task 6: Consolidate Context Architecture ✅ PRIORITY: MEDIUM

### Goals
- Single file showing all context providers
- Self-documenting dependencies
- Runtime validation of context requirements

### Tasks

**6.1 Create AppProviders component**

Create: `src/context/AppProviders.tsx`

Structure:
```tsx
/**
 * Application context providers in dependency order.
 *
 * Dependencies:
 * - WindowDimension (no deps)
 * - Loading (no deps)
 * - Settings (uses: useLocation, useNavigate)
 * - Zoom (uses: useLoading, useSettings, useWindowDimensions)
 * - Colors (uses: useSettings)
 * - Interaction (no deps)
 */
export function AppProviders({ children }) {
  return (
    <WindowDimensionProvider>
      <LoadingProvider>
        <SettingsProvider>
          <ZoomProvider>
            <ColorsProvider>
              <InteractionProvider>
                {children}
              </InteractionProvider>
            </ColorsProvider>
          </ZoomProvider>
        </SettingsProvider>
      </LoadingProvider>
    </WindowDimensionProvider>
  );
}
```

**6.2 Add runtime dependency validation**

In contexts that depend on others (e.g., `ZoomProvider`), throw helpful errors:

```typescript
export function ZoomProvider({ children }) {
  const loading = useLoading(); // Will throw if LoadingProvider missing
  const settings = useSettings(); // Will throw if SettingsProvider missing

  if (!loading || !settings) {
    throw new Error(
      'ZoomProvider requires LoadingProvider and SettingsProvider to be ancestors'
    );
  }
  // ...
}
```

**6.3 Update route structure**

File: `src/App.tsx`

```tsx
<Route path="/*" element={<AppProviders><Landing /></AppProviders>}>
  <Route index element={<Home />} />
  <Route path="about" element={<About />} />
</Route>
```

**6.4 Consider combining/hookifying contexts**

Evaluate if any contexts can be:
- Combined (e.g., `WindowDimension` + `Zoom`?)
- Converted to custom hooks instead of Context
- Simplified by removing unused features

---

## Task 7: Centralized Animation Timing System ✅ PRIORITY: MEDIUM-HIGH

### Goals
- Zero magic numbers in animation code
- Single source of truth for all timings
- Leva controls auto-generated from constants
- Global speed multiplier + individual control overrides

### Tasks

**7.1 Create animation constants file**

Create: `src/config/animations.ts`

Structure:
```typescript
/**
 * Centralized animation timing constants.
 *
 * Philosophy:
 * - Fast (0.2-0.3s): Responsive interactions
 * - Medium (0.4-0.6s): Emphasized transitions
 * - Slow (0.8-1.2s): Dramatic effects
 *
 * All timings in SECONDS for Framer Motion consistency.
 */
export const ANIMATION_DURATIONS = {
  // Page transitions
  PAGE_FADE_IN: 0.5,
  PAGE_FADE_OUT: 0.2,
  PAGE_ENTER_DELAY: 0.1,

  // Navigation
  NAV_ITEM_FADE: 0.6,

  // Text effects
  TYPEWRITER_CHAR_STAGGER: 0.03,

  // etc...
} as const;

export const ANIMATION_SPRINGS = {
  BUTTON_PRESS: { tension: 170, friction: 26, mass: 1 },
  KNOB_ROTATION: { tension: 280, friction: 60, mass: 1 },
  CAMERA_ZOOM: { tension: 170, friction: 26, mass: 1 },
} as const;

export const DEBOUNCE_DELAYS = {
  COLOR_UPDATE_MS: 100,
  RESIZE_MS: 150,
} as const;
```

**7.2 Create AnimationProvider with Leva integration**

Create: `src/context/AnimationContext.tsx`

Features:
- Global speed multiplier (0.1-3.0x)
- Leva controls auto-generated from `ANIMATION_DURATIONS`
- Each constant gets its own control (slider/number input based on value)
- Spring constants get nested folder with tension/friction/mass controls
- Export `useAnimations()` hook returning scaled values

Implementation approach:
```typescript
// Iterate over ANIMATION_DURATIONS and create Leva schema
const levaSchema = Object.entries(ANIMATION_DURATIONS).reduce((acc, [key, value]) => {
  acc[key] = { value, min: 0, max: value * 3, step: 0.05, label: formatLabel(key) };
  return acc;
}, {});

// Add global speed multiplier
levaSchema.globalSpeed = { value: 1.0, min: 0.1, max: 3.0, step: 0.1 };

const values = useControls('Animation Timings', levaSchema);
```

**7.3 Replace magic numbers with constants**

Search for numeric literals in:
- `src/pages/home/index.tsx`
- `src/components/TypewriterText/index.tsx`
- `src/components/NavBar/index.tsx`
- `src/components/Page/index.tsx`
- `src/styles/variants.ts`

Replace all with imports from `animations.ts`

**7.4 Update variants.ts**

```typescript
import { ANIMATION_DURATIONS } from '@config/animations';

export const pageVariants = {
  animate: {
    transition: {
      duration: ANIMATION_DURATIONS.PAGE_FADE_IN,
      delay: ANIMATION_DURATIONS.PAGE_ENTER_DELAY
    }
  }
};
```

**7.5 Add animation timing diagram to README**

Create visual diagram showing page transition flow with references to constants:

```
Page Transition Timeline
├─ 0s: User clicks link
├─ 0s-{PAGE_FADE_OUT}s: Current page fades out
├─ {PAGE_FADE_OUT}s: Route changes
├─ {PAGE_FADE_OUT + PAGE_ENTER_DELAY}s: New page starts fading in
└─ {PAGE_FADE_OUT + PAGE_ENTER_DELAY + PAGE_FADE_IN}s: Complete
```

**7.6 Add inline documentation**

In `animations.ts`, document:
- Which library uses which constants (Framer Motion vs react-spring)
- Total perceived transition times (calculated values)
- Relationships between constants (e.g., "should be shorter than X")

---

## Task 8: Add Comprehensive Leva Controls ✅ PRIORITY: MEDIUM-HIGH

### Goals
- All Leva controls have descriptions/hints
- Expose key performance and debug settings
- Create DEBUG.md documenting debug mode

### Tasks

**8.1 Add descriptions to all existing controls** ⭐ HIGH PRIORITY

Files to update:
- `src/components/Page/index.tsx`
- `src/components/Page/PageContents.tsx`
- `src/pages/landing/Gizmo.tsx`
- Any other files using `useControls`

Format:
```typescript
const { pageAnimateDuration } = useControls({
  'Page Transitions': folder({
    pageAnimateDuration: {
      value: 0.5,
      min: 0,
      max: 2,
      step: 0.1,
      label: 'Fade In Duration',
      hint: 'How long the page takes to fade in after route change'
    }
  }, { collapsed: true })
});
```

**8.2 Add performance controls**

In `ColorsContext.tsx`:
```typescript
useControls('Performance', folder({
  colorUpdateDebounce: {
    value: 100,
    min: 0,
    max: 500,
    step: 50,
    label: 'Color Update Debounce (ms)',
    hint: 'Delay before updating CSS variables (prevents excessive re-renders)'
  },
  enableAnimations: {
    value: true,
    label: 'Enable Animations',
    hint: 'Toggle all framer-motion animations'
  }
}, { collapsed: true }));
```

**8.3 Add 3D scene debug controls**

In `Scene.tsx` or `Gizmo.tsx`:
```typescript
useControls('3D Scene Debug', folder({
  showHelpers: { value: false, label: 'Show Axis Helpers' },
  showStats: { value: false, label: 'Show Performance Stats' },
  wireframe: { value: false, label: 'Wireframe Mode' },
  cameraFOV: { value: 75, min: 30, max: 120, step: 5, label: 'Camera FOV' }
}, { collapsed: true }));
```

**8.4 Add loading/timeout controls**

In `LoadingContext.tsx`:
```typescript
useControls('Loading Behavior', folder({
  loadingTimeout: {
    value: 8000,
    min: 1000,
    max: 30000,
    step: 1000,
    label: 'Auto Timeout (ms)',
    hint: 'Time before falling back to lite mode'
  }
}, { collapsed: false }));
```

**8.5 Animation timing master controls**

This will be handled by Task 7's AnimationProvider (auto-generated from constants)

**8.6 Create DEBUG.md**

Create: `DEBUG.md`

Contents:
- How to enable debug mode (`?debug=true`)
- Overview of Leva panel organization
- Description of each control group
- Tips for using debug mode
- How to reset to defaults
- Performance debugging workflow

---

## Task 9: Automate SASS Variable Export ✅ PRIORITY: MEDIUM

### Goals
- SASS variables auto-export on changes
- Zero manual intervention
- Use Vite-native approach

### Tasks

**9.1 Create Vite plugin for SASS export**

File: `vite.config.ts`

Add custom plugin:
```typescript
import { execSync } from 'child_process';

function sassExportPlugin() {
  return {
    name: 'sass-export',
    buildStart() {
      console.log('Exporting SASS variables...');
      execSync('node ./scripts/export-sass-variables.js');
    },
    handleHotUpdate({ file }) {
      if (file.endsWith('_colors.scss')) {
        console.log('SASS colors changed, re-exporting...');
        execSync('node ./scripts/export-sass-variables.js');
      }
    }
  };
}

export default defineConfig({
  plugins: [react(), svgr(), sassExportPlugin(), ...]
});
```

**9.2 Add hash-based change detection (optional optimization)**

Update `scripts/export-sass-variables.js`:
```javascript
import crypto from 'crypto';
import fs from 'fs';

const currentContent = fs.readFileSync(scssFile, 'utf8');
const currentHash = crypto.createHash('md5').update(currentContent).digest('hex');

const hashFile = '.sass-export-hash';
const previousHash = fs.existsSync(hashFile) ? fs.readFileSync(hashFile, 'utf8') : '';

if (currentHash === previousHash) {
  console.log('SASS variables unchanged, skipping export');
  process.exit(0);
}

// ... do export ...

fs.writeFileSync(hashFile, currentHash);
```

**9.3 Update package.json scripts**

```json
{
  "scripts": {
    "dev": "vite",  // ← Now auto-exports via plugin
    "build": "tsc -b && vite build"  // ← Plugin runs on buildStart
  }
}
```

**9.4 Add .sass-export-hash to .gitignore**

---

## Task 10: Update README ✅ PRIORITY: MEDIUM

### Goals
- Keep README current with project state
- Add quick start guide
- Add troubleshooting section
- Maintain existing image

### Tasks

**10.1 Add quick start guide**

Section to add:
```markdown
## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server (auto-exports SASS, shows QR for mobile)
npm run dev

# Build for production
npm run build
```

Dev server runs at `http://localhost:5173`
QR code printed to terminal for mobile testing
```

**10.2 Add troubleshooting section**

```markdown
## 🐛 Troubleshooting

**3D scene not loading?**
- Check console for WebGL errors
- Try `?lite=true` to force 2D mode

**Stale colors after editing SASS?**
- SASS variables auto-export on save
- If stuck, run `npm run export-sass-variables`

**Type errors?**
- Run `npm run build` to check TypeScript
```

**10.3 Update existing content**

- Keep the Avatar ASCII art image
- Update tech stack if needed
- Ensure all sections reflect current project state
- Add link to CLAUDE.md and DEBUG.md (once created)

---

## Implementation Order

1. **Task 1** (Type Safety) - Foundation for everything else
2. **Task 7** (Animation System) - Needed before Task 8
3. **Task 8** (Leva Controls) - Depends on Task 7's AnimationProvider
4. **Task 6** (Context Consolidation) - Architectural cleanup
5. **Task 9** (SASS Automation) - Quick win, improves DX
6. **Task 3** (Error Boundaries) - Safety net
7. **Task 10** (README) - Final polish

---

## Notes for Implementation

- Each task is independent except where noted
- All changes should be backward compatible
- Test in both 3D and lite mode (`?lite=true`)
- Verify debug mode still works (`?debug=true`)
- Check mobile via QR code after significant changes
