import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useMemo,
} from "react";
import { useControls } from "leva";
import { colord, extend } from "colord";
import mixPlugin from "colord/plugins/mix";
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

// Define the shape of your context
interface ColorsContextProps {
  primaryColors: PrimaryColors;
  setPrimaryColors: React.Dispatch<React.SetStateAction<PrimaryColors>>;
}

// Provide default values for the context
const defaultContextValue: ColorsContextProps = {
  primaryColors: {
    foregroundPrimary: defaultColors["foreground-primary"],
    accentPrimary: defaultColors["accent-primary"],
    backgroundPrimary: defaultColors["background-primary"],
  },
  // Provide a default no-op function for setPrimaryColors
  setPrimaryColors: () => {},
};

// Create the context with default undefined to enforce provider usage
const ColorsContext = createContext<ColorsContextProps>(defaultContextValue);

// Create the Provider component
export const ColorsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // Initialize primary color states with default values
  const [primaryColors, setPrimaryColors] = useState<PrimaryColors>({
    foregroundPrimary: defaultColors["foreground-primary"],
    accentPrimary: defaultColors["accent-primary"],
    backgroundPrimary: defaultColors["background-primary"],
  });

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

  // Use controls with defined configuration
  // useControls(
  //   () => ({
  //     foregroundPrimary: {
  //       value: primaryColors.foregroundPrimary,
  //       label: "Foreground Primary",
  //       onChange: (v) =>
  //         setPrimaryColors((prev) => ({ ...prev, foregroundPrimary: v })),
  //     },
  //     accentPrimary: {
  //       value: primaryColors.accentPrimary,
  //       label: "Accent Primary",
  //       onChange: (v) =>
  //         setPrimaryColors((prev) => ({ ...prev, accentPrimary: v })),
  //     },
  //     backgroundPrimary: {
  //       value: primaryColors.backgroundPrimary,
  //       label: "Background Primary",
  //       onChange: (v) =>
  //         setPrimaryColors((prev) => ({ ...prev, backgroundPrimary: v })),
  //     },
  //   }),
  //   [primaryColors]
  // );

  // Update the CSS variables in :root whenever colors change
  useEffect(() => {
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
  }, [primaryColors, derivedColors]);

  return (
    <ColorsContext.Provider value={{ primaryColors, setPrimaryColors }}>
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
