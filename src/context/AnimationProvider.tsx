import {
  DEFAULT_ANIMATIONS,
  DEFAULT_TUNABLE_VALUES,
  resolveAnimations,
  type TunableValues,
} from '@config/animation';
import { ReactNode, useCallback, useMemo, useState } from 'react';
import { AnimationContext, AnimationTuningContext } from './AnimationContext';
import { usePreferences } from './PreferencesContext';

const sameValues = (a: TunableValues, b: TunableValues) =>
  Object.keys(b).every((key) => a[key] === b[key]);

/**
 * Serves resolved animation timing. Values are the config defaults unless the debug panel
 * is mounted and pushes Leva values through `useAnimationTuning`. The motion speed preference
 * divides the master base duration.
 */
export const AnimationProvider = ({ children }: { children: ReactNode }) => {
  const [values, setValues] = useState<TunableValues>(DEFAULT_TUNABLE_VALUES);
  const { motionSpeed } = usePreferences().preferences;
  const animations = useMemo(() => {
    if (values === DEFAULT_TUNABLE_VALUES && motionSpeed === 1) return DEFAULT_ANIMATIONS;
    return resolveAnimations({
      ...values,
      ANIMATION_MASTER_BASE: values.ANIMATION_MASTER_BASE / motionSpeed,
    });
  }, [values, motionSpeed]);
  const tune = useCallback(
    (next: TunableValues) =>
      setValues((prev) => (sameValues(prev, next) ? prev : { ...prev, ...next })),
    [],
  );

  return (
    <AnimationTuningContext.Provider value={tune}>
      <AnimationContext.Provider value={animations}>{children}</AnimationContext.Provider>
    </AnimationTuningContext.Provider>
  );
};
