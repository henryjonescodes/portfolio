import { createContext, useContext } from 'react';
import type { Waveform } from '../audio/synth';

export type FontFamilyId = 'pixelify' | 'vt323' | 'plex' | 'orbitron';

export const FONT_FAMILIES: Record<FontFamilyId, { label: string; css: string }> = {
  pixelify: { label: 'Pixelify Sans', css: "'Pixelify Sans', sans-serif" },
  vt323: { label: 'VT323', css: "'VT323', monospace" },
  plex: { label: 'IBM Plex Mono', css: "'IBM Plex Mono', monospace" },
  orbitron: { label: 'Orbitron', css: "'Orbitron', sans-serif" },
};

export const DEFAULT_PREFERENCES = {
  fontFamily: 'pixelify' as FontFamilyId,
  /** Multiplies the root font size. */
  textScale: 1,
  /** Animation speed: 2 plays every animation twice as fast. */
  motionSpeed: 1,
  /** Opacity multiplier for the scanlines. */
  crt: 1,
  /** Interaction sounds on or off. */
  sound: true,
  volume: 0.4,
  waveform: 'square' as Waveform,
  /** Lowpass cutoff in Hz. */
  cutoff: 2400,
  resonance: 2,
  /** Envelope release in seconds. */
  release: 0.12,
  /** Second oscillator detune in cents. */
  detune: 0,
};

export const WAVEFORM_IDS: Waveform[] = ['sine', 'square', 'sawtooth', 'triangle'];

export type Preferences = typeof DEFAULT_PREFERENCES;

export type NumericPreference =
  | 'textScale'
  | 'motionSpeed'
  | 'crt'
  | 'volume'
  | 'cutoff'
  | 'resonance'
  | 'release'
  | 'detune';

export const SOUND_KEYS: (keyof Preferences)[] = [
  'sound',
  'volume',
  'waveform',
  'cutoff',
  'resonance',
  'release',
  'detune',
];

/** Slider bounds; stored values outside them are ignored. */
export const PREFERENCE_RANGES: Record<
  NumericPreference,
  { min: number; max: number; step: number }
> = {
  textScale: { min: 0.8, max: 1.4, step: 0.1 },
  motionSpeed: { min: 0.5, max: 2, step: 0.25 },
  crt: { min: 0, max: 1, step: 0.1 },
  volume: { min: 0, max: 1, step: 0.05 },
  cutoff: { min: 200, max: 8000, step: 100 },
  resonance: { min: 0, max: 20, step: 1 },
  release: { min: 0.02, max: 0.6, step: 0.02 },
  detune: { min: 0, max: 50, step: 1 },
};

type PreferencesContextType = {
  preferences: Preferences;
  setPreference: <K extends keyof Preferences>(key: K, value: Preferences[K]) => void;
  resetPreferences: (keys: (keyof Preferences)[]) => void;
};

export const PreferencesContext = createContext<PreferencesContextType>({
  preferences: DEFAULT_PREFERENCES,
  setPreference: () => {},
  resetPreferences: () => {},
});

export const usePreferences = () => useContext(PreferencesContext);
