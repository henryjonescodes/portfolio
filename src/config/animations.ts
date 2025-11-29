/**
 * Centralized animation timing constants.
 *
 * Philosophy:
 * - Fast (0.2-0.3s): Responsive interactions
 * - Medium (0.4-0.6s): Emphasized transitions
 * - Slow (0.8-1.2s): Dramatic effects
 *
 * All durations in SECONDS for Framer Motion consistency.
 * All debounce delays in MILLISECONDS.
 */

export const ANIMATION_DURATIONS = {
  // Page transitions
  PAGE_FADE_IN: 0.5,
  PAGE_FADE_OUT: 0.2,
  PAGE_ENTER_DELAY: 0.1,
  PAGE_FIRST_LOAD_DELAY: 0.5,
  PAGE_DELAY_CHILDREN: 0.2,
  PAGE_FIRST_LOAD_DELAY_CHILDREN: 0.2,

  // Navigation
  NAV_ITEM_FADE: 0.6,
  NAV_ITEM_DELAY: 0.6,

  // Text effects
  TYPEWRITER_CHAR_DURATION: 0.2,
  TYPEWRITER_CHAR_STAGGER: 0.03,
} as const;

/**
 * Spring physics configurations for react-spring and @react-spring/three.
 * Used for 3D object animations with realistic physics.
 */
export const ANIMATION_SPRINGS = {
  // 3D Button press/release
  BUTTON_PRESS: {
    tension: 170,
    friction: 26,
    mass: 1,
  },

  // 3D Knob rotation smoothing
  KNOB_ROTATION: {
    tension: 280,
    friction: 60,
    mass: 1,
  },

  // Camera zoom transitions
  CAMERA_ZOOM: {
    tension: 170,
    friction: 26,
    mass: 1,
  },
} as const;

/**
 * Debounce delays in milliseconds.
 * Prevents excessive function calls during rapid user input.
 */
export const DEBOUNCE_DELAYS = {
  COLOR_UPDATE_MS: 100,
  RESIZE_MS: 150,
} as const;

/**
 * Loading timeouts in milliseconds.
 */
export const LOADING_TIMEOUTS = {
  AUTO_TIMEOUT_MS: 8000,
  USER_INITIATED_TIMEOUT_MS: 30000,
} as const;

/**
 * Calculate total page transition duration.
 * Useful for understanding perceived loading performance.
 */
export function getTotalPageTransitionDuration(): number {
  return (
    ANIMATION_DURATIONS.PAGE_FADE_OUT +
    ANIMATION_DURATIONS.PAGE_ENTER_DELAY +
    ANIMATION_DURATIONS.PAGE_FADE_IN
  );
}
