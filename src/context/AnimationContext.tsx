import { createContext, useContext, ReactNode, useMemo } from "react";
import { useControls, folder } from "leva";
import {
  ANIMATION_SCALAR_CONFIG,
  computeAnimationBases,
  buildTransitions,
  ANIMATION_SPRINGS,
  DEBOUNCE_DELAYS,
  LOADING_TIMEOUTS,
  MAP_SLIDER_CASCADE_DURATION_MS,
  generateLabel,
} from "@config/new-animations";
import type { AnimationBases, TransitionConfig } from "../types";

type AnimationContextType = {
  TRANSITIONS: ReturnType<typeof buildTransitions>; // Nested structure auto-derived
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
  // Build Leva schema from config with auto-generated labels
  const levaSchema = Object.fromEntries(
    Object.entries(ANIMATION_SCALAR_CONFIG).map(([_, section]) => {
      const { _meta, ...scalars } = section;

      // Apply auto-generated labels if not manually specified
      const scalarsWithLabels = Object.fromEntries(
        Object.entries(scalars).map(([key, scalar]) => {
          // Only generate label with base reference if scalar has a base property
          const label = scalar.label ?? ('base' in scalar ? generateLabel(key, scalar.base) : key);
          const { base, ...levaProps } = scalar as any; // Remove 'base' from Leva props if present
          return [key, { ...levaProps, label }];
        })
      );

      return [
        _meta.title,
        folder(scalarsWithLabels, { collapsed: _meta.collapsed ?? true }),
      ];
    })
  );

  const controls = useControls("Animation System", levaSchema);

  // Extract category base scalars from controls
  const {
    ANIMATION_MASTER_BASE,
    PAGE_BASE_SCALAR,
    MODAL_BASE_SCALAR,
    NAV_BASE_SCALAR,
    TEXT_BASE_SCALAR,
    COMPONENT_BASE_SCALAR,
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

  return (
    <AnimationContext.Provider
      value={{
        TRANSITIONS: transitions,
        BASES: bases,
        SPRINGS: ANIMATION_SPRINGS,
        DEBOUNCE: DEBOUNCE_DELAYS,
        TIMEOUTS: LOADING_TIMEOUTS,
        MAP_SLIDER_CASCADE_MS: MAP_SLIDER_CASCADE_DURATION_MS,
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
