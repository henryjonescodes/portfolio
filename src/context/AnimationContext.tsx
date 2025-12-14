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
  // Build Leva schema from config - FULLY GENERIC!
  const levaSchema = Object.fromEntries(
    Object.entries(ANIMATION_SCALAR_CONFIG).map(([_, section]) => {
      const { _meta, ...scalars } = section;

      return [
        _meta.title,
        folder(scalars, { collapsed: _meta.collapsed ?? true }),
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

  // Compute bases from master + category scalars
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

  // Build all transition objects
  const transitions = useMemo(
    () => buildTransitions(bases, transitionScalars as any),
    [bases, transitionScalars]
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
