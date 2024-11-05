import { useEffect, useState } from "react";
import { colord, extend } from "colord";
import mixPlugin from "colord/plugins/mix";
import { useControls, LevaInputs } from "leva";
import { colors as defaultColors } from "./../styles/sass-variables";

// Extend colord with plugins
extend([mixPlugin]);

// Define types for color values and control options
type ColorHex = `#${string}`;

// Primary color keys allowed in controls
interface PrimaryColors {
  foregroundPrimary: ColorHex;
  accentPrimary: ColorHex;
  backgroundPrimary: ColorHex;
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

// Type for the control configuration passed to useControls
type ColorControls = {
  [K in keyof PrimaryColors]: {
    value: ColorHex;
    label: string;
    type?: LevaInputs;
  };
};

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

export const useColors = () => {
  // Initialize primary color states with default values
  const [primaryColors, setPrimaryColors] = useState<PrimaryColors>({
    foregroundPrimary: defaultColors["foreground-primary"],
    accentPrimary: defaultColors["accent-primary"],
    backgroundPrimary: defaultColors["background-primary"],
  });

  // Define controls with appropriate labels and initial values
  const controls: ColorControls = {
    foregroundPrimary: {
      value: primaryColors.foregroundPrimary,
      label: "Foreground Primary",
    },
    accentPrimary: {
      value: primaryColors.accentPrimary,
      label: "Accent Primary",
    },
    backgroundPrimary: {
      value: primaryColors.backgroundPrimary,
      label: "Background Primary",
    },
  };

  // Use controls with defined configuration
  const { foregroundPrimary, accentPrimary, backgroundPrimary } = useControls(
    controls
  ) as {
    foregroundPrimary: ColorHex;
    accentPrimary: ColorHex;
    backgroundPrimary: ColorHex;
  };

  // Update the derived colors based on the primary colors
  const derivedColors: DerivedColors = {
    "foreground-secondary": adjustSaturation(foregroundPrimary, -10),
    "foreground-tertiary": adjustSaturation(foregroundPrimary, -40),
    "foreground-quaternary": adjustLightness(foregroundPrimary, -30),
    "accent-secondary": adjustSaturation(accentPrimary, -60),
    "accent-tertiary": adjustSaturation(accentPrimary, -60),
    "background-secondary": adjustLightness(backgroundPrimary, -8),
  };

  // Update the CSS variables in :root whenever colors change
  useEffect(() => {
    const root = document.documentElement;

    // Set primary colors
    root.style.setProperty("--foreground-primary", foregroundPrimary);
    root.style.setProperty("--accent-primary", accentPrimary);
    root.style.setProperty("--background-primary", backgroundPrimary);

    // Set derived colors
    Object.entries(derivedColors).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value);
    });
  }, [foregroundPrimary, accentPrimary, backgroundPrimary, derivedColors]);

  // Update primary color state whenever controls change
  useEffect(() => {
    setPrimaryColors({
      foregroundPrimary,
      accentPrimary,
      backgroundPrimary,
    });
  }, [foregroundPrimary, accentPrimary, backgroundPrimary]);

  return null;
};
