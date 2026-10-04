import useDebounceEffect from '@hooks/useDebouncedEffect';
import { adjustLightness, adjustSaturation, type ColorHex } from '@utils/color';
import { colord } from 'colord';
import React, { ReactNode, useCallback, useMemo, useState } from 'react';
import {
  ColorsContext,
  defaultAccentHSL,
  defaultBackgroundHSL,
  defaultForegroundHSL,
  DerivedColors,
  PrimaryHues,
} from './ColorsContext';

// Create the Provider component
export const ColorsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize primary hues with default values
  const [primaryHues, setPrimaryHues] = useState<PrimaryHues>({
    foregroundPrimary: defaultForegroundHSL.h,
    accentPrimary: defaultAccentHSL.h,
    backgroundPrimary: defaultBackgroundHSL.h,
  });

  const resetColors = useCallback(() => {
    setPrimaryHues({
      foregroundPrimary: defaultForegroundHSL.h,
      accentPrimary: defaultAccentHSL.h,
      backgroundPrimary: defaultBackgroundHSL.h,
    });
  }, []);

  // Compute primary colors (hex) based on hues and default saturation/lightness
  const primaryColors = useMemo(
    () => ({
      foregroundPrimary: colord({
        h: primaryHues.foregroundPrimary,
        s: defaultForegroundHSL.s,
        l: defaultForegroundHSL.l,
      }).toHex() as ColorHex,
      accentPrimary: colord({
        h: primaryHues.accentPrimary,
        s: defaultAccentHSL.s,
        l: defaultAccentHSL.l,
      }).toHex() as ColorHex,
      backgroundPrimary: colord({
        h: primaryHues.backgroundPrimary,
        s: defaultBackgroundHSL.s,
        l: defaultBackgroundHSL.l,
      }).toHex() as ColorHex,
    }),
    [primaryHues],
  );

  // Update the derived colors based on the primary colors
  const derivedColors: DerivedColors = useMemo(
    () => ({
      'foreground-secondary': adjustSaturation(primaryColors.foregroundPrimary, -10),
      'foreground-tertiary': adjustSaturation(primaryColors.foregroundPrimary, -40),
      'foreground-quaternary': adjustLightness(primaryColors.foregroundPrimary, -30),
      'accent-secondary': adjustSaturation(primaryColors.accentPrimary, -10),
      'accent-tertiary': adjustSaturation(primaryColors.accentPrimary, -30),
      'background-secondary': adjustLightness(primaryColors.backgroundPrimary, -8),
      'background-tertiary': adjustSaturation(primaryColors.backgroundPrimary, -8),
    }),
    [primaryColors],
  );

  // Update the CSS variables in :root whenever colors change
  useDebounceEffect(
    () => {
      const root = document.documentElement;

      // Set primary colors
      root.style.setProperty('--foreground-primary', primaryColors.foregroundPrimary);
      root.style.setProperty('--accent-primary', primaryColors.accentPrimary);
      root.style.setProperty('--background-primary', primaryColors.backgroundPrimary);
      document
        .querySelector('meta[name="theme-color"]')
        ?.setAttribute('content', primaryColors.backgroundPrimary);

      // Set derived colors
      Object.entries(derivedColors).forEach(([key, value]) => {
        root.style.setProperty(`--${key}`, value);
      });
    },
    [primaryColors, derivedColors],
    100,
  );

  return (
    <ColorsContext.Provider value={{ primaryHues, setPrimaryHues, resetColors }}>
      {children}
    </ColorsContext.Provider>
  );
};
