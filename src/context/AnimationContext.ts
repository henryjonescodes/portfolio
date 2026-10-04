import { DEFAULT_ANIMATIONS, type ResolvedAnimations, type TunableValues } from '@config/animation';
import { createContext, useContext } from 'react';

export const AnimationContext = createContext<ResolvedAnimations>(DEFAULT_ANIMATIONS);
export const AnimationTuningContext = createContext<(values: TunableValues) => void>(() => {});

export const useAnimations = () => useContext(AnimationContext);

export const useAnimationTuning = () => useContext(AnimationTuningContext);
