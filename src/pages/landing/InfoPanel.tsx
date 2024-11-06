// InfoPanel.tsx
import { motion } from "framer-motion";
import React from "react";
import Background from "../../components/Background";
import { CustomHTML } from "../../components/CustomHTML";
import { useColors } from "../../context/ColorsContext";
import { useSettings } from "../../context/SettingsContext";
import styles from "./landing.module.scss";
import Close from "./../../assets/svg/icons/close.svg?react";
import NavBarButton from "../../components/NavBar/NavBarButton";
import AnimatedLine from "../../components/AnimatedLine";
import cn from "classnames";
type ColorHex = `#${string}`;

interface PrimaryColors {
  foregroundPrimary: ColorHex;
  accentPrimary: ColorHex;
  backgroundPrimary: ColorHex;
}

const hexToHsl = (hex: ColorHex): { h: number; s: number; l: number } => {
  let r = 0,
    g = 0,
    b = 0;
  if (hex.length === 7) {
    r = parseInt(hex.slice(1, 3), 16) / 255;
    g = parseInt(hex.slice(3, 5), 16) / 255;
    b = parseInt(hex.slice(5, 7), 16) / 255;
  }
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h = 0,
    s = 0,
    l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) * 60;
        break;
      case g:
        h = ((b - r) / d + 2) * 60;
        break;
      case b:
        h = ((r - g) / d + 4) * 60;
        break;
    }
  }
  return { h, s, l };
};

const hslToHex = (h: number, s: number, l: number): ColorHex => {
  h /= 360;
  let r = l,
    g = l,
    b = l;
  if (s !== 0) {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  const toHex = (x: number) =>
    Math.round(x * 255)
      .toString(16)
      .padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}` as ColorHex;
};

const InfoPanel = () => {
  const { primaryColors, setPrimaryColors } = useColors();
  const { toggleInfoMode, zoomLevel } = useSettings();

  return (
    <CustomHTML transform occlude="blending">
      <motion.div
        className={styles.infoPanel}
        onClick={() => {
          if (zoomLevel === "info") {
            return;
          }
          toggleInfoMode();
        }}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <motion.div
          className={cn({
            [styles.content]: true,
            [styles.disabled]: zoomLevel !== "info",
          })}
        >
          <motion.div className={styles.background}>
            <Background />
          </motion.div>
          <motion.span className={styles.navbar}>
            <span />
            <NavBarButton
              onClick={() => {
                toggleInfoMode();
              }}
              Icon={Close}
            />
            <AnimatedLine
              className={styles.border}
              borderWidth={5}
              horizontal
            />
          </motion.span>
          <motion.div className={styles.colorPicker}>
            <HueSlider
              label="Foreground"
              colorHex={primaryColors.foregroundPrimary}
              className={styles.foreground}
              onChange={(newHex) =>
                setPrimaryColors((prev) => ({
                  ...prev,
                  foregroundPrimary: newHex,
                }))
              }
            />
            <HueSlider
              label="Background"
              colorHex={primaryColors.backgroundPrimary}
              className={styles.background}
              onChange={(newHex) =>
                setPrimaryColors((prev) => ({
                  ...prev,
                  backgroundPrimary: newHex,
                }))
              }
            />
            <HueSlider
              label="Accent"
              colorHex={primaryColors.accentPrimary}
              className={styles.accent}
              onChange={(newHex) =>
                setPrimaryColors((prev) => ({ ...prev, accentPrimary: newHex }))
              }
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </CustomHTML>
  );
};

interface HueSliderProps {
  label: string;
  colorHex: ColorHex;
  onChange: (newHex: ColorHex) => void;
  className: string;
}

const HueSlider: React.FC<HueSliderProps> = ({
  label,
  colorHex,
  onChange,
  className,
}) => {
  const { h, s, l } = hexToHsl(colorHex);

  const handleHueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newHue = parseInt(event.target.value, 10);
    const newHex = hslToHex(newHue, s, l);
    onChange(newHex as ColorHex);
  };

  return (
    <div className={cn(styles.hueSlider, className)}>
      <input
        type="range"
        min="0"
        max="360"
        value={h}
        onChange={handleHueChange}
        className={styles.slider}
      />
      <h4 className={styles.label}>{label}</h4>
    </div>
  );
};

export default InfoPanel;
