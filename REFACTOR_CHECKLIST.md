# Refactor Checklist

Ranked by impact (highest first). Check off items SELECTED FOR DEVELOPMENT.

## 🔴 Critical Priority

- [X] **1. Fix Type Safety Issues & Bugs**
  - [X] Replace all `any` types with proper Three.js types (`ThreeEvent<PointerEvent>`)
  - [X] Generate GLTF types from model file (`npx gltfjsx`)
  Q: will this overwrite my customized model jsx file, I like types, but we may need to manually bring these in from a gnerated file to our customized one
  - [X] Fix width/height swap bug in `WindowDimensionContext.tsx:129-130`
  - [X] Configure ESLint to prevent `any` usage
  - [X] Fix hook dependency types (`React.DependencyList`)

Priority: Highest

- [ ] **2. Refactor SiteMixer into Composable Components**
  - [ ] Create `routes.ts` config file with route constants
  - [ ] Create `NavigationButton` component
  - [ ] Create `ColorKnob` component with config
  - [ ] Extract `useSiteMixerMaterials` hook
  - [ ] Fix `onBeforeRender` → move to `useEffect` (60fps performance issue)
  - [ ] Reduce SiteMixer from 233 lines to ~80 lines

  Note: We won't be doing #2 at all
  Priority: N/A

- [X] **3. Implement Error Boundaries**
  - [X] Create base `ErrorBoundary` component
  - [X] Create `Canvas3DErrorBoundary` with lite mode fallback
  - [X] Wrap Canvas with error boundary
  - [X] Wrap lazy routes with error boundaries
  - [X] Add error logging utility

Priority: Lowest

- [ ] **4. Optimize Asset Loading & Performance**
  - [ ] Convert PNG textures to WebP (11.7MB → ~3MB)
  - [ ] Update texture loader to use WebP files
  - [ ] Code-split Leva debug UI (lazy load)
  - [ ] Configure Vite manual chunks (separate Three.js)
  - [ ] Add bundle size budgets

  Priority: N/A
  Note: We won't be doing #4 at all

- [ ] **5. Add Basic Accessibility Support**
  - [ ] Add keyboard navigation to menu items (Enter/Space)
  - [ ] Create `AccessibleMenuButton` component
  - [ ] Add skip link for keyboard navigation
  - [ ] Add focus management on route changes
  - [ ] Add ARIA live regions for loading states
  - [ ] Add focus-visible styles
  - [ ] Add screen-reader-only utility class
  - [ ] Add landmark roles (header, main, nav)

  Priority: N/A
  Note: We won't be doing #5 at all

## 🟡 High Priority

- [X] **6. Consolidate Context Architecture**
  - [X] Create `AppProviders.tsx` with all contexts in one place
  - [X] Document context dependency graph (add to ARCHITECTURE.md)
  Note: Make this self documenting, maybe just comments in the appProvider, or have an error thrown inside contexts when they are missing contexts they depend on, we could also combine/hookify some contexts
  - [?] Add TypeScript interfaces showing context dependencies
 Q: what does this actually look like, unsure if we should do this
  - [X] Update route structure to use centralized providers

  Priority: Medium

- [X] **7. Create Centralized Animation Timing System**
  - [X] Create `src/config/animations.ts` with all timing constants
  - [X] Replace all magic numbers with named constants (182+ instances)
  - [X] Update `variants.ts` to import from constants
  - [X] Create `AnimationProvider` with Leva integration
  Q: can we tweak BOTH the scale and ALL tbe animation timing constants? it would be nice if our structure allowed leva to just map over the constants and create the right type of button/slider etc, max control desired
  - [X] Document animation architecture (add to ARCHITECTURE.md)
  Note: again just put this light documentation with the code
  - [X] Add animation timing diagram to the readme, make it generalizeable/reference constants not hard numbers

  Priority: Medium - high

- [X] **8. Add Comprehensive Leva Controls**
  - [X] Add descriptions/hints to all existing controls
    Priority: High (this item in particular)
  - [X] Add performance controls (debounce, animations toggle)
  - [X] Add 3D scene debug controls (helpers, stats, wireframe, FOV)
  - [X] Add loading/timeout controls
  - [X] Add animation timing master controls
  - [X] Document Leva controls in DEBUG.md or CLAUDE.md
  lets go for a debug.md since it can be a place to document the debug mode at large

Priority: Medium - high

## 🟢 Medium Priority

- [X] **9. Automate SASS Variable Export**

Note: removed the checklists but this is a good idea, lets use the most native to our project, which is likely doing this with vite + a script

Priority: Medium 

- [X] **10. Improve README & Documentation**
  - [X] Add quick start guide
  - [X] Add troubleshooting section

Note: do this last, this is a WIP project, so the readme should just aim to be up to date with its current setup at time of edit, there is a nice image in there, keep that 
