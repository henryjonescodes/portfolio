# Framer Motion Layout Animation Modal Guide

## Overview
Building a modal that morphs from a source element using Framer Motion's layout animations requires careful attention to transition timing, CSS constraints, and avoiding CSS variables for certain properties.

## Key Principles

### 1. Transition Timing Strategy

**The Pattern from Working Implementation:**
- **Container**: Gets the base animation duration (e.g., `0.35s`)
- **Interior Elements**: Use `duration: 0` to "snap" with the container
- **Result**: Everything animates simultaneously, not sequentially

```tsx
// Container - animates
<motion.div
  layoutId="modal-id"
  transition={{ duration: 0.35 }}
>
  {/* Interior elements - snap instantly */}
  <motion.h2
    layoutId="title"
    transition={{ duration: 0 }}
  />
  <motion.p
    layoutId="description"
    transition={{ duration: 0 }}
  />
</motion.div>
```

**Why This Works:**
- `duration: 0` means the element doesn't independently animate
- Instead, it follows the parent's layout animation instantly
- Prevents the "container moves, then contents rearrange" effect

**Optional Variations (from working main branch):**
- Some elements can use slight multipliers (0.9x, 1.1x) for subtle effects
- Only add after base implementation works

### 2. Double-Render Architecture

**The Problem:**
- Modal needs a "source" position to animate from
- Can't use the same DOM element in two places

**The Solution:**
```tsx
// Collapsed version stays in the page
<ExperienceEntry
  key="entry-collapsed"
  title="My Title"
  isExpanded={false}
/>

// When opened, render expanded version in modal overlay
{modalOpen && (
  <ModalOverlay>
    <ExperienceEntry
      key="entry-expanded"
      title="My Title"
      isExpanded={true}
    />
  </ModalOverlay>
)}
```

**Key Points:**
- Both instances share the same `layoutId` values
- Framer Motion handles the morph between them
- Component renders differently based on `isExpanded` prop
- Source element stays in place during animation

### 3. LayoutGroup and layoutId

```tsx
<LayoutGroup id={uniqueId}>
  <motion.div layoutId={uniqueId}>
    <motion.h2 layoutId={`${uniqueId}-title`} />
    <motion.p layoutId={`${uniqueId}-date`} />
    <motion.div layoutId={`${uniqueId}-body`} />
  </motion.div>
</LayoutGroup>
```

**Rules:**
- Wrap component in `LayoutGroup` with unique ID
- Every animated element needs a unique `layoutId`
- Same `layoutId` on both collapsed and expanded versions
- LayoutGroup isolates animations (prevents conflicts between multiple modals)

### 4. CSS Properties That Must Be Inline

**From Maxime Heckel's Article:**
> "If like me, you're using CSS variables in your codebase, just be warned that setting a CSS variable for the value of borderRadius or boxShadow will not fix any of the side effects. You will need to use a proper value to avoid any distortions."

**Properties to inline:**
- `width` - Especially constraining widths like `600px`
- `borderRadius`
- `boxShadow`
- `backgroundColor` (if animating)

**Why:**
CSS variables can cause distortion during Framer Motion layout animations. Use inline styles with actual values:

```tsx
<motion.div
  style={{
    ...(isExpanded && {
      width: '600px',
      borderRadius: '16px',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8)',
      backgroundColor: 'var(--background-primary)', // This one can use variable
    }),
  }}
/>
```

### 5. Width Constraints Are Critical

**The Problem:**
Children can overflow or shrink independently of parent during animation.

**The Solution:**
Force all children to respect parent bounds:

```scss
.entry {
  width: 100%;

  .header {
    width: 100%;
    max-width: 100%; // Critical!
  }

  .box {
    width: 100%;
    max-width: 100%; // Critical!

    &Content {
      width: 100%;
      max-width: 100%; // Critical!
    }
  }

  .descriptionWrapper {
    flex: 1 1 0; // Not 'auto' - prevents content-based sizing
    width: 100%;
    max-width: 100%; // Critical!
  }
}
```

**Why `max-width: 100%` matters:**
- Prevents children from expanding beyond parent during animation
- Without it, header might expand to full width before container finishes shrinking
- Without it, body might shrink to new width before container finishes expanding

### 6. Transform Origin

```tsx
<motion.div
  style={{
    originX: 0,  // Left
    originY: 1,  // Bottom
  }}
/>
```

**Values:**
- `0` = left/top
- `0.5` = center
- `1` = right/bottom

**Effect:**
Controls the anchor point for the animation. Bottom-left `(0, 1)` makes the modal grow from bottom-left corner of source element.

### 7. Modal Overlay Positioning

**Calculate source position:**
```tsx
const handleClick = (event) => {
  const container = event.currentTarget;
  const wrapper = scrollParentRef.current;
  const rect = container.getBoundingClientRect();
  const wrapperRect = wrapper.getBoundingClientRect();

  setOverlayStyle({
    top: rect.top - wrapperRect.top + wrapper.scrollTop,
    left: rect.left - wrapperRect.left + wrapper.scrollLeft,
    width: rect.width,
    height: rect.height,
    position: 'absolute',
  });
};
```

**Why:**
- Overlay needs to start at exact source position
- Accounts for scroll offset
- Provides starting dimensions for animation

### 8. Close Animation Timing

```tsx
const dismissOverlay = () => {
  setPageOpen(false); // Trigger close animation

  setTimeout(() => {
    navigate('/'); // Clean up after animation
  }, ANIMATION_DURATION * 1000 + 100); // Add 100ms buffer
};
```

**Pattern:**
1. Set state to trigger reverse animation
2. Wait for animation duration
3. Clean up (navigate away, remove from DOM, etc.)

### 9. TypewriterText and Layout Animations

**Discovery:**
TypewriterText works fine with layout animations! No need for special handling.

```tsx
<motion.h2 layoutId="title">
  <TypewriterText text={title} />
</motion.h2>
```

**Just make sure:**
- TypewriterText doesn't have conflicting opacity animations
- Layout animation happens on the wrapper, not the text itself

## Common Mistakes

### ❌ Shared Transition Object
```tsx
const layoutTransition = { duration: 0.35 };

// Applied everywhere
<motion.h2 transition={layoutTransition} />
<motion.p transition={layoutTransition} />
```

**Problem:** Everything animates independently at same speed, causing sequential/staggered appearance.

### ✅ Individual Transitions
```tsx
<motion.div transition={{ duration: 0.35 }}> {/* Container */}
  <motion.h2 transition={{ duration: 0 }} /> {/* Snaps */}
  <motion.p transition={{ duration: 0 }} /> {/* Snaps */}
</motion.div>
```

---

### ❌ CSS Width Constraints
```scss
.modal {
  width: 600px; // Won't animate smoothly
  border-radius: 16px; // May distort
}
```

**Problem:** CSS variables and static values can cause distortion.

### ✅ Inline Styles
```tsx
<motion.div
  style={{
    ...(isExpanded && {
      width: '600px',
      borderRadius: '16px',
    }),
  }}
/>
```

---

### ❌ Missing Width Constraints
```scss
.header {
  display: flex;
  // No width constraint
}
```

**Problem:** Header can expand/shrink independently of parent animation.

### ✅ Full Width Constraints
```scss
.header {
  display: flex;
  width: 100%;
  max-width: 100%;
}
```

---

### ❌ Single Component Instance
```tsx
{selectedId && (
  <Modal>
    <ExperienceEntry id={selectedId} />
  </Modal>
)}
```

**Problem:** No source element to animate from.

### ✅ Double Render
```tsx
{/* Always rendered - source */}
<ExperienceEntry id="item" isExpanded={false} />

{/* Conditionally rendered - modal */}
{modalOpen && (
  <Modal>
    <ExperienceEntry id="item" isExpanded={true} />
  </Modal>
)}
```

## Debugging Checklist

When animations look wrong:

1. **Sequential animation (container moves, then contents)?**
   - ✅ Set interior elements to `transition={{ duration: 0 }}`

2. **Distortion/glitching during animation?**
   - ✅ Move `width`, `borderRadius`, `boxShadow` inline
   - ✅ Use actual values, not CSS variables for these properties

3. **Children overflow/shrink at wrong time?**
   - ✅ Add `width: 100%; max-width: 100%;` to all child elements
   - ✅ Change `flex: 1 1 auto` to `flex: 1 1 0`

4. **Animation starts from wrong position?**
   - ✅ Check overlay positioning calculation
   - ✅ Verify transform origin (`originX`, `originY`)

5. **Text disappearing/flickering?**
   - ✅ Check for conflicting opacity animations
   - ✅ Verify z-index stacking

6. **Multiple modals interfering?**
   - ✅ Ensure each has unique LayoutGroup ID
   - ✅ Verify unique layoutId for all elements

## Working Example Structure

```tsx
const ExperienceEntry = ({ isExpanded, onClose, ...props }) => {
  const ANIMATION_DURATION = 0.35;
  const modalId = `modal-${props.title}`;

  return (
    <LayoutGroup id={modalId}>
      <motion.div
        layoutId={modalId}
        className={cn({
          [styles.entry]: true,
          [styles.modal]: isExpanded,
        })}
        transition={{ duration: ANIMATION_DURATION }}
        style={{
          originX: 0,
          originY: 1,
          ...(isExpanded && {
            width: '600px',
            borderRadius: '16px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8)',
          }),
        }}
      >
        <motion.span
          layoutId={`${modalId}-header`}
          transition={{ duration: 0 }}
        >
          <motion.h2
            layoutId={`${modalId}-title`}
            transition={{ duration: 0 }}
          >
            {props.title}
          </motion.h2>
        </motion.span>

        <motion.div
          layoutId={`${modalId}-body`}
          transition={{ duration: 0 }}
        >
          {props.description}
        </motion.div>
      </motion.div>
    </LayoutGroup>
  );
};
```

## Resources

- [Framer Motion Layout Animations - Maxime Heckel](https://blog.maximeheckel.com/posts/framer-motion-layout-animations/)
- Key insight: CSS variables cause distortion with borderRadius/boxShadow
- Working reference: `/src/pages/Home/components/experience/ExperienceEntry.tsx` on `main` branch

## Next Steps for Clean Implementation

1. Start with minimal component (just title + description)
2. Add `layoutId` to all elements
3. Test basic expand/contract with NO custom transitions
4. Add `duration: 0` to interior elements
5. Add width constraints to CSS
6. Move animating properties inline
7. Test thoroughly before adding more features
8. Add navbar, backgrounds, etc. only after core animation works
