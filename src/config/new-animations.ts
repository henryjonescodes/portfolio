/**
 * Centralized animation system with Leva-configurable timing.
 *
 * Architecture:
 * - ANIMATION_MASTER_BASE: Single source of truth for all animation speed
 * - Category bases: Derived from master, group related animations
 * - Transition objects: Export complete transition configs (duration + delay + etc)
 *
 * All durations in SECONDS for Framer Motion consistency.
 *
 * To configure: Add `?debug=true` to URL and use Leva panel
 */

import type {
  AnimationBases,
  SpringConfig,
  ScalarField,
  ConstantField,
  TransitionsConfig,
} from "../types";
import type { InputWithSettings, NumberSettings } from "leva/plugin";
import { folder } from "leva";

// ============================================================================
// LEVA TYPES & DEFAULTS
// ============================================================================

// Master control doesn't reference a base (it IS the base)
type MasterControl = InputWithSettings<
  number,
  NumberSettings & { label?: string; hint?: string }
>;

// Category base scalars don't reference a base (they define the bases)
type CategoryBaseControl = InputWithSettings<
  number,
  NumberSettings & { label?: string; hint?: string }
>;


type SectionMeta = {
  title: string;
  collapsed?: boolean;
};

// Common Leva control defaults
const LEVA_DEFAULTS = {
  // Standard 0-5 range (most transitions)
  standard: { min: 0, max: 5, step: 0.1 },
  // Extended 0-10 range (longer animations)
  extended: { min: 0, max: 10, step: 0.1 },
  // Fine control for small stagger values
  fine: { min: 0, max: 5, step: 0.05 },
  // Category base scalars
  base: { min: 0.5, max: 3, step: 0.1 },
  // Master control
  master: { min: 0.1, max: 3.0, step: 0.05 },
} as const;


// ============================================================================
// ANIMATION SCALAR CONFIG - Single Source of Truth
// ============================================================================

export const ANIMATION_SCALAR_CONFIG = {
  master: {
    _meta: { title: "🎛️ Master Control", collapsed: false } as SectionMeta,
    ANIMATION_MASTER_BASE: {
      value: 0.3,
      ...LEVA_DEFAULTS.master,
      label: "Master Base Duration",
      hint: "Single value to speed/slow ALL animations",
    } satisfies MasterControl,
  },

  categoryBases: {
    _meta: { title: "📊 Category Bases", collapsed: true } as SectionMeta,
    PAGE_BASE_SCALAR: {
      value: 1.67,
      ...LEVA_DEFAULTS.base,
      label: "Page Base Scalar",
      hint: "Multiplies master base",
    } satisfies CategoryBaseControl,
    MODAL_BASE_SCALAR: {
      value: 1.0,
      ...LEVA_DEFAULTS.base,
      label: "Modal Base Scalar",
    } satisfies CategoryBaseControl,
    NAV_BASE_SCALAR: {
      value: 2.0,
      ...LEVA_DEFAULTS.base,
      label: "Nav Base Scalar",
    } satisfies CategoryBaseControl,
    TEXT_BASE_SCALAR: {
      value: 0.67,
      ...LEVA_DEFAULTS.base,
      label: "Text Base Scalar",
    } satisfies CategoryBaseControl,
    COMPONENT_BASE_SCALAR: {
      value: 1.0,
      ...LEVA_DEFAULTS.base,
      label: "Component Base Scalar",
    } satisfies CategoryBaseControl,
  },

  springs: {
    _meta: { title: "🌀 Spring Physics (3D Animations)", collapsed: true } as SectionMeta,
    SPRING_SMOOTH_TENSION: {
      value: 200,
      min: 50,
      max: 500,
      step: 10,
      label: "Smooth Spring > Tension",
      hint: "Spring tension for smooth animations",
    } satisfies MasterControl,
    SPRING_SMOOTH_FRICTION: {
      value: 25,
      min: 5,
      max: 50,
      step: 1,
      label: "Smooth Spring > Friction",
      hint: "Spring friction for smooth animations",
    } satisfies MasterControl,
    SPRING_SMOOTH_MASS: {
      value: 1,
      min: 0.1,
      max: 5,
      step: 0.1,
      label: "Smooth Spring > Mass",
      hint: "Spring mass for smooth animations",
    } satisfies MasterControl,
    SPRING_BOUNCY_TENSION: {
      value: 300,
      min: 50,
      max: 500,
      step: 10,
      label: "Bouncy Spring > Tension",
      hint: "Spring tension for bouncy animations",
    } satisfies MasterControl,
    SPRING_BOUNCY_FRICTION: {
      value: 10,
      min: 5,
      max: 50,
      step: 1,
      label: "Bouncy Spring > Friction",
      hint: "Spring friction for bouncy animations",
    } satisfies MasterControl,
    SPRING_BOUNCY_MASS: {
      value: 1,
      min: 0.1,
      max: 5,
      step: 0.1,
      label: "Bouncy Spring > Mass",
      hint: "Spring mass for bouncy animations",
    } satisfies MasterControl,
    SPRING_SLOW_TENSION: {
      value: 100,
      min: 50,
      max: 500,
      step: 10,
      label: "Slow Spring > Tension",
      hint: "Spring tension for slow animations",
    } satisfies MasterControl,
    SPRING_SLOW_FRICTION: {
      value: 30,
      min: 5,
      max: 50,
      step: 1,
      label: "Slow Spring > Friction",
      hint: "Spring friction for slow animations",
    } satisfies MasterControl,
    SPRING_SLOW_MASS: {
      value: 1,
      min: 0.1,
      max: 5,
      step: 0.1,
      label: "Slow Spring > Mass",
      hint: "Spring mass for slow animations",
    } satisfies MasterControl,
  },

  constants: {
    _meta: { title: "⚙️ System Constants", collapsed: true } as SectionMeta,
    MAP_SLIDER_CASCADE_DURATION_MS: {
      value: 1000,
      min: 0,
      max: 5000,
      step: 50,
      label: "Map Slider > Cascade Duration (ms)",
      hint: "Time between map slider items cascading",
    } satisfies MasterControl,
    DEBOUNCE_COLOR_UPDATE: {
      value: 50,
      min: 0,
      max: 500,
      step: 10,
      label: "Debounce > Color Update (ms)",
      hint: "Debounce delay for color theme updates",
    } satisfies MasterControl,
    DEBOUNCE_WINDOW_RESIZE: {
      value: 100,
      min: 0,
      max: 500,
      step: 10,
      label: "Debounce > Window Resize (ms)",
      hint: "Debounce delay for window resize events",
    } satisfies MasterControl,
    DEBOUNCE_SCROLL: {
      value: 50,
      min: 0,
      max: 500,
      step: 10,
      label: "Debounce > Scroll (ms)",
      hint: "Debounce delay for scroll events",
    } satisfies MasterControl,
    TIMEOUT_LITE_MODE_FALLBACK: {
      value: 8000,
      min: 1000,
      max: 30000,
      step: 1000,
      label: "Timeout > Lite Mode Fallback (ms)",
      hint: "Timeout before falling back to lite mode",
    } satisfies MasterControl,
    TIMEOUT_USER_INITIATED_FALLBACK: {
      value: 30000,
      min: 5000,
      max: 60000,
      step: 1000,
      label: "Timeout > User Initiated Fallback (ms)",
      hint: "Timeout for user-initiated loading",
    } satisfies MasterControl,
  },
} as const;

// ============================================================================
// VALUE EXTRACTION
// ============================================================================

/** Generic recursive value extraction from config */
function extractAllScalarValues(config: typeof ANIMATION_SCALAR_CONFIG) {
  const result: Record<string, number> = {};

  for (const section of Object.values(config)) {
    for (const [key, value] of Object.entries(section)) {
      // Skip metadata
      if (key === "_meta") continue;

      // Extract value if it's a scalar control
      if (
        typeof value === "object" &&
        "value" in value &&
        typeof value.value === "number"
      ) {
        result[key] = value.value;
      }
    }
  }

  return result;
}

// ============================================================================
// AUTO-DERIVED EXPORTS
// ============================================================================

/** Master animation base - Single source of truth */
export const ANIMATION_MASTER_BASE =
  ANIMATION_SCALAR_CONFIG.master.ANIMATION_MASTER_BASE.value;

/** Extract all scalar values from config */
const ALL_SCALARS = extractAllScalarValues(ANIMATION_SCALAR_CONFIG);

/** Category base scalars */
export const DEFAULT_CATEGORY_SCALARS = {
  PAGE_BASE_SCALAR: ALL_SCALARS.PAGE_BASE_SCALAR,
  MODAL_BASE_SCALAR: ALL_SCALARS.MODAL_BASE_SCALAR,
  NAV_BASE_SCALAR: ALL_SCALARS.NAV_BASE_SCALAR,
  TEXT_BASE_SCALAR: ALL_SCALARS.TEXT_BASE_SCALAR,
  COMPONENT_BASE_SCALAR: ALL_SCALARS.COMPONENT_BASE_SCALAR,
} as const;


// ============================================================================
// CATEGORY BASES (computed from master + scalars)
// ============================================================================

/**
 * Compute category bases from master and scalars.
 * This function is called by AnimationContext with Leva-controlled scalars.
 */
export function computeAnimationBases(
  masterBase: number,
  scalars: typeof DEFAULT_CATEGORY_SCALARS
): AnimationBases {
  return {
    PAGE_BASE: masterBase * scalars.PAGE_BASE_SCALAR,
    MODAL_BASE: masterBase * scalars.MODAL_BASE_SCALAR,
    NAV_BASE: masterBase * scalars.NAV_BASE_SCALAR,
    TEXT_BASE: masterBase * scalars.TEXT_BASE_SCALAR,
    COMPONENT_BASE: masterBase * scalars.COMPONENT_BASE_SCALAR,
  };
}

/** Default bases for non-Leva usage */
export const DEFAULT_ANIMATION_BASES = computeAnimationBases(
  ANIMATION_MASTER_BASE,
  DEFAULT_CATEGORY_SCALARS
);

// ============================================================================
// TRANSITIONS BUILDER
// ============================================================================

// ============================================================================
// TRANSITIONS_CONFIG — Nested architecture (all 33 transition objects)
// ============================================================================

const S = LEVA_DEFAULTS.standard;
const E = LEVA_DEFAULTS.extended;
const F = LEVA_DEFAULTS.fine;

export const TRANSITIONS_CONFIG: TransitionsConfig = {

  ABOUT_AVATAR: {
    ANIMATE: {
      delay:    { _type: 'scalar', base: 'COMPONENT_BASE', value: 5.0,  ...E, label: "Avatar > Appear Delay",       hint: "Wait before avatar starts appearing" } satisfies ScalarField,
      duration: { _type: 'scalar', base: 'COMPONENT_BASE', value: 8.33, ...E, label: "Avatar > Fade In Duration",   hint: "How long avatar takes to fully appear" } satisfies ScalarField,
    },
    EXIT: {
      duration: { _type: 'scalar', base: 'COMPONENT_BASE', value: 1.0,  ...S, label: "Avatar > Fade Out Duration",  hint: "How long avatar takes to fade out" } satisfies ScalarField,
    },
  },

  ABOUT_HERO: {
    ANIMATE: {
      duration:        { _type: 'scalar', base: 'COMPONENT_BASE', value: 1.0,  ...S, label: "Hero Section > Fade In",        hint: "Duration for hero section to appear" } satisfies ScalarField,
      staggerChildren: { _type: 'scalar', base: 'COMPONENT_BASE', value: 0.33, ...S, label: "Hero Section > Element Stagger", hint: "Delay between hero elements (name, title)" } satisfies ScalarField,
    },
    EXIT: {
      duration: { _type: 'constant', value: 0 },
      when: "afterChildren",
    },
  },

  ABOUT_MAP: {
    ANIMATE: {
      duration:        { _type: 'scalar', base: 'COMPONENT_BASE', value: 1.0,  ...S, label: "Map Section > Fade In",         hint: "Duration for map to appear" } satisfies ScalarField,
      staggerChildren: { _type: 'scalar', base: 'COMPONENT_BASE', value: 0.33, ...S, label: "Map Section > Marker Stagger",  hint: "Delay between map markers appearing" } satisfies ScalarField,
    },
    EXIT: {
      duration: { _type: 'constant', value: 0 },
      when: "afterChildren",
    },
  },

  ABOUT_SOCIALS: {
    ANIMATE: {
      delay:           { _type: 'scalar', base: 'COMPONENT_BASE', value: 5.0,  ...E, label: "Social Links > Section Delay", hint: "Wait before social links section appears" } satisfies ScalarField,
      delayChildren:   { _type: 'scalar', base: 'COMPONENT_BASE', value: 5.0,  ...E, label: "Social Links > Icons Delay",   hint: "Wait before social icons start appearing" } satisfies ScalarField,
      duration:        { _type: 'scalar', base: 'COMPONENT_BASE', value: 1.0,  ...S, label: "Social Links > Fade Duration", hint: "How long each social icon takes to appear" } satisfies ScalarField,
      staggerChildren: { _type: 'scalar', base: 'COMPONENT_BASE', value: 1.33, ...S, label: "Social Links > Icon Stagger",  hint: "Delay between each social icon" } satisfies ScalarField,
    },
    EXIT: {
      duration: { _type: 'constant', value: 0 },
      when: "afterChildren",
    },
  },

  ABOUT_STATS: {
    ANIMATE: {
      duration:        { _type: 'scalar', base: 'COMPONENT_BASE', value: 1.0,  ...S, label: "Stats Section > Fade Duration", hint: "How long stat trackers take to appear" } satisfies ScalarField,
      staggerChildren: { _type: 'scalar', base: 'COMPONENT_BASE', value: 1.33, ...S, label: "Stats Section > Stat Stagger",  hint: "Delay between each stat appearing" } satisfies ScalarField,
    },
    EXIT: {
      duration: { _type: 'constant', value: 0 },
      when: "afterChildren",
    },
  },

  ABOUT_TAGS: {
    ANIMATE: {
      delay:           { _type: 'scalar', base: 'COMPONENT_BASE', value: 3.33, ...E, label: "Skills Tags > Section Delay", hint: "Wait before skills section appears" } satisfies ScalarField,
      delayChildren:   { _type: 'scalar', base: 'COMPONENT_BASE', value: 3.33, ...E, label: "Skills Tags > Tags Delay",    hint: "Wait before skill tags start appearing" } satisfies ScalarField,
      duration:        { _type: 'scalar', base: 'COMPONENT_BASE', value: 1.0,  ...S, label: "Skills Tags > Fade Duration", hint: "How long each skill tag takes to appear" } satisfies ScalarField,
      staggerChildren: { _type: 'scalar', base: 'COMPONENT_BASE', value: 1.33, ...S, label: "Skills Tags > Tag Stagger",   hint: "Delay between each skill tag" } satisfies ScalarField,
    },
    EXIT: {
      duration: { _type: 'constant', value: 0 },
      when: "afterChildren",
    },
  },

  ANIMATED_LINE: {
    ANIMATE: {
      duration: { _type: 'scalar', base: 'COMPONENT_BASE', value: 3.33, ...E, label: "Animated Line > Draw Duration", hint: "How long animated line takes to draw" } satisfies ScalarField,
      ease: "easeInOut",
    },
  },

  BORDER_BOX: {
    ANIMATE: {
      duration: { _type: 'scalar', base: 'COMPONENT_BASE', value: 5.0,  ...E, label: "Border Box > Draw Duration",      hint: "How long animated border takes to draw" } satisfies ScalarField,
      ease: "easeInOut",
    },
    EXIT: {
      duration: { _type: 'scalar', base: 'COMPONENT_BASE', value: 3.33, ...E, label: "Border Box > Fade Out Duration",  hint: "How long border takes to fade out" } satisfies ScalarField,
      ease: "easeInOut",
    },
  },

  COMMON: {
    EXIT: {
      duration: { _type: 'scalar', base: 'COMPONENT_BASE', value: 1.0, ...S, label: "Common > Exit Duration", hint: "Default exit duration for generic components" } satisfies ScalarField,
    },
  },

  EXPERIENCE: {
    ANIMATE_STAGGER: {
      staggerChildren: { _type: 'scalar', base: 'COMPONENT_BASE', value: 0.33, ...S, label: "Experience > Item Stagger Delay",       hint: "Delay between experience entries appearing" } satisfies ScalarField,
    },
    TITLE_ANIMATE_STAGGER: {
      staggerChildren: { _type: 'scalar', base: 'COMPONENT_BASE', value: 0.25, ...F, label: "Experience > Title Character Stagger",  hint: "Delay between title characters appearing" } satisfies ScalarField,
    },
    TOOLS_ANIMATE: {
      staggerChildren: { _type: 'scalar', base: 'COMPONENT_BASE', value: 1.75, ...F, label: "Experience > Tools Icon Stagger", hint: "Delay between each tool icon appearing in the entry" } satisfies ScalarField,
    },
  },

  HOME: {
    MENU_ANIMATE_STAGGER: {
      staggerChildren: { _type: 'scalar', base: 'NAV_BASE', value: 0.33, ...S, label: "Home Menu > Item Stagger Delay", hint: "Delay between menu items appearing" } satisfies ScalarField,
    },
  },

  ICON: {
    ANIMATE: {
      duration: { _type: 'scalar', base: 'COMPONENT_BASE', value: 1.67, ...S, label: "Icon > Fade In Duration",  hint: "How long icons take to fade in" } satisfies ScalarField,
    },
    EXIT: {
      duration: { _type: 'scalar', base: 'COMPONENT_BASE', value: 1.0,  ...S, label: "Icon > Fade Out Duration", hint: "How long icons take to fade out" } satisfies ScalarField,
    },
  },

  LOADING: {
    EXIT: {
      duration: { _type: 'scalar', base: 'PAGE_BASE', value: 1.0, ...S, label: "Loading Screen > Exit Duration", hint: "How long loading screen takes to fade out" } satisfies ScalarField,
      delay:    { _type: 'scalar', base: 'PAGE_BASE', value: 6.5, ...E, label: "Loading Screen > Exit Delay",     hint: "Wait before loading screen starts fading out" } satisfies ScalarField,
    },
  },

  LOADING_PAGE: {
    ANIMATE: {
      duration: { _type: 'scalar', base: 'PAGE_BASE', value: 1.67, ...S, label: "Loading Page > Fade In Duration", hint: "How long loading screen takes to appear" } satisfies ScalarField,
      delay:    { _type: 'scalar', base: 'PAGE_BASE', value: 0,    ...S, label: "Loading Page > Appear Delay",     hint: "Wait before loading screen appears" } satisfies ScalarField,
    },
  },

  MAP: {
    CONTENT_ANIMATE: {
      duration: { _type: 'scalar', base: 'COMPONENT_BASE', value: 7.67, ...E, label: "Map > Content Fade Duration", hint: "How long map content takes to appear" } satisfies ScalarField,
    },
    EXIT: {
      duration: { _type: 'scalar', base: 'COMPONENT_BASE', value: 1.0,  ...S, label: "Map > Exit Duration",         hint: "How long map takes to fade out" } satisfies ScalarField,
    },
  },

  MAP_DESCRIPTION: {
    ANIMATE: {
      duration:        { _type: 'scalar', base: 'COMPONENT_BASE', value: 1.0,  ...S, label: "Map > Description Fade Duration",   hint: "How long map description takes to appear" } satisfies ScalarField,
      staggerChildren: { _type: 'scalar', base: 'COMPONENT_BASE', value: 0.33, ...S, label: "Map > Description Stagger Delay",   hint: "Delay between description paragraphs" } satisfies ScalarField,
    },
    EXIT: {
      duration: { _type: 'scalar', base: 'COMPONENT_BASE', value: 0, ...S, label: "Map > Description Exit Duration", hint: "How long description takes to fade out" } satisfies ScalarField,
      when: "afterChildren",
    },
  },

  MAP_SLIDER: {
    ANIMATE: {
      duration:        { _type: 'scalar', base: 'COMPONENT_BASE', value: 0.67, ...S, label: "Map > Slider Item Fade Duration",  hint: "How long each slider item takes to appear" } satisfies ScalarField,
      staggerChildren: { _type: 'scalar', base: 'COMPONENT_BASE', value: 0.17, ...F, label: "Map > Slider Item Stagger Delay", hint: "Delay between slider items appearing" } satisfies ScalarField,
      staggerDirection: -1,
    },
    EXIT: {
      duration:        { _type: 'scalar', base: 'COMPONENT_BASE', value: 0.67, ...S, label: "Map > Slider Exit Duration",       hint: "How long slider takes to fade out" } satisfies ScalarField,
      staggerChildren: { _type: 'scalar', base: 'COMPONENT_BASE', value: 0.07, ...F, label: "Map > Slider Exit Stagger Delay",  hint: "Delay between items fading out" } satisfies ScalarField,
      when: "afterChildren",
    },
  },

  MODAL: {
    CONTAINER_ANIMATE: {
      duration: { _type: 'scalar', base: 'MODAL_BASE', value: 1.0,  ...S, label: "Modal > Container Expand/Collapse", hint: "Duration for modal container layout animation" } satisfies ScalarField,
      ease: "easeInOut",
    },
    CONTENT_ANIMATE: {
      duration: { _type: 'scalar', base: 'MODAL_BASE', value: 1.0,  ...S, label: "Modal > Content Transition",        hint: "Duration for content area animation" } satisfies ScalarField,
    },
    DATE_ANIMATE: {
      duration: { _type: 'scalar', base: 'MODAL_BASE', value: 1.1,  ...S, label: "Modal > Date Field Duration",       hint: "Date range animation duration" } satisfies ScalarField,
    },
    DESCRIPTION_ANIMATE: {
      delay:    { _type: 'scalar', base: 'MODAL_BASE', value: 1.67, ...S, label: "Modal > Description Text Delay",    hint: "Delay before blurb/description appears" } satisfies ScalarField,
    },
    LAYOUT_ANIMATE: {
      delay:    { _type: 'scalar', base: 'MODAL_BASE', value: 0.67, ...S, label: "Modal > Layout Change Delay",       hint: "Wait before layout expands to full size" } satisfies ScalarField,
    },
    OVERLAY_ANIMATE: {
      duration: { _type: 'scalar', base: 'MODAL_BASE', value: 1.0,  ...S, label: "Modal > Background Overlay",       hint: "Dark overlay fade duration" } satisfies ScalarField,
    },
  },

  MODAL_HEADER: {
    TEXT_ANIMATE: {
      duration: { _type: 'scalar', base: 'MODAL_BASE', value: 6.67, ...E, label: "Modal > Header Text Duration", hint: "Title/subtitle animation duration" } satisfies ScalarField,
      delay:    { _type: 'scalar', base: 'MODAL_BASE', value: 6.67, ...E, label: "Modal > Header Text Delay",    hint: "Wait before header text animates" } satisfies ScalarField,
    },
  },

  MODAL_NAVBAR: {
    ANIMATE: {
      duration: { _type: 'scalar', base: 'MODAL_BASE', value: 0.67, ...S, label: "Modal > Navbar Fade In",          hint: "How long modal navbar takes to appear" } satisfies ScalarField,
      delay:    { _type: 'scalar', base: 'MODAL_BASE', value: 0.33, ...S, label: "Modal > Navbar Appear Delay",     hint: "Wait before navbar starts fading in" } satisfies ScalarField,
    },
    CHILDREN_ANIMATE: {
      delayChildren: { _type: 'scalar', base: 'MODAL_BASE', value: 3.33, ...E, label: "Modal > Navbar Children Delay", hint: "Delay before navbar buttons animate" } satisfies ScalarField,
    },
    LINE_ANIMATE: {
      duration: { _type: 'scalar', base: 'MODAL_BASE', value: 1.5,  ...S, label: "Modal > Navbar Border Line",     hint: "Animated line draw duration in navbar" } satisfies ScalarField,
    },
  },

  MODAL_TEXT: {
    ANIMATE_STAGGER: {
      staggerChildren: { _type: 'scalar', base: 'MODAL_BASE', value: 5.7,  ...E, label: "Modal > Text Paragraphs Stagger", hint: "Delay between paragraphs appearing" } satisfies ScalarField,
    },
    PAINT_ANIMATE: {
      duration:        { _type: 'scalar', base: 'MODAL_BASE', value: 1.67, ...S, label: "Modal > Text Paint Duration",     hint: "How long text takes to fade in" } satisfies ScalarField,
    },
  },

  NAV: {
    ANIMATE_STAGGER: {
      staggerChildren: { _type: 'scalar', base: 'NAV_BASE', value: 0.33, ...S, label: "Nav Bar > Item Stagger",          hint: "Delay between each nav item appearing" } satisfies ScalarField,
    },
    EXIT: {
      duration:        { _type: 'scalar', base: 'NAV_BASE', value: 0.5,  ...S, label: "Nav Bar > Exit Duration",          hint: "How long nav bar takes to fade out" } satisfies ScalarField,
    },
    HOME_FIRST_LOAD_ANIMATE: {
      delay:           { _type: 'scalar', base: 'NAV_BASE', value: 4.33, ...E, label: "Nav Bar > Home First Load Delay",  hint: "Extra delay on initial home page load" } satisfies ScalarField,
    },
  },

  NAV_BUTTON: {
    ACTIVE_ANIMATE: {
      duration: { _type: 'scalar', base: 'NAV_BASE', value: 0.33, ...S, label: "Nav Button > Activate Duration",   hint: "Button transition when becoming active" } satisfies ScalarField,
    },
    INACTIVE_ANIMATE: {
      duration: { _type: 'scalar', base: 'NAV_BASE', value: 0.5,  ...S, label: "Nav Button > Deactivate Duration", hint: "Button transition when becoming inactive" } satisfies ScalarField,
    },
  },

  NAV_ITEM: {
    BORDER_ANIMATE: {
      duration: { _type: 'scalar', base: 'NAV_BASE',  value: 0.83, ...S, label: "Nav Item > Border Draw Duration", hint: "How long animated border takes to draw" } satisfies ScalarField,
      delay:    { _type: 'scalar', base: 'NAV_BASE',  value: 2.5,  ...S, label: "Nav Item > Border Appear Delay",  hint: "Wait before border starts animating" } satisfies ScalarField,
      ease: "easeInOut",
    },
    BORDER_EXIT: {
      duration: { _type: 'scalar', base: 'NAV_BASE',  value: 0.5,  ...S, label: "Nav Item > Border Fade Out",      hint: "Border fade out duration on exit" } satisfies ScalarField,
    },
    FADE_ANIMATE: {
      duration: { _type: 'scalar', base: 'NAV_BASE',  value: 1.0,  ...S, label: "Nav Item > Fade In Duration",     hint: "How long nav items take to fade in" } satisfies ScalarField,
      delay:    { _type: 'scalar', base: 'NAV_BASE',  value: 1.0,  ...S, label: "Nav Item > Appear Delay",         hint: "Wait before nav items start fading in" } satisfies ScalarField,
    },
    TEXT_ANIMATE_STAGGER: {
      staggerChildren: { _type: 'scalar', base: 'TEXT_BASE', value: 0.15, ...F, label: "Nav Item > Text Character Stagger", hint: "Delay between characters in nav items" } satisfies ScalarField,
    },
  },

  NAV_MINIMAL: {
    ANIMATE: {
      delay:    { _type: 'scalar', base: 'NAV_BASE', value: 1.17, ...S, label: "Nav Bar > Minimal Mode Delay",    hint: "Delay when animations are disabled" } satisfies ScalarField,
      duration: { _type: 'scalar', base: 'NAV_BASE', value: 0.83, ...S, label: "Nav Bar > Minimal Mode Duration", hint: "Duration when animations are disabled" } satisfies ScalarField,
    },
    EXIT: {
      duration: { _type: 'scalar', base: 'NAV_BASE', value: 0.5,  ...S, label: "Nav Bar > Minimal Mode Exit",     hint: "Exit duration in minimal mode" } satisfies ScalarField,
    },
  },

  PAGE: {
    CHILDREN_ANIMATE: {
      delayChildren: { _type: 'scalar', base: 'PAGE_BASE', value: 0.4, ...S, label: "Page > Children Delay",              hint: "Delay before child elements animate" } satisfies ScalarField,
    },
    ENTER_ANIMATE: {
      delay:         { _type: 'scalar', base: 'PAGE_BASE', value: 0.2, ...S, label: "Page > Enter Delay",                  hint: "Wait time before page starts fading in" } satisfies ScalarField,
    },
    EXIT: {
      duration:      { _type: 'scalar', base: 'PAGE_BASE', value: 0.4, ...S, label: "Page > Fade Out Duration",            hint: "How long page container takes to fade out" } satisfies ScalarField,
      when: "beforeChildren",
    },
    FADE_IN_ANIMATE: {
      duration:      { _type: 'scalar', base: 'PAGE_BASE', value: 1.0, ...S, label: "Page > Fade In Duration",             hint: "How long page container takes to fade in" } satisfies ScalarField,
    },
    FADE_OUT_EXIT: {
      duration:      { _type: 'scalar', base: 'PAGE_BASE', value: 0.4, ...S, label: "Page > Fade Out Duration (exit)",     hint: "How long page container takes to fade out" } satisfies ScalarField,
    },
    FIRST_LOAD_ANIMATE: {
      delay:         { _type: 'scalar', base: 'PAGE_BASE', value: 1.0, ...S, label: "Page > First Load Delay",             hint: "Extra delay on initial page load" } satisfies ScalarField,
    },
    FIRST_LOAD_CHILDREN_ANIMATE: {
      delayChildren: { _type: 'scalar', base: 'PAGE_BASE', value: 0.4, ...S, label: "Page > First Load Children Delay",   hint: "Child element delay on first load" } satisfies ScalarField,
    },
    NORMAL_ANIMATE: {
      duration:      { _type: 'scalar', base: 'PAGE_BASE', value: 1.0, ...S, label: "Page > Normal Fade In Duration",      hint: "How long page container takes to fade in" } satisfies ScalarField,
      delay:         { _type: 'scalar', base: 'PAGE_BASE', value: 0.2, ...S, label: "Page > Normal Enter Delay",           hint: "Wait time before page starts fading in" } satisfies ScalarField,
      delayChildren: { _type: 'scalar', base: 'PAGE_BASE', value: 0.4, ...S, label: "Page > Normal Children Delay",        hint: "Delay before child elements animate" } satisfies ScalarField,
      when: "beforeChildren",
    },
  },

  PAGE_CONTENTS: {
    EMBEDDED_ANIMATE: {
      duration:        { _type: 'scalar', base: 'PAGE_BASE', value: 0.2, ...S, label: "Page Contents > Fade In",             hint: "Inner page content fade in duration" } satisfies ScalarField,
      delay:           { _type: 'scalar', base: 'PAGE_BASE', value: 0.6, ...S, label: "Page Contents > 3D Embedded Delay",   hint: "Delay when page is in 3D mixer view" } satisfies ScalarField,
      delayChildren:   { _type: 'scalar', base: 'PAGE_BASE', value: 0.6, ...S, label: "Page Contents > 3D Children Delay",   hint: "Delay when page is in 3D mixer view" } satisfies ScalarField,
      staggerChildren: { _type: 'scalar', base: 'PAGE_BASE', value: 1.0, ...S, label: "Page Contents > Stagger",             hint: "Delay between child elements appearing" } satisfies ScalarField,
    },
    EXIT: {
      duration: { _type: 'scalar', base: 'PAGE_BASE', value: 0.2, ...S, label: "Page Contents > Fade Out", hint: "Inner page content fade out duration" } satisfies ScalarField,
      when: "afterChildren",
    },
    FULLSCREEN_ANIMATE: {
      duration:        { _type: 'scalar', base: 'PAGE_BASE', value: 0.2, ...S, label: "Page Contents > Fullscreen Fade In",  hint: "Inner page content fade in duration" } satisfies ScalarField,
      delay:           { _type: 'scalar', base: 'PAGE_BASE', value: 0.6, ...S, label: "Page Contents > Fullscreen Delay",    hint: "Delay when page is in fullscreen mode" } satisfies ScalarField,
      delayChildren:   { _type: 'scalar', base: 'PAGE_BASE', value: 0.6, ...S, label: "Page Contents > Fullscreen Children", hint: "Delay when page is in fullscreen mode" } satisfies ScalarField,
      staggerChildren: { _type: 'scalar', base: 'PAGE_BASE', value: 1.0, ...S, label: "Page Contents > Fullscreen Stagger",  hint: "Delay between child elements appearing" } satisfies ScalarField,
    },
    MINIMAL_SHOWN: {
      duration: { _type: 'scalar', base: 'PAGE_BASE', value: 0.2, ...S, label: "Page Contents > Minimal Fade In", hint: "Inner page content fade in duration" } satisfies ScalarField,
    },
    MINIMAL_REMOVED: {
      when: "beforeChildren",
    },
  },

  PROJECTS: {
    ANIMATE_STAGGER: {
      staggerChildren: { _type: 'scalar', base: 'COMPONENT_BASE', value: 0.33, ...S, label: "Projects > Item Stagger Delay",      hint: "Delay between project cards appearing" } satisfies ScalarField,
    },
    ENTRY_ANIMATE: {
      duration:        { _type: 'scalar', base: 'COMPONENT_BASE', value: 7.67, ...E, label: "Projects > Entry Fade Duration",     hint: "How long project card takes to appear" } satisfies ScalarField,
    },
    EXIT: {
      duration:        { _type: 'scalar', base: 'COMPONENT_BASE', value: 1.0,  ...S, label: "Projects > Exit Duration",           hint: "How long projects page takes to exit" } satisfies ScalarField,
    },
  },

  PROJECTS_TITLE: {
    ANIMATE_STAGGER: {
      staggerChildren: { _type: 'scalar', base: 'COMPONENT_BASE', value: 0.25, ...F, label: "Projects > Title Character Stagger", hint: "Delay between title characters appearing" } satisfies ScalarField,
    },
  },

  SCENE_CLOSE_BUTTON: {
    ANIMATE: {
      delay:    { _type: 'scalar', base: 'COMPONENT_BASE', value: 5.0,  ...E, label: "Close Button > Appear Delay",      hint: "Wait before close button appears" } satisfies ScalarField,
      duration: { _type: 'scalar', base: 'COMPONENT_BASE', value: 6.67, ...E, label: "Close Button > Fade In Duration",  hint: "How long close button takes to appear" } satisfies ScalarField,
    },
    EXIT: {
      duration: { _type: 'scalar', base: 'COMPONENT_BASE', value: 3.33, ...E, label: "Close Button > Exit Duration",     hint: "How long close button takes to fade out" } satisfies ScalarField,
    },
  },

  STAT_TRACKER: {
    ANIMATE: {
      staggerChildren:  { _type: 'scalar', base: 'COMPONENT_BASE', value: 1.33, ...S, label: "Stat Blocks > Appear Stagger",      hint: "Delay between each stat block appearing" } satisfies ScalarField,
      staggerDirection: -1,
    },
    BLOCK_ANIMATE: {
      duration: { _type: 'scalar', base: 'COMPONENT_BASE', value: 0.23, ...S, label: "Stat Block > Fade In Duration",          hint: "How long each stat block takes to appear" } satisfies ScalarField,
      delay:    { _type: 'scalar', base: 'COMPONENT_BASE', value: 0.23, ...S, label: "Stat Block > Appear Delay",              hint: "Initial delay before stat blocks animate" } satisfies ScalarField,
    },
    EXIT: {
      staggerChildren:  { _type: 'scalar', base: 'COMPONENT_BASE', value: 0.33, ...S, label: "Stat Blocks > Exit Stagger",       hint: "Delay between each stat block fading out" } satisfies ScalarField,
      staggerDirection: 1,
    },
    TEXT_ANIMATE_STAGGER: {
      staggerChildren:  { _type: 'scalar', base: 'TEXT_BASE',      value: 0.15, ...F, label: "Stat Tracker > Text Character Stagger", hint: "Delay between characters in stats" } satisfies ScalarField,
    },
  },

  TYPEWRITER: {
    ANIMATE_STAGGER: {
      staggerChildren: { _type: 'scalar', base: 'TEXT_BASE', value: 0.15, ...F, label: "Typewriter > Character Stagger", hint: "Delay between each character typing" } satisfies ScalarField,
    },
    CHAR_ANIMATE: {
      duration:        { _type: 'scalar', base: 'TEXT_BASE', value: 1.0,  ...S, label: "Typewriter > Character Duration", hint: "How long each character takes to appear" } satisfies ScalarField,
    },
    EXIT: {
      duration:        { _type: 'scalar', base: 'TEXT_BASE', value: 1.5,  ...S, label: "Typewriter > Exit Duration",      hint: "How long text takes to fade out" } satisfies ScalarField,
    },
  },

};

/**
 * Extract a nested Leva schema from TRANSITIONS_CONFIG.
 * Scalar fields become Leva number controls; string/number/constant fields are skipped.
 * Structure: component → action → field (nested folders).
 *
 * Control keys are path-prefixed (COMPONENT_ACTION_field) to avoid collisions
 * from duplicate field names (e.g., multiple "duration" entries across actions).
 */
export function extractLevaSchema(config: TransitionsConfig) {
  return Object.fromEntries(
    Object.entries(config).map(([componentKey, component]) => {
      const actionFolders = Object.fromEntries(
        Object.entries(component).map(([actionKey, action]) => {
          const fields = Object.fromEntries(
            Object.entries(action)
              .filter(([, field]) => typeof field === 'object' && field !== null && (field as ScalarField)._type === 'scalar')
              .map(([fieldKey, field]) => {
                const scalar = field as ScalarField;
                const path = `${componentKey}.${actionKey}.${fieldKey}`;
                // Prefix key with path to avoid collisions across components/actions
                const controlKey = `${componentKey}_${actionKey}_${fieldKey}`;
                const label = scalar.label ?? fieldKey;
                const hint = scalar.hint ? `${scalar.hint} | ${path}` : path;
                const { _type, base, label: _l, hint: _h, ...levaProps } = scalar;
                return [controlKey, { ...levaProps, label, hint }];
              })
          );
          return [actionKey, folder(fields, { collapsed: true })];
        })
      );
      return [componentKey, folder(actionFolders, { collapsed: true })];
    })
  );
}

/**
 * Build resolved transitions from TRANSITIONS_CONFIG.
 * Scalar fields are multiplied by their base; constants and primitives pass through.
 * Expects controls keyed by path-prefixed names (COMPONENT_ACTION_field).
 */
export function buildTransitionsFromConfig(
  config: TransitionsConfig,
  controls: Record<string, unknown>,
  bases: AnimationBases
) {
  return Object.fromEntries(
    Object.entries(config).map(([componentKey, component]) => {
      const resolvedComponent = Object.fromEntries(
        Object.entries(component).map(([actionKey, action]) => {
          const resolvedAction = Object.fromEntries(
            Object.entries(action).map(([fieldKey, field]) => {
              if (typeof field === 'object' && field !== null) {
                const typed = field as ScalarField | ConstantField;
                if (typed._type === 'scalar') {
                  const scalar = typed as ScalarField;
                  const controlKey = `${componentKey}_${actionKey}_${fieldKey}`;
                  const controlValue = controls[controlKey] as number ?? scalar.value;
                  const baseValue = scalar.base ? bases[scalar.base] : 1;
                  return [fieldKey, baseValue * controlValue];
                }
                if (typed._type === 'constant') {
                  return [fieldKey, typed.value];
                }
              }
              // string or number — pass through
              return [fieldKey, field];
            })
          );
          return [actionKey, resolvedAction];
        })
      );
      return [componentKey, resolvedComponent];
    })
  );
}

// ============================================================================
// SPRING CONFIGURATIONS (react-spring physics)
// ============================================================================

export const ANIMATION_SPRINGS: Record<string, SpringConfig> = {
  smooth: {
    tension: 200,
    friction: 25,
    mass: 1,
  },
  bouncy: {
    tension: 300,
    friction: 10,
    mass: 1,
  },
  slow: {
    tension: 100,
    friction: 30,
    mass: 1,
  },
};

// ============================================================================
// OTHER CONSTANTS (now configurable via Leva)
// ============================================================================

/** Debounce delays (in milliseconds) - extracted from config */
export const DEBOUNCE_DELAYS = {
  COLOR_UPDATE: ALL_SCALARS.DEBOUNCE_COLOR_UPDATE,
  WINDOW_RESIZE: ALL_SCALARS.DEBOUNCE_WINDOW_RESIZE,
  SCROLL: ALL_SCALARS.DEBOUNCE_SCROLL,
};

/** Loading timeouts (in milliseconds) - extracted from config */
export const LOADING_TIMEOUTS = {
  LITE_MODE_FALLBACK: ALL_SCALARS.TIMEOUT_LITE_MODE_FALLBACK,
  USER_INITIATED_FALLBACK: ALL_SCALARS.TIMEOUT_USER_INITIATED_FALLBACK,
};

/** Map slider cascade duration (in milliseconds) - extracted from config */
export const MAP_SLIDER_CASCADE_DURATION_MS = ALL_SCALARS.MAP_SLIDER_CASCADE_DURATION_MS;
