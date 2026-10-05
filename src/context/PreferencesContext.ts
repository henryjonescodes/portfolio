import { createContext, useContext } from 'react';

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
};

export type Preferences = typeof DEFAULT_PREFERENCES;

export type NumericPreference = 'textScale' | 'motionSpeed' | 'crt';

/** Slider bounds; stored values outside them are ignored. */
export const PREFERENCE_RANGES: Record<
  NumericPreference,
  { min: number; max: number; step: number }
> = {
  textScale: { min: 0.8, max: 1.4, step: 0.1 },
  motionSpeed: { min: 0.5, max: 2, step: 0.25 },
  crt: { min: 0, max: 1, step: 0.1 },
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
