// ColorsContext.tsx
import { colord, extend } from "colord";
import mixPlugin from "colord/plugins/mix";
import React, {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from "react";
import useDebounceEffect from "../hooks/useDebouncedEffect";
import { colors as defaultColors } from "./../styles/sass-variables";

// Extend colord with plugins
extend([mixPlugin]);

// Define types for color values and control options
export type ColorHex = `#${string}`;

// Primary hues interface
export interface PrimaryHues {
  foregroundPrimary: number;
  accentPrimary: number;
  backgroundPrimary: number;
}

// Derived color keys for extrapolated colors
interface DerivedColors {
  "foreground-secondary": ColorHex;
  "foreground-tertiary": ColorHex;
  "foreground-quaternary": ColorHex;
  "accent-secondary": ColorHex;
  "accent-tertiary": ColorHex;
  "background-secondary": ColorHex;
}

// Functions to adjust saturation and lightness
const adjustSaturation = (color: string, amount: number): ColorHex => {
  return colord(color)
    .saturate(amount / 100)
    .toHex() as ColorHex;
};

const adjustLightness = (color: string, amount: number): ColorHex => {
  return colord(color)
    .lighten(amount / 100)
    .toHex() as ColorHex;
};

// Extract default HSL values from default colors
const defaultForegroundColor = defaultColors["foreground-primary"];
const defaultAccentColor = defaultColors["accent-primary"];
const defaultBackgroundColor = defaultColors["background-primary"];

const defaultForegroundHSL = colord(defaultForegroundColor).toHsl();
const defaultAccentHSL = colord(defaultAccentColor).toHsl();
const defaultBackgroundHSL = colord(defaultBackgroundColor).toHsl();

// Define the shape of your context
interface ColorsContextProps {
  primaryHues: PrimaryHues;
  setPrimaryHues: React.Dispatch<React.SetStateAction<PrimaryHues>>;
}

// Provide default values for the context
const defaultContextValue: ColorsContextProps = {
  primaryHues: {
    foregroundPrimary: defaultForegroundHSL.h,
    accentPrimary: defaultAccentHSL.h,
    backgroundPrimary: defaultBackgroundHSL.h,
  },
  setPrimaryHues: () => {},
};

// Create the context
const ColorsContext = createContext<ColorsContextProps>(defaultContextValue);

// Create the Provider component
export const ColorsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // Initialize primary hues with default values
  const [primaryHues, setPrimaryHues] = useState<PrimaryHues>({
    foregroundPrimary: defaultForegroundHSL.h,
    accentPrimary: defaultAccentHSL.h,
    backgroundPrimary: defaultBackgroundHSL.h,
  });

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
    [primaryHues]
  );

  // Update the derived colors based on the primary colors
  const derivedColors: DerivedColors = useMemo(
    () => ({
      "foreground-secondary": adjustSaturation(
        primaryColors.foregroundPrimary,
        -10
      ),
      "foreground-tertiary": adjustSaturation(
        primaryColors.foregroundPrimary,
        -40
      ),
      "foreground-quaternary": adjustLightness(
        primaryColors.foregroundPrimary,
        -30
      ),
      "accent-secondary": adjustSaturation(primaryColors.accentPrimary, -60),
      "accent-tertiary": adjustSaturation(primaryColors.accentPrimary, -60),
      "background-secondary": adjustLightness(
        primaryColors.backgroundPrimary,
        -8
      ),
    }),
    [primaryColors]
  );

  // Update the CSS variables in :root whenever colors change
  useDebounceEffect(
    () => {
      const root = document.documentElement;

      // Set primary colors
      root.style.setProperty(
        "--foreground-primary",
        primaryColors.foregroundPrimary
      );
      root.style.setProperty("--accent-primary", primaryColors.accentPrimary);
      root.style.setProperty(
        "--background-primary",
        primaryColors.backgroundPrimary
      );

      // Set derived colors
      Object.entries(derivedColors).forEach(([key, value]) => {
        root.style.setProperty(`--${key}`, value);
      });
    },
    [derivedColors],
    100
  );

  return (
    <ColorsContext.Provider value={{ primaryHues, setPrimaryHues }}>
      {children}
    </ColorsContext.Provider>
  );
};

// Custom hook to consume the ColorsContext
export const useColors = () => {
  const context = useContext(ColorsContext);
  if (!context) {
    throw new Error("useColors must be used within a ColorsProvider");
  }
  return context;
};
