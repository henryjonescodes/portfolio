import type { Easing, Transition } from 'framer-motion';
import { SYSTEM_TUNABLES } from './system';
import { TRANSITIONS_CONFIG } from './transitions';
import {
  isTunable,
  transitionKey,
  type BaseKey,
  type Tunable,
  type TunableValues,
} from './tunable';

type TransitionsShape = typeof TRANSITIONS_CONFIG;
/** A resolved transition; every config entry is a tween with optional orchestration. */
export type TimedTransition = Transition & { duration?: number; delay?: number; ease?: Easing };
export type ResolvedTransitions = {
  [C in keyof TransitionsShape]: { [A in keyof TransitionsShape[C]]: TimedTransition };
};

export type SpringConfig = { tension: number; friction: number; mass: number };

function collectDefaults(): TunableValues {
  const values: TunableValues = {};
  for (const section of Object.values(SYSTEM_TUNABLES)) {
    for (const [key, t] of Object.entries(section.values) as [string, Tunable][]) {
      values[key] = t.value;
    }
  }
  forEachTunableTransition((key, t) => {
    values[key] = t.value;
  });
  return values;
}

/** Visits every tunable field in TRANSITIONS_CONFIG with its flat key. */
export function forEachTunableTransition(
  visit: (key: string, tunable: Tunable, path: [string, string, string]) => void,
) {
  for (const [component, actions] of Object.entries(TRANSITIONS_CONFIG)) {
    for (const [action, fields] of Object.entries(actions)) {
      for (const [field, value] of Object.entries(fields)) {
        if (isTunable(value))
          visit(transitionKey(component, action, field), value, [component, action, field]);
      }
    }
  }
}

export const DEFAULT_TUNABLE_VALUES: TunableValues = collectDefaults();

const springFrom = (v: TunableValues, name: string): SpringConfig => ({
  tension: v[`SPRING_${name}_TENSION`],
  friction: v[`SPRING_${name}_FRICTION`],
  mass: v[`SPRING_${name}_MASS`],
});

/** Turns a flat set of tunable values into everything components consume. */
export function resolveAnimations(v: TunableValues) {
  const master = v.ANIMATION_MASTER_BASE;
  const bases: Record<BaseKey, number> = {
    PAGE: master * v.PAGE_BASE_SCALAR,
    MODAL: master * v.MODAL_BASE_SCALAR,
    NAV: master * v.NAV_BASE_SCALAR,
    TEXT: master * v.TEXT_BASE_SCALAR,
    COMPONENT: master * v.COMPONENT_BASE_SCALAR,
  };

  const TRANSITIONS = Object.fromEntries(
    Object.entries(TRANSITIONS_CONFIG).map(([component, actions]) => [
      component,
      Object.fromEntries(
        Object.entries(actions).map(([action, fields]) => [
          action,
          Object.fromEntries(
            Object.entries(fields).map(([field, value]) => {
              if (!isTunable(value)) return [field, value];
              const scale = value.base ? bases[value.base] : 1;
              return [field, scale * v[transitionKey(component, action, field)]];
            }),
          ),
        ]),
      ),
    ]),
  ) as ResolvedTransitions;

  return {
    TRANSITIONS,
    SPRINGS: { button: springFrom(v, 'BUTTON'), camera: springFrom(v, 'CAMERA') },
    CAMERA_LERP: v.CAMERA_LERP,
    TIMEOUTS: {
      LITE_MODE_FALLBACK: v.TIMEOUT_LITE_MODE_FALLBACK,
      USER_INITIATED_FALLBACK: v.TIMEOUT_USER_INITIATED_FALLBACK,
    },
    MAP_SLIDER_CASCADE_MS: v.MAP_SLIDER_CASCADE_DURATION_MS,
  };
}

export type ResolvedAnimations = ReturnType<typeof resolveAnimations>;

export const DEFAULT_ANIMATIONS: ResolvedAnimations = resolveAnimations(DEFAULT_TUNABLE_VALUES);
