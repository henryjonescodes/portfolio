import { ReactNode, useCallback, useLayoutEffect, useMemo, useState } from 'react';
import {
  DEFAULT_PREFERENCES,
  FONT_FAMILIES,
  PREFERENCE_RANGES,
  PreferencesContext,
  type NumericPreference,
  type Preferences,
} from './PreferencesContext';

const STORAGE_KEY = 'portfolio.preferences';

const load = (): Preferences => {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}') as Partial<Preferences>;
    const merged = { ...DEFAULT_PREFERENCES };
    if (stored.fontFamily && stored.fontFamily in FONT_FAMILIES) {
      merged.fontFamily = stored.fontFamily;
    }
    for (const key of Object.keys(PREFERENCE_RANGES) as NumericPreference[]) {
      const { min, max } = PREFERENCE_RANGES[key];
      const value = stored[key];
      if (typeof value === 'number' && value >= min && value <= max) merged[key] = value;
    }
    return merged;
  } catch {
    return DEFAULT_PREFERENCES;
  }
};

/** Holds the Type and FX choices, persists them, and publishes them as CSS custom properties. */
export const PreferencesProvider = ({ children }: { children: ReactNode }) => {
  const [preferences, setPreferences] = useState<Preferences>(load);

  // Before paint, so a stored font never flashes the default first.
  useLayoutEffect(() => {
    const root = document.documentElement.style;
    root.setProperty('--font-family', FONT_FAMILIES[preferences.fontFamily].css);
    root.setProperty('--text-scale', String(preferences.textScale));
    root.setProperty('--crt-intensity', String(preferences.crt));
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
    } catch {
      // Storage can be blocked; the choices still apply for this visit.
    }
  }, [preferences]);

  const setPreference = useCallback(
    <K extends keyof Preferences>(key: K, value: Preferences[K]) =>
      setPreferences((prev) => ({ ...prev, [key]: value })),
    [],
  );

  const resetPreferences = useCallback(
    (keys: (keyof Preferences)[]) =>
      setPreferences((prev) => ({
        ...prev,
        ...Object.fromEntries(keys.map((k) => [k, DEFAULT_PREFERENCES[k]])),
      })),
    [],
  );

  const value = useMemo(
    () => ({ preferences, setPreference, resetPreferences }),
    [preferences, setPreference, resetPreferences],
  );

  return <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>;
};
