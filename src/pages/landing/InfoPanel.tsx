// InfoPanel.tsx
import { motion } from "framer-motion";
import React from "react";
import Background from "../../components/Background";
import { CustomHTML } from "../../components/3D/CustomHTML";
import { useColors } from "../../context/ColorsContext";
import { useSettings } from "../../context/SettingsContext";
import styles from "./landing.module.scss";
import Close from "./../../assets/svg/icons/close-01.svg?react";
import Trash from "./../../assets/svg/icons/trash.svg?react";
import Locked from "./../../assets/svg/icons/locked.svg?react";
import Unlocked from "./../../assets/svg/icons/unlocked.svg?react";
import NavBarButton from "../../components/NavBar/NavBarButton";
import AnimatedLine from "../../components/AnimatedLine";
import cn from "classnames";

const InfoPanel = () => {
  const { primaryHues, setPrimaryHues, resetColors } = useColors();
  const { toggleInfoMode, toggleDebugMode, zoomLevel, isDebugMode } =
    useSettings();

  return (
    <CustomHTML transform occlude="blending">
      <motion.div
        className={cn(styles.infoPanel, {
          [styles.button]: zoomLevel !== "info",
        })}
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
                toggleDebugMode();
              }}
              Icon={Locked}
              ActiveIcon={Unlocked}
              active={isDebugMode}
            />
            <NavBarButton
              onClick={() => {
                resetColors();
              }}
              Icon={Trash}
            />
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
              hue={primaryHues.foregroundPrimary}
              className={styles.foreground}
              onChange={(newHue) =>
                setPrimaryHues((prev) => ({
                  ...prev,
                  foregroundPrimary: newHue,
                }))
              }
            />
            <HueSlider
              label="Background"
              hue={primaryHues.backgroundPrimary}
              className={styles.background}
              onChange={(newHue) =>
                setPrimaryHues((prev) => ({
                  ...prev,
                  backgroundPrimary: newHue,
                }))
              }
            />
            <HueSlider
              label="Accent"
              hue={primaryHues.accentPrimary}
              className={styles.accent}
              onChange={(newHue) =>
                setPrimaryHues((prev) => ({
                  ...prev,
                  accentPrimary: newHue,
                }))
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
  hue: number;
  onChange: (newHue: number) => void;
  className: string;
}

const HueSlider: React.FC<HueSliderProps> = ({
  label,
  hue,
  onChange,
  className,
}) => {
  const handleHueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newHue = parseInt(event.target.value, 10);
    onChange(newHue);
  };

  return (
    <div className={cn(styles.hueSlider, className)}>
      <input
        type="range"
        min="0"
        max="360"
        value={hue}
        onChange={handleHueChange}
        className={styles.slider}
      />
      <h4 className={styles.label}>{label}</h4>
    </div>
  );
};

export default InfoPanel;
