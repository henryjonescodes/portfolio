import { createContext, useContext, ReactNode, useMemo } from "react";
import { useControls, folder } from "leva";
import {
  ANIMATION_MASTER_BASE,
  DEFAULT_CATEGORY_SCALARS,
  DEFAULT_TRANSITION_SCALARS,
  computeAnimationBases,
  buildTransitions,
  ANIMATION_SPRINGS,
  DEBOUNCE_DELAYS,
  LOADING_TIMEOUTS,
  MAP_SLIDER_CASCADE_DURATION_MS,
} from "@config/new-animations";
import type { AnimationBases, TransitionConfig } from "../types";

type AnimationContextType = {
  TRANSITIONS: Record<string, TransitionConfig>;
  BASES: AnimationBases;
  SPRINGS: typeof ANIMATION_SPRINGS;
  DEBOUNCE: typeof DEBOUNCE_DELAYS;
  TIMEOUTS: typeof LOADING_TIMEOUTS;
  MAP_SLIDER_CASCADE_MS: number;
};

const AnimationContext = createContext<AnimationContextType | undefined>(
  undefined
);

export const AnimationProvider = ({ children }: { children: ReactNode }) => {
  const controls = useControls("Animation System", {
    "🎛️ Master Control": folder(
      {
        ANIMATION_MASTER_BASE: {
          value: ANIMATION_MASTER_BASE,
          min: 0.1,
          max: 3.0,
          step: 0.05,
          label: "Master Base Duration",
          hint: "Single value to speed/slow ALL animations",
        },
      },
      { collapsed: false }
    ),

    "📊 Category Bases": folder(
      {
        PAGE_BASE_SCALAR: {
          value: DEFAULT_CATEGORY_SCALARS.PAGE_BASE_SCALAR,
          min: 0.5,
          max: 3,
          step: 0.1,
          label: "Page Base Scalar",
          hint: "Multiplies master base",
        },
        MODAL_BASE_SCALAR: {
          value: DEFAULT_CATEGORY_SCALARS.MODAL_BASE_SCALAR,
          min: 0.5,
          max: 3,
          step: 0.1,
          label: "Modal Base Scalar",
        },
        NAV_BASE_SCALAR: {
          value: DEFAULT_CATEGORY_SCALARS.NAV_BASE_SCALAR,
          min: 0.5,
          max: 3,
          step: 0.1,
          label: "Nav Base Scalar",
        },
        TEXT_BASE_SCALAR: {
          value: DEFAULT_CATEGORY_SCALARS.TEXT_BASE_SCALAR,
          min: 0.5,
          max: 3,
          step: 0.1,
          label: "Text Base Scalar",
        },
        COMPONENT_BASE_SCALAR: {
          value: DEFAULT_CATEGORY_SCALARS.COMPONENT_BASE_SCALAR,
          min: 0.5,
          max: 3,
          step: 0.1,
          label: "Component Base Scalar",
        },
      },
      { collapsed: true }
    ),

    "📄 Page Transitions": folder(
      {
        PAGE_FADE_IN_SCALAR: {
          value: DEFAULT_TRANSITION_SCALARS.PAGE_FADE_IN_SCALAR,
          min: 0,
          max: 5,
          step: 0.1,
          label: "Fade In (×PAGE_BASE)",
          hint: "Page container fade in duration",
        },
        PAGE_FADE_OUT_SCALAR: {
          value: DEFAULT_TRANSITION_SCALARS.PAGE_FADE_OUT_SCALAR,
          min: 0,
          max: 5,
          step: 0.1,
          label: "Fade Out (×PAGE_BASE)",
        },
        PAGE_ENTER_DELAY_SCALAR: {
          value: DEFAULT_TRANSITION_SCALARS.PAGE_ENTER_DELAY_SCALAR,
          min: 0,
          max: 5,
          step: 0.1,
          label: "Enter Delay (×PAGE_BASE)",
        },
        PAGE_FIRST_LOAD_DELAY_SCALAR: {
          value: DEFAULT_TRANSITION_SCALARS.PAGE_FIRST_LOAD_DELAY_SCALAR,
          min: 0,
          max: 5,
          step: 0.1,
          label: "First Load Delay (×PAGE_BASE)",
        },
        PAGE_CHILDREN_DELAY_SCALAR: {
          value: DEFAULT_TRANSITION_SCALARS.PAGE_CHILDREN_DELAY_SCALAR,
          min: 0,
          max: 5,
          step: 0.1,
          label: "Children Delay (×PAGE_BASE)",
        },
        PAGE_FIRST_LOAD_CHILDREN_DELAY_SCALAR: {
          value:
            DEFAULT_TRANSITION_SCALARS.PAGE_FIRST_LOAD_CHILDREN_DELAY_SCALAR,
          min: 0,
          max: 5,
          step: 0.1,
          label: "First Load Children (×PAGE_BASE)",
        },
        PAGE_CONTENTS_FADE_IN_SCALAR: {
          value: DEFAULT_TRANSITION_SCALARS.PAGE_CONTENTS_FADE_IN_SCALAR,
          min: 0,
          max: 5,
          step: 0.1,
          label: "Contents Fade In (×PAGE_BASE)",
          hint: "Inner page contents fade in duration",
        },
        PAGE_CONTENTS_FADE_OUT_SCALAR: {
          value: DEFAULT_TRANSITION_SCALARS.PAGE_CONTENTS_FADE_OUT_SCALAR,
          min: 0,
          max: 5,
          step: 0.1,
          label: "Contents Fade Out (×PAGE_BASE)",
        },
        PAGE_CONTENTS_STAGGER_SCALAR: {
          value: DEFAULT_TRANSITION_SCALARS.PAGE_CONTENTS_STAGGER_SCALAR,
          min: 0,
          max: 5,
          step: 0.1,
          label: "Contents Stagger (×PAGE_BASE)",
        },
        PAGE_CONTENTS_FULLSCREEN_DELAY_SCALAR: {
          value: DEFAULT_TRANSITION_SCALARS.PAGE_CONTENTS_FULLSCREEN_DELAY_SCALAR,
          min: 0,
          max: 5,
          step: 0.1,
          label: "Contents Fullscreen Delay (×PAGE_BASE)",
        },
        PAGE_CONTENTS_EMBEDDED_DELAY_SCALAR: {
          value: DEFAULT_TRANSITION_SCALARS.PAGE_CONTENTS_EMBEDDED_DELAY_SCALAR,
          min: 0,
          max: 5,
          step: 0.1,
          label: "Contents 3D Delay (×PAGE_BASE)",
        },
      },
      { collapsed: true }
    ),

    "🎭 Modal Animations": folder(
      {
        MODAL_CONTAINER_DURATION_SCALAR: {
          value: DEFAULT_TRANSITION_SCALARS.MODAL_CONTAINER_DURATION_SCALAR,
          min: 0,
          max: 5,
          step: 0.1,
          label: "Container (×MODAL_BASE)",
          hint: "Modal container layout transition",
        },
        MODAL_NAVBAR_DURATION_SCALAR: {
          value: DEFAULT_TRANSITION_SCALARS.MODAL_NAVBAR_DURATION_SCALAR,
          min: 0,
          max: 5,
          step: 0.1,
          label: "Navbar Duration (×MODAL_BASE)",
        },
        MODAL_NAVBAR_DELAY_SCALAR: {
          value: DEFAULT_TRANSITION_SCALARS.MODAL_NAVBAR_DELAY_SCALAR,
          min: 0,
          max: 5,
          step: 0.1,
          label: "Navbar Delay (×MODAL_BASE)",
        },
        MODAL_NAVBAR_LINE_DURATION_SCALAR: {
          value: DEFAULT_TRANSITION_SCALARS.MODAL_NAVBAR_LINE_DURATION_SCALAR,
          min: 0,
          max: 5,
          step: 0.1,
          label: "Navbar Line (×MODAL_BASE)",
        },
        MODAL_NAVBAR_CHILDREN_DELAY_SCALAR: {
          value: DEFAULT_TRANSITION_SCALARS.MODAL_NAVBAR_CHILDREN_DELAY_SCALAR,
          min: 0,
          max: 5,
          step: 0.1,
          label: "Navbar Children (×MODAL_BASE)",
        },
        MODAL_CONTENT_DURATION_SCALAR: {
          value: DEFAULT_TRANSITION_SCALARS.MODAL_CONTENT_DURATION_SCALAR,
          min: 0,
          max: 5,
          step: 0.1,
          label: "Content (×MODAL_BASE)",
        },
        MODAL_LAYOUT_DELAY_SCALAR: {
          value: DEFAULT_TRANSITION_SCALARS.MODAL_LAYOUT_DELAY_SCALAR,
          min: 0,
          max: 5,
          step: 0.1,
          label: "Layout Delay (×MODAL_BASE)",
        },
        MODAL_BLURB_DELAY_SCALAR: {
          value: DEFAULT_TRANSITION_SCALARS.MODAL_BLURB_DELAY_SCALAR,
          min: 0,
          max: 5,
          step: 0.1,
          label: "Blurb Delay (×MODAL_BASE)",
        },
        MODAL_TEXT_PAINT_DURATION_SCALAR: {
          value: DEFAULT_TRANSITION_SCALARS.MODAL_TEXT_PAINT_DURATION_SCALAR,
          min: 0,
          max: 5,
          step: 0.1,
          label: "Text Paint (×MODAL_BASE)",
        },
        MODAL_TEXT_STAGGER_SCALAR: {
          value: DEFAULT_TRANSITION_SCALARS.MODAL_TEXT_STAGGER_SCALAR,
          min: 0,
          max: 10,
          step: 0.1,
          label: "Text Stagger (×MODAL_BASE)",
        },
        MODAL_HEADER_TEXT_DURATION_SCALAR: {
          value: DEFAULT_TRANSITION_SCALARS.MODAL_HEADER_TEXT_DURATION_SCALAR,
          min: 0,
          max: 10,
          step: 0.1,
          label: "Header Text Duration (×MODAL_BASE)",
        },
        MODAL_HEADER_TEXT_DELAY_SCALAR: {
          value: DEFAULT_TRANSITION_SCALARS.MODAL_HEADER_TEXT_DELAY_SCALAR,
          min: 0,
          max: 10,
          step: 0.1,
          label: "Header Text Delay (×MODAL_BASE)",
        },
        MODAL_DATE_DURATION_SCALAR: {
          value: DEFAULT_TRANSITION_SCALARS.MODAL_DATE_DURATION_SCALAR,
          min: 0,
          max: 5,
          step: 0.1,
          label: "Date Field (×MODAL_BASE)",
        },
        MODAL_OVERLAY_DURATION_SCALAR: {
          value: DEFAULT_TRANSITION_SCALARS.MODAL_OVERLAY_DURATION_SCALAR,
          min: 0,
          max: 5,
          step: 0.1,
          label: "Overlay (×MODAL_BASE)",
        },
      },
      { collapsed: true }
    ),

    "🧭 Navigation": folder(
      {
        NAV_ITEM_FADE_SCALAR: {
          value: DEFAULT_TRANSITION_SCALARS.NAV_ITEM_FADE_SCALAR,
          min: 0,
          max: 5,
          step: 0.1,
          label: "Item Fade (×NAV_BASE)",
        },
        NAV_ITEM_DELAY_SCALAR: {
          value: DEFAULT_TRANSITION_SCALARS.NAV_ITEM_DELAY_SCALAR,
          min: 0,
          max: 5,
          step: 0.1,
          label: "Item Delay (×NAV_BASE)",
        },
        NAV_STAGGER_SCALAR: {
          value: DEFAULT_TRANSITION_SCALARS.NAV_STAGGER_SCALAR,
          min: 0,
          max: 5,
          step: 0.1,
          label: "Stagger (×NAV_BASE)",
        },
        NAV_EXIT_SCALAR: {
          value: DEFAULT_TRANSITION_SCALARS.NAV_EXIT_SCALAR,
          min: 0,
          max: 5,
          step: 0.1,
          label: "Exit (×NAV_BASE)",
        },
        NAV_MINIMAL_DELAY_SCALAR: {
          value: DEFAULT_TRANSITION_SCALARS.NAV_MINIMAL_DELAY_SCALAR,
          min: 0,
          max: 5,
          step: 0.1,
          label: "Minimal Delay (×NAV_BASE)",
        },
        NAV_MINIMAL_DURATION_SCALAR: {
          value: DEFAULT_TRANSITION_SCALARS.NAV_MINIMAL_DURATION_SCALAR,
          min: 0,
          max: 5,
          step: 0.1,
          label: "Minimal Duration (×NAV_BASE)",
        },
        NAV_MINIMAL_EXIT_SCALAR: {
          value: DEFAULT_TRANSITION_SCALARS.NAV_MINIMAL_EXIT_SCALAR,
          min: 0,
          max: 5,
          step: 0.1,
          label: "Minimal Exit (×NAV_BASE)",
        },
        NAV_HOME_FIRST_LOAD_DELAY_SCALAR: {
          value: DEFAULT_TRANSITION_SCALARS.NAV_HOME_FIRST_LOAD_DELAY_SCALAR,
          min: 0,
          max: 10,
          step: 0.1,
          label: "Home First Load (×NAV_BASE)",
        },
        NAV_ITEM_BORDER_DURATION_SCALAR: {
          value: DEFAULT_TRANSITION_SCALARS.NAV_ITEM_BORDER_DURATION_SCALAR,
          min: 0,
          max: 5,
          step: 0.1,
          label: "Item Border Duration (×NAV_BASE)",
        },
        NAV_ITEM_BORDER_DELAY_SCALAR: {
          value: DEFAULT_TRANSITION_SCALARS.NAV_ITEM_BORDER_DELAY_SCALAR,
          min: 0,
          max: 5,
          step: 0.1,
          label: "Item Border Delay (×NAV_BASE)",
        },
        NAV_ITEM_BORDER_EXIT_SCALAR: {
          value: DEFAULT_TRANSITION_SCALARS.NAV_ITEM_BORDER_EXIT_SCALAR,
          min: 0,
          max: 5,
          step: 0.1,
          label: "Item Border Exit (×NAV_BASE)",
        },
        NAV_BUTTON_ACTIVE_SCALAR: {
          value: DEFAULT_TRANSITION_SCALARS.NAV_BUTTON_ACTIVE_SCALAR,
          min: 0,
          max: 5,
          step: 0.1,
          label: "Button Active (×NAV_BASE)",
        },
        NAV_BUTTON_INACTIVE_SCALAR: {
          value: DEFAULT_TRANSITION_SCALARS.NAV_BUTTON_INACTIVE_SCALAR,
          min: 0,
          max: 5,
          step: 0.1,
          label: "Button Inactive (×NAV_BASE)",
        },
      },
      { collapsed: true }
    ),

    "✍️ Text Effects": folder(
      {
        TYPEWRITER_CHAR_SCALAR: {
          value: DEFAULT_TRANSITION_SCALARS.TYPEWRITER_CHAR_SCALAR,
          min: 0,
          max: 5,
          step: 0.1,
          label: "Char Duration (×TEXT_BASE)",
        },
        TYPEWRITER_STAGGER_SCALAR: {
          value: DEFAULT_TRANSITION_SCALARS.TYPEWRITER_STAGGER_SCALAR,
          min: 0,
          max: 2,
          step: 0.01,
          label: "Char Stagger (×TEXT_BASE)",
        },
        TYPEWRITER_EXIT_SCALAR: {
          value: DEFAULT_TRANSITION_SCALARS.TYPEWRITER_EXIT_SCALAR,
          min: 0,
          max: 5,
          step: 0.1,
          label: "Exit (×TEXT_BASE)",
        },
        NAV_ITEM_TEXT_STAGGER_SCALAR: {
          value: DEFAULT_TRANSITION_SCALARS.NAV_ITEM_TEXT_STAGGER_SCALAR,
          min: 0,
          max: 2,
          step: 0.01,
          label: "Nav Text Stagger (×TEXT_BASE)",
        },
        STAT_TRACKER_TEXT_STAGGER_SCALAR: {
          value: DEFAULT_TRANSITION_SCALARS.STAT_TRACKER_TEXT_STAGGER_SCALAR,
          min: 0,
          max: 2,
          step: 0.01,
          label: "Stat Text Stagger (×TEXT_BASE)",
        },
      },
      { collapsed: true }
    ),

    "ℹ️ About Page": folder(
      {
        ABOUT_HERO_DURATION_SCALAR: {
          value: DEFAULT_TRANSITION_SCALARS.ABOUT_HERO_DURATION_SCALAR,
          min: 0,
          max: 5,
          step: 0.1,
          label: "Hero Duration (×COMPONENT_BASE)",
        },
        ABOUT_HERO_STAGGER_SCALAR: {
          value: DEFAULT_TRANSITION_SCALARS.ABOUT_HERO_STAGGER_SCALAR,
          min: 0,
          max: 5,
          step: 0.1,
          label: "Hero Stagger (×COMPONENT_BASE)",
        },
        ABOUT_MAP_DURATION_SCALAR: {
          value: DEFAULT_TRANSITION_SCALARS.ABOUT_MAP_DURATION_SCALAR,
          min: 0,
          max: 5,
          step: 0.1,
          label: "Map Duration (×COMPONENT_BASE)",
        },
        ABOUT_MAP_STAGGER_SCALAR: {
          value: DEFAULT_TRANSITION_SCALARS.ABOUT_MAP_STAGGER_SCALAR,
          min: 0,
          max: 5,
          step: 0.1,
          label: "Map Stagger (×COMPONENT_BASE)",
        },
        ABOUT_SOCIALS_DELAY_SCALAR: {
          value: DEFAULT_TRANSITION_SCALARS.ABOUT_SOCIALS_DELAY_SCALAR,
          min: 0,
          max: 10,
          step: 0.1,
          label: "Socials Delay (×COMPONENT_BASE)",
        },
        ABOUT_SOCIALS_DELAY_CHILDREN_SCALAR: {
          value: DEFAULT_TRANSITION_SCALARS.ABOUT_SOCIALS_DELAY_CHILDREN_SCALAR,
          min: 0,
          max: 10,
          step: 0.1,
          label: "Socials Children (×COMPONENT_BASE)",
        },
        ABOUT_SOCIALS_DURATION_SCALAR: {
          value: DEFAULT_TRANSITION_SCALARS.ABOUT_SOCIALS_DURATION_SCALAR,
          min: 0,
          max: 5,
          step: 0.1,
          label: "Socials Duration (×COMPONENT_BASE)",
        },
        ABOUT_SOCIALS_STAGGER_SCALAR: {
          value: DEFAULT_TRANSITION_SCALARS.ABOUT_SOCIALS_STAGGER_SCALAR,
          min: 0,
          max: 5,
          step: 0.1,
          label: "Socials Stagger (×COMPONENT_BASE)",
        },
        ABOUT_STATS_DURATION_SCALAR: {
          value: DEFAULT_TRANSITION_SCALARS.ABOUT_STATS_DURATION_SCALAR,
          min: 0,
          max: 5,
          step: 0.1,
          label: "Stats Duration (×COMPONENT_BASE)",
        },
        ABOUT_STATS_STAGGER_SCALAR: {
          value: DEFAULT_TRANSITION_SCALARS.ABOUT_STATS_STAGGER_SCALAR,
          min: 0,
          max: 5,
          step: 0.1,
          label: "Stats Stagger (×COMPONENT_BASE)",
        },
        ABOUT_TAGS_DELAY_SCALAR: {
          value: DEFAULT_TRANSITION_SCALARS.ABOUT_TAGS_DELAY_SCALAR,
          min: 0,
          max: 10,
          step: 0.1,
          label: "Tags Delay (×COMPONENT_BASE)",
        },
        ABOUT_TAGS_DELAY_CHILDREN_SCALAR: {
          value: DEFAULT_TRANSITION_SCALARS.ABOUT_TAGS_DELAY_CHILDREN_SCALAR,
          min: 0,
          max: 10,
          step: 0.1,
          label: "Tags Children (×COMPONENT_BASE)",
        },
        ABOUT_TAGS_DURATION_SCALAR: {
          value: DEFAULT_TRANSITION_SCALARS.ABOUT_TAGS_DURATION_SCALAR,
          min: 0,
          max: 5,
          step: 0.1,
          label: "Tags Duration (×COMPONENT_BASE)",
        },
        ABOUT_TAGS_STAGGER_SCALAR: {
          value: DEFAULT_TRANSITION_SCALARS.ABOUT_TAGS_STAGGER_SCALAR,
          min: 0,
          max: 5,
          step: 0.1,
          label: "Tags Stagger (×COMPONENT_BASE)",
        },
        ABOUT_AVATAR_DELAY_SCALAR: {
          value: DEFAULT_TRANSITION_SCALARS.ABOUT_AVATAR_DELAY_SCALAR,
          min: 0,
          max: 10,
          step: 0.1,
          label: "Avatar Delay (×COMPONENT_BASE)",
        },
        ABOUT_AVATAR_DURATION_SCALAR: {
          value: DEFAULT_TRANSITION_SCALARS.ABOUT_AVATAR_DURATION_SCALAR,
          min: 0,
          max: 15,
          step: 0.1,
          label: "Avatar Duration (×COMPONENT_BASE)",
        },
        ABOUT_AVATAR_EXIT_SCALAR: {
          value: DEFAULT_TRANSITION_SCALARS.ABOUT_AVATAR_EXIT_SCALAR,
          min: 0,
          max: 5,
          step: 0.1,
          label: "Avatar Exit (×COMPONENT_BASE)",
        },
      },
      { collapsed: true }
    ),

    "🧩 Components & Pages": folder(
      {
        "Stat Tracker": folder({
          STAT_TRACKER_ANIMATE_STAGGER_SCALAR: {
            value:
              DEFAULT_TRANSITION_SCALARS.STAT_TRACKER_ANIMATE_STAGGER_SCALAR,
            min: 0,
            max: 5,
            step: 0.1,
            label: "Animate Stagger (×COMPONENT_BASE)",
          },
          STAT_TRACKER_EXIT_STAGGER_SCALAR: {
            value: DEFAULT_TRANSITION_SCALARS.STAT_TRACKER_EXIT_STAGGER_SCALAR,
            min: 0,
            max: 5,
            step: 0.1,
            label: "Exit Stagger (×COMPONENT_BASE)",
          },
          STAT_TRACKER_BLOCK_DURATION_SCALAR: {
            value:
              DEFAULT_TRANSITION_SCALARS.STAT_TRACKER_BLOCK_DURATION_SCALAR,
            min: 0,
            max: 5,
            step: 0.01,
            label: "Block Duration (×COMPONENT_BASE)",
          },
          STAT_TRACKER_BLOCK_DELAY_SCALAR: {
            value: DEFAULT_TRANSITION_SCALARS.STAT_TRACKER_BLOCK_DELAY_SCALAR,
            min: 0,
            max: 5,
            step: 0.01,
            label: "Block Delay (×COMPONENT_BASE)",
          },
        }),

        "General Components": folder({
          BORDER_BOX_ANIMATE_SCALAR: {
            value: DEFAULT_TRANSITION_SCALARS.BORDER_BOX_ANIMATE_SCALAR,
            min: 0,
            max: 10,
            step: 0.1,
            label: "Border Box Animate (×COMPONENT_BASE)",
          },
          BORDER_BOX_EXIT_SCALAR: {
            value: DEFAULT_TRANSITION_SCALARS.BORDER_BOX_EXIT_SCALAR,
            min: 0,
            max: 10,
            step: 0.1,
            label: "Border Box Exit (×COMPONENT_BASE)",
          },
          ANIMATED_LINE_SCALAR: {
            value: DEFAULT_TRANSITION_SCALARS.ANIMATED_LINE_SCALAR,
            min: 0,
            max: 10,
            step: 0.1,
            label: "Animated Line (×COMPONENT_BASE)",
          },
          ICON_ANIMATE_SCALAR: {
            value: DEFAULT_TRANSITION_SCALARS.ICON_ANIMATE_SCALAR,
            min: 0,
            max: 5,
            step: 0.1,
            label: "Icon Animate (×COMPONENT_BASE)",
          },
          ICON_EXIT_SCALAR: {
            value: DEFAULT_TRANSITION_SCALARS.ICON_EXIT_SCALAR,
            min: 0,
            max: 5,
            step: 0.1,
            label: "Icon Exit (×COMPONENT_BASE)",
          },
          COMMON_EXIT_SCALAR: {
            value: DEFAULT_TRANSITION_SCALARS.COMMON_EXIT_SCALAR,
            min: 0,
            max: 5,
            step: 0.1,
            label: "Common Exit (×COMPONENT_BASE)",
          },
        }),

        Loading: folder({
          LOADING_PAGE_DURATION_SCALAR: {
            value: DEFAULT_TRANSITION_SCALARS.LOADING_PAGE_DURATION_SCALAR,
            min: 0,
            max: 5,
            step: 0.1,
            label: "Page Duration (×COMPONENT_BASE)",
          },
          LOADING_PAGE_DELAY_SCALAR: {
            value: DEFAULT_TRANSITION_SCALARS.LOADING_PAGE_DELAY_SCALAR,
            min: 0,
            max: 5,
            step: 0.1,
            label: "Page Delay",
          },
          LOADING_EXIT_DURATION_SCALAR: {
            value: DEFAULT_TRANSITION_SCALARS.LOADING_EXIT_DURATION_SCALAR,
            min: 0,
            max: 5,
            step: 0.1,
            label: "Exit Duration (×COMPONENT_BASE)",
          },
          LOADING_EXIT_DELAY_SCALAR: {
            value: DEFAULT_TRANSITION_SCALARS.LOADING_EXIT_DELAY_SCALAR,
            min: 0,
            max: 10,
            step: 0.1,
            label: "Exit Delay (×COMPONENT_BASE)",
          },
        }),

        "Map Viewer": folder({
          MAP_CONTENT_SCALAR: {
            value: DEFAULT_TRANSITION_SCALARS.MAP_CONTENT_SCALAR,
            min: 0,
            max: 15,
            step: 0.1,
            label: "Content (×COMPONENT_BASE)",
          },
          MAP_EXIT_SCALAR: {
            value: DEFAULT_TRANSITION_SCALARS.MAP_EXIT_SCALAR,
            min: 0,
            max: 5,
            step: 0.1,
            label: "Exit (×COMPONENT_BASE)",
          },
          MAP_BLURB_DURATION_SCALAR: {
            value: DEFAULT_TRANSITION_SCALARS.MAP_BLURB_DURATION_SCALAR,
            min: 0,
            max: 5,
            step: 0.1,
            label: "Blurb Duration (×COMPONENT_BASE)",
          },
          MAP_BLURB_STAGGER_SCALAR: {
            value: DEFAULT_TRANSITION_SCALARS.MAP_BLURB_STAGGER_SCALAR,
            min: 0,
            max: 5,
            step: 0.1,
            label: "Blurb Stagger (×COMPONENT_BASE)",
          },
          MAP_BLURB_EXIT_SCALAR: {
            value: DEFAULT_TRANSITION_SCALARS.MAP_BLURB_EXIT_SCALAR,
            min: 0,
            max: 5,
            step: 0.1,
            label: "Blurb Exit",
          },
          MAP_SLIDER_DURATION_SCALAR: {
            value: DEFAULT_TRANSITION_SCALARS.MAP_SLIDER_DURATION_SCALAR,
            min: 0,
            max: 5,
            step: 0.1,
            label: "Slider Duration (×COMPONENT_BASE)",
          },
          MAP_SLIDER_STAGGER_SCALAR: {
            value: DEFAULT_TRANSITION_SCALARS.MAP_SLIDER_STAGGER_SCALAR,
            min: 0,
            max: 2,
            step: 0.01,
            label: "Slider Stagger (×COMPONENT_BASE)",
          },
          MAP_SLIDER_EXIT_DURATION_SCALAR: {
            value: DEFAULT_TRANSITION_SCALARS.MAP_SLIDER_EXIT_DURATION_SCALAR,
            min: 0,
            max: 5,
            step: 0.1,
            label: "Slider Exit Duration (×COMPONENT_BASE)",
          },
          MAP_SLIDER_EXIT_STAGGER_SCALAR: {
            value: DEFAULT_TRANSITION_SCALARS.MAP_SLIDER_EXIT_STAGGER_SCALAR,
            min: 0,
            max: 2,
            step: 0.01,
            label: "Slider Exit Stagger (×COMPONENT_BASE)",
          },
        }),

        Projects: folder({
          PROJECTS_STAGGER_SCALAR: {
            value: DEFAULT_TRANSITION_SCALARS.PROJECTS_STAGGER_SCALAR,
            min: 0,
            max: 5,
            step: 0.1,
            label: "Stagger (×COMPONENT_BASE)",
          },
          PROJECTS_ENTRY_SCALAR: {
            value: DEFAULT_TRANSITION_SCALARS.PROJECTS_ENTRY_SCALAR,
            min: 0,
            max: 15,
            step: 0.1,
            label: "Entry (×COMPONENT_BASE)",
          },
          PROJECTS_EXIT_SCALAR: {
            value: DEFAULT_TRANSITION_SCALARS.PROJECTS_EXIT_SCALAR,
            min: 0,
            max: 5,
            step: 0.1,
            label: "Exit (×COMPONENT_BASE)",
          },
          PROJECTS_TITLE_STAGGER_SCALAR: {
            value: DEFAULT_TRANSITION_SCALARS.PROJECTS_TITLE_STAGGER_SCALAR,
            min: 0,
            max: 2,
            step: 0.01,
            label: "Title Stagger (×TEXT_BASE)",
          },
        }),

        Experience: folder({
          EXPERIENCE_STAGGER_SCALAR: {
            value: DEFAULT_TRANSITION_SCALARS.EXPERIENCE_STAGGER_SCALAR,
            min: 0,
            max: 5,
            step: 0.1,
            label: "Stagger (×COMPONENT_BASE)",
          },
          EXPERIENCE_TITLE_STAGGER_SCALAR: {
            value: DEFAULT_TRANSITION_SCALARS.EXPERIENCE_TITLE_STAGGER_SCALAR,
            min: 0,
            max: 2,
            step: 0.01,
            label: "Title Stagger (×TEXT_BASE)",
          },
        }),

        Home: folder({
          HOME_MENU_STAGGER_SCALAR: {
            value: DEFAULT_TRANSITION_SCALARS.HOME_MENU_STAGGER_SCALAR,
            min: 0,
            max: 5,
            step: 0.1,
            label: "Menu Stagger (×COMPONENT_BASE)",
          },
        }),

        Scene: folder({
          SCENE_CLOSE_BUTTON_DELAY_SCALAR: {
            value: DEFAULT_TRANSITION_SCALARS.SCENE_CLOSE_BUTTON_DELAY_SCALAR,
            min: 0,
            max: 10,
            step: 0.1,
            label: "Close Button Delay (×COMPONENT_BASE)",
          },
          SCENE_CLOSE_BUTTON_DURATION_SCALAR: {
            value:
              DEFAULT_TRANSITION_SCALARS.SCENE_CLOSE_BUTTON_DURATION_SCALAR,
            min: 0,
            max: 10,
            step: 0.1,
            label: "Close Button Duration (×COMPONENT_BASE)",
          },
          SCENE_CLOSE_BUTTON_EXIT_SCALAR: {
            value: DEFAULT_TRANSITION_SCALARS.SCENE_CLOSE_BUTTON_EXIT_SCALAR,
            min: 0,
            max: 10,
            step: 0.1,
            label: "Close Button Exit (×COMPONENT_BASE)",
          },
        }),
      },
      { collapsed: true }
    ),
  });

  // Compute bases from master and category scalars
  const bases = useMemo(
    () =>
      computeAnimationBases(controls.ANIMATION_MASTER_BASE, {
        PAGE_BASE_SCALAR: controls.PAGE_BASE_SCALAR,
        MODAL_BASE_SCALAR: controls.MODAL_BASE_SCALAR,
        NAV_BASE_SCALAR: controls.NAV_BASE_SCALAR,
        TEXT_BASE_SCALAR: controls.TEXT_BASE_SCALAR,
        COMPONENT_BASE_SCALAR: controls.COMPONENT_BASE_SCALAR,
      }),
    [
      controls.ANIMATION_MASTER_BASE,
      controls.PAGE_BASE_SCALAR,
      controls.MODAL_BASE_SCALAR,
      controls.NAV_BASE_SCALAR,
      controls.TEXT_BASE_SCALAR,
      controls.COMPONENT_BASE_SCALAR,
    ]
  );

  // Build all transitions from bases and scalars
  const transitions = useMemo(
    () =>
      buildTransitions(bases, controls as typeof DEFAULT_TRANSITION_SCALARS),
    [bases, controls]
  );

  const value: AnimationContextType = {
    TRANSITIONS: transitions,
    BASES: bases,
    SPRINGS: ANIMATION_SPRINGS,
    DEBOUNCE: DEBOUNCE_DELAYS,
    TIMEOUTS: LOADING_TIMEOUTS,
    MAP_SLIDER_CASCADE_MS: MAP_SLIDER_CASCADE_DURATION_MS,
  };

  return (
    <AnimationContext.Provider value={value}>
      {children}
    </AnimationContext.Provider>
  );
};

export const useAnimations = () => {
  const context = useContext(AnimationContext);
  if (context === undefined) {
    throw new Error("useAnimations must be used within AnimationProvider");
  }
  return context;
};
