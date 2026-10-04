import { colors as defaultColors } from '@styles/sass-variables';
import { colord } from 'colord';
import type { ColorHex } from '@utils/color';
import React, { createContext, useContext } from 'react';

// Primary hues interface
export interface PrimaryHues {
  foregroundPrimary: number;
  accentPrimary: number;
  backgroundPrimary: number;
}

// Derived color keys for extrapolated colors
export interface DerivedColors {
  'foreground-secondary': ColorHex;
  'foreground-tertiary': ColorHex;
  'foreground-quaternary': ColorHex;
  'accent-secondary': ColorHex;
  'accent-tertiary': ColorHex;
  'background-secondary': ColorHex;
  'background-tertiary': ColorHex;
}

// Extract default HSL values from default colors
const defaultForegroundColor = defaultColors['foreground-primary'];
const defaultAccentColor = defaultColors['accent-primary'];
const defaultBackgroundColor = defaultColors['background-primary'];

export const defaultForegroundHSL = colord(defaultForegroundColor).toHsl();
export const defaultAccentHSL = colord(defaultAccentColor).toHsl();
export const defaultBackgroundHSL = colord(defaultBackgroundColor).toHsl();

// Define the shape of your context
type ColorsContextType = {
  primaryHues: PrimaryHues;
  setPrimaryHues: React.Dispatch<React.SetStateAction<PrimaryHues>>;
  resetColors: () => void;
};

// Provide default values for the context
const defaultContextValue: ColorsContextType = {
  primaryHues: {
    foregroundPrimary: defaultForegroundHSL.h,
    accentPrimary: defaultAccentHSL.h,
    backgroundPrimary: defaultBackgroundHSL.h,
  },
  setPrimaryHues: () => {},
  resetColors: () => {},
};

// Create the context
export const ColorsContext = createContext<ColorsContextType>(defaultContextValue);

// Custom hook to consume the ColorsContext
export const useColors = () => {
  const context = useContext(ColorsContext);
  if (!context) {
    throw new Error('useColors must be used within a ColorsProvider');
  }
  return context;
};
