// InfoPanel.tsx
import React, { useState, useEffect } from "react";
import { Html } from "@react-three/drei";
import { motion } from "framer-motion";
import styles from "./landing.module.scss";
import { useColors } from "../../context/ColorsContext";
import { CustomHTML } from "../../components/CustomHTML";

// Define the PrimaryColors type
interface PrimaryColors {
  foregroundPrimary: string;
  accentPrimary: string;
  backgroundPrimary: string;
}

// Helper function to convert RGB to Hex
const rgbToHex = (r: number, g: number, b: number): string => {
  const toHex = (value: number) => value.toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

const InfoPanel = () => {
  // Access primary colors and the updater function from context
  const { primaryColors, setPrimaryColors } = useColors();

  // State to manage which color is currently selected
  const [selectedColor, setSelectedColor] = useState<
    "accent" | "foreground" | "background"
  >("accent");

  // Function to extract RGB values from a hex color string
  const getRgbValues = (hex: string) => {
    const bigint = parseInt(hex.slice(1), 16);
    return {
      r: (bigint >> 16) & 255,
      g: (bigint >> 8) & 255,
      b: bigint & 255,
    };
  };

  // State to manage RGB values of the selected color
  const [rgbValues, setRgbValues] = useState(
    getRgbValues(primaryColors.accentPrimary)
  );

  // Update RGB values when the selected color changes
  useEffect(() => {
    setRgbValues(
      getRgbValues(
        primaryColors[`${selectedColor}Primary` as keyof PrimaryColors]
      )
    );
  }, [selectedColor, primaryColors]);

  // Handler to change the selected color category
  const handleColorSelection = (
    color: "accent" | "foreground" | "background"
  ) => {
    setSelectedColor(color);
  };

  // Handler to update RGB values and primary colors based on slider input
  const handleSliderChange = (color: "r" | "g" | "b", value: number) => {
    const updatedRgbValues = { ...rgbValues, [color]: value };
    setRgbValues(updatedRgbValues);

    // Convert updated RGB to hex and update the primary color in context
    const newHexColor = rgbToHex(
      updatedRgbValues.r,
      updatedRgbValues.g,
      updatedRgbValues.b
    );
    setPrimaryColors((prevColors) => ({
      ...prevColors,
      [`${selectedColor}Primary`]: newHexColor,
    }));
  };

  return (
    <CustomHTML transform occlude="blending">
      <motion.div className={styles.infoPanel}>
        <motion.h3 className={styles.panelTitle}>Color Picker</motion.h3>

        <motion.div className={styles.colorSelection}>
          <motion.h3
            onClick={() => handleColorSelection("accent")}
            className={`${styles.colorOption} ${
              selectedColor === "accent" ? styles.selected : ""
            }`}
          >
            Accent
          </motion.h3>
          <motion.h3
            onClick={() => handleColorSelection("foreground")}
            className={`${styles.colorOption} ${
              selectedColor === "foreground" ? styles.selected : ""
            }`}
          >
            Foreground
          </motion.h3>
          <motion.h3
            onClick={() => handleColorSelection("background")}
            className={`${styles.colorOption} ${
              selectedColor === "background" ? styles.selected : ""
            }`}
          >
            Background
          </motion.h3>
        </motion.div>

        <motion.div className={styles.sliders}>
          <ColorSlider
            label="R"
            value={rgbValues.r}
            onChange={(value) => handleSliderChange("r", value)}
          />
          <ColorSlider
            label="G"
            value={rgbValues.g}
            onChange={(value) => handleSliderChange("g", value)}
          />
          <ColorSlider
            label="B"
            value={rgbValues.b}
            onChange={(value) => handleSliderChange("b", value)}
          />
        </motion.div>

        <motion.div className={styles.currentColor}>
          <motion.p>
            Current {selectedColor} color:{" "}
            {primaryColors[`${selectedColor}Primary` as keyof PrimaryColors]}
          </motion.p>
        </motion.div>
      </motion.div>
    </CustomHTML>
  );
};

interface ColorSliderProps {
  label: "R" | "G" | "B";
  value: number;
  onChange: (value: number) => void;
}

const ColorSlider: React.FC<ColorSliderProps> = ({
  label,
  value,
  onChange,
}) => {
  return (
    <label className={styles.sliderLabel}>
      {label}:
      <input
        type="range"
        min="0"
        max="255"
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className={styles.slider}
      />
    </label>
  );
};

export default InfoPanel;
