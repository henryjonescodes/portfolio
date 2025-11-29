# Modal Implementation Plan

## Overview
Create a reusable modal system using Framer Motion's layout animations, inspired by the ExperienceCarousel pattern from the main branch.

## Key Principles from ExperienceCarousel

### 1. LayoutGroup + layoutId (Not AnimatePresence)
- **LayoutGroup** creates isolated animation contexts
- **layoutId** enables shared element transitions between component instances
- Same component renders in both trigger position and modal state
- Framer Motion automatically animates the transformation (FLIP animation)

### 2. Two-Stage Animation Flow
```
Stage 1: Capture position (0ms)
  - Calculate source element position
  - Store position/size in state
  - Render overlay at source position

Stage 2: Expand (10ms delay)
  - Set expanded state to true
  - LayoutId causes automatic morph animation
  - Card transitions to full modal
```

### 3. Position Calculation
```typescript
// Account for scroll offset
const rect = sourceElement.getBoundingClientRect()
const parentRect = scrollParent.getBoundingClientRect()

overlayStyle = {
  top: rect.top - parentRect.top + scrollParent.scrollTop,
  left: rect.left - parentRect.left + scrollParent.scrollLeft,
  width: rect.width,
  height: rect.height,
  position: 'absolute'
}
```

### 4. Nested layoutIds
- Root: `layoutId={modalId}` (unique per instance)
- Structure: `layoutId="header"`, `layoutId="body"`
- Elements: `layoutId="title"`, `layoutId="content"`
- This allows fine-grained control over which elements morph

## Architecture Decision

**Option: Context-Driven Modal System**

Why not URL-driven:
- Current portfolio doesn't use route-based modals
- More flexible for different use cases
- Simpler integration with existing components

### ModalContext Structure
```typescript
type ModalState = {
  modalId: string | null
  isExpanded: boolean
  overlayStyle: React.CSSProperties | null
  content: React.ReactNode | null
}

const ModalContext = {
  modalState: ModalState
  openModal: (id, content, sourceElement, scrollParent?) => void
  closeModal: () => void
}
```

## Implementation Components

### 1. useModal Hook
**Purpose:** Provide modal controls to any component

**Returns:**
- `openModal(id, content, sourceElement, scrollParent?)`
- `closeModal()`
- `modalState`

### 2. ModalProvider Component
**Purpose:** Wrap app to provide modal context

**Responsibilities:**
- Manage modal state
- Render modal overlay when active
- Handle position calculation
- Coordinate animation timing

### 3. LayoutModal Component
**Purpose:** Reusable modal container with layout animations

**Props:**
- `modalId: string` - Unique identifier for LayoutGroup
- `isExpanded: boolean` - Controls card vs modal state
- `overlayStyle: CSSProperties` - Initial position/size
- `onDismiss: () => void` - Close handler
- `children: ReactNode` - Modal content

**Key Features:**
- Uses LayoutGroup with modalId
- Root element has `layout` and `layoutId={modalId}`
- Transitions between card size (collapsed) and full size (expanded)
- Click outside to dismiss

### 4. Modal Content Pattern
Components that open modals should structure content with nested layoutIds:

```typescript
<LayoutModal ...>
  <motion.div layoutId="modalHeader">
    <motion.h2 layoutId="modalTitle">Title</motion.h2>
  </motion.div>
  <motion.div layoutId="modalBody">
    <motion.div layoutId="modalContent">
      {/* Core content */}
    </motion.div>
    {isExpanded && (
      <motion.div layoutId="modalExtra">
        {/* Additional content when expanded */}
      </motion.div>
    )}
  </motion.div>
</LayoutModal>
```

## Animation Timing

**Duration:** 0.35s (from ExperienceCarousel)

**Sequence:**
1. User clicks trigger element
2. Calculate position → 0ms
3. Render overlay at position → 0ms
4. Set expanded state → 10ms
5. Layout animation occurs → 0-350ms
6. Modal fully open → 350ms

**Dismiss:**
1. User clicks dismiss/outside
2. Set expanded = false → 0ms
3. Layout animation reverse → 0-350ms
4. Clear modal state → 450ms (350ms + 100ms buffer)

## Styling Strategy

### Three States via CSS Classes

**Base (.modal):**
```scss
.modal {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  background: var(--background);
}
```

**Collapsed (.modalCollapsed):**
```scss
.modalCollapsed {
  // Inherits source element size via overlayStyle
}
```

**Expanded (.modalExpanded):**
```scss
.modalExpanded {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  border-radius: 0;
  overflow-y: auto;
}
```

**Overlay Container:**
```scss
.modalOverlay {
  position: absolute;
  z-index: 1000;
  // Position/size set dynamically via overlayStyle
}
```

## Integration Points

### Current Portfolio Structure
```
AppProviders
├── WindowDimensionProvider
├── LoadingProvider
├── SettingsProvider
├── AnimationProvider
├── ZoomProvider
├── ColorsProvider
└── InteractionProvider
```

**Add:** ModalProvider after InteractionProvider

### Usage Example
```typescript
// In any component
const { openModal } = useModal()

const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
  openModal(
    'unique-id',
    <ModalContent />,
    e.currentTarget,
    scrollParentRef.current
  )
}

return (
  <div onClick={handleClick}>
    Click to open modal
  </div>
)
```

## Constraints & Considerations

### Performance
- Keep layoutId elements lightweight
- Limit nested layoutIds (max 5-7 levels)
- Use `will-change: transform` on animated elements

### Accessibility
- Trap focus within modal when open
- ESC key to dismiss
- ARIA attributes: `role="dialog"`, `aria-modal="true"`
- Disable body scroll when modal open
- Announce modal state to screen readers

### Mobile
- Handle touch events for dismiss
- Consider faster animations on mobile
- Handle orientation changes
- Respect `prefers-reduced-motion`

## Files to Create

1. `src/context/ModalContext.tsx` - Context provider and hook
2. `src/components/Modal/LayoutModal.tsx` - Reusable modal component
3. `src/components/Modal/index.ts` - Exports
4. `src/components/Modal/modal.module.scss` - Modal styles

## Files to Modify

1. `src/context/AppProviders.tsx` - Add ModalProvider
2. `src/App.tsx` - Verify provider hierarchy

## Success Criteria

- [ ] Modal morphs smoothly from trigger element to full screen
- [ ] Nested elements (title, content) animate independently
- [ ] Click outside dismisses modal with reverse animation
- [ ] Multiple modals can be opened sequentially (one at a time)
- [ ] Works with scrollable parent containers
- [ ] Accessible via keyboard (ESC to close, focus trap)
- [ ] No layout shift or flashing during animation
- [ ] Animation duration matches ExperienceCarousel (0.35s)

## Notes

- The 10ms delay before expansion is critical - ensures React renders overlay before triggering layout change
- Position calculation must account for scroll offset
- LayoutGroup id must be unique per modal instance
- Same component structure in trigger and modal ensures smooth morph
- Framer Motion handles the FLIP animation automatically
