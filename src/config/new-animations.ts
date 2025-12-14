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
  TransitionConfig,
  AnimationBases,
  SpringConfig,
} from "../types";
import type { InputWithSettings, NumberSettings } from "leva/plugin";

// ============================================================================
// LEVA TYPES
// ============================================================================

type ScalarControl = InputWithSettings<
  number,
  NumberSettings & { label: string; hint?: string }
>;

type SectionMeta = {
  title: string;
  collapsed?: boolean;
};

// ============================================================================
// ANIMATION SCALAR CONFIG - Single Source of Truth
// ============================================================================

export const ANIMATION_SCALAR_CONFIG = {
  master: {
    _meta: { title: "🎛️ Master Control", collapsed: false } as SectionMeta,
    ANIMATION_MASTER_BASE: {
      value: 0.3,
      min: 0.1,
      max: 3.0,
      step: 0.05,
      label: "Master Base Duration",
      hint: "Single value to speed/slow ALL animations",
    } satisfies ScalarControl,
  },

  categoryBases: {
    _meta: { title: "📊 Category Bases", collapsed: true } as SectionMeta,
    PAGE_BASE_SCALAR: {
      value: 1.67,
      min: 0.5,
      max: 3,
      step: 0.1,
      label: "Page Base Scalar",
      hint: "Multiplies master base",
    } satisfies ScalarControl,
    MODAL_BASE_SCALAR: {
      value: 1.0,
      min: 0.5,
      max: 3,
      step: 0.1,
      label: "Modal Base Scalar",
    } satisfies ScalarControl,
    NAV_BASE_SCALAR: {
      value: 2.0,
      min: 0.5,
      max: 3,
      step: 0.1,
      label: "Nav Base Scalar",
    } satisfies ScalarControl,
    TEXT_BASE_SCALAR: {
      value: 0.67,
      min: 0.5,
      max: 3,
      step: 0.1,
      label: "Text Base Scalar",
    } satisfies ScalarControl,
    COMPONENT_BASE_SCALAR: {
      value: 1.0,
      min: 0.5,
      max: 3,
      step: 0.1,
      label: "Component Base Scalar",
    } satisfies ScalarControl,
  },

  page: {
    _meta: { title: "📄 Page Transitions", collapsed: true } as SectionMeta,
    PAGE_FADE_IN_SCALAR: {
      value: 1.0,
      min: 0,
      max: 5,
      step: 0.1,
      label: "Fade In (×PAGE_BASE)",
      hint: "Page container fade in duration",
    } satisfies ScalarControl,
    PAGE_FADE_OUT_SCALAR: {
      value: 0.4,
      min: 0,
      max: 5,
      step: 0.1,
      label: "Fade Out (×PAGE_BASE)",
    } satisfies ScalarControl,
    PAGE_ENTER_DELAY_SCALAR: {
      value: 0.2,
      min: 0,
      max: 5,
      step: 0.1,
      label: "Enter Delay (×PAGE_BASE)",
    } satisfies ScalarControl,
    PAGE_FIRST_LOAD_DELAY_SCALAR: {
      value: 1.0,
      min: 0,
      max: 5,
      step: 0.1,
      label: "First Load Delay (×PAGE_BASE)",
    } satisfies ScalarControl,
    PAGE_CHILDREN_DELAY_SCALAR: {
      value: 0.4,
      min: 0,
      max: 5,
      step: 0.1,
      label: "Children Delay (×PAGE_BASE)",
    } satisfies ScalarControl,
    PAGE_FIRST_LOAD_CHILDREN_DELAY_SCALAR: {
      value: 0.4,
      min: 0,
      max: 5,
      step: 0.1,
      label: "First Load Children (×PAGE_BASE)",
    } satisfies ScalarControl,
    PAGE_CONTENTS_FADE_IN_SCALAR: {
      value: 0.2,
      min: 0,
      max: 5,
      step: 0.1,
      label: "Contents Fade In (×PAGE_BASE)",
      hint: "Inner page contents fade in duration",
    } satisfies ScalarControl,
    PAGE_CONTENTS_FADE_OUT_SCALAR: {
      value: 0.2,
      min: 0,
      max: 5,
      step: 0.1,
      label: "Contents Fade Out (×PAGE_BASE)",
    } satisfies ScalarControl,
    PAGE_CONTENTS_STAGGER_SCALAR: {
      value: 1.0,
      min: 0,
      max: 5,
      step: 0.1,
      label: "Contents Stagger (×PAGE_BASE)",
    } satisfies ScalarControl,
    PAGE_CONTENTS_FULLSCREEN_DELAY_SCALAR: {
      value: 0.6,
      min: 0,
      max: 5,
      step: 0.1,
      label: "Contents Fullscreen Delay (×PAGE_BASE)",
    } satisfies ScalarControl,
    PAGE_CONTENTS_EMBEDDED_DELAY_SCALAR: {
      value: 0.6,
      min: 0,
      max: 5,
      step: 0.1,
      label: "Contents 3D Delay (×PAGE_BASE)",
    } satisfies ScalarControl,
  },

  modal: {
    _meta: { title: "🎭 Modal Animations", collapsed: true } as SectionMeta,
    MODAL_CONTAINER_DURATION_SCALAR: {
      value: 1.0,
      min: 0,
      max: 5,
      step: 0.1,
      label: "Container (×MODAL_BASE)",
      hint: "Modal container layout transition",
    } satisfies ScalarControl,
    MODAL_NAVBAR_DURATION_SCALAR: {
      value: 0.67,
      min: 0,
      max: 5,
      step: 0.1,
      label: "Navbar Duration (×MODAL_BASE)",
    } satisfies ScalarControl,
    MODAL_NAVBAR_DELAY_SCALAR: {
      value: 0.33,
      min: 0,
      max: 5,
      step: 0.1,
      label: "Navbar Delay (×MODAL_BASE)",
    } satisfies ScalarControl,
    MODAL_NAVBAR_LINE_DURATION_SCALAR: {
      value: 1.5,
      min: 0,
      max: 5,
      step: 0.1,
      label: "Navbar Line (×MODAL_BASE)",
    } satisfies ScalarControl,
    MODAL_NAVBAR_CHILDREN_DELAY_SCALAR: {
      value: 3.33,
      min: 0,
      max: 10,
      step: 0.1,
      label: "Navbar Children Delay (×MODAL_BASE)",
    } satisfies ScalarControl,
    MODAL_CONTENT_DURATION_SCALAR: {
      value: 1.0,
      min: 0,
      max: 5,
      step: 0.1,
      label: "Content (×MODAL_BASE)",
    } satisfies ScalarControl,
    MODAL_LAYOUT_DELAY_SCALAR: {
      value: 0.67,
      min: 0,
      max: 5,
      step: 0.1,
      label: "Layout Delay (×MODAL_BASE)",
    } satisfies ScalarControl,
    MODAL_BLURB_DELAY_SCALAR: {
      value: 1.67,
      min: 0,
      max: 5,
      step: 0.1,
      label: "Blurb Delay (×MODAL_BASE)",
    } satisfies ScalarControl,
    MODAL_TEXT_PAINT_DURATION_SCALAR: {
      value: 1.67,
      min: 0,
      max: 5,
      step: 0.1,
      label: "Text Paint (×MODAL_BASE)",
    } satisfies ScalarControl,
    MODAL_TEXT_STAGGER_SCALAR: {
      value: 5.7,
      min: 0,
      max: 10,
      step: 0.1,
      label: "Text Stagger (×MODAL_BASE)",
    } satisfies ScalarControl,
    MODAL_HEADER_TEXT_DURATION_SCALAR: {
      value: 6.67,
      min: 0,
      max: 10,
      step: 0.1,
      label: "Header Text Duration (×MODAL_BASE)",
    } satisfies ScalarControl,
    MODAL_HEADER_TEXT_DELAY_SCALAR: {
      value: 6.67,
      min: 0,
      max: 10,
      step: 0.1,
      label: "Header Text Delay (×MODAL_BASE)",
    } satisfies ScalarControl,
    MODAL_DATE_DURATION_SCALAR: {
      value: 1.1,
      min: 0,
      max: 5,
      step: 0.1,
      label: "Date Duration (×MODAL_BASE)",
    } satisfies ScalarControl,
    MODAL_OVERLAY_DURATION_SCALAR: {
      value: 1.0,
      min: 0,
      max: 5,
      step: 0.1,
      label: "Overlay (×MODAL_BASE)",
    } satisfies ScalarControl,
  },

  navigation: {
    _meta: { title: "🧭 Navigation", collapsed: true } as SectionMeta,
    NAV_ITEM_FADE_SCALAR: {
      value: 1.0,
      min: 0,
      max: 5,
      step: 0.1,
      label: "Item Fade (×NAV_BASE)",
    } satisfies ScalarControl,
    NAV_ITEM_DELAY_SCALAR: {
      value: 1.0,
      min: 0,
      max: 5,
      step: 0.1,
      label: "Item Delay (×NAV_BASE)",
    } satisfies ScalarControl,
    NAV_STAGGER_SCALAR: {
      value: 0.33,
      min: 0,
      max: 5,
      step: 0.1,
      label: "Stagger (×NAV_BASE)",
    } satisfies ScalarControl,
    NAV_EXIT_SCALAR: {
      value: 0.5,
      min: 0,
      max: 5,
      step: 0.1,
      label: "Exit (×NAV_BASE)",
    } satisfies ScalarControl,
    NAV_MINIMAL_DELAY_SCALAR: {
      value: 1.17,
      min: 0,
      max: 5,
      step: 0.1,
      label: "Minimal Delay (×NAV_BASE)",
    } satisfies ScalarControl,
    NAV_MINIMAL_DURATION_SCALAR: {
      value: 0.83,
      min: 0,
      max: 5,
      step: 0.1,
      label: "Minimal Duration (×NAV_BASE)",
    } satisfies ScalarControl,
    NAV_MINIMAL_EXIT_SCALAR: {
      value: 0.5,
      min: 0,
      max: 5,
      step: 0.1,
      label: "Minimal Exit (×NAV_BASE)",
    } satisfies ScalarControl,
    NAV_HOME_FIRST_LOAD_DELAY_SCALAR: {
      value: 4.33,
      min: 0,
      max: 10,
      step: 0.1,
      label: "Home First Load Delay (×NAV_BASE)",
    } satisfies ScalarControl,
    NAV_ITEM_BORDER_DURATION_SCALAR: {
      value: 0.83,
      min: 0,
      max: 5,
      step: 0.1,
      label: "Item Border Duration (×NAV_BASE)",
    } satisfies ScalarControl,
    NAV_ITEM_BORDER_DELAY_SCALAR: {
      value: 2.5,
      min: 0,
      max: 5,
      step: 0.1,
      label: "Item Border Delay (×NAV_BASE)",
    } satisfies ScalarControl,
    NAV_ITEM_BORDER_EXIT_SCALAR: {
      value: 0.5,
      min: 0,
      max: 5,
      step: 0.1,
      label: "Item Border Exit (×NAV_BASE)",
    } satisfies ScalarControl,
    NAV_BUTTON_ACTIVE_SCALAR: {
      value: 0.33,
      min: 0,
      max: 5,
      step: 0.1,
      label: "Button Active (×NAV_BASE)",
    } satisfies ScalarControl,
    NAV_BUTTON_INACTIVE_SCALAR: {
      value: 0.5,
      min: 0,
      max: 5,
      step: 0.1,
      label: "Button Inactive (×NAV_BASE)",
    } satisfies ScalarControl,
  },

  text: {
    _meta: { title: "✍️ Text Effects", collapsed: true } as SectionMeta,
    TYPEWRITER_CHAR_SCALAR: {
      value: 1.0,
      min: 0,
      max: 5,
      step: 0.1,
      label: "Typewriter Char (×TEXT_BASE)",
    } satisfies ScalarControl,
    TYPEWRITER_STAGGER_SCALAR: {
      value: 0.15,
      min: 0,
      max: 5,
      step: 0.05,
      label: "Typewriter Stagger (×TEXT_BASE)",
    } satisfies ScalarControl,
    TYPEWRITER_EXIT_SCALAR: {
      value: 1.5,
      min: 0,
      max: 5,
      step: 0.1,
      label: "Typewriter Exit (×TEXT_BASE)",
    } satisfies ScalarControl,
    NAV_ITEM_TEXT_STAGGER_SCALAR: {
      value: 0.15,
      min: 0,
      max: 5,
      step: 0.05,
      label: "Nav Item Text Stagger (×TEXT_BASE)",
    } satisfies ScalarControl,
    STAT_TRACKER_TEXT_STAGGER_SCALAR: {
      value: 0.15,
      min: 0,
      max: 5,
      step: 0.05,
      label: "Stat Tracker Text Stagger (×TEXT_BASE)",
    } satisfies ScalarControl,
  },

  about: {
    _meta: { title: "ℹ️ About Page", collapsed: true } as SectionMeta,
    ABOUT_HERO_DURATION_SCALAR: {
      value: 1.0,
      min: 0,
      max: 5,
      step: 0.1,
      label: "Hero Duration (×COMPONENT_BASE)",
    } satisfies ScalarControl,
    ABOUT_HERO_STAGGER_SCALAR: {
      value: 0.33,
      min: 0,
      max: 5,
      step: 0.1,
      label: "Hero Stagger (×COMPONENT_BASE)",
    } satisfies ScalarControl,
    ABOUT_MAP_DURATION_SCALAR: {
      value: 1.0,
      min: 0,
      max: 5,
      step: 0.1,
      label: "Map Duration (×COMPONENT_BASE)",
    } satisfies ScalarControl,
    ABOUT_MAP_STAGGER_SCALAR: {
      value: 0.33,
      min: 0,
      max: 5,
      step: 0.1,
      label: "Map Stagger (×COMPONENT_BASE)",
    } satisfies ScalarControl,
    ABOUT_SOCIALS_DELAY_SCALAR: {
      value: 5.0,
      min: 0,
      max: 10,
      step: 0.1,
      label: "Socials Delay (×COMPONENT_BASE)",
    } satisfies ScalarControl,
    ABOUT_SOCIALS_DELAY_CHILDREN_SCALAR: {
      value: 5.0,
      min: 0,
      max: 10,
      step: 0.1,
      label: "Socials Delay Children (×COMPONENT_BASE)",
    } satisfies ScalarControl,
    ABOUT_SOCIALS_DURATION_SCALAR: {
      value: 1.0,
      min: 0,
      max: 5,
      step: 0.1,
      label: "Socials Duration (×COMPONENT_BASE)",
    } satisfies ScalarControl,
    ABOUT_SOCIALS_STAGGER_SCALAR: {
      value: 1.33,
      min: 0,
      max: 5,
      step: 0.1,
      label: "Socials Stagger (×COMPONENT_BASE)",
    } satisfies ScalarControl,
    ABOUT_STATS_DURATION_SCALAR: {
      value: 1.0,
      min: 0,
      max: 5,
      step: 0.1,
      label: "Stats Duration (×COMPONENT_BASE)",
    } satisfies ScalarControl,
    ABOUT_STATS_STAGGER_SCALAR: {
      value: 1.33,
      min: 0,
      max: 5,
      step: 0.1,
      label: "Stats Stagger (×COMPONENT_BASE)",
    } satisfies ScalarControl,
    ABOUT_TAGS_DELAY_SCALAR: {
      value: 3.33,
      min: 0,
      max: 10,
      step: 0.1,
      label: "Tags Delay (×COMPONENT_BASE)",
    } satisfies ScalarControl,
    ABOUT_TAGS_DELAY_CHILDREN_SCALAR: {
      value: 3.33,
      min: 0,
      max: 10,
      step: 0.1,
      label: "Tags Delay Children (×COMPONENT_BASE)",
    } satisfies ScalarControl,
    ABOUT_TAGS_DURATION_SCALAR: {
      value: 1.0,
      min: 0,
      max: 5,
      step: 0.1,
      label: "Tags Duration (×COMPONENT_BASE)",
    } satisfies ScalarControl,
    ABOUT_TAGS_STAGGER_SCALAR: {
      value: 1.33,
      min: 0,
      max: 5,
      step: 0.1,
      label: "Tags Stagger (×COMPONENT_BASE)",
    } satisfies ScalarControl,
    ABOUT_AVATAR_DELAY_SCALAR: {
      value: 5.0,
      min: 0,
      max: 10,
      step: 0.1,
      label: "Avatar Delay (×COMPONENT_BASE)",
    } satisfies ScalarControl,
    ABOUT_AVATAR_DURATION_SCALAR: {
      value: 8.33,
      min: 0,
      max: 10,
      step: 0.1,
      label: "Avatar Duration (×COMPONENT_BASE)",
    } satisfies ScalarControl,
    ABOUT_AVATAR_EXIT_SCALAR: {
      value: 1.0,
      min: 0,
      max: 5,
      step: 0.1,
      label: "Avatar Exit (×COMPONENT_BASE)",
    } satisfies ScalarControl,
  },

  statTracker: {
    _meta: { title: "Stat Tracker", collapsed: true } as SectionMeta,
    STAT_TRACKER_ANIMATE_STAGGER_SCALAR: {
      value: 1.33,
      min: 0,
      max: 5,
      step: 0.1,
      label: "Animate Stagger (×COMPONENT_BASE)",
    } satisfies ScalarControl,
    STAT_TRACKER_EXIT_STAGGER_SCALAR: {
      value: 0.33,
      min: 0,
      max: 5,
      step: 0.1,
      label: "Exit Stagger (×COMPONENT_BASE)",
    } satisfies ScalarControl,
    STAT_TRACKER_BLOCK_DURATION_SCALAR: {
      value: 0.23,
      min: 0,
      max: 5,
      step: 0.1,
      label: "Block Duration (×COMPONENT_BASE)",
    } satisfies ScalarControl,
    STAT_TRACKER_BLOCK_DELAY_SCALAR: {
      value: 0.23,
      min: 0,
      max: 5,
      step: 0.1,
      label: "Block Delay (×COMPONENT_BASE)",
    } satisfies ScalarControl,
  },

  general: {
    _meta: { title: "General Components", collapsed: true } as SectionMeta,
    BORDER_BOX_ANIMATE_SCALAR: {
      value: 5.0,
      min: 0,
      max: 10,
      step: 0.1,
      label: "Border Box Animate (×COMPONENT_BASE)",
    } satisfies ScalarControl,
    BORDER_BOX_EXIT_SCALAR: {
      value: 3.33,
      min: 0,
      max: 10,
      step: 0.1,
      label: "Border Box Exit (×COMPONENT_BASE)",
    } satisfies ScalarControl,
    ANIMATED_LINE_SCALAR: {
      value: 3.33,
      min: 0,
      max: 10,
      step: 0.1,
      label: "Animated Line (×COMPONENT_BASE)",
    } satisfies ScalarControl,
    ICON_ANIMATE_SCALAR: {
      value: 1.67,
      min: 0,
      max: 5,
      step: 0.1,
      label: "Icon Animate (×COMPONENT_BASE)",
    } satisfies ScalarControl,
    ICON_EXIT_SCALAR: {
      value: 1.0,
      min: 0,
      max: 5,
      step: 0.1,
      label: "Icon Exit (×COMPONENT_BASE)",
    } satisfies ScalarControl,
    COMMON_EXIT_SCALAR: {
      value: 1.0,
      min: 0,
      max: 5,
      step: 0.1,
      label: "Common Exit (×COMPONENT_BASE)",
    } satisfies ScalarControl,
  },

  loading: {
    _meta: { title: "Loading", collapsed: true } as SectionMeta,
    LOADING_PAGE_DURATION_SCALAR: {
      value: 1.67,
      min: 0,
      max: 5,
      step: 0.1,
      label: "Page Duration (×PAGE_BASE)",
    } satisfies ScalarControl,
    LOADING_PAGE_DELAY_SCALAR: {
      value: 0,
      min: 0,
      max: 5,
      step: 0.1,
      label: "Page Delay (×PAGE_BASE)",
    } satisfies ScalarControl,
    LOADING_EXIT_DURATION_SCALAR: {
      value: 1.0,
      min: 0,
      max: 5,
      step: 0.1,
      label: "Exit Duration (×PAGE_BASE)",
    } satisfies ScalarControl,
    LOADING_EXIT_DELAY_SCALAR: {
      value: 6.5,
      min: 0,
      max: 10,
      step: 0.1,
      label: "Exit Delay (×PAGE_BASE)",
    } satisfies ScalarControl,
  },

  mapViewer: {
    _meta: { title: "Map Viewer", collapsed: true } as SectionMeta,
    MAP_CONTENT_SCALAR: {
      value: 7.67,
      min: 0,
      max: 10,
      step: 0.1,
      label: "Content (×COMPONENT_BASE)",
    } satisfies ScalarControl,
    MAP_EXIT_SCALAR: {
      value: 1.0,
      min: 0,
      max: 5,
      step: 0.1,
      label: "Exit (×COMPONENT_BASE)",
    } satisfies ScalarControl,
    MAP_BLURB_DURATION_SCALAR: {
      value: 1.0,
      min: 0,
      max: 5,
      step: 0.1,
      label: "Blurb Duration (×COMPONENT_BASE)",
    } satisfies ScalarControl,
    MAP_BLURB_STAGGER_SCALAR: {
      value: 0.33,
      min: 0,
      max: 5,
      step: 0.1,
      label: "Blurb Stagger (×COMPONENT_BASE)",
    } satisfies ScalarControl,
    MAP_BLURB_EXIT_SCALAR: {
      value: 0,
      min: 0,
      max: 5,
      step: 0.1,
      label: "Blurb Exit (×COMPONENT_BASE)",
    } satisfies ScalarControl,
    MAP_SLIDER_DURATION_SCALAR: {
      value: 0.67,
      min: 0,
      max: 5,
      step: 0.1,
      label: "Slider Duration (×COMPONENT_BASE)",
    } satisfies ScalarControl,
    MAP_SLIDER_STAGGER_SCALAR: {
      value: 0.17,
      min: 0,
      max: 5,
      step: 0.05,
      label: "Slider Stagger (×COMPONENT_BASE)",
    } satisfies ScalarControl,
    MAP_SLIDER_EXIT_DURATION_SCALAR: {
      value: 0.67,
      min: 0,
      max: 5,
      step: 0.1,
      label: "Slider Exit Duration (×COMPONENT_BASE)",
    } satisfies ScalarControl,
    MAP_SLIDER_EXIT_STAGGER_SCALAR: {
      value: 0.07,
      min: 0,
      max: 5,
      step: 0.05,
      label: "Slider Exit Stagger (×COMPONENT_BASE)",
    } satisfies ScalarControl,
  },

  projects: {
    _meta: { title: "Projects", collapsed: true } as SectionMeta,
    PROJECTS_STAGGER_SCALAR: {
      value: 0.33,
      min: 0,
      max: 5,
      step: 0.1,
      label: "Stagger (×COMPONENT_BASE)",
    } satisfies ScalarControl,
    PROJECTS_ENTRY_SCALAR: {
      value: 7.67,
      min: 0,
      max: 10,
      step: 0.1,
      label: "Entry (×COMPONENT_BASE)",
    } satisfies ScalarControl,
    PROJECTS_EXIT_SCALAR: {
      value: 1.0,
      min: 0,
      max: 5,
      step: 0.1,
      label: "Exit (×COMPONENT_BASE)",
    } satisfies ScalarControl,
    PROJECTS_TITLE_STAGGER_SCALAR: {
      value: 0.25,
      min: 0,
      max: 5,
      step: 0.05,
      label: "Title Stagger (×COMPONENT_BASE)",
    } satisfies ScalarControl,
  },

  experience: {
    _meta: { title: "Experience", collapsed: true } as SectionMeta,
    EXPERIENCE_STAGGER_SCALAR: {
      value: 0.33,
      min: 0,
      max: 5,
      step: 0.1,
      label: "Stagger (×COMPONENT_BASE)",
    } satisfies ScalarControl,
    EXPERIENCE_TITLE_STAGGER_SCALAR: {
      value: 0.25,
      min: 0,
      max: 5,
      step: 0.05,
      label: "Title Stagger (×COMPONENT_BASE)",
    } satisfies ScalarControl,
  },

  home: {
    _meta: { title: "Home", collapsed: true } as SectionMeta,
    HOME_MENU_STAGGER_SCALAR: {
      value: 0.33,
      min: 0,
      max: 5,
      step: 0.1,
      label: "Menu Stagger (×NAV_BASE)",
    } satisfies ScalarControl,
  },

  scene: {
    _meta: { title: "Scene/Canvas", collapsed: true } as SectionMeta,
    SCENE_CLOSE_BUTTON_DELAY_SCALAR: {
      value: 5.0,
      min: 0,
      max: 10,
      step: 0.1,
      label: "Close Button Delay (×COMPONENT_BASE)",
    } satisfies ScalarControl,
    SCENE_CLOSE_BUTTON_DURATION_SCALAR: {
      value: 6.67,
      min: 0,
      max: 10,
      step: 0.1,
      label: "Close Button Duration (×COMPONENT_BASE)",
    } satisfies ScalarControl,
    SCENE_CLOSE_BUTTON_EXIT_SCALAR: {
      value: 3.33,
      min: 0,
      max: 10,
      step: 0.1,
      label: "Close Button Exit (×COMPONENT_BASE)",
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
 * Build all transition objects from bases and scalars.
 * This function is called by AnimationContext with Leva-controlled values.
 */
export function buildTransitions(
  bases: AnimationBases,
  scalars: typeof DEFAULT_TRANSITION_SCALARS
): Record<string, TransitionConfig> {
  return {
    // ========================================
    // PAGE TRANSITIONS
    // ========================================

    PAGE_FADE_IN: {
      // Main page container fade in
      duration: bases.PAGE_BASE * scalars.PAGE_FADE_IN_SCALAR,
    },

    PAGE_FADE_OUT: {
      // Main page container fade out
      duration: bases.PAGE_BASE * scalars.PAGE_FADE_OUT_SCALAR,
    },

    PAGE_ENTER: {
      // Delay before page enters
      delay: bases.PAGE_BASE * scalars.PAGE_ENTER_DELAY_SCALAR,
    },

    PAGE_FIRST_LOAD: {
      // First page load animation
      delay: bases.PAGE_BASE * scalars.PAGE_FIRST_LOAD_DELAY_SCALAR,
    },

    PAGE_CHILDREN: {
      // Page child elements stagger
      delayChildren: bases.PAGE_BASE * scalars.PAGE_CHILDREN_DELAY_SCALAR,
    },

    PAGE_FIRST_LOAD_CHILDREN: {
      // First load child elements
      delayChildren:
        bases.PAGE_BASE * scalars.PAGE_FIRST_LOAD_CHILDREN_DELAY_SCALAR,
    },

    // Complete swappable page transition objects
    PAGE_ANIMATE_FIRST_LOAD: {
      // Complete transition for first page load
      duration: 0,
      delay: bases.PAGE_BASE * scalars.PAGE_FIRST_LOAD_DELAY_SCALAR,
      delayChildren:
        bases.PAGE_BASE * scalars.PAGE_FIRST_LOAD_CHILDREN_DELAY_SCALAR,
      when: "beforeChildren" as const,
    },

    PAGE_ANIMATE_NORMAL: {
      // Complete transition for normal page navigation
      duration: bases.PAGE_BASE * scalars.PAGE_FADE_IN_SCALAR,
      delay: bases.PAGE_BASE * scalars.PAGE_ENTER_DELAY_SCALAR,
      delayChildren: bases.PAGE_BASE * scalars.PAGE_CHILDREN_DELAY_SCALAR,
      when: "beforeChildren" as const,
    },

    PAGE_EXIT: {
      // Complete transition for page exit
      duration: bases.PAGE_BASE * scalars.PAGE_FADE_OUT_SCALAR,
      when: "beforeChildren" as const,
    },

    // Page contents transitions
    PAGE_CONTENTS_ANIMATE_FULLSCREEN: {
      // Page contents in fullscreen (2D) mode
      duration: bases.PAGE_BASE * scalars.PAGE_CONTENTS_FADE_IN_SCALAR,
      delay: bases.PAGE_BASE * scalars.PAGE_CONTENTS_FULLSCREEN_DELAY_SCALAR,
      delayChildren:
        bases.PAGE_BASE * scalars.PAGE_CONTENTS_FULLSCREEN_DELAY_SCALAR,
      staggerChildren: bases.PAGE_BASE * scalars.PAGE_CONTENTS_STAGGER_SCALAR,
    },

    PAGE_CONTENTS_ANIMATE_EMBEDDED: {
      // Page contents in 3D embedded mode
      duration: bases.PAGE_BASE * scalars.PAGE_CONTENTS_FADE_IN_SCALAR,
      delay: bases.PAGE_BASE * scalars.PAGE_CONTENTS_EMBEDDED_DELAY_SCALAR,
      delayChildren:
        bases.PAGE_BASE * scalars.PAGE_CONTENTS_EMBEDDED_DELAY_SCALAR,
      staggerChildren: bases.PAGE_BASE * scalars.PAGE_CONTENTS_STAGGER_SCALAR,
    },

    PAGE_CONTENTS_EXIT: {
      // Page contents exit
      duration: bases.PAGE_BASE * scalars.PAGE_CONTENTS_FADE_OUT_SCALAR,
      when: "afterChildren" as const,
    },

    // ========================================
    // MODAL ANIMATIONS
    // ========================================

    MODAL_CONTAINER: {
      // Modal container layout transition
      duration: bases.MODAL_BASE * scalars.MODAL_CONTAINER_DURATION_SCALAR,
      ease: "easeInOut",
    },

    MODAL_NAVBAR: {
      // Modal navbar animation
      duration: bases.MODAL_BASE * scalars.MODAL_NAVBAR_DURATION_SCALAR,
      delay: bases.MODAL_BASE * scalars.MODAL_NAVBAR_DELAY_SCALAR,
    },

    MODAL_NAVBAR_LINE: {
      // Modal navbar line duration
      duration: bases.MODAL_BASE * scalars.MODAL_NAVBAR_LINE_DURATION_SCALAR,
    },

    MODAL_NAVBAR_CHILDREN: {
      // Modal navbar children stagger
      delayChildren:
        bases.MODAL_BASE * scalars.MODAL_NAVBAR_CHILDREN_DELAY_SCALAR,
    },

    MODAL_CONTENT: {
      // Modal content duration
      duration: bases.MODAL_BASE * scalars.MODAL_CONTENT_DURATION_SCALAR,
    },

    MODAL_LAYOUT: {
      // Modal layout delay
      delay: bases.MODAL_BASE * scalars.MODAL_LAYOUT_DELAY_SCALAR,
    },

    MODAL_BLURB: {
      // Modal blurb delay
      delay: bases.MODAL_BASE * scalars.MODAL_BLURB_DELAY_SCALAR,
    },

    MODAL_TEXT_PAINT: {
      // Modal text paint duration
      duration: bases.MODAL_BASE * scalars.MODAL_TEXT_PAINT_DURATION_SCALAR,
    },

    MODAL_TEXT_STAGGER: {
      // Modal text stagger
      staggerChildren: bases.MODAL_BASE * scalars.MODAL_TEXT_STAGGER_SCALAR,
    },

    MODAL_HEADER_TEXT: {
      // Modal header text animation
      duration: bases.MODAL_BASE * scalars.MODAL_HEADER_TEXT_DURATION_SCALAR,
      delay: bases.MODAL_BASE * scalars.MODAL_HEADER_TEXT_DELAY_SCALAR,
    },

    MODAL_DATE: {
      // Modal date duration
      duration: bases.MODAL_BASE * scalars.MODAL_DATE_DURATION_SCALAR,
    },

    MODAL_OVERLAY: {
      // Modal overlay duration
      duration: bases.MODAL_BASE * scalars.MODAL_OVERLAY_DURATION_SCALAR,
    },

    // ========================================
    // NAVIGATION
    // ========================================

    NAV_ITEM_FADE: {
      // Nav item fade duration
      duration: bases.NAV_BASE * scalars.NAV_ITEM_FADE_SCALAR,
      delay: bases.NAV_BASE * scalars.NAV_ITEM_DELAY_SCALAR,
    },

    NAV_STAGGER: {
      // Nav items stagger
      staggerChildren: bases.NAV_BASE * scalars.NAV_STAGGER_SCALAR,
    },

    NAV_EXIT: {
      // Nav exit duration
      duration: bases.NAV_BASE * scalars.NAV_EXIT_SCALAR,
    },

    NAV_MINIMAL: {
      // Minimal nav animation
      delay: bases.NAV_BASE * scalars.NAV_MINIMAL_DELAY_SCALAR,
      duration: bases.NAV_BASE * scalars.NAV_MINIMAL_DURATION_SCALAR,
    },

    NAV_MINIMAL_EXIT: {
      // Minimal nav exit
      duration: bases.NAV_BASE * scalars.NAV_MINIMAL_EXIT_SCALAR,
    },

    NAV_HOME_FIRST_LOAD: {
      // Home page nav first load delay
      delay: bases.NAV_BASE * scalars.NAV_HOME_FIRST_LOAD_DELAY_SCALAR,
    },

    NAV_ITEM_BORDER: {
      // Nav item border animation
      duration: bases.NAV_BASE * scalars.NAV_ITEM_BORDER_DURATION_SCALAR,
      delay: bases.NAV_BASE * scalars.NAV_ITEM_BORDER_DELAY_SCALAR,
    },

    NAV_ITEM_BORDER_EXIT: {
      // Nav item border exit
      duration: bases.NAV_BASE * scalars.NAV_ITEM_BORDER_EXIT_SCALAR,
    },

    NAV_BUTTON_ACTIVE: {
      // Active nav button
      duration: bases.NAV_BASE * scalars.NAV_BUTTON_ACTIVE_SCALAR,
    },

    NAV_BUTTON_INACTIVE: {
      // Inactive nav button
      duration: bases.NAV_BASE * scalars.NAV_BUTTON_INACTIVE_SCALAR,
    },

    // ========================================
    // TEXT EFFECTS
    // ========================================

    TYPEWRITER_CHAR: {
      // Typewriter character duration
      duration: bases.TEXT_BASE * scalars.TYPEWRITER_CHAR_SCALAR,
    },

    TYPEWRITER_STAGGER: {
      // Typewriter character stagger
      staggerChildren: bases.TEXT_BASE * scalars.TYPEWRITER_STAGGER_SCALAR,
    },

    TYPEWRITER_EXIT: {
      // Typewriter exit
      duration: bases.TEXT_BASE * scalars.TYPEWRITER_EXIT_SCALAR,
    },

    NAV_ITEM_TEXT_STAGGER: {
      // Nav item text stagger
      staggerChildren: bases.TEXT_BASE * scalars.NAV_ITEM_TEXT_STAGGER_SCALAR,
    },

    STAT_TRACKER_TEXT_STAGGER: {
      // Stat tracker text stagger
      staggerChildren:
        bases.TEXT_BASE * scalars.STAT_TRACKER_TEXT_STAGGER_SCALAR,
    },

    // ========================================
    // ABOUT PAGE
    // ========================================

    ABOUT_HERO: {
      // About hero section
      duration: bases.COMPONENT_BASE * scalars.ABOUT_HERO_DURATION_SCALAR,
      staggerChildren: bases.COMPONENT_BASE * scalars.ABOUT_HERO_STAGGER_SCALAR,
    },

    ABOUT_MAP: {
      // About map section
      duration: bases.COMPONENT_BASE * scalars.ABOUT_MAP_DURATION_SCALAR,
      staggerChildren: bases.COMPONENT_BASE * scalars.ABOUT_MAP_STAGGER_SCALAR,
    },

    ABOUT_SOCIALS: {
      // About socials section
      delay: bases.COMPONENT_BASE * scalars.ABOUT_SOCIALS_DELAY_SCALAR,
      delayChildren:
        bases.COMPONENT_BASE * scalars.ABOUT_SOCIALS_DELAY_CHILDREN_SCALAR,
      duration: bases.COMPONENT_BASE * scalars.ABOUT_SOCIALS_DURATION_SCALAR,
      staggerChildren:
        bases.COMPONENT_BASE * scalars.ABOUT_SOCIALS_STAGGER_SCALAR,
    },

    ABOUT_STATS: {
      // About stats section
      duration: bases.COMPONENT_BASE * scalars.ABOUT_STATS_DURATION_SCALAR,
      staggerChildren:
        bases.COMPONENT_BASE * scalars.ABOUT_STATS_STAGGER_SCALAR,
    },

    ABOUT_TAGS: {
      // About tags section
      delay: bases.COMPONENT_BASE * scalars.ABOUT_TAGS_DELAY_SCALAR,
      delayChildren:
        bases.COMPONENT_BASE * scalars.ABOUT_TAGS_DELAY_CHILDREN_SCALAR,
      duration: bases.COMPONENT_BASE * scalars.ABOUT_TAGS_DURATION_SCALAR,
      staggerChildren: bases.COMPONENT_BASE * scalars.ABOUT_TAGS_STAGGER_SCALAR,
    },

    ABOUT_AVATAR: {
      // About page avatar image
      delay: bases.COMPONENT_BASE * scalars.ABOUT_AVATAR_DELAY_SCALAR,
      duration: bases.COMPONENT_BASE * scalars.ABOUT_AVATAR_DURATION_SCALAR,
    },

    ABOUT_AVATAR_EXIT: {
      // About page avatar exit
      duration: bases.COMPONENT_BASE * scalars.ABOUT_AVATAR_EXIT_SCALAR,
    },

    // ========================================
    // STAT TRACKER
    // ========================================

    STAT_TRACKER_ANIMATE: {
      // Stat tracker appear animation
      staggerChildren:
        bases.COMPONENT_BASE * scalars.STAT_TRACKER_ANIMATE_STAGGER_SCALAR,
    },

    STAT_TRACKER_EXIT: {
      // Stat tracker exit animation
      staggerChildren:
        bases.COMPONENT_BASE * scalars.STAT_TRACKER_EXIT_STAGGER_SCALAR,
    },

    STAT_TRACKER_BLOCK: {
      // Individual stat block
      duration: bases.COMPONENT_BASE * scalars.STAT_TRACKER_BLOCK_DURATION_SCALAR,
      delay: bases.COMPONENT_BASE * scalars.STAT_TRACKER_BLOCK_DELAY_SCALAR,
    },

    // ========================================
    // COMPONENTS
    // ========================================

    BORDER_BOX_ANIMATE: {
      // AnimatedBorderBox appear
      duration: bases.COMPONENT_BASE * scalars.BORDER_BOX_ANIMATE_SCALAR,
    },

    BORDER_BOX_EXIT: {
      // AnimatedBorderBox exit
      duration: bases.COMPONENT_BASE * scalars.BORDER_BOX_EXIT_SCALAR,
    },

    ANIMATED_LINE: {
      // AnimatedLine component
      duration: bases.COMPONENT_BASE * scalars.ANIMATED_LINE_SCALAR,
    },

    ICON_ANIMATE: {
      // Icon fade in
      duration: bases.COMPONENT_BASE * scalars.ICON_ANIMATE_SCALAR,
    },

    ICON_EXIT: {
      // Icon fade out
      duration: bases.COMPONENT_BASE * scalars.ICON_EXIT_SCALAR,
    },

    COMMON_EXIT: {
      // Common/default exit duration
      duration: bases.COMPONENT_BASE * scalars.COMMON_EXIT_SCALAR,
    },

    // ========================================
    // LOADING
    // ========================================

    LOADING_PAGE: {
      // Loading page animation
      duration: bases.PAGE_BASE * scalars.LOADING_PAGE_DURATION_SCALAR,
      delay: bases.PAGE_BASE * scalars.LOADING_PAGE_DELAY_SCALAR,
    },

    LOADING_EXIT: {
      // Loading page exit
      duration: bases.PAGE_BASE * scalars.LOADING_EXIT_DURATION_SCALAR,
      delay: bases.PAGE_BASE * scalars.LOADING_EXIT_DELAY_SCALAR,
    },

    // ========================================
    // MAP VIEWER
    // ========================================

    MAP_CONTENT: {
      // Map viewer content animation
      duration: bases.COMPONENT_BASE * scalars.MAP_CONTENT_SCALAR,
    },

    MAP_EXIT: {
      // Map viewer exit
      duration: bases.COMPONENT_BASE * scalars.MAP_EXIT_SCALAR,
    },

    MAP_BLURB: {
      // Map blurb animation
      duration: bases.COMPONENT_BASE * scalars.MAP_BLURB_DURATION_SCALAR,
      staggerChildren: bases.COMPONENT_BASE * scalars.MAP_BLURB_STAGGER_SCALAR,
    },

    MAP_BLURB_EXIT: {
      // Map blurb exit
      duration: bases.COMPONENT_BASE * scalars.MAP_BLURB_EXIT_SCALAR,
    },

    MAP_SLIDER: {
      // Map slider animation
      duration: bases.COMPONENT_BASE * scalars.MAP_SLIDER_DURATION_SCALAR,
      staggerChildren: bases.COMPONENT_BASE * scalars.MAP_SLIDER_STAGGER_SCALAR,
    },

    MAP_SLIDER_EXIT: {
      // Map slider exit
      duration:
        bases.COMPONENT_BASE * scalars.MAP_SLIDER_EXIT_DURATION_SCALAR,
      staggerChildren:
        bases.COMPONENT_BASE * scalars.MAP_SLIDER_EXIT_STAGGER_SCALAR,
    },

    // ========================================
    // PROJECTS PAGE
    // ========================================

    PROJECTS_STAGGER: {
      // Projects list stagger
      staggerChildren: bases.COMPONENT_BASE * scalars.PROJECTS_STAGGER_SCALAR,
    },

    PROJECTS_ENTRY: {
      // Projects entry animation
      duration: bases.COMPONENT_BASE * scalars.PROJECTS_ENTRY_SCALAR,
    },

    PROJECTS_EXIT: {
      // Projects exit
      duration: bases.COMPONENT_BASE * scalars.PROJECTS_EXIT_SCALAR,
    },

    PROJECTS_TITLE_STAGGER: {
      // Projects title text stagger
      staggerChildren:
        bases.COMPONENT_BASE * scalars.PROJECTS_TITLE_STAGGER_SCALAR,
    },

    // ========================================
    // EXPERIENCE PAGE
    // ========================================

    EXPERIENCE_STAGGER: {
      // Experience list stagger
      staggerChildren: bases.COMPONENT_BASE * scalars.EXPERIENCE_STAGGER_SCALAR,
    },

    EXPERIENCE_TITLE_STAGGER: {
      // Experience title text stagger
      staggerChildren:
        bases.COMPONENT_BASE * scalars.EXPERIENCE_TITLE_STAGGER_SCALAR,
    },

    // ========================================
    // HOME PAGE
    // ========================================

    HOME_MENU_STAGGER: {
      // Home page menu stagger
      staggerChildren: bases.NAV_BASE * scalars.HOME_MENU_STAGGER_SCALAR,
    },

    // ========================================
    // SCENE/CANVAS
    // ========================================

    SCENE_CLOSE_BUTTON: {
      // Scene close button animation
      delay: bases.COMPONENT_BASE * scalars.SCENE_CLOSE_BUTTON_DELAY_SCALAR,
      duration:
        bases.COMPONENT_BASE * scalars.SCENE_CLOSE_BUTTON_DURATION_SCALAR,
    },

    SCENE_CLOSE_BUTTON_EXIT: {
      // Scene close button exit
      duration:
        bases.COMPONENT_BASE * scalars.SCENE_CLOSE_BUTTON_EXIT_SCALAR,
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
