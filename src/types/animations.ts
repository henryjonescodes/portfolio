/**
 * Type definitions for the animation system.
 */

/** Framer Motion transition configuration */
export type TransitionConfig = {
  duration?: number;
  delay?: number;
  delayChildren?: number;
  staggerChildren?: number;
  ease?: string | number[];
  type?: "spring" | "tween" | "inertia";
  when?: "beforeChildren" | "afterChildren";
};

/** Category base durations derived from master */
export type AnimationBases = {
  PAGE_BASE: number;      // Page-level transitions (slower, emphasized)
  MODAL_BASE: number;     // Modal/dialog animations
  NAV_BASE: number;       // Navigation items and menus
  TEXT_BASE: number;      // Text effects (typewriter, reveals)
  COMPONENT_BASE: number; // Generic components (borders, boxes, etc)
};

/** Spring physics configuration for react-spring */
export type SpringConfig = {
  tension: number;
  friction: number;
  mass: number;
};

/** Leva control scalars for category bases */
export type CategoryBaseScalars = {
  PAGE_BASE_SCALAR: number;
  MODAL_BASE_SCALAR: number;
  NAV_BASE_SCALAR: number;
  TEXT_BASE_SCALAR: number;
  COMPONENT_BASE_SCALAR: number;
};

/** Leva control scalars for all transitions */
export type TransitionScalars = {
  // Page transitions
  PAGE_FADE_IN_SCALAR: number;
  PAGE_FADE_OUT_SCALAR: number;
  PAGE_ENTER_DELAY_SCALAR: number;
  PAGE_FIRST_LOAD_DELAY_SCALAR: number;
  PAGE_CHILDREN_DELAY_SCALAR: number;
  PAGE_FIRST_LOAD_CHILDREN_DELAY_SCALAR: number;

  // Page contents
  PAGE_CONTENTS_FADE_IN_SCALAR: number;
  PAGE_CONTENTS_FADE_OUT_SCALAR: number;
  PAGE_CONTENTS_STAGGER_SCALAR: number;
  PAGE_CONTENTS_FULLSCREEN_DELAY_SCALAR: number;
  PAGE_CONTENTS_EMBEDDED_DELAY_SCALAR: number;

  // Modal animations
  MODAL_CONTAINER_DURATION_SCALAR: number;
  MODAL_NAVBAR_DURATION_SCALAR: number;
  MODAL_NAVBAR_DELAY_SCALAR: number;
  MODAL_NAVBAR_LINE_DURATION_SCALAR: number;
  MODAL_NAVBAR_CHILDREN_DELAY_SCALAR: number;
  MODAL_CONTENT_DURATION_SCALAR: number;
  MODAL_LAYOUT_DELAY_SCALAR: number;
  MODAL_BLURB_DELAY_SCALAR: number;
  MODAL_TEXT_PAINT_DURATION_SCALAR: number;
  MODAL_TEXT_STAGGER_SCALAR: number;
  MODAL_HEADER_TEXT_DURATION_SCALAR: number;
  MODAL_HEADER_TEXT_DELAY_SCALAR: number;
  MODAL_DATE_DURATION_SCALAR: number;
  MODAL_OVERLAY_DURATION_SCALAR: number;

  // Navigation
  NAV_ITEM_FADE_SCALAR: number;
  NAV_ITEM_DELAY_SCALAR: number;
  NAV_STAGGER_SCALAR: number;
  NAV_EXIT_SCALAR: number;
  NAV_MINIMAL_DELAY_SCALAR: number;
  NAV_MINIMAL_DURATION_SCALAR: number;
  NAV_MINIMAL_EXIT_SCALAR: number;
  NAV_HOME_FIRST_LOAD_DELAY_SCALAR: number;
  NAV_ITEM_BORDER_DURATION_SCALAR: number;
  NAV_ITEM_BORDER_DELAY_SCALAR: number;
  NAV_ITEM_BORDER_EXIT_SCALAR: number;
  NAV_BUTTON_ACTIVE_SCALAR: number;
  NAV_BUTTON_INACTIVE_SCALAR: number;

  // Text effects
  TYPEWRITER_CHAR_SCALAR: number;
  TYPEWRITER_STAGGER_SCALAR: number;
  TYPEWRITER_EXIT_SCALAR: number;
  NAV_ITEM_TEXT_STAGGER_SCALAR: number;
  STAT_TRACKER_TEXT_STAGGER_SCALAR: number;

  // About page
  ABOUT_HERO_DURATION_SCALAR: number;
  ABOUT_HERO_STAGGER_SCALAR: number;
  ABOUT_MAP_DURATION_SCALAR: number;
  ABOUT_MAP_STAGGER_SCALAR: number;
  ABOUT_SOCIALS_DELAY_SCALAR: number;
  ABOUT_SOCIALS_DELAY_CHILDREN_SCALAR: number;
  ABOUT_SOCIALS_DURATION_SCALAR: number;
  ABOUT_SOCIALS_STAGGER_SCALAR: number;
  ABOUT_STATS_DURATION_SCALAR: number;
  ABOUT_STATS_STAGGER_SCALAR: number;
  ABOUT_TAGS_DELAY_SCALAR: number;
  ABOUT_TAGS_DELAY_CHILDREN_SCALAR: number;
  ABOUT_TAGS_DURATION_SCALAR: number;
  ABOUT_TAGS_STAGGER_SCALAR: number;
  ABOUT_AVATAR_DELAY_SCALAR: number;
  ABOUT_AVATAR_DURATION_SCALAR: number;
  ABOUT_AVATAR_EXIT_SCALAR: number;

  // Stat tracker
  STAT_TRACKER_ANIMATE_STAGGER_SCALAR: number;
  STAT_TRACKER_EXIT_STAGGER_SCALAR: number;
  STAT_TRACKER_BLOCK_DURATION_SCALAR: number;
  STAT_TRACKER_BLOCK_DELAY_SCALAR: number;

  // Components
  BORDER_BOX_ANIMATE_SCALAR: number;
  BORDER_BOX_EXIT_SCALAR: number;
  ANIMATED_LINE_SCALAR: number;
  ICON_ANIMATE_SCALAR: number;
  ICON_EXIT_SCALAR: number;
  COMMON_EXIT_SCALAR: number;

  // Loading
  LOADING_PAGE_DURATION_SCALAR: number;
  LOADING_PAGE_DELAY_SCALAR: number;
  LOADING_EXIT_DURATION_SCALAR: number;
  LOADING_EXIT_DELAY_SCALAR: number;

  // Map viewer
  MAP_CONTENT_SCALAR: number;
  MAP_EXIT_SCALAR: number;
  MAP_BLURB_DURATION_SCALAR: number;
  MAP_BLURB_STAGGER_SCALAR: number;
  MAP_BLURB_EXIT_SCALAR: number;
  MAP_SLIDER_DURATION_SCALAR: number;
  MAP_SLIDER_STAGGER_SCALAR: number;
  MAP_SLIDER_EXIT_DURATION_SCALAR: number;
  MAP_SLIDER_EXIT_STAGGER_SCALAR: number;

  // Projects page
  PROJECTS_STAGGER_SCALAR: number;
  PROJECTS_ENTRY_SCALAR: number;
  PROJECTS_EXIT_SCALAR: number;
  PROJECTS_TITLE_STAGGER_SCALAR: number;

  // Experience page
  EXPERIENCE_STAGGER_SCALAR: number;
  EXPERIENCE_TITLE_STAGGER_SCALAR: number;

  // Home page
  HOME_MENU_STAGGER_SCALAR: number;

  // Scene/Canvas
  SCENE_CLOSE_BUTTON_DELAY_SCALAR: number;
  SCENE_CLOSE_BUTTON_DURATION_SCALAR: number;
  SCENE_CLOSE_BUTTON_EXIT_SCALAR: number;
};
