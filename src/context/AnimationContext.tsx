import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from 'react';
import {
  DEFAULT_ANIMATIONS,
  DEFAULT_TUNABLE_VALUES,
  resolveAnimations,
  type ResolvedAnimations,
  type TunableValues,
} from '@config/animation';

const AnimationContext = createContext<ResolvedAnimations>(DEFAULT_ANIMATIONS);
const AnimationTuningContext = createContext<(values: TunableValues) => void>(() => {});

const sameValues = (a: TunableValues, b: TunableValues) =>
  Object.keys(b).every((key) => a[key] === b[key]);

/**
 * Serves resolved animation timing. Values are the config defaults unless the debug panel
 * is mounted and pushes Leva values through `useAnimationTuning`.
 */
export const AnimationProvider = ({ children }: { children: ReactNode }) => {
  const [values, setValues] = useState<TunableValues>(DEFAULT_TUNABLE_VALUES);
  const animations = useMemo(
    () => (values === DEFAULT_TUNABLE_VALUES ? DEFAULT_ANIMATIONS : resolveAnimations(values)),
    [values],
  );
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

export const useAnimations = () => useContext(AnimationContext);

export const useAnimationTuning = () => useContext(AnimationTuningContext);
