# LEVA Animation System Refactor Plan

## Current Architecture (As-Is)

### File Structure
- **Config**: `/src/config/new-animations.ts` - Flat scalar definitions grouped by section
- **Context**: `/src/context/AnimationContext.tsx` - Consumes config, builds Leva schema, provides TRANSITIONS
- **Types**: `/src/types.ts` - Animation type definitions

### Current Pattern
1. Define scalars in flat structure grouped by section (page, modal, navigation, etc.)
2. Extract all scalar values → compute bases → pre-scale values (base × scalar)
3. `buildTransitions()` manually constructs nested TRANSITIONS object from pre-scaled values
4. Leva schema built from flat SCALAR_CONFIG sections

**Example Current Config:**
```typescript
about: {
  _meta: { title: "ℹ️ About Page", collapsed: true },
  ABOUT_HERO_DURATION_SCALAR: {
    value: 1.0,
    base: 'COMPONENT_BASE',
    min: 0, max: 5, step: 0.1,
    label: "Hero Section > Fade In",
    hint: "Duration for hero section to appear",
  },
  // ... more scalars
}

// Later in buildTransitions():
ABOUT_HERO: {
  ANIMATE: {
    duration: scaledValues.ABOUT_HERO_DURATION_SCALAR,
    staggerChildren: scaledValues.ABOUT_HERO_STAGGER_SCALAR,
  },
  EXIT: {
    duration: 0,
    when: "afterChildren" as const, // hardcoded
  },
}
```

### Current Leva Panel Structure
- Flat sections: "🎛️ Master Control", "📄 Page Transitions", "ℹ️ About Page", etc.
- Each section is a collapsed folder
- Fields show: `label` with auto-appended hint `| FIELD_NAME`

---

## Future Architecture (To-Be)

### Vision: Direct TRANSITIONS Definition

Define TRANSITIONS structure directly with inline scalar/constant specifications:

```typescript
TRANSITIONS_CONFIG = {
  ABOUT_HERO: {
    ANIMATE: {
      duration: {
        _type: 'scalar',
        base: 'COMPONENT_BASE',
        value: 1.0,
        min: 0, max: 5, step: 0.1,
        label: "Hero Section > Fade In",
        hint: "Duration for hero section to appear",
      },
      staggerChildren: {
        _type: 'scalar',
        base: 'COMPONENT_BASE',
        value: 0.33,
        min: 0, max: 5, step: 0.1,
        label: "Hero Section > Element Stagger",
        hint: "Delay between hero elements",
      },
    },
    EXIT: {
      duration: {
        _type: 'constant',
        value: 0,
      },
      when: "afterChildren" as const, // embedded directly
    },
  },

  BORDER_BOX: {
    ANIMATE: {
      duration: {
        _type: 'scalar',
        base: 'COMPONENT_BASE',
        value: 5.0,
        min: 0, max: 10, step: 0.1,
      },
      ease: "easeInOut", // embedded directly
    },
    EXIT: {
      duration: {
        _type: 'scalar',
        base: 'COMPONENT_BASE',
        value: 3.33,
        min: 0, max: 10, step: 0.1,
      },
      ease: "easeInOut",
    },
  },
}
```

### Key Design Decisions

**✅ Confirmed Choices:**
1. **Base Calculation**: Keep base × scalar multiplication
   - Scalars with `base: 'COMPONENT_BASE'` still multiply against computed base
   - Final value = `bases.COMPONENT_BASE × scalar.value`

2. **Constants**: Embedded directly in config
   - Non-configurable values (ease, when, staggerDirection) defined inline
   - No wrapper needed for simple constants
   - Use `{_type: 'constant', value: X}` only for numeric constants that shouldn't be Leva controls

3. **Leva Structure**: Nested hierarchy matching TRANSITIONS
   - Top-level folders: ABOUT_HERO, BORDER_BOX, NAV_ITEM, etc.
   - Sub-folders: ANIMATE, EXIT, CONTENT_ANIMATE, etc.
   - Fields: duration, delay, staggerChildren, etc.
   - Example path: `ABOUT_HERO > ANIMATE > duration`

4. **Auto-Generated Hints**: Full path shown
   - Format: `"Human description | ABOUT_HERO.ANIMATE.duration"`
   - Shows complete path from TRANSITIONS root to field

### Processing Flow

```
TRANSITIONS_CONFIG (nested)
    ↓
1. Extract all scalars → Build Leva schema (nested folders)
    ↓
2. User adjusts Leva controls
    ↓
3. Extract values from controls
    ↓
4. Compute bases (master × category scalars)
    ↓
5. Scale values (base × scalar for fields with base property)
    ↓
6. Build final TRANSITIONS object (same shape as current output)
    ↓
7. Components use TRANSITIONS.ABOUT_HERO.ANIMATE.duration
```

### Output Type (Unchanged)

Final TRANSITIONS object maintains current structure:
```typescript
TRANSITIONS.ABOUT_HERO.ANIMATE = {
  duration: 0.45,        // number (computed: COMPONENT_BASE × 1.0)
  staggerChildren: 0.15, // number (computed: COMPONENT_BASE × 0.33)
}

TRANSITIONS.ABOUT_HERO.EXIT = {
  duration: 0,           // number (constant)
  when: "afterChildren", // string literal
}
```

### Type System

```typescript
type ScalarField = {
  _type: 'scalar';
  base?: BaseType;  // if present: base × value, else: absolute value
  value: number;
  min: number;
  max: number;
  step: number;
  label?: string;
  hint?: string;
};

type ConstantField = {
  _type: 'constant';
  value: number;
};

type TransitionField = ScalarField | ConstantField | string | number;

type TransitionAction = {
  [key: string]: TransitionField;
};

type TransitionComponent = {
  [action: string]: TransitionAction;
};

type TransitionsConfig = {
  [component: string]: TransitionComponent;
};
```

---

## Migration Strategy

### Phase 1: Proof of Concept
- Convert 1-2 simple TRANSITION objects (e.g., BORDER_BOX, ICON)
- Implement nested Leva schema builder
- Verify base × scalar multiplication works
- Test auto-hint generation with full paths

### Phase 2: Bulk Migration
- Convert all ~30 TRANSITION objects
- Update AnimationContext to process new structure
- Maintain backward compatibility during migration

### Phase 3: Cleanup
- Remove old SCALAR_CONFIG sections
- Remove manual buildTransitions() mapping
- Update documentation

---

## Benefits of New Approach

1. **Co-location**: Field definition and usage are in same place
2. **Discoverability**: See all ANIMATE/EXIT fields for a component together
3. **Type Safety**: Nested structure provides better TypeScript inference
4. **Leva Organization**: Nested folders match mental model of TRANSITIONS hierarchy
5. **Maintainability**: Adding new transition = add to config, no manual buildTransitions() update
6. **Clarity**: Full path in hints shows exactly where value is used

---

## Open Questions / Future Considerations

- Should we auto-generate labels from field names if not provided?
- How to handle shared constants (e.g., common exit duration of 0)?
- Should bases themselves be part of TRANSITIONS_CONFIG or stay separate?
- Performance impact of deeply nested Leva folders?
- Migration tool to auto-convert current config to new format?

---

## Examples to Reference During Implementation

### Simple Component (2 actions, few fields)
```typescript
ICON: {
  ANIMATE: {
    duration: { _type: 'scalar', base: 'COMPONENT_BASE', value: 1.67, ... },
  },
  EXIT: {
    duration: { _type: 'scalar', base: 'COMPONENT_BASE', value: 1.0, ... },
  },
}
```

### Complex Component (multiple actions, many fields)
```typescript
MODAL_NAVBAR: {
  ANIMATE: {
    duration: { _type: 'scalar', base: 'MODAL_BASE', value: 0.67, ... },
    delay: { _type: 'scalar', base: 'MODAL_BASE', value: 0.33, ... },
  },
  CHILDREN_ANIMATE: {
    delayChildren: { _type: 'scalar', base: 'MODAL_BASE', value: 3.33, ... },
  },
  LINE_ANIMATE: {
    duration: { _type: 'scalar', base: 'MODAL_BASE', value: 1.5, ... },
  },
}
```

### Component with Constants
```typescript
STAT_TRACKER: {
  ANIMATE: {
    staggerChildren: { _type: 'scalar', base: 'COMPONENT_BASE', value: 1.33, ... },
    staggerDirection: -1, // embedded constant
  },
  EXIT: {
    staggerChildren: { _type: 'scalar', base: 'COMPONENT_BASE', value: 0.33, ... },
    staggerDirection: 1,  // embedded constant
  },
}
```
