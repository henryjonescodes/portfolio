# Modal System Refactoring Session

## Date
2025-12-13

## Objective
Implement and refactor a modal system for ExperienceEntry components that works across both experience and projects pages, with smooth animations and proper state management.

## Key Accomplishments

### 1. Modal Animation System
- Implemented modal overlay with Framer Motion animations
- Used `AnimatePresence` for enter/exit animations
- Created layout animations with `layoutId` for smooth transitions from list entry to modal
- Added backdrop fade in/out with proper timing
- Implemented modal centering using flexbox (no manual position calculations)

### 2. Animation Constants Centralization
- Moved all modal animation timings to `/src/config/animations.ts`
- Constants include: `MODAL_CONTAINER`, `MODAL_LAYOUT_DELAY`, `MODAL_BLURB_DELAY`, etc.
- All values in seconds for consistency with Framer Motion

### 3. Data Model Refactoring
- Created unified `EntryData` type in `/src/components/ExperienceEntry/types.ts`
- Both experience and projects data use the same base type
- Added `url` and `dateString` fields to support different entry types
- Moved `formatDateRange` utility to `/src/utils/text.ts` with path alias

### 4. Projects Page Modal Implementation
- Created `/src/data/projects.ts` with project data
- Ported complete modal pattern from experience page
- Added `getProjectMedia()` helper for GlitchMedia children
- Integrated video/image content with modal system

### 5. Modal Context System (Major Refactor)
- Created `/src/context/ModalContext.tsx` with:
  - State: `selectedEntry`, `entryRect` (full DOMRect), `pageOpen`, `isClosing`
  - Methods: `openModal()`, `closeModal()`
  - Automatic `pageOpen` delay effect
  - Modal rendering with AnimatePresence
- Removed ~100 lines of duplicated code from each page
- Singleton pattern: one modal serves all pages

### 6. Component Improvements
- ExperienceEntry now accepts full `data` object instead of individual props
- Created ModalNavBar component following existing NavBar patterns
- Added drag functionality to modal (draggable by header)
- Implemented proper event handling (stopPropagation to prevent unwanted closes)

## Technical Challenges & Solutions

### Challenge 1: Modal Positioning
**Problem**: Modal position calculations breaking on window resize
**Attempts**:
- Tried position: absolute with calculated offsets
- Tried viewport-relative positioning
**Solution**: Used flexbox on overlay (`display: flex`, `align-items: center`, `justify-content: center`) for automatic centering

### Challenge 2: Portal Target
**Problem**: React Portal targeting page container that doesn't exist yet
**Attempts**:
- Portal from AppProviders (too early in tree)
- Portal from LandingPage (still outside PageProvider)
**Solution**: Moved ModalProvider inside Page component, render modal directly without portal

### Challenge 3: Animation Propagation
**Discussion**: Framer Motion variant names (`initial`, `animate`, `exit`) propagate to children
- Standard names trigger child animations (desired for list items)
- Custom names like `modalAnimate`/`modalExit` DON'T propagate (desired for modal to skip typewriter animations)
**Decision**: Keep both standard and custom variant names for different use cases

### Challenge 4: Type Organization
**Problem**: Types scattered across data files and components
**Solution**:
- Created `/src/components/ExperienceEntry/types.ts` as single source of truth
- `EntryData` - base data type
- `ExperienceEntryProps` - component props type
- Both data files import and use `EntryData` directly

## File Structure

### New Files
- `/src/context/ModalContext.tsx` - Modal state management and rendering
- `/src/context/modal.module.scss` - Modal overlay styles
- `/src/components/ExperienceEntry/types.ts` - Shared type definitions
- `/src/components/NavBar/ModalNavBar.tsx` - Modal navigation bar
- `/src/components/NavBar/modal-nav-bar.module.scss` - Modal navbar styles
- `/src/data/projects.ts` - Projects data
- `/src/utils/text.ts` - Text formatting utilities

### Modified Files
- `/src/pages/experience/index.tsx` - Simplified to use ModalContext
- `/src/pages/projects/index.tsx` - Added modal support, uses ModalContext
- `/src/components/ExperienceEntry/index.tsx` - Refactored props, variant system
- `/src/config/animations.ts` - Added modal timing constants
- `/src/data/experience.ts` - Uses shared EntryData type
- `/src/pages/landing/LandingPage.tsx` - Added ModalProvider (to be moved to Page)
- `/src/context/AppProviders.tsx` - Removed ModalProvider (moving to page level)

### Removed/Cleaned
- Removed duplicate `.overlay` styles from page SCSS files
- Removed duplicate modal state management (~100 lines per page)
- Removed inline helper functions (moved to data files)

## Code Patterns Established

### 1. Variant Naming Convention
```typescript
// List entries - use standard names (propagates to children)
const listVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 }
};

// Modal - use custom names (doesn't propagate, skips child animations)
const modalVariants = {
  modalAnimate: { opacity: 1 },
  modalExit: { opacity: 1 }
};
```

### 2. Context-Based Modal
```typescript
// Pages use modal via context
const { openModal, selectedEntry } = useModal();

// Open modal with entry data, ref, and optional children
openModal(projectData, entryRef, <GlitchMedia />, url, dateString);

// Check if entry is selected
const isSelected = selectedEntry?.id === id;
```

### 3. Flexbox Centering
```scss
.overlay {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
```

## Remaining Work

### Immediate
- [ ] Move ModalProvider from LandingPage to Page component
- [ ] Create PageProviders file for page-level contexts
- [ ] Fix PageProvider context access for modal

### Future Enhancements
- [ ] Extract reusable modal logic into custom hook (if more pages need modals)
- [ ] Consider extracting `getProjectMedia()` to data file
- [ ] Add modal animation variants to centralized system
- [ ] Document modal usage patterns in CLAUDE.md

## Key Learnings

1. **Flexbox > Manual Calculations**: Auto-centering with flexbox is more reliable than calculating positions
2. **Store Full Objects**: Storing full `DOMRect` is clearer than extracting specific properties
3. **Context Placement Matters**: Provider must be inside all contexts it depends on (PageProvider in this case)
4. **Portal Not Always Needed**: Direct rendering often simpler than React Portal
5. **Variant Propagation**: Understanding Framer Motion's variant propagation is key to controlling child animations

## Performance Notes

- Modal uses layout animations which are GPU-accelerated
- Single modal instance (singleton pattern) prevents multiple overlays
- Lazy-loaded page routes reduce initial bundle size
- AnimatePresence properly cleans up on unmount

## Breaking Changes

None - modal is a new feature for both pages.

## Dependencies Updated

None - used existing dependencies (Framer Motion, React, TypeScript).
