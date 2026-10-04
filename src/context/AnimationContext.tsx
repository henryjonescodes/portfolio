import { createContext, useContext, ReactNode, useMemo } from 'react';
import { useControls, folder } from 'leva';
import {
  ANIMATION_SCALAR_CONFIG,
  computeAnimationBases,
  TRANSITIONS_CONFIG,
  extractLevaSchema,
  buildTransitionsFromConfig,
} from '@config/new-animations';

type AnimationContextType = {
  TRANSITIONS: ReturnType<typeof buildTransitionsFromConfig>;
  BASES: ReturnType<typeof computeAnimationBases>;
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

const AnimationContext = createContext<AnimationContextType | undefined>(undefined);

export const AnimationProvider = ({ children }: { children: ReactNode }) => {
  // Build Leva schema for master, category bases, springs, and system constants
  const systemSchema = Object.fromEntries(
    Object.entries(ANIMATION_SCALAR_CONFIG).map(([_, section]) => {
      const { _meta, ...scalars } = section;
      const scalarsWithLabels = Object.fromEntries(
        Object.entries(scalars).map(([key, scalar]) => {
          const label = (scalar as any).label ?? key;
          const hint = (scalar as any).hint ? `${(scalar as any).hint} | ${key}` : key;
          return [key, { ...(scalar as any), label, hint }];
        }),
      );
      return [_meta.title, folder(scalarsWithLabels, { collapsed: _meta.collapsed ?? true })];
    }),
  );

  const systemControls = useControls(
    'Animation System',
    {
      ...systemSchema,
      '✨ Transitions': folder(extractLevaSchema(TRANSITIONS_CONFIG), { collapsed: true }),
    },
    {
      collapsed: false,
    },
  );

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
  } = systemControls;

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
    ],
  );

  const transitions = useMemo(
    () => buildTransitionsFromConfig(TRANSITIONS_CONFIG, systemControls, bases),
    [systemControls, bases],
  );

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
    ],
  );

  const debounceDelays = useMemo(
    () => ({
      COLOR_UPDATE: DEBOUNCE_COLOR_UPDATE as unknown as number,
      WINDOW_RESIZE: DEBOUNCE_WINDOW_RESIZE as unknown as number,
      SCROLL: DEBOUNCE_SCROLL as unknown as number,
    }),
    [DEBOUNCE_COLOR_UPDATE, DEBOUNCE_WINDOW_RESIZE, DEBOUNCE_SCROLL],
  );

  const loadingTimeouts = useMemo(
    () => ({
      LITE_MODE_FALLBACK: TIMEOUT_LITE_MODE_FALLBACK as unknown as number,
      USER_INITIATED_FALLBACK: TIMEOUT_USER_INITIATED_FALLBACK as unknown as number,
    }),
    [TIMEOUT_LITE_MODE_FALLBACK, TIMEOUT_USER_INITIATED_FALLBACK],
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
    throw new Error('useAnimations must be used within AnimationProvider');
  }
  return context;
};
