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
  BaseType,
  ScaledTransitionValues,
} from "../types";
import type { InputWithSettings, NumberSettings } from "leva/plugin";

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

// Transition scalars reference which base they multiply
type ScalarControl = InputWithSettings<
  number,
  NumberSettings & { label?: string; hint?: string; base: BaseType }
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
// LABEL AUTO-GENERATION
// ============================================================================

/** Convert FADE_IN_SCALAR → "Fade In" */
function toTitleCase(str: string): string {
  return str
    .replace(/_SCALAR$/, '') // Remove _SCALAR suffix
    .replace(/_/g, ' ')
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

/** Generate label with base reference: "Fade In (×PAGE_BASE)" */
export function generateLabel(key: string, base: BaseType): string {
  const humanName = toTitleCase(key);
  return `${humanName} (×${base})`;
}

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

  page: {
    _meta: { title: "📄 Page Transitions", collapsed: true } as SectionMeta,
    PAGE_FADE_IN_SCALAR: {
      value: 1.0,
      base: 'PAGE_BASE' as BaseType,
      ...LEVA_DEFAULTS.standard,
      label: "Page > Fade In Duration",
      hint: "How long page container takes to fade in",
    } satisfies ScalarControl,
    PAGE_FADE_OUT_SCALAR: {
      value: 0.4,
      base: 'PAGE_BASE' as BaseType,
      ...LEVA_DEFAULTS.standard,
      label: "Page > Fade Out Duration",
      hint: "How long page container takes to fade out",
    } satisfies ScalarControl,
    PAGE_ENTER_DELAY_SCALAR: {
      value: 0.2,
      base: 'PAGE_BASE' as BaseType,
      ...LEVA_DEFAULTS.standard,
      label: "Page > Enter Delay",
      hint: "Wait time before page starts fading in",
    } satisfies ScalarControl,
    PAGE_FIRST_LOAD_DELAY_SCALAR: {
      value: 1.0,
      base: 'PAGE_BASE' as BaseType,
      ...LEVA_DEFAULTS.standard,
      label: "Page > First Load Delay",
      hint: "Extra delay on initial page load",
    } satisfies ScalarControl,
    PAGE_CHILDREN_DELAY_SCALAR: {
      value: 0.4,
      base: 'PAGE_BASE' as BaseType,
      ...LEVA_DEFAULTS.standard,
      label: "Page > Children Delay",
      hint: "Delay before child elements animate",
    } satisfies ScalarControl,
    PAGE_FIRST_LOAD_CHILDREN_DELAY_SCALAR: {
      value: 0.4,
      base: 'PAGE_BASE' as BaseType,
      ...LEVA_DEFAULTS.standard,
      label: "Page > First Load Children Delay",
      hint: "Child element delay on first load",
    } satisfies ScalarControl,
    PAGE_CONTENTS_FADE_IN_SCALAR: {
      value: 0.2,
      base: 'PAGE_BASE' as BaseType,
      ...LEVA_DEFAULTS.standard,
      label: "Page Contents > Fade In",
      hint: "Inner page content fade in duration",
    } satisfies ScalarControl,
    PAGE_CONTENTS_FADE_OUT_SCALAR: {
      value: 0.2,
      base: 'PAGE_BASE' as BaseType,
      ...LEVA_DEFAULTS.standard,
      label: "Page Contents > Fade Out",
      hint: "Inner page content fade out duration",
    } satisfies ScalarControl,
    PAGE_CONTENTS_STAGGER_SCALAR: {
      value: 1.0,
      base: 'PAGE_BASE' as BaseType,
      ...LEVA_DEFAULTS.standard,
      label: "Page Contents > Stagger",
      hint: "Delay between child elements appearing",
    } satisfies ScalarControl,
    PAGE_CONTENTS_FULLSCREEN_DELAY_SCALAR: {
      value: 0.6,
      base: 'PAGE_BASE' as BaseType,
      ...LEVA_DEFAULTS.standard,
      label: "Page Contents > Fullscreen Mode Delay",
      hint: "Delay when page is in fullscreen mode",
    } satisfies ScalarControl,
    PAGE_CONTENTS_EMBEDDED_DELAY_SCALAR: {
      value: 0.6,
      base: 'PAGE_BASE' as BaseType,
      ...LEVA_DEFAULTS.standard,
      label: "Page Contents > 3D Embedded Delay",
      hint: "Delay when page is in 3D mixer view",
    } satisfies ScalarControl,
  },

  modal: {
    _meta: { title: "🎭 Modal Animations", collapsed: true } as SectionMeta,
    MODAL_CONTAINER_DURATION_SCALAR: {
      value: 1.0,
      base: 'MODAL_BASE' as BaseType,
      ...LEVA_DEFAULTS.standard,
      label: "Modal > Container Expand/Collapse",
      hint: "Duration for modal container layout animation",
    } satisfies ScalarControl,
    MODAL_NAVBAR_DURATION_SCALAR: {
      value: 0.67,
      base: 'MODAL_BASE' as BaseType,
      ...LEVA_DEFAULTS.standard,
      label: "Modal > Navbar Fade In",
      hint: "How long modal navbar takes to appear",
    } satisfies ScalarControl,
    MODAL_NAVBAR_DELAY_SCALAR: {
      value: 0.33,
      base: 'MODAL_BASE' as BaseType,
      ...LEVA_DEFAULTS.standard,
      label: "Modal > Navbar Appear Delay",
      hint: "Wait before navbar starts fading in",
    } satisfies ScalarControl,
    MODAL_NAVBAR_LINE_DURATION_SCALAR: {
      value: 1.5,
      base: 'MODAL_BASE' as BaseType,
      ...LEVA_DEFAULTS.standard,
      label: "Modal > Navbar Border Line",
      hint: "Animated line draw duration in navbar",
    } satisfies ScalarControl,
    MODAL_NAVBAR_CHILDREN_DELAY_SCALAR: {
      value: 3.33,
      base: 'MODAL_BASE' as BaseType,
      ...LEVA_DEFAULTS.extended,
      label: "Modal > Navbar Children Delay",
      hint: "Delay before navbar buttons animate",
    } satisfies ScalarControl,
    MODAL_CONTENT_DURATION_SCALAR: {
      value: 1.0,
      base: 'MODAL_BASE' as BaseType,
      ...LEVA_DEFAULTS.standard,
      label: "Modal > Content Transition",
      hint: "Duration for content area animation",
    } satisfies ScalarControl,
    MODAL_LAYOUT_DELAY_SCALAR: {
      value: 0.67,
      base: 'MODAL_BASE' as BaseType,
      ...LEVA_DEFAULTS.standard,
      label: "Modal > Layout Change Delay",
      hint: "Wait before layout expands to full size",
    } satisfies ScalarControl,
    MODAL_BLURB_DELAY_SCALAR: {
      value: 1.67,
      base: 'MODAL_BASE' as BaseType,
      ...LEVA_DEFAULTS.standard,
      label: "Modal > Description Text Delay",
      hint: "Delay before blurb/description appears",
    } satisfies ScalarControl,
    MODAL_TEXT_PAINT_DURATION_SCALAR: {
      value: 1.67,
      base: 'MODAL_BASE' as BaseType,
      ...LEVA_DEFAULTS.standard,
      label: "Modal > Text Paint Duration",
      hint: "How long text takes to fade in",
    } satisfies ScalarControl,
    MODAL_TEXT_STAGGER_SCALAR: {
      value: 5.7,
      base: 'MODAL_BASE' as BaseType,
      ...LEVA_DEFAULTS.extended,
      label: "Modal > Text Paragraphs Stagger",
      hint: "Delay between paragraphs appearing",
    } satisfies ScalarControl,
    MODAL_HEADER_TEXT_DURATION_SCALAR: {
      value: 6.67,
      base: 'MODAL_BASE' as BaseType,
      ...LEVA_DEFAULTS.extended,
      label: "Modal > Header Text Duration",
      hint: "Title/subtitle animation duration",
    } satisfies ScalarControl,
    MODAL_HEADER_TEXT_DELAY_SCALAR: {
      value: 6.67,
      base: 'MODAL_BASE' as BaseType,
      ...LEVA_DEFAULTS.extended,
      label: "Modal > Header Text Delay",
      hint: "Wait before header text animates",
    } satisfies ScalarControl,
    MODAL_DATE_DURATION_SCALAR: {
      value: 1.1,
      base: 'MODAL_BASE' as BaseType,
      ...LEVA_DEFAULTS.standard,
      label: "Modal > Date Field Duration",
      hint: "Date range animation duration",
    } satisfies ScalarControl,
    MODAL_OVERLAY_DURATION_SCALAR: {
      value: 1.0,
      base: 'MODAL_BASE' as BaseType,
      ...LEVA_DEFAULTS.standard,
      label: "Modal > Background Overlay",
      hint: "Dark overlay fade duration",
    } satisfies ScalarControl,
  },

  navigation: {
    _meta: { title: "🧭 Navigation", collapsed: true } as SectionMeta,
    NAV_ITEM_FADE_SCALAR: {
      value: 1.0,
      base: 'NAV_BASE' as BaseType,
      ...LEVA_DEFAULTS.standard,
      label: "Nav Item > Fade In Duration",
      hint: "How long nav items take to fade in",
    } satisfies ScalarControl,
    NAV_ITEM_DELAY_SCALAR: {
      value: 1.0,
      base: 'NAV_BASE' as BaseType,
      ...LEVA_DEFAULTS.standard,
      label: "Nav Item > Appear Delay",
      hint: "Wait before nav items start fading in",
    } satisfies ScalarControl,
    NAV_STAGGER_SCALAR: {
      value: 0.33,
      base: 'NAV_BASE' as BaseType,
      ...LEVA_DEFAULTS.standard,
      label: "Nav Bar > Item Stagger",
      hint: "Delay between each nav item appearing",
    } satisfies ScalarControl,
    NAV_EXIT_SCALAR: {
      value: 0.5,
      base: 'NAV_BASE' as BaseType,
      ...LEVA_DEFAULTS.standard,
      label: "Nav Bar > Exit Duration",
      hint: "How long nav bar takes to fade out",
    } satisfies ScalarControl,
    NAV_MINIMAL_DELAY_SCALAR: {
      value: 1.17,
      base: 'NAV_BASE' as BaseType,
      ...LEVA_DEFAULTS.standard,
      label: "Nav Bar > Minimal Mode Delay",
      hint: "Delay when animations are disabled",
    } satisfies ScalarControl,
    NAV_MINIMAL_DURATION_SCALAR: {
      value: 0.83,
      base: 'NAV_BASE' as BaseType,
      ...LEVA_DEFAULTS.standard,
      label: "Nav Bar > Minimal Mode Duration",
      hint: "Duration when animations are disabled",
    } satisfies ScalarControl,
    NAV_MINIMAL_EXIT_SCALAR: {
      value: 0.5,
      base: 'NAV_BASE' as BaseType,
      ...LEVA_DEFAULTS.standard,
      label: "Nav Bar > Minimal Mode Exit",
      hint: "Exit duration in minimal mode",
    } satisfies ScalarControl,
    NAV_HOME_FIRST_LOAD_DELAY_SCALAR: {
      value: 4.33,
      base: 'NAV_BASE' as BaseType,
      ...LEVA_DEFAULTS.extended,
      label: "Nav Bar > Home First Load Delay",
      hint: "Extra delay on initial home page load",
    } satisfies ScalarControl,
    NAV_ITEM_BORDER_DURATION_SCALAR: {
      value: 0.83,
      base: 'NAV_BASE' as BaseType,
      ...LEVA_DEFAULTS.standard,
      label: "Nav Item > Border Draw Duration",
      hint: "How long animated border takes to draw",
    } satisfies ScalarControl,
    NAV_ITEM_BORDER_DELAY_SCALAR: {
      value: 2.5,
      base: 'NAV_BASE' as BaseType,
      ...LEVA_DEFAULTS.standard,
      label: "Nav Item > Border Appear Delay",
      hint: "Wait before border starts animating",
    } satisfies ScalarControl,
    NAV_ITEM_BORDER_EXIT_SCALAR: {
      value: 0.5,
      base: 'NAV_BASE' as BaseType,
      ...LEVA_DEFAULTS.standard,
      label: "Nav Item > Border Fade Out",
      hint: "Border fade out duration on exit",
    } satisfies ScalarControl,
    NAV_BUTTON_ACTIVE_SCALAR: {
      value: 0.33,
      base: 'NAV_BASE' as BaseType,
      ...LEVA_DEFAULTS.standard,
      label: "Nav Button > Activate Duration",
      hint: "Button transition when becoming active",
    } satisfies ScalarControl,
    NAV_BUTTON_INACTIVE_SCALAR: {
      value: 0.5,
      base: 'NAV_BASE' as BaseType,
      ...LEVA_DEFAULTS.standard,
      label: "Nav Button > Deactivate Duration",
      hint: "Button transition when becoming inactive",
    } satisfies ScalarControl,
  },

  text: {
    _meta: { title: "✍️ Text Effects", collapsed: true } as SectionMeta,
    TYPEWRITER_CHAR_SCALAR: {
      value: 1.0,
      base: 'TEXT_BASE' as BaseType,
      ...LEVA_DEFAULTS.standard,
      label: "Typewriter > Character Duration",
      hint: "How long each character takes to appear",
    } satisfies ScalarControl,
    TYPEWRITER_STAGGER_SCALAR: {
      value: 0.15,
      base: 'TEXT_BASE' as BaseType,
      ...LEVA_DEFAULTS.fine,
      label: "Typewriter > Character Stagger",
      hint: "Delay between each character typing",
    } satisfies ScalarControl,
    TYPEWRITER_EXIT_SCALAR: {
      value: 1.5,
      base: 'TEXT_BASE' as BaseType,
      ...LEVA_DEFAULTS.standard,
      label: "Typewriter > Exit Duration",
      hint: "How long text takes to fade out",
    } satisfies ScalarControl,
    NAV_ITEM_TEXT_STAGGER_SCALAR: {
      value: 0.15,
      base: 'TEXT_BASE' as BaseType,
      ...LEVA_DEFAULTS.fine,
      label: "Nav Item > Text Character Stagger",
      hint: "Delay between characters in nav items",
    } satisfies ScalarControl,
    STAT_TRACKER_TEXT_STAGGER_SCALAR: {
      value: 0.15,
      base: 'TEXT_BASE' as BaseType,
      ...LEVA_DEFAULTS.fine,
      label: "Stat Tracker > Text Character Stagger",
      hint: "Delay between characters in stats",
    } satisfies ScalarControl,
  },

  about: {
    _meta: { title: "ℹ️ About Page", collapsed: true } as SectionMeta,
    ABOUT_HERO_DURATION_SCALAR: {
      value: 1.0,
      base: 'COMPONENT_BASE' as BaseType,
      ...LEVA_DEFAULTS.standard,
      label: "Hero Section > Fade In",
      hint: "Duration for hero section to appear",
    } satisfies ScalarControl,
    ABOUT_HERO_STAGGER_SCALAR: {
      value: 0.33,
      base: 'COMPONENT_BASE' as BaseType,
      ...LEVA_DEFAULTS.standard,
      label: "Hero Section > Element Stagger",
      hint: "Delay between hero elements (name, title)",
    } satisfies ScalarControl,
    ABOUT_MAP_DURATION_SCALAR: {
      value: 1.0,
      base: 'COMPONENT_BASE' as BaseType,
      ...LEVA_DEFAULTS.standard,
      label: "Map Section > Fade In",
      hint: "Duration for map to appear",
    } satisfies ScalarControl,
    ABOUT_MAP_STAGGER_SCALAR: {
      value: 0.33,
      base: 'COMPONENT_BASE' as BaseType,
      ...LEVA_DEFAULTS.standard,
      label: "Map Section > Marker Stagger",
      hint: "Delay between map markers appearing",
    } satisfies ScalarControl,
    ABOUT_SOCIALS_DELAY_SCALAR: {
      value: 5.0,
      base: 'COMPONENT_BASE' as BaseType,
      ...LEVA_DEFAULTS.extended,
      label: "Social Links > Section Delay",
      hint: "Wait before social links section appears",
    } satisfies ScalarControl,
    ABOUT_SOCIALS_DELAY_CHILDREN_SCALAR: {
      value: 5.0,
      base: 'COMPONENT_BASE' as BaseType,
      ...LEVA_DEFAULTS.extended,
      label: "Social Links > Icons Delay",
      hint: "Wait before social icons start appearing",
    } satisfies ScalarControl,
    ABOUT_SOCIALS_DURATION_SCALAR: {
      value: 1.0,
      base: 'COMPONENT_BASE' as BaseType,
      ...LEVA_DEFAULTS.standard,
      label: "Social Links > Fade Duration",
      hint: "How long each social icon takes to appear",
    } satisfies ScalarControl,
    ABOUT_SOCIALS_STAGGER_SCALAR: {
      value: 1.33,
      base: 'COMPONENT_BASE' as BaseType,
      ...LEVA_DEFAULTS.standard,
      label: "Social Links > Icon Stagger",
      hint: "Delay between each social icon",
    } satisfies ScalarControl,
    ABOUT_STATS_DURATION_SCALAR: {
      value: 1.0,
      base: 'COMPONENT_BASE' as BaseType,
      ...LEVA_DEFAULTS.standard,
      label: "Stats Section > Fade Duration",
      hint: "How long stat trackers take to appear",
    } satisfies ScalarControl,
    ABOUT_STATS_STAGGER_SCALAR: {
      value: 1.33,
      base: 'COMPONENT_BASE' as BaseType,
      ...LEVA_DEFAULTS.standard,
      label: "Stats Section > Stat Stagger",
      hint: "Delay between each stat appearing",
    } satisfies ScalarControl,
    ABOUT_TAGS_DELAY_SCALAR: {
      value: 3.33,
      base: 'COMPONENT_BASE' as BaseType,
      ...LEVA_DEFAULTS.extended,
      label: "Skills Tags > Section Delay",
      hint: "Wait before skills section appears",
    } satisfies ScalarControl,
    ABOUT_TAGS_DELAY_CHILDREN_SCALAR: {
      value: 3.33,
      base: 'COMPONENT_BASE' as BaseType,
      ...LEVA_DEFAULTS.extended,
      label: "Skills Tags > Tags Delay",
      hint: "Wait before skill tags start appearing",
    } satisfies ScalarControl,
    ABOUT_TAGS_DURATION_SCALAR: {
      value: 1.0,
      base: 'COMPONENT_BASE' as BaseType,
      ...LEVA_DEFAULTS.standard,
      label: "Skills Tags > Fade Duration",
      hint: "How long each skill tag takes to appear",
    } satisfies ScalarControl,
    ABOUT_TAGS_STAGGER_SCALAR: {
      value: 1.33,
      base: 'COMPONENT_BASE' as BaseType,
      ...LEVA_DEFAULTS.standard,
      label: "Skills Tags > Tag Stagger",
      hint: "Delay between each skill tag",
    } satisfies ScalarControl,
    ABOUT_AVATAR_DELAY_SCALAR: {
      value: 5.0,
      base: 'COMPONENT_BASE' as BaseType,
      ...LEVA_DEFAULTS.extended,
      label: "Avatar > Appear Delay",
      hint: "Wait before avatar starts appearing",
    } satisfies ScalarControl,
    ABOUT_AVATAR_DURATION_SCALAR: {
      value: 8.33,
      base: 'COMPONENT_BASE' as BaseType,
      ...LEVA_DEFAULTS.extended,
      label: "Avatar > Fade In Duration",
      hint: "How long avatar takes to fully appear",
    } satisfies ScalarControl,
    ABOUT_AVATAR_EXIT_SCALAR: {
      value: 1.0,
      base: 'COMPONENT_BASE' as BaseType,
      ...LEVA_DEFAULTS.standard,
      label: "Avatar > Fade Out Duration",
      hint: "How long avatar takes to fade out",
    } satisfies ScalarControl,
  },

  statTracker: {
    _meta: { title: "📊 Stat Tracker", collapsed: true } as SectionMeta,
    STAT_TRACKER_ANIMATE_STAGGER_SCALAR: {
      value: 1.33,
      base: 'COMPONENT_BASE' as BaseType,
      ...LEVA_DEFAULTS.standard,
      label: "Stat Blocks > Appear Stagger",
      hint: "Delay between each stat block appearing",
    } satisfies ScalarControl,
    STAT_TRACKER_EXIT_STAGGER_SCALAR: {
      value: 0.33,
      base: 'COMPONENT_BASE' as BaseType,
      ...LEVA_DEFAULTS.standard,
      label: "Stat Blocks > Exit Stagger",
      hint: "Delay between each stat block fading out",
    } satisfies ScalarControl,
    STAT_TRACKER_BLOCK_DURATION_SCALAR: {
      value: 0.23,
      base: 'COMPONENT_BASE' as BaseType,
      ...LEVA_DEFAULTS.standard,
      label: "Stat Block > Fade In Duration",
      hint: "How long each stat block takes to appear",
    } satisfies ScalarControl,
    STAT_TRACKER_BLOCK_DELAY_SCALAR: {
      value: 0.23,
      base: 'COMPONENT_BASE' as BaseType,
      ...LEVA_DEFAULTS.standard,
      label: "Stat Block > Appear Delay",
      hint: "Initial delay before stat blocks animate",
    } satisfies ScalarControl,
  },

  bordersAndLines: {
    _meta: { title: "🔲 Borders & Lines", collapsed: true } as SectionMeta,
    BORDER_BOX_ANIMATE_SCALAR: {
      value: 5.0,
      base: 'COMPONENT_BASE' as BaseType,
      ...LEVA_DEFAULTS.extended,
      label: "Border Box > Draw Duration",
      hint: "How long animated border takes to draw",
    } satisfies ScalarControl,
    BORDER_BOX_EXIT_SCALAR: {
      value: 3.33,
      base: 'COMPONENT_BASE' as BaseType,
      ...LEVA_DEFAULTS.extended,
      label: "Border Box > Fade Out Duration",
      hint: "How long border takes to fade out",
    } satisfies ScalarControl,
    ANIMATED_LINE_SCALAR: {
      value: 3.33,
      base: 'COMPONENT_BASE' as BaseType,
      ...LEVA_DEFAULTS.extended,
      label: "Animated Line > Draw Duration",
      hint: "How long animated line takes to draw",
    } satisfies ScalarControl,
  },

  icons: {
    _meta: { title: "🎨 Icons", collapsed: true } as SectionMeta,
    ICON_ANIMATE_SCALAR: {
      value: 1.67,
      base: 'COMPONENT_BASE' as BaseType,
      ...LEVA_DEFAULTS.standard,
      label: "Icon > Fade In Duration",
      hint: "How long icons take to fade in",
    } satisfies ScalarControl,
    ICON_EXIT_SCALAR: {
      value: 1.0,
      base: 'COMPONENT_BASE' as BaseType,
      ...LEVA_DEFAULTS.standard,
      label: "Icon > Fade Out Duration",
      hint: "How long icons take to fade out",
    } satisfies ScalarControl,
    COMMON_EXIT_SCALAR: {
      value: 1.0,
      base: 'COMPONENT_BASE' as BaseType,
      ...LEVA_DEFAULTS.standard,
      label: "Common > Exit Duration",
      hint: "Default exit duration for generic components",
    } satisfies ScalarControl,
  },

  loading: {
    _meta: { title: "⏳ Loading Screen", collapsed: true } as SectionMeta,
    LOADING_PAGE_DURATION_SCALAR: {
      value: 1.67,
      base: 'PAGE_BASE' as BaseType,
      ...LEVA_DEFAULTS.standard,
      label: "Loading Page > Fade In Duration",
      hint: "How long loading screen takes to appear",
    } satisfies ScalarControl,
    LOADING_PAGE_DELAY_SCALAR: {
      value: 0,
      base: 'PAGE_BASE' as BaseType,
      ...LEVA_DEFAULTS.standard,
      label: "Loading Page > Appear Delay",
      hint: "Wait before loading screen appears",
    } satisfies ScalarControl,
    LOADING_EXIT_DURATION_SCALAR: {
      value: 1.0,
      base: 'PAGE_BASE' as BaseType,
      ...LEVA_DEFAULTS.standard,
      label: "Loading Screen > Exit Duration",
      hint: "How long loading screen takes to fade out",
    } satisfies ScalarControl,
    LOADING_EXIT_DELAY_SCALAR: {
      value: 6.5,
      base: 'PAGE_BASE' as BaseType,
      ...LEVA_DEFAULTS.extended,
      label: "Loading Screen > Exit Delay",
      hint: "Wait before loading screen starts fading out",
    } satisfies ScalarControl,
  },

  mapViewer: {
    _meta: { title: "🗺️ Map Viewer", collapsed: true } as SectionMeta,
    MAP_CONTENT_SCALAR: {
      value: 7.67,
      base: 'COMPONENT_BASE' as BaseType,
      ...LEVA_DEFAULTS.extended,
      label: "Map > Content Fade Duration",
      hint: "How long map content takes to appear",
    } satisfies ScalarControl,
    MAP_EXIT_SCALAR: {
      value: 1.0,
      base: 'COMPONENT_BASE' as BaseType,
      ...LEVA_DEFAULTS.standard,
      label: "Map > Exit Duration",
      hint: "How long map takes to fade out",
    } satisfies ScalarControl,
    MAP_BLURB_DURATION_SCALAR: {
      value: 1.0,
      base: 'COMPONENT_BASE' as BaseType,
      ...LEVA_DEFAULTS.standard,
      label: "Map > Description Fade Duration",
      hint: "How long map description takes to appear",
    } satisfies ScalarControl,
    MAP_BLURB_STAGGER_SCALAR: {
      value: 0.33,
      base: 'COMPONENT_BASE' as BaseType,
      ...LEVA_DEFAULTS.standard,
      label: "Map > Description Stagger Delay",
      hint: "Delay between description paragraphs",
    } satisfies ScalarControl,
    MAP_BLURB_EXIT_SCALAR: {
      value: 0,
      base: 'COMPONENT_BASE' as BaseType,
      ...LEVA_DEFAULTS.standard,
      label: "Map > Description Exit Duration",
      hint: "How long description takes to fade out",
    } satisfies ScalarControl,
    MAP_SLIDER_DURATION_SCALAR: {
      value: 0.67,
      base: 'COMPONENT_BASE' as BaseType,
      ...LEVA_DEFAULTS.standard,
      label: "Map > Slider Item Fade Duration",
      hint: "How long each slider item takes to appear",
    } satisfies ScalarControl,
    MAP_SLIDER_STAGGER_SCALAR: {
      value: 0.17,
      base: 'COMPONENT_BASE' as BaseType,
      ...LEVA_DEFAULTS.fine,
      label: "Map > Slider Item Stagger Delay",
      hint: "Delay between slider items appearing",
    } satisfies ScalarControl,
    MAP_SLIDER_EXIT_DURATION_SCALAR: {
      value: 0.67,
      base: 'COMPONENT_BASE' as BaseType,
      ...LEVA_DEFAULTS.standard,
      label: "Map > Slider Exit Duration",
      hint: "How long slider takes to fade out",
    } satisfies ScalarControl,
    MAP_SLIDER_EXIT_STAGGER_SCALAR: {
      value: 0.07,
      base: 'COMPONENT_BASE' as BaseType,
      ...LEVA_DEFAULTS.fine,
      label: "Map > Slider Exit Stagger Delay",
      hint: "Delay between items fading out",
    } satisfies ScalarControl,
  },

  projects: {
    _meta: { title: "💼 Projects Page", collapsed: true } as SectionMeta,
    PROJECTS_STAGGER_SCALAR: {
      value: 0.33,
      base: 'COMPONENT_BASE' as BaseType,
      ...LEVA_DEFAULTS.standard,
      label: "Projects > Item Stagger Delay",
      hint: "Delay between project cards appearing",
    } satisfies ScalarControl,
    PROJECTS_ENTRY_SCALAR: {
      value: 7.67,
      base: 'COMPONENT_BASE' as BaseType,
      ...LEVA_DEFAULTS.extended,
      label: "Projects > Entry Fade Duration",
      hint: "How long project card takes to appear",
    } satisfies ScalarControl,
    PROJECTS_EXIT_SCALAR: {
      value: 1.0,
      base: 'COMPONENT_BASE' as BaseType,
      ...LEVA_DEFAULTS.standard,
      label: "Projects > Exit Duration",
      hint: "How long projects page takes to exit",
    } satisfies ScalarControl,
    PROJECTS_TITLE_STAGGER_SCALAR: {
      value: 0.25,
      base: 'COMPONENT_BASE' as BaseType,
      ...LEVA_DEFAULTS.fine,
      label: "Projects > Title Character Stagger",
      hint: "Delay between title characters appearing",
    } satisfies ScalarControl,
  },

  experience: {
    _meta: { title: "💼 Experience Page", collapsed: true } as SectionMeta,
    EXPERIENCE_STAGGER_SCALAR: {
      value: 0.33,
      base: 'COMPONENT_BASE' as BaseType,
      ...LEVA_DEFAULTS.standard,
      label: "Experience > Item Stagger Delay",
      hint: "Delay between experience entries appearing",
    } satisfies ScalarControl,
    EXPERIENCE_TITLE_STAGGER_SCALAR: {
      value: 0.25,
      base: 'COMPONENT_BASE' as BaseType,
      ...LEVA_DEFAULTS.fine,
      label: "Experience > Title Character Stagger",
      hint: "Delay between title characters appearing",
    } satisfies ScalarControl,
  },

  home: {
    _meta: { title: "🏠 Home Page", collapsed: true } as SectionMeta,
    HOME_MENU_STAGGER_SCALAR: {
      value: 0.33,
      base: 'NAV_BASE' as BaseType,
      ...LEVA_DEFAULTS.standard,
      label: "Home Menu > Item Stagger Delay",
      hint: "Delay between menu items appearing",
    } satisfies ScalarControl,
  },

  scene: {
    _meta: { title: "🎬 3D Scene/Canvas", collapsed: true } as SectionMeta,
    SCENE_CLOSE_BUTTON_DELAY_SCALAR: {
      value: 5.0,
      base: 'COMPONENT_BASE' as BaseType,
      ...LEVA_DEFAULTS.extended,
      label: "Close Button > Appear Delay",
      hint: "Wait before close button appears",
    } satisfies ScalarControl,
    SCENE_CLOSE_BUTTON_DURATION_SCALAR: {
      value: 6.67,
      base: 'COMPONENT_BASE' as BaseType,
      ...LEVA_DEFAULTS.extended,
      label: "Close Button > Fade In Duration",
      hint: "How long close button takes to appear",
    } satisfies ScalarControl,
    SCENE_CLOSE_BUTTON_EXIT_SCALAR: {
      value: 3.33,
      base: 'COMPONENT_BASE' as BaseType,
      ...LEVA_DEFAULTS.extended,
      label: "Close Button > Exit Duration",
      hint: "How long close button takes to fade out",
    } satisfies ScalarControl,
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

/** All transition scalars (everything except category bases) */
export const DEFAULT_TRANSITION_SCALARS = (() => {
  const {
    PAGE_BASE_SCALAR,
    MODAL_BASE_SCALAR,
    NAV_BASE_SCALAR,
    TEXT_BASE_SCALAR,
    COMPONENT_BASE_SCALAR,
    ...rest
  } = ALL_SCALARS;
  return rest;
})();

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

/**
 * Build all transition objects from pre-scaled values with nested hierarchy.
 * This function is called by AnimationContext with Leva-controlled values.
 * Values are already multiplied (base × scalar) before being passed in.
 *
 * Returns nested structure: TRANSITIONS.PAGE.FADE_IN instead of TRANSITIONS.PAGE_FADE_IN
 */
export function buildTransitions(
  scaledValues: ScaledTransitionValues // Pre-scaled values (base × scalar already computed)
) {
  return {
    // ========================================
    // ABOUT_AVATAR
    // ========================================

    ABOUT_AVATAR: {
      ANIMATE: {
            // About page avatar image
            delay: scaledValues.ABOUT_AVATAR_DELAY_SCALAR,
            duration: scaledValues.ABOUT_AVATAR_DURATION_SCALAR,
      },

      EXIT: {
            // About page avatar exit
            duration: scaledValues.ABOUT_AVATAR_EXIT_SCALAR,
      },

    },

    // ========================================
    // ABOUT_HERO
    // ========================================

    ABOUT_HERO: {
      ANIMATE: {
            // About hero section
            duration: scaledValues.ABOUT_HERO_DURATION_SCALAR,
            staggerChildren: scaledValues.ABOUT_HERO_STAGGER_SCALAR,
      },

    },

    // ========================================
    // ABOUT_MAP
    // ========================================

    ABOUT_MAP: {
      ANIMATE: {
            // About map section
            duration: scaledValues.ABOUT_MAP_DURATION_SCALAR,
            staggerChildren: scaledValues.ABOUT_MAP_STAGGER_SCALAR,
      },

    },

    // ========================================
    // ABOUT_SOCIALS
    // ========================================

    ABOUT_SOCIALS: {
      ANIMATE: {
            // About socials section
            delay: scaledValues.ABOUT_SOCIALS_DELAY_SCALAR,
            delayChildren:
              scaledValues.ABOUT_SOCIALS_DELAY_CHILDREN_SCALAR,
            duration: scaledValues.ABOUT_SOCIALS_DURATION_SCALAR,
            staggerChildren:
              scaledValues.ABOUT_SOCIALS_STAGGER_SCALAR,
      },

    },

    // ========================================
    // ABOUT_STATS
    // ========================================

    ABOUT_STATS: {
      ANIMATE: {
            // About stats section
            duration: scaledValues.ABOUT_STATS_DURATION_SCALAR,
            staggerChildren:
              scaledValues.ABOUT_STATS_STAGGER_SCALAR,
      },

    },

    // ========================================
    // ABOUT_TAGS
    // ========================================

    ABOUT_TAGS: {
      ANIMATE: {
            // About tags section
            delay: scaledValues.ABOUT_TAGS_DELAY_SCALAR,
            delayChildren:
              scaledValues.ABOUT_TAGS_DELAY_CHILDREN_SCALAR,
            duration: scaledValues.ABOUT_TAGS_DURATION_SCALAR,
            staggerChildren: scaledValues.ABOUT_TAGS_STAGGER_SCALAR,
      },

    },

    // ========================================
    // ANIMATED_LINE
    // ========================================

    ANIMATED_LINE: {
      ANIMATE: {
            // AnimatedLine component
            duration: scaledValues.ANIMATED_LINE_SCALAR,
      },

    },

    // ========================================
    // BORDER_BOX
    // ========================================

    BORDER_BOX: {
      ANIMATE: {
            // AnimatedBorderBox appear
            duration: scaledValues.BORDER_BOX_ANIMATE_SCALAR,
      },

      EXIT: {
            // AnimatedBorderBox exit
            duration: scaledValues.BORDER_BOX_EXIT_SCALAR,
      },

    },

    // ========================================
    // COMMON
    // ========================================

    COMMON: {
      EXIT: {
            // Common/default exit duration
            duration: scaledValues.COMMON_EXIT_SCALAR,
      },

    },

    // ========================================
    // EXPERIENCE
    // ========================================

    EXPERIENCE: {
      ANIMATE_STAGGER: {
            // Experience list stagger
            staggerChildren: scaledValues.EXPERIENCE_STAGGER_SCALAR,
      },

      TITLE_ANIMATE_STAGGER: {
            // Experience title text stagger
            staggerChildren:
              scaledValues.EXPERIENCE_TITLE_STAGGER_SCALAR,
      },

    },

    // ========================================
    // HOME
    // ========================================

    HOME: {
      MENU_ANIMATE_STAGGER: {
            // Home page menu stagger
            staggerChildren: scaledValues.HOME_MENU_STAGGER_SCALAR,
      },

    },

    // ========================================
    // ICON
    // ========================================

    ICON: {
      ANIMATE: {
            // Icon fade in
            duration: scaledValues.ICON_ANIMATE_SCALAR,
      },

      EXIT: {
            // Icon fade out
            duration: scaledValues.ICON_EXIT_SCALAR,
      },

    },

    // ========================================
    // LOADING
    // ========================================

    LOADING: {
      EXIT: {
            // Loading page exit
            duration: scaledValues.LOADING_EXIT_DURATION_SCALAR,
            delay: scaledValues.LOADING_EXIT_DELAY_SCALAR,
      },

    },

    // ========================================
    // LOADING_PAGE
    // ========================================

    LOADING_PAGE: {
      ANIMATE: {
            // Loading page animation
            duration: scaledValues.LOADING_PAGE_DURATION_SCALAR,
            delay: scaledValues.LOADING_PAGE_DELAY_SCALAR,
      },

    },

    // ========================================
    // MAP
    // ========================================

    MAP: {
      CONTENT_ANIMATE: {
            // Map viewer content animation
            duration: scaledValues.MAP_CONTENT_SCALAR,
      },

      EXIT: {
            // Map viewer exit
            duration: scaledValues.MAP_EXIT_SCALAR,
      },

    },

    // ========================================
    // MAP_DESCRIPTION
    // ========================================

    MAP_DESCRIPTION: {
      ANIMATE: {
            // Map blurb animation
            duration: scaledValues.MAP_BLURB_DURATION_SCALAR,
            staggerChildren: scaledValues.MAP_BLURB_STAGGER_SCALAR,
      },

      EXIT: {
            // Map blurb exit
            duration: scaledValues.MAP_BLURB_EXIT_SCALAR,
      },

    },

    // ========================================
    // MAP_SLIDER
    // ========================================

    MAP_SLIDER: {
      ANIMATE: {
            // Map slider animation
            duration: scaledValues.MAP_SLIDER_DURATION_SCALAR,
            staggerChildren: scaledValues.MAP_SLIDER_STAGGER_SCALAR,
      },

      EXIT: {
            // Map slider exit
            duration:
              scaledValues.MAP_SLIDER_EXIT_DURATION_SCALAR,
            staggerChildren:
              scaledValues.MAP_SLIDER_EXIT_STAGGER_SCALAR,
      },

    },

    // ========================================
    // MODAL
    // ========================================

    MODAL: {
      CONTAINER_ANIMATE: {
            // Modal container layout transition
            duration: scaledValues.MODAL_CONTAINER_DURATION_SCALAR,
            ease: "easeInOut",
      },

      CONTENT_ANIMATE: {
            // Modal content duration
            duration: scaledValues.MODAL_CONTENT_DURATION_SCALAR,
      },

      DATE_ANIMATE: {
            // Modal date duration
            duration: scaledValues.MODAL_DATE_DURATION_SCALAR,
      },

      DESCRIPTION_ANIMATE: {
            // Modal blurb delay
            delay: scaledValues.MODAL_BLURB_DELAY_SCALAR,
      },

      LAYOUT_ANIMATE: {
            // Modal layout delay
            delay: scaledValues.MODAL_LAYOUT_DELAY_SCALAR,
      },

      OVERLAY_ANIMATE: {
            // Modal overlay duration
            duration: scaledValues.MODAL_OVERLAY_DURATION_SCALAR,
      },

    },

    // ========================================
    // MODAL_HEADER
    // ========================================

    MODAL_HEADER: {
      TEXT_ANIMATE: {
            // Modal header text animation
            duration: scaledValues.MODAL_HEADER_TEXT_DURATION_SCALAR,
            delay: scaledValues.MODAL_HEADER_TEXT_DELAY_SCALAR,
      },

    },

    // ========================================
    // MODAL_NAVBAR
    // ========================================

    MODAL_NAVBAR: {
      ANIMATE: {
            // Modal navbar animation
            duration: scaledValues.MODAL_NAVBAR_DURATION_SCALAR,
            delay: scaledValues.MODAL_NAVBAR_DELAY_SCALAR,
      },

      CHILDREN_ANIMATE: {
            // Modal navbar children stagger
            delayChildren:
              scaledValues.MODAL_NAVBAR_CHILDREN_DELAY_SCALAR,
      },

      LINE_ANIMATE: {
            // Modal navbar line duration
            duration: scaledValues.MODAL_NAVBAR_LINE_DURATION_SCALAR,
      },

    },

    // ========================================
    // MODAL_TEXT
    // ========================================

    MODAL_TEXT: {
      ANIMATE_STAGGER: {
            // Modal text stagger
            staggerChildren: scaledValues.MODAL_TEXT_STAGGER_SCALAR,
      },

      PAINT_ANIMATE: {
            // Modal text paint duration
            duration: scaledValues.MODAL_TEXT_PAINT_DURATION_SCALAR,
      },

    },

    // ========================================
    // NAV
    // ========================================

    NAV: {
      ANIMATE_STAGGER: {
            // Nav items stagger
            staggerChildren: scaledValues.NAV_STAGGER_SCALAR,
      },

      EXIT: {
            // Nav exit duration
            duration: scaledValues.NAV_EXIT_SCALAR,
      },

      HOME_FIRST_LOAD_ANIMATE: {
            // Home page nav first load delay
            delay: scaledValues.NAV_HOME_FIRST_LOAD_DELAY_SCALAR,
      },

    },

    // ========================================
    // NAV_BUTTON
    // ========================================

    NAV_BUTTON: {
      ACTIVE_ANIMATE: {
            // Active nav button
            duration: scaledValues.NAV_BUTTON_ACTIVE_SCALAR,
      },

      INACTIVE_ANIMATE: {
            // Inactive nav button
            duration: scaledValues.NAV_BUTTON_INACTIVE_SCALAR,
      },

    },

    // ========================================
    // NAV_ITEM
    // ========================================

    NAV_ITEM: {
      BORDER_ANIMATE: {
            // Nav item border animation
            duration: scaledValues.NAV_ITEM_BORDER_DURATION_SCALAR,
            delay: scaledValues.NAV_ITEM_BORDER_DELAY_SCALAR,
      },

      BORDER_EXIT: {
            // Nav item border exit
            duration: scaledValues.NAV_ITEM_BORDER_EXIT_SCALAR,
      },

      FADE_ANIMATE: {
            // Nav item fade duration
            duration: scaledValues.NAV_ITEM_FADE_SCALAR,
            delay: scaledValues.NAV_ITEM_DELAY_SCALAR,
      },

      TEXT_ANIMATE_STAGGER: {
            // Nav item text stagger
            staggerChildren: scaledValues.NAV_ITEM_TEXT_STAGGER_SCALAR,
      },

    },

    // ========================================
    // NAV_MINIMAL
    // ========================================

    NAV_MINIMAL: {
      ANIMATE: {
            // Minimal nav animation
            delay: scaledValues.NAV_MINIMAL_DELAY_SCALAR,
            duration: scaledValues.NAV_MINIMAL_DURATION_SCALAR,
      },

      EXIT: {
            // Minimal nav exit
            duration: scaledValues.NAV_MINIMAL_EXIT_SCALAR,
      },

    },

    // ========================================
    // PAGE
    // ========================================

    PAGE: {
      CHILDREN_ANIMATE: {
            // Page child elements stagger
            delayChildren: scaledValues.PAGE_CHILDREN_DELAY_SCALAR,
      },

      ENTER_ANIMATE: {
            // Delay before page enters
            delay: scaledValues.PAGE_ENTER_DELAY_SCALAR,
      },

      EXIT: {
            // Complete transition for page exit
            duration: scaledValues.PAGE_FADE_OUT_SCALAR,
            when: "beforeChildren" as const,
      },

      FADE_IN_ANIMATE: {
            // Main page container fade in
            duration: scaledValues.PAGE_FADE_IN_SCALAR,
      },

      FADE_OUT_EXIT: {
            // Main page container fade out
            duration: scaledValues.PAGE_FADE_OUT_SCALAR,
      },

      FIRST_LOAD_ANIMATE: {
            // First page load animation
            delay: scaledValues.PAGE_FIRST_LOAD_DELAY_SCALAR,
      },

      FIRST_LOAD_CHILDREN_ANIMATE: {
            // First load child elements
            delayChildren:
              scaledValues.PAGE_FIRST_LOAD_CHILDREN_DELAY_SCALAR,
      },

      NORMAL_ANIMATE: {
            // Complete transition for normal page navigation
            duration: scaledValues.PAGE_FADE_IN_SCALAR,
            delay: scaledValues.PAGE_ENTER_DELAY_SCALAR,
            delayChildren: scaledValues.PAGE_CHILDREN_DELAY_SCALAR,
            when: "beforeChildren" as const,
      },

    },

    // ========================================
    // PAGE_CONTENTS
    // ========================================

    PAGE_CONTENTS: {
      EMBEDDED_ANIMATE: {
            // Page contents in 3D embedded mode
            duration: scaledValues.PAGE_CONTENTS_FADE_IN_SCALAR,
            delay: scaledValues.PAGE_CONTENTS_EMBEDDED_DELAY_SCALAR,
            delayChildren:
              scaledValues.PAGE_CONTENTS_EMBEDDED_DELAY_SCALAR,
            staggerChildren: scaledValues.PAGE_CONTENTS_STAGGER_SCALAR,
      },

      EXIT: {
            // Page contents exit
            duration: scaledValues.PAGE_CONTENTS_FADE_OUT_SCALAR,
            when: "afterChildren" as const,
      },

      FULLSCREEN_ANIMATE: {
            // Page contents in fullscreen (2D) mode
            duration: scaledValues.PAGE_CONTENTS_FADE_IN_SCALAR,
            delay: scaledValues.PAGE_CONTENTS_FULLSCREEN_DELAY_SCALAR,
            delayChildren:
              scaledValues.PAGE_CONTENTS_FULLSCREEN_DELAY_SCALAR,
            staggerChildren: scaledValues.PAGE_CONTENTS_STAGGER_SCALAR,
      },

    },

    // ========================================
    // PROJECTS
    // ========================================

    PROJECTS: {
      ANIMATE_STAGGER: {
            // Projects list stagger
            staggerChildren: scaledValues.PROJECTS_STAGGER_SCALAR,
      },

      ENTRY_ANIMATE: {
            // Projects entry animation
            duration: scaledValues.PROJECTS_ENTRY_SCALAR,
      },

      EXIT: {
            // Projects exit
            duration: scaledValues.PROJECTS_EXIT_SCALAR,
      },

    },

    // ========================================
    // PROJECTS_TITLE
    // ========================================

    PROJECTS_TITLE: {
      ANIMATE_STAGGER: {
            // Projects title text stagger
            staggerChildren:
              scaledValues.PROJECTS_TITLE_STAGGER_SCALAR,
      },

    },

    // ========================================
    // SCENE_CLOSE_BUTTON
    // ========================================

    SCENE_CLOSE_BUTTON: {
      ANIMATE: {
            // Scene close button animation
            delay: scaledValues.SCENE_CLOSE_BUTTON_DELAY_SCALAR,
            duration:
              scaledValues.SCENE_CLOSE_BUTTON_DURATION_SCALAR,
      },

      EXIT: {
            // Scene close button exit
            duration:
              scaledValues.SCENE_CLOSE_BUTTON_EXIT_SCALAR,
      },

    },

    // ========================================
    // STAT_TRACKER
    // ========================================

    STAT_TRACKER: {
      ANIMATE: {
            // Stat tracker appear animation
            staggerChildren:
              scaledValues.STAT_TRACKER_ANIMATE_STAGGER_SCALAR,
      },

      BLOCK_ANIMATE: {
            // Individual stat block
            duration: scaledValues.STAT_TRACKER_BLOCK_DURATION_SCALAR,
            delay: scaledValues.STAT_TRACKER_BLOCK_DELAY_SCALAR,
      },

      EXIT: {
            // Stat tracker exit animation
            staggerChildren:
              scaledValues.STAT_TRACKER_EXIT_STAGGER_SCALAR,
      },

      TEXT_ANIMATE_STAGGER: {
            // Stat tracker text stagger
            staggerChildren:
              scaledValues.STAT_TRACKER_TEXT_STAGGER_SCALAR,
      },

    },

    // ========================================
    // TYPEWRITER
    // ========================================

    TYPEWRITER: {
      ANIMATE_STAGGER: {
            // Typewriter character stagger
            staggerChildren: scaledValues.TYPEWRITER_STAGGER_SCALAR,
      },

      CHAR_ANIMATE: {
            // Typewriter character duration
            duration: scaledValues.TYPEWRITER_CHAR_SCALAR,
      },

      EXIT: {
            // Typewriter exit
            duration: scaledValues.TYPEWRITER_EXIT_SCALAR,
      },

    },


  };
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
// OTHER CONSTANTS
// ============================================================================

/** Debounce delays (in milliseconds) */
export const DEBOUNCE_DELAYS = {
  COLOR_UPDATE: 50,
  WINDOW_RESIZE: 100,
  SCROLL: 50,
};

/** Loading timeouts (in milliseconds) */
export const LOADING_TIMEOUTS = {
  LITE_MODE_FALLBACK: 8000,
  USER_INITIATED_FALLBACK: 30000,
};

/** Map slider cascade duration (in milliseconds) */
export const MAP_SLIDER_CASCADE_DURATION_MS = 1000;
