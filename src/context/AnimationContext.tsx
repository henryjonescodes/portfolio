import { createContext, useContext, ReactNode } from "react";
import { useControls, folder } from "leva";
import {
  ANIMATION_DURATIONS,
  ANIMATION_SPRINGS,
  DEBOUNCE_DELAYS,
  LOADING_TIMEOUTS,
} from "@config/animations";

/**
 * Animation context providing access to all timing constants with optional Leva control overrides.
 *
 * In debug mode (?debug=true), all animation timings can be adjusted in real-time via Leva panel.
 * Includes a global speed multiplier that scales all duration values proportionally.
 */

type AnimationConfig = {
  durations: typeof ANIMATION_DURATIONS;
  springs: typeof ANIMATION_SPRINGS;
  debounce: typeof DEBOUNCE_DELAYS;
  loading: typeof LOADING_TIMEOUTS;
  speedMultiplier: number;
};

const AnimationContext = createContext<AnimationConfig | undefined>(undefined);

export function AnimationProvider({ children }: { children: ReactNode }) {
  // Create Leva controls for all animation constants
  const controls = useControls({
    "Animation System": folder(
      {
        // Global speed multiplier
        speedMultiplier: {
          value: 1.0,
          min: 0.1,
          max: 3.0,
          step: 0.1,
          label: "Global Speed Multiplier",
          hint: "Multiply all animation speeds (2 = twice as fast)",
        },

        // Page transitions folder
        ...folder(
          {
            PAGE_FADE_IN: {
              value: ANIMATION_DURATIONS.PAGE_FADE_IN,
              min: 0,
              max: 2,
              step: 0.05,
              label: "Page Fade In (s)",
              hint: "Duration for page to fade in after route change",
            },
            PAGE_FADE_OUT: {
              value: ANIMATION_DURATIONS.PAGE_FADE_OUT,
              min: 0,
              max: 1,
              step: 0.05,
              label: "Page Fade Out (s)",
              hint: "Duration for page to fade out before route change",
            },
            PAGE_ENTER_DELAY: {
              value: ANIMATION_DURATIONS.PAGE_ENTER_DELAY,
              min: 0,
              max: 1,
              step: 0.05,
              label: "Page Enter Delay (s)",
              hint: "Wait before starting fade in (allows exit to complete)",
            },
            PAGE_FIRST_LOAD_DELAY: {
              value: ANIMATION_DURATIONS.PAGE_FIRST_LOAD_DELAY,
              min: 0,
              max: 2,
              step: 0.1,
              label: "First Load Delay (s)",
              hint: "Delay before animating page on first load",
            },
            PAGE_DELAY_CHILDREN: {
              value: ANIMATION_DURATIONS.PAGE_DELAY_CHILDREN,
              min: 0,
              max: 1,
              step: 0.05,
              label: "Page Children Delay (s)",
              hint: "Delay before animating child elements",
            },
            PAGE_FIRST_LOAD_DELAY_CHILDREN: {
              value: ANIMATION_DURATIONS.PAGE_FIRST_LOAD_DELAY_CHILDREN,
              min: 0,
              max: 1,
              step: 0.05,
              label: "First Load Children Delay (s)",
              hint: "Delay before animating children on first load",
            },
          },
          { collapsed: true }
        ),

        // Navigation animations
        ...folder(
          {
            NAV_ITEM_FADE: {
              value: ANIMATION_DURATIONS.NAV_ITEM_FADE,
              min: 0,
              max: 2,
              step: 0.05,
              label: "Nav Item Fade (s)",
              hint: "Duration for navigation items to fade in",
            },
            NAV_ITEM_DELAY: {
              value: ANIMATION_DURATIONS.NAV_ITEM_DELAY,
              min: 0,
              max: 2,
              step: 0.05,
              label: "Nav Item Delay (s)",
              hint: "Delay before navigation items appear",
            },
          },
          { collapsed: true }
        ),

        // Text effects
        ...folder(
          {
            TYPEWRITER_CHAR_DURATION: {
              value: ANIMATION_DURATIONS.TYPEWRITER_CHAR_DURATION,
              min: 0,
              max: 1,
              step: 0.01,
              label: "Typewriter Char Duration (s)",
              hint: "How long each character takes to appear",
            },
            TYPEWRITER_CHAR_STAGGER: {
              value: ANIMATION_DURATIONS.TYPEWRITER_CHAR_STAGGER,
              min: 0,
              max: 0.2,
              step: 0.005,
              label: "Typewriter Stagger (s)",
              hint: "Delay between each character appearing",
            },
          },
          { collapsed: true }
        ),

        // Spring physics
        ...folder(
          {
            BUTTON_TENSION: {
              value: ANIMATION_SPRINGS.BUTTON_PRESS.tension,
              min: 50,
              max: 500,
              step: 10,
              label: "Button Spring Tension",
              hint: "Higher = snappier button press (default: 170)",
            },
            BUTTON_FRICTION: {
              value: ANIMATION_SPRINGS.BUTTON_PRESS.friction,
              min: 10,
              max: 100,
              step: 1,
              label: "Button Spring Friction",
              hint: "Higher = less bouncy (default: 26)",
            },
            KNOB_TENSION: {
              value: ANIMATION_SPRINGS.KNOB_ROTATION.tension,
              min: 50,
              max: 500,
              step: 10,
              label: "Knob Spring Tension",
              hint: "Higher = snappier knob rotation (default: 280)",
            },
            KNOB_FRICTION: {
              value: ANIMATION_SPRINGS.KNOB_ROTATION.friction,
              min: 10,
              max: 100,
              step: 1,
              label: "Knob Spring Friction",
              hint: "Higher = less bouncy (default: 60)",
            },
          },
          { collapsed: true }
        ),

        // Performance delays
        ...folder(
          {
            COLOR_UPDATE_DEBOUNCE_MS: {
              value: DEBOUNCE_DELAYS.COLOR_UPDATE_MS,
              min: 0,
              max: 500,
              step: 50,
              label: "Color Update Debounce (ms)",
              hint: "Delay before updating CSS after knob rotation",
            },
            RESIZE_DEBOUNCE_MS: {
              value: DEBOUNCE_DELAYS.RESIZE_MS,
              min: 0,
              max: 500,
              step: 50,
              label: "Resize Debounce (ms)",
              hint: "Delay before recalculating layout after resize",
            },
          },
          { collapsed: true }
        ),

        // Loading timeouts
        ...folder(
          {
            AUTO_TIMEOUT_MS: {
              value: LOADING_TIMEOUTS.AUTO_TIMEOUT_MS,
              min: 1000,
              max: 30000,
              step: 1000,
              label: "Auto Timeout (ms)",
              hint: "Time before falling back to lite mode (automatic)",
            },
            USER_INITIATED_TIMEOUT_MS: {
              value: LOADING_TIMEOUTS.USER_INITIATED_TIMEOUT_MS,
              min: 5000,
              max: 60000,
              step: 5000,
              label: "User Initiated Timeout (ms)",
              hint: "Time before fallback when user clicks load 3D",
            },
          },
          { collapsed: true }
        ),
      },
      { collapsed: true }
    ),
  });

  // Apply speed multiplier to all duration values
  const scaledDurations = Object.fromEntries(
    Object.entries(controls).map(([key, value]) => {
      // Only scale duration values (seconds), not spring physics or delays
      if (
        key.startsWith("PAGE_") ||
        key.startsWith("NAV_") ||
        key.startsWith("TYPEWRITER_")
      ) {
        return [key, value / controls.speedMultiplier];
      }
      return [key, value];
    })
  ) as Record<string, number>;

  // Build configuration object matching original structure
  const config: AnimationConfig = {
    durations: {
      PAGE_FADE_IN: scaledDurations.PAGE_FADE_IN,
      PAGE_FADE_OUT: scaledDurations.PAGE_FADE_OUT,
      PAGE_ENTER_DELAY: scaledDurations.PAGE_ENTER_DELAY,
      PAGE_FIRST_LOAD_DELAY: scaledDurations.PAGE_FIRST_LOAD_DELAY,
      PAGE_DELAY_CHILDREN: scaledDurations.PAGE_DELAY_CHILDREN,
      PAGE_FIRST_LOAD_DELAY_CHILDREN:
        scaledDurations.PAGE_FIRST_LOAD_DELAY_CHILDREN,
      NAV_ITEM_FADE: scaledDurations.NAV_ITEM_FADE,
      NAV_ITEM_DELAY: scaledDurations.NAV_ITEM_DELAY,
      TYPEWRITER_CHAR_DURATION: scaledDurations.TYPEWRITER_CHAR_DURATION,
      TYPEWRITER_CHAR_STAGGER: scaledDurations.TYPEWRITER_CHAR_STAGGER,
    },
    springs: {
      BUTTON_PRESS: {
        tension: controls.BUTTON_TENSION,
        friction: controls.BUTTON_FRICTION,
        mass: 1,
      },
      KNOB_ROTATION: {
        tension: controls.KNOB_TENSION,
        friction: controls.KNOB_FRICTION,
        mass: 1,
      },
      CAMERA_ZOOM: ANIMATION_SPRINGS.CAMERA_ZOOM, // Not exposed in Leva yet
    },
    debounce: {
      COLOR_UPDATE_MS: controls.COLOR_UPDATE_DEBOUNCE_MS,
      RESIZE_MS: controls.RESIZE_DEBOUNCE_MS,
    },
    loading: {
      AUTO_TIMEOUT_MS: controls.AUTO_TIMEOUT_MS,
      USER_INITIATED_TIMEOUT_MS: controls.USER_INITIATED_TIMEOUT_MS,
    },
    speedMultiplier: controls.speedMultiplier,
  };

  return (
    <AnimationContext.Provider value={config}>
      {children}
    </AnimationContext.Provider>
  );
}

/**
 * Hook to access animation timing constants.
 * Falls back to defaults if used outside provider.
 */
export function useAnimations(): AnimationConfig {
  const context = useContext(AnimationContext);

  if (!context) {
    // Fallback to defaults if used outside provider
    return {
      durations: ANIMATION_DURATIONS,
      springs: ANIMATION_SPRINGS,
      debounce: DEBOUNCE_DELAYS,
      loading: LOADING_TIMEOUTS,
      speedMultiplier: 1,
    };
  }

  return context;
}
