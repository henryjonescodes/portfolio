import cn from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import Page from "../../components/Page";
import { useSettings } from "../../context/SettingsContext";
import styles from "./landing.module.scss";
import Scene from "./Scene";
import { useControls } from "leva";
import { useEffect } from "react";
import { colors as defaultColors } from "./../../styles/sass-variables";

const wrapperVariants = {
  show: {
    opacity: 1,
    transition: {
      duration: 1.3,
      delay: 0.6,
    },
  },
  hide: {
    opacity: 0,
    transition: {
      duration: 0.3,
    },
  },
};

const Landing = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Initialize the navigate function
  const { fullScreen } = useSettings();

  const pathSegments = location.pathname.split("/").filter(Boolean);
  const page = pathSegments[0];
  const isHidden = !fullScreen || page === undefined;

  const colors = useControls({
    "foreground-primary": defaultColors["foreground-primary"],
    "foreground-secondary": defaultColors["foreground-secondary"],
    "foreground-tertiary": defaultColors["foreground-tertiary"],
    "foreground-quaternary": defaultColors["foreground-quaternary"],
    "accent-primary": defaultColors["accent-primary"],
    "accent-secondary": defaultColors["accent-secondary"],
    "accent-tertiary": defaultColors["accent-tertiary"],
    "background-primary": defaultColors["background-primary"],
    "background-secondary": defaultColors["background-secondary"],
  });

  useEffect(() => {
    const root = document.documentElement;

    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value);
    });

    console.log("CSS variables updated with new colors");
  }, [colors]); //

  return (
    <motion.div className={styles.landing}>
      <AnimatePresence>
        {fullScreen && (
          <motion.div
            key={"home"}
            className={cn(styles.wrapper, { [styles.disabled]: isHidden })}
            variants={wrapperVariants}
            initial="hide"
            animate={isHidden ? "hide" : "show"}
            exit="hide"
          >
            <Page
              navigate={navigate}
              visible={page !== undefined}
              page={page}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <Scene />;
    </motion.div>
  );
};

export default Landing;
