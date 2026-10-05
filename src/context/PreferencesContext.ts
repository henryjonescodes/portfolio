import { createContext, useContext } from 'react';

export type FontFamilyId = 'pixelify' | 'plex' | 'grotesk';

export const FONT_FAMILIES: Record<FontFamilyId, { label: string; css: string }> = {
  pixelify: { label: 'Pixelify Sans', css: "'Pixelify Sans', sans-serif" },
  plex: { label: 'IBM Plex Mono', css: "'IBM Plex Mono', monospace" },
  grotesk: { label: 'Space Grotesk', css: "'Space Grotesk', sans-serif" },
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
