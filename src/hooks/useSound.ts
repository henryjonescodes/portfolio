import { play } from '../audio/synth';

/** A stable `play(id)`; the engine is silent while sound is off. */
export const useSound = () => play;
