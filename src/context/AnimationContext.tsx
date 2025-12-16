import { createContext, useContext, ReactNode, useMemo } from "react";
import { useControls, folder } from "leva";
import {
  ANIMATION_SCALAR_CONFIG,
  computeAnimationBases,
  buildTransitions,
  generateLabel,
} from "@config/new-animations";
import type { AnimationBases } from "../types";

type AnimationContextType = {
  TRANSITIONS: ReturnType<typeof buildTransitions>; // Nested structure auto-derived
  BASES: AnimationBases;
  SPRINGS: {
    smooth: { tension: number; friction: number; mass: number };
    bouncy: { tension: number; friction: number; mass: number };
    slow: { tension: number; friction: number; mass: number };
  };
  DEBOUNCE: {
    COLOR_UPDATE: number;
    WINDOW_RESIZE: number;
    SCROLL: number;
  };
  TIMEOUTS: {
    LITE_MODE_FALLBACK: number;
    USER_INITIATED_FALLBACK: number;
  };
  MAP_SLIDER_CASCADE_MS: number;
};

const AnimationContext = createContext<AnimationContextType | undefined>(
  undefined
);

export const AnimationProvider = ({ children }: { children: ReactNode }) => {
  // Build Leva schema from config with auto-generated labels and hints
  const levaSchema = Object.fromEntries(
    Object.entries(ANIMATION_SCALAR_CONFIG).map(([_, section]) => {
      const { _meta, ...scalars } = section;

      // Apply auto-generated labels and append field names to hints
      const scalarsWithLabels = Object.fromEntries(
        Object.entries(scalars).map(([key, scalar]) => {
          // Only generate label with base reference if scalar has a base property
          const label = scalar.label ?? ('base' in scalar ? generateLabel(key, scalar.base) : key);

          // Append field name to existing hint (or use field name if no hint)
          const hint = scalar.hint ? `${scalar.hint} | ${key}` : key;

          const { base, ...levaProps } = scalar as any; // Remove 'base' from Leva props if present
          return [key, { ...levaProps, label, hint }];
        })
      );

      return [
        _meta.title,
        folder(scalarsWithLabels, { collapsed: _meta.collapsed ?? true }),
      ];
    })
  );

  const controls = useControls("Animation System", levaSchema, {
    collapsed: false,
  });

  // Extract category base scalars, spring values, and system constants from controls
  const {
    ANIMATION_MASTER_BASE,
    PAGE_BASE_SCALAR,
    MODAL_BASE_SCALAR,
    NAV_BASE_SCALAR,
    TEXT_BASE_SCALAR,
    COMPONENT_BASE_SCALAR,
    SPRING_SMOOTH_TENSION,
    SPRING_SMOOTH_FRICTION,
    SPRING_SMOOTH_MASS,
    SPRING_BOUNCY_TENSION,
    SPRING_BOUNCY_FRICTION,
    SPRING_BOUNCY_MASS,
    SPRING_SLOW_TENSION,
    SPRING_SLOW_FRICTION,
    SPRING_SLOW_MASS,
    MAP_SLIDER_CASCADE_DURATION_MS,
    DEBOUNCE_COLOR_UPDATE,
    DEBOUNCE_WINDOW_RESIZE,
    DEBOUNCE_SCROLL,
    TIMEOUT_LITE_MODE_FALLBACK,
    TIMEOUT_USER_INITIATED_FALLBACK,
    ...transitionScalars
  } = controls;

  // Compute bases from master + category scalars (memoized separately)
  const bases = useMemo(
    () =>
      computeAnimationBases(ANIMATION_MASTER_BASE as unknown as number, {
        PAGE_BASE_SCALAR: PAGE_BASE_SCALAR as unknown as number,
        MODAL_BASE_SCALAR: MODAL_BASE_SCALAR as unknown as number,
        NAV_BASE_SCALAR: NAV_BASE_SCALAR as unknown as number,
        TEXT_BASE_SCALAR: TEXT_BASE_SCALAR as unknown as number,
        COMPONENT_BASE_SCALAR: COMPONENT_BASE_SCALAR as unknown as number,
      }),
    [
      ANIMATION_MASTER_BASE,
      PAGE_BASE_SCALAR,
      MODAL_BASE_SCALAR,
      NAV_BASE_SCALAR,
      TEXT_BASE_SCALAR,
      COMPONENT_BASE_SCALAR,
    ]
  );

  // Pre-scale all transition scalars (base × scalar) - memoized separately
  const scaledValues = useMemo(() => {
    const scaled: Record<string, number> = {};

    // Iterate through all sections to find scalars with base property
    Object.values(ANIMATION_SCALAR_CONFIG).forEach((section) => {
      const { _meta, ...scalars } = section;
      Object.entries(scalars).forEach(([key, scalar]) => {
        if ('base' in scalar) {
          // Pre-multiply: base × scalar
          const scalarValue = transitionScalars[key] as unknown as number;
          const baseValue = bases[scalar.base as keyof AnimationBases];
          scaled[key] = baseValue * scalarValue;
        }
      });
    });

    return scaled;
  }, [bases, transitionScalars]);

  // Build all transition objects using pre-scaled values
  const transitions = useMemo(
    () => buildTransitions(scaledValues as any),
    [scaledValues]
  );

  // Build springs from Leva controls
  const springs = useMemo(
    () => ({
      smooth: {
        tension: SPRING_SMOOTH_TENSION as unknown as number,
        friction: SPRING_SMOOTH_FRICTION as unknown as number,
        mass: SPRING_SMOOTH_MASS as unknown as number,
      },
      bouncy: {
        tension: SPRING_BOUNCY_TENSION as unknown as number,
        friction: SPRING_BOUNCY_FRICTION as unknown as number,
        mass: SPRING_BOUNCY_MASS as unknown as number,
      },
      slow: {
        tension: SPRING_SLOW_TENSION as unknown as number,
        friction: SPRING_SLOW_FRICTION as unknown as number,
        mass: SPRING_SLOW_MASS as unknown as number,
      },
    }),
    [
      SPRING_SMOOTH_TENSION,
      SPRING_SMOOTH_FRICTION,
      SPRING_SMOOTH_MASS,
      SPRING_BOUNCY_TENSION,
      SPRING_BOUNCY_FRICTION,
      SPRING_BOUNCY_MASS,
      SPRING_SLOW_TENSION,
      SPRING_SLOW_FRICTION,
      SPRING_SLOW_MASS,
    ]
  );

  // Build debounce delays from Leva controls
  const debounceDelays = useMemo(
    () => ({
      COLOR_UPDATE: DEBOUNCE_COLOR_UPDATE as unknown as number,
      WINDOW_RESIZE: DEBOUNCE_WINDOW_RESIZE as unknown as number,
      SCROLL: DEBOUNCE_SCROLL as unknown as number,
    }),
    [DEBOUNCE_COLOR_UPDATE, DEBOUNCE_WINDOW_RESIZE, DEBOUNCE_SCROLL]
  );

  // Build loading timeouts from Leva controls
  const loadingTimeouts = useMemo(
    () => ({
      LITE_MODE_FALLBACK: TIMEOUT_LITE_MODE_FALLBACK as unknown as number,
      USER_INITIATED_FALLBACK: TIMEOUT_USER_INITIATED_FALLBACK as unknown as number,
    }),
    [TIMEOUT_LITE_MODE_FALLBACK, TIMEOUT_USER_INITIATED_FALLBACK]
  );

  return (
    <AnimationContext.Provider
      value={{
        TRANSITIONS: transitions,
        BASES: bases,
        SPRINGS: springs,
        DEBOUNCE: debounceDelays,
        TIMEOUTS: loadingTimeouts,
        MAP_SLIDER_CASCADE_MS: MAP_SLIDER_CASCADE_DURATION_MS as unknown as number,
      }}
    >
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
