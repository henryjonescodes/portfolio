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

// ============================================================================
// MASTER BASE
// ============================================================================

/** Master animation speed - modify this one value to slow/speed ALL animations */
export const ANIMATION_MASTER_BASE = 0.3;

// Default scalars for category bases
export const DEFAULT_CATEGORY_SCALARS = {
  PAGE_BASE_SCALAR: 1.67,      // ~0.5s
  MODAL_BASE_SCALAR: 1.0,      // ~0.3s
  NAV_BASE_SCALAR: 2.0,        // ~0.6s
  TEXT_BASE_SCALAR: 0.67,      // ~0.2s
  COMPONENT_BASE_SCALAR: 1.0,  // ~0.3s
};

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

// Default bases for non-Leva usage
export const DEFAULT_ANIMATION_BASES = computeAnimationBases(
  ANIMATION_MASTER_BASE,
  DEFAULT_CATEGORY_SCALARS
);

// ============================================================================
// DEFAULT TRANSITION SCALARS
// ============================================================================

export const DEFAULT_TRANSITION_SCALARS = {
  // Page transitions
  PAGE_FADE_IN_SCALAR: 1.0,
  PAGE_FADE_OUT_SCALAR: 0.4,
  PAGE_ENTER_DELAY_SCALAR: 0.2,
  PAGE_FIRST_LOAD_DELAY_SCALAR: 1.0,
  PAGE_CHILDREN_DELAY_SCALAR: 0.4,
  PAGE_FIRST_LOAD_CHILDREN_DELAY_SCALAR: 0.4,

  // Page contents (inner content fade)
  PAGE_CONTENTS_FADE_IN_SCALAR: 0.2,
  PAGE_CONTENTS_FADE_OUT_SCALAR: 0.2,
  PAGE_CONTENTS_STAGGER_SCALAR: 1.0,
  PAGE_CONTENTS_FULLSCREEN_DELAY_SCALAR: 0.6,
  PAGE_CONTENTS_EMBEDDED_DELAY_SCALAR: 0.6,

  // Modal animations
  MODAL_CONTAINER_DURATION_SCALAR: 1.0,
  MODAL_NAVBAR_DURATION_SCALAR: 0.67,
  MODAL_NAVBAR_DELAY_SCALAR: 0.33,
  MODAL_NAVBAR_LINE_DURATION_SCALAR: 1.5,
  MODAL_NAVBAR_CHILDREN_DELAY_SCALAR: 3.33,
  MODAL_CONTENT_DURATION_SCALAR: 1.0,
  MODAL_LAYOUT_DELAY_SCALAR: 0.67,
  MODAL_BLURB_DELAY_SCALAR: 1.67,
  MODAL_TEXT_PAINT_DURATION_SCALAR: 1.67,
  MODAL_TEXT_STAGGER_SCALAR: 5.7,
  MODAL_HEADER_TEXT_DURATION_SCALAR: 6.67,
  MODAL_HEADER_TEXT_DELAY_SCALAR: 6.67,
  MODAL_DATE_DURATION_SCALAR: 1.1,
  MODAL_OVERLAY_DURATION_SCALAR: 1.0,

  // Navigation
  NAV_ITEM_FADE_SCALAR: 1.0,
  NAV_ITEM_DELAY_SCALAR: 1.0,
  NAV_STAGGER_SCALAR: 0.33,
  NAV_EXIT_SCALAR: 0.5,
  NAV_MINIMAL_DELAY_SCALAR: 1.17,
  NAV_MINIMAL_DURATION_SCALAR: 0.83,
  NAV_MINIMAL_EXIT_SCALAR: 0.5,
  NAV_HOME_FIRST_LOAD_DELAY_SCALAR: 4.33,
  NAV_ITEM_BORDER_DURATION_SCALAR: 0.83,
  NAV_ITEM_BORDER_DELAY_SCALAR: 2.5,
  NAV_ITEM_BORDER_EXIT_SCALAR: 0.5,
  NAV_BUTTON_ACTIVE_SCALAR: 0.33,
  NAV_BUTTON_INACTIVE_SCALAR: 0.5,

  // Text effects
  TYPEWRITER_CHAR_SCALAR: 1.0,
  TYPEWRITER_STAGGER_SCALAR: 0.15,
  TYPEWRITER_EXIT_SCALAR: 1.5,
  NAV_ITEM_TEXT_STAGGER_SCALAR: 0.15,
  STAT_TRACKER_TEXT_STAGGER_SCALAR: 0.15,

  // About page
  ABOUT_HERO_DURATION_SCALAR: 1.0,
  ABOUT_HERO_STAGGER_SCALAR: 0.33,
  ABOUT_MAP_DURATION_SCALAR: 1.0,
  ABOUT_MAP_STAGGER_SCALAR: 0.33,
  ABOUT_SOCIALS_DELAY_SCALAR: 5.0,
  ABOUT_SOCIALS_DELAY_CHILDREN_SCALAR: 5.0,
  ABOUT_SOCIALS_DURATION_SCALAR: 1.0,
  ABOUT_SOCIALS_STAGGER_SCALAR: 1.33,
  ABOUT_STATS_DURATION_SCALAR: 1.0,
  ABOUT_STATS_STAGGER_SCALAR: 1.33,
  ABOUT_TAGS_DELAY_SCALAR: 3.33,
  ABOUT_TAGS_DELAY_CHILDREN_SCALAR: 3.33,
  ABOUT_TAGS_DURATION_SCALAR: 1.0,
  ABOUT_TAGS_STAGGER_SCALAR: 1.33,
  ABOUT_AVATAR_DELAY_SCALAR: 5.0,
  ABOUT_AVATAR_DURATION_SCALAR: 8.33,
  ABOUT_AVATAR_EXIT_SCALAR: 1.0,

  // Stat tracker
  STAT_TRACKER_ANIMATE_STAGGER_SCALAR: 1.33,
  STAT_TRACKER_EXIT_STAGGER_SCALAR: 0.33,
  STAT_TRACKER_BLOCK_DURATION_SCALAR: 0.23,
  STAT_TRACKER_BLOCK_DELAY_SCALAR: 0.23,

  // Components
  BORDER_BOX_ANIMATE_SCALAR: 5.0,
  BORDER_BOX_EXIT_SCALAR: 3.33,
  ANIMATED_LINE_SCALAR: 3.33,
  ICON_ANIMATE_SCALAR: 1.67,
  ICON_EXIT_SCALAR: 1.0,
  COMMON_EXIT_SCALAR: 1.0,

  // Loading
  LOADING_PAGE_DURATION_SCALAR: 1.67,
  LOADING_PAGE_DELAY_SCALAR: 0,
  LOADING_EXIT_DURATION_SCALAR: 1.0,
  LOADING_EXIT_DELAY_SCALAR: 6.5,

  // Map viewer
  MAP_CONTENT_SCALAR: 7.67,
  MAP_EXIT_SCALAR: 1.0,
  MAP_BLURB_DURATION_SCALAR: 1.0,
  MAP_BLURB_STAGGER_SCALAR: 0.33,
  MAP_BLURB_EXIT_SCALAR: 0,
  MAP_SLIDER_DURATION_SCALAR: 0.67,
  MAP_SLIDER_STAGGER_SCALAR: 0.17,
  MAP_SLIDER_EXIT_DURATION_SCALAR: 0.67,
  MAP_SLIDER_EXIT_STAGGER_SCALAR: 0.07,

  // Projects page
  PROJECTS_STAGGER_SCALAR: 0.33,
  PROJECTS_ENTRY_SCALAR: 7.67,
  PROJECTS_EXIT_SCALAR: 1.0,
  PROJECTS_TITLE_STAGGER_SCALAR: 0.25,

  // Experience page
  EXPERIENCE_STAGGER_SCALAR: 0.33,
  EXPERIENCE_TITLE_STAGGER_SCALAR: 0.25,

  // Home page
  HOME_MENU_STAGGER_SCALAR: 0.33,

  // Scene/Canvas
  SCENE_CLOSE_BUTTON_DELAY_SCALAR: 5.0,
  SCENE_CLOSE_BUTTON_DURATION_SCALAR: 6.67,
  SCENE_CLOSE_BUTTON_EXIT_SCALAR: 3.33,
};

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

    PAGE_FADE_IN: {  // Main page container fade in
      duration: bases.PAGE_BASE * scalars.PAGE_FADE_IN_SCALAR,
    },

    PAGE_FADE_OUT: {  // Main page container fade out
      duration: bases.PAGE_BASE * scalars.PAGE_FADE_OUT_SCALAR,
    },

    PAGE_ENTER: {  // Delay before page enters
      delay: bases.PAGE_BASE * scalars.PAGE_ENTER_DELAY_SCALAR,
    },

    PAGE_FIRST_LOAD: {  // First page load animation
      delay: bases.PAGE_BASE * scalars.PAGE_FIRST_LOAD_DELAY_SCALAR,
    },

    PAGE_CHILDREN: {  // Page child elements stagger
      delayChildren: bases.PAGE_BASE * scalars.PAGE_CHILDREN_DELAY_SCALAR,
    },

    PAGE_FIRST_LOAD_CHILDREN: {  // First load child elements
      delayChildren: bases.PAGE_BASE * scalars.PAGE_FIRST_LOAD_CHILDREN_DELAY_SCALAR,
    },

    // Complete swappable page transition objects
    PAGE_ANIMATE_FIRST_LOAD: {  // Complete transition for first page load
      duration: 0,
      delay: bases.PAGE_BASE * scalars.PAGE_FIRST_LOAD_DELAY_SCALAR,
      delayChildren: bases.PAGE_BASE * scalars.PAGE_FIRST_LOAD_CHILDREN_DELAY_SCALAR,
      when: "beforeChildren" as const,
    },

    PAGE_ANIMATE_NORMAL: {  // Complete transition for normal page navigation
      duration: bases.PAGE_BASE * scalars.PAGE_FADE_IN_SCALAR,
      delay: bases.PAGE_BASE * scalars.PAGE_ENTER_DELAY_SCALAR,
      delayChildren: bases.PAGE_BASE * scalars.PAGE_CHILDREN_DELAY_SCALAR,
      when: "beforeChildren" as const,
    },

    PAGE_EXIT: {  // Complete transition for page exit
      duration: bases.PAGE_BASE * scalars.PAGE_FADE_OUT_SCALAR,
      when: "beforeChildren" as const,
    },

    // ========================================
    // MODAL ANIMATIONS
    // ========================================

    MODAL_CONTAINER: {  // Modal container layout transition
      duration: bases.MODAL_BASE * scalars.MODAL_CONTAINER_DURATION_SCALAR,
      ease: "easeInOut",
    },

    MODAL_NAVBAR: {  // Modal navigation bar
      duration: bases.MODAL_BASE * scalars.MODAL_NAVBAR_DURATION_SCALAR,
      delay: bases.MODAL_BASE * scalars.MODAL_NAVBAR_DELAY_SCALAR,
    },

    MODAL_NAVBAR_LINE: {  // Modal navbar animated line
      duration: bases.MODAL_BASE * scalars.MODAL_NAVBAR_LINE_DURATION_SCALAR,
    },

    MODAL_NAVBAR_CHILDREN: {  // Modal navbar child elements
      delayChildren: bases.MODAL_BASE * scalars.MODAL_NAVBAR_CHILDREN_DELAY_SCALAR,
    },

    MODAL_CONTENT: {  // Modal body content
      duration: bases.MODAL_BASE * scalars.MODAL_CONTENT_DURATION_SCALAR,
    },

    MODAL_LAYOUT: {  // Modal layout animation delay
      delay: bases.MODAL_BASE * scalars.MODAL_LAYOUT_DELAY_SCALAR,
    },

    MODAL_BLURB: {  // Modal blurb text reveal
      delay: bases.MODAL_BASE * scalars.MODAL_BLURB_DELAY_SCALAR,
    },

    MODAL_TEXT_PAINT: {  // Modal text paint-in effect
      duration: bases.MODAL_BASE * scalars.MODAL_TEXT_PAINT_DURATION_SCALAR,
    },

    MODAL_TEXT_STAGGER: {  // Modal text element stagger
      staggerChildren: bases.MODAL_BASE * scalars.MODAL_TEXT_STAGGER_SCALAR,
    },

    MODAL_HEADER_TEXT: {  // Modal header text animation
      duration: bases.MODAL_BASE * scalars.MODAL_HEADER_TEXT_DURATION_SCALAR,
      delay: bases.MODAL_BASE * scalars.MODAL_HEADER_TEXT_DELAY_SCALAR,
    },

    MODAL_DATE: {  // Modal date field (when opening)
      duration: bases.MODAL_BASE * scalars.MODAL_DATE_DURATION_SCALAR,
    },

    MODAL_OVERLAY: {  // Modal backdrop overlay
      duration: bases.MODAL_BASE * scalars.MODAL_OVERLAY_DURATION_SCALAR,
    },

    // ========================================
    // NAVIGATION
    // ========================================

    NAV_ITEM_FADE: {  // Navigation item fade in/out
      duration: bases.NAV_BASE * scalars.NAV_ITEM_FADE_SCALAR,
    },

    NAV_ITEM_DELAY: {  // Navigation item appearance delay
      delay: bases.NAV_BASE * scalars.NAV_ITEM_DELAY_SCALAR,
    },

    NAV_STAGGER: {  // Navigation items stagger
      staggerChildren: bases.NAV_BASE * scalars.NAV_STAGGER_SCALAR,
    },

    NAV_EXIT: {  // Navigation exit animation
      duration: bases.NAV_BASE * scalars.NAV_EXIT_SCALAR,
    },

    NAV_MINIMAL: {  // Minimal navbar state
      delay: bases.NAV_BASE * scalars.NAV_MINIMAL_DELAY_SCALAR,
      duration: bases.NAV_BASE * scalars.NAV_MINIMAL_DURATION_SCALAR,
    },

    NAV_MINIMAL_EXIT: {  // Minimal navbar exit
      duration: bases.NAV_BASE * scalars.NAV_MINIMAL_EXIT_SCALAR,
    },

    NAV_HOME_FIRST_LOAD: {  // Home page nav first load
      delayChildren: bases.NAV_BASE * scalars.NAV_HOME_FIRST_LOAD_DELAY_SCALAR,
    },

    NAV_ITEM_BORDER: {  // Nav item border animation
      duration: bases.NAV_BASE * scalars.NAV_ITEM_BORDER_DURATION_SCALAR,
      delay: bases.NAV_BASE * scalars.NAV_ITEM_BORDER_DELAY_SCALAR,
    },

    NAV_ITEM_BORDER_EXIT: {  // Nav item border exit
      duration: bases.NAV_BASE * scalars.NAV_ITEM_BORDER_EXIT_SCALAR,
    },

    NAV_BUTTON_ACTIVE: {  // Active nav button state
      duration: bases.NAV_BASE * scalars.NAV_BUTTON_ACTIVE_SCALAR,
    },

    NAV_BUTTON_INACTIVE: {  // Inactive nav button state
      duration: bases.NAV_BASE * scalars.NAV_BUTTON_INACTIVE_SCALAR,
    },

    // ========================================
    // TEXT EFFECTS
    // ========================================

    TYPEWRITER_CHAR: {  // Typewriter character duration
      duration: bases.TEXT_BASE * scalars.TYPEWRITER_CHAR_SCALAR,
    },

    TYPEWRITER_STAGGER: {  // Typewriter character stagger
      staggerChildren: bases.TEXT_BASE * scalars.TYPEWRITER_STAGGER_SCALAR,
    },

    TYPEWRITER_EXIT: {  // Typewriter text exit
      duration: bases.TEXT_BASE * scalars.TYPEWRITER_EXIT_SCALAR,
    },

    NAV_ITEM_TEXT_STAGGER: {  // Nav item text character stagger
      staggerChildren: bases.TEXT_BASE * scalars.NAV_ITEM_TEXT_STAGGER_SCALAR,
    },

    STAT_TRACKER_TEXT_STAGGER: {  // Stat tracker text stagger
      staggerChildren: bases.TEXT_BASE * scalars.STAT_TRACKER_TEXT_STAGGER_SCALAR,
    },

    // ========================================
    // ABOUT PAGE
    // ========================================

    ABOUT_HERO: {  // About page hero section
      duration: bases.COMPONENT_BASE * scalars.ABOUT_HERO_DURATION_SCALAR,
      staggerChildren: bases.COMPONENT_BASE * scalars.ABOUT_HERO_STAGGER_SCALAR,
    },

    ABOUT_MAP: {  // About page map viewer
      duration: bases.COMPONENT_BASE * scalars.ABOUT_MAP_DURATION_SCALAR,
      staggerChildren: bases.COMPONENT_BASE * scalars.ABOUT_MAP_STAGGER_SCALAR,
    },

    ABOUT_SOCIALS: {  // About page social links
      delay: bases.COMPONENT_BASE * scalars.ABOUT_SOCIALS_DELAY_SCALAR,
      delayChildren: bases.COMPONENT_BASE * scalars.ABOUT_SOCIALS_DELAY_CHILDREN_SCALAR,
      duration: bases.COMPONENT_BASE * scalars.ABOUT_SOCIALS_DURATION_SCALAR,
      staggerChildren: bases.COMPONENT_BASE * scalars.ABOUT_SOCIALS_STAGGER_SCALAR,
    },

    ABOUT_STATS: {  // About page statistics section
      duration: bases.COMPONENT_BASE * scalars.ABOUT_STATS_DURATION_SCALAR,
      staggerChildren: bases.COMPONENT_BASE * scalars.ABOUT_STATS_STAGGER_SCALAR,
    },

    ABOUT_TAGS: {  // About page skill tags
      delay: bases.COMPONENT_BASE * scalars.ABOUT_TAGS_DELAY_SCALAR,
      delayChildren: bases.COMPONENT_BASE * scalars.ABOUT_TAGS_DELAY_CHILDREN_SCALAR,
      duration: bases.COMPONENT_BASE * scalars.ABOUT_TAGS_DURATION_SCALAR,
      staggerChildren: bases.COMPONENT_BASE * scalars.ABOUT_TAGS_STAGGER_SCALAR,
    },

    ABOUT_AVATAR: {  // About page avatar image
      delay: bases.COMPONENT_BASE * scalars.ABOUT_AVATAR_DELAY_SCALAR,
      duration: bases.COMPONENT_BASE * scalars.ABOUT_AVATAR_DURATION_SCALAR,
    },

    ABOUT_AVATAR_EXIT: {  // About page avatar exit
      duration: bases.COMPONENT_BASE * scalars.ABOUT_AVATAR_EXIT_SCALAR,
    },

    // ========================================
    // STAT TRACKER
    // ========================================

    STAT_TRACKER_ANIMATE: {  // Stat tracker appear animation
      staggerChildren: bases.COMPONENT_BASE * scalars.STAT_TRACKER_ANIMATE_STAGGER_SCALAR,
    },

    STAT_TRACKER_EXIT: {  // Stat tracker exit animation
      staggerChildren: bases.COMPONENT_BASE * scalars.STAT_TRACKER_EXIT_STAGGER_SCALAR,
    },

    STAT_TRACKER_BLOCK: {  // Individual stat block
      duration: bases.COMPONENT_BASE * scalars.STAT_TRACKER_BLOCK_DURATION_SCALAR,
      delay: bases.COMPONENT_BASE * scalars.STAT_TRACKER_BLOCK_DELAY_SCALAR,
    },

    // ========================================
    // COMPONENTS
    // ========================================

    BORDER_BOX_ANIMATE: {  // AnimatedBorderBox appear
      duration: bases.COMPONENT_BASE * scalars.BORDER_BOX_ANIMATE_SCALAR,
    },

    BORDER_BOX_EXIT: {  // AnimatedBorderBox exit
      duration: bases.COMPONENT_BASE * scalars.BORDER_BOX_EXIT_SCALAR,
    },

    ANIMATED_LINE: {  // AnimatedLine component
      duration: bases.COMPONENT_BASE * scalars.ANIMATED_LINE_SCALAR,
    },

    ICON_ANIMATE: {  // Icon fade in
      duration: bases.COMPONENT_BASE * scalars.ICON_ANIMATE_SCALAR,
    },

    ICON_EXIT: {  // Icon fade out
      duration: bases.COMPONENT_BASE * scalars.ICON_EXIT_SCALAR,
    },

    COMMON_EXIT: {  // Common exit animation
      duration: bases.COMPONENT_BASE * scalars.COMMON_EXIT_SCALAR,
    },

    // ========================================
    // LOADING
    // ========================================

    LOADING_PAGE: {  // Loading screen page transition
      duration: bases.COMPONENT_BASE * scalars.LOADING_PAGE_DURATION_SCALAR,
      delay: scalars.LOADING_PAGE_DELAY_SCALAR,
    },

    LOADING_EXIT: {  // Loading screen exit
      duration: bases.COMPONENT_BASE * scalars.LOADING_EXIT_DURATION_SCALAR,
      delay: bases.COMPONENT_BASE * scalars.LOADING_EXIT_DELAY_SCALAR,
    },

    // ========================================
    // MAP VIEWER
    // ========================================

    MAP_CONTENT: {  // Map viewer content
      duration: bases.COMPONENT_BASE * scalars.MAP_CONTENT_SCALAR,
    },

    MAP_EXIT: {  // Map viewer exit
      duration: bases.COMPONENT_BASE * scalars.MAP_EXIT_SCALAR,
    },

    MAP_BLURB: {  // Map blurb popup
      duration: bases.COMPONENT_BASE * scalars.MAP_BLURB_DURATION_SCALAR,
      staggerChildren: bases.COMPONENT_BASE * scalars.MAP_BLURB_STAGGER_SCALAR,
    },

    MAP_BLURB_EXIT: {  // Map blurb exit (instant)
      duration: scalars.MAP_BLURB_EXIT_SCALAR,
    },

    MAP_SLIDER: {  // Map slider animation
      duration: bases.COMPONENT_BASE * scalars.MAP_SLIDER_DURATION_SCALAR,
      staggerChildren: bases.COMPONENT_BASE * scalars.MAP_SLIDER_STAGGER_SCALAR,
    },

    MAP_SLIDER_EXIT: {  // Map slider exit
      duration: bases.COMPONENT_BASE * scalars.MAP_SLIDER_EXIT_DURATION_SCALAR,
      staggerChildren: bases.COMPONENT_BASE * scalars.MAP_SLIDER_EXIT_STAGGER_SCALAR,
    },

    // ========================================
    // PROJECTS PAGE
    // ========================================

    PROJECTS_STAGGER: {  // Projects list stagger
      staggerChildren: bases.COMPONENT_BASE * scalars.PROJECTS_STAGGER_SCALAR,
    },

    PROJECTS_ENTRY: {  // Project entry animation
      duration: bases.COMPONENT_BASE * scalars.PROJECTS_ENTRY_SCALAR,
    },

    PROJECTS_EXIT: {  // Projects page exit
      duration: bases.COMPONENT_BASE * scalars.PROJECTS_EXIT_SCALAR,
    },

    PROJECTS_TITLE_STAGGER: {  // Project title text stagger
      staggerChildren: bases.TEXT_BASE * scalars.PROJECTS_TITLE_STAGGER_SCALAR,
    },

    // ========================================
    // EXPERIENCE PAGE
    // ========================================

    EXPERIENCE_STAGGER: {  // Experience list stagger
      staggerChildren: bases.COMPONENT_BASE * scalars.EXPERIENCE_STAGGER_SCALAR,
    },

    EXPERIENCE_TITLE_STAGGER: {  // Experience title stagger
      staggerChildren: bases.TEXT_BASE * scalars.EXPERIENCE_TITLE_STAGGER_SCALAR,
    },

    // ========================================
    // HOME PAGE
    // ========================================

    HOME_MENU_STAGGER: {  // Home menu items stagger
      staggerChildren: bases.COMPONENT_BASE * scalars.HOME_MENU_STAGGER_SCALAR,
    },

    // ========================================
    // SCENE / CANVAS
    // ========================================

    SCENE_CLOSE_BUTTON: {  // 3D scene close button
      delay: bases.COMPONENT_BASE * scalars.SCENE_CLOSE_BUTTON_DELAY_SCALAR,
      duration: bases.COMPONENT_BASE * scalars.SCENE_CLOSE_BUTTON_DURATION_SCALAR,
    },

    SCENE_CLOSE_BUTTON_EXIT: {  // 3D scene close button exit
      duration: bases.COMPONENT_BASE * scalars.SCENE_CLOSE_BUTTON_EXIT_SCALAR,
    },
  };
}

// Default transitions for non-Leva usage
export const DEFAULT_TRANSITIONS = buildTransitions(
  DEFAULT_ANIMATION_BASES,
  DEFAULT_TRANSITION_SCALARS
);

// ============================================================================
// SPRING PHYSICS (for react-spring and @react-spring/three)
// ============================================================================

export const ANIMATION_SPRINGS: Record<string, SpringConfig> = {
  BUTTON_PRESS: {  // 3D button press/release physics
    tension: 170,
    friction: 26,
    mass: 1,
  },

  KNOB_ROTATION: {  // 3D knob rotation smoothing
    tension: 280,
    friction: 60,
    mass: 1,
  },

  CAMERA_ZOOM: {  // Camera zoom transition physics
    tension: 170,
    friction: 26,
    mass: 1,
  },
};

// ============================================================================
// DEBOUNCE & PERFORMANCE
// ============================================================================

export const DEBOUNCE_DELAYS = {
  COLOR_UPDATE_MS: 100,   // Color knob update debounce (milliseconds)
  RESIZE_MS: 150,         // Window resize debounce (milliseconds)
};

export const LOADING_TIMEOUTS = {
  AUTO_TIMEOUT_MS: 8000,              // Auto-fallback to lite mode (milliseconds)
  USER_INITIATED_TIMEOUT_MS: 30000,   // User-initiated timeout (milliseconds)
};

export const MAP_SLIDER_CASCADE_DURATION_MS = 600;  // Map slider cascade timing (milliseconds)

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/** Calculate total page transition duration */
export function getTotalPageTransitionDuration(
  transitions: ReturnType<typeof buildTransitions>
): number {
  return (
    (transitions.PAGE_FADE_OUT.duration || 0) +
    (transitions.PAGE_ENTER.delay || 0) +
    (transitions.PAGE_FADE_IN.duration || 0)
  );
}
