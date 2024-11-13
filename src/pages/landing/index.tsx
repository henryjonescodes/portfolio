import cn from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import Page from "../../components/Page";
import { ColorsProvider, useColors } from "../../context/ColorsContext";
import { SettingsProvider, useSettings } from "../../context/SettingsContext";
import styles from "./landing.module.scss";
import Scene from "./Scene";
import GradientBackground from "../../components/GradientBackground";
import Loading from "../../components/Loading";

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

export const LandingWrapper = () => {
  return (
    <SettingsProvider>
      <ColorsProvider>
        <Landing />
      </ColorsProvider>
    </SettingsProvider>
  );
};

const Landing = () => {
  const { zoomLevel, liteMode } = useSettings();
  useColors();

  return (
    <motion.div className={styles.landing}>
      <AnimatePresence>
        {zoomLevel === "fullscreen" && (
          <motion.div
            key={"home"}
            className={cn(styles.wrapper, {
              [styles.disabled]: zoomLevel !== "fullscreen",
            })}
            variants={wrapperVariants}
            initial="hide"
            animate={zoomLevel !== "fullscreen" ? "hide" : "show"}
            exit="hide"
          >
            <Page />
          </motion.div>
        )}
      </AnimatePresence>
      {liteMode === false && (
        <>
          <Loading />
          <Scene />
          <GradientBackground />
        </>
      )}
    </motion.div>
  );
};

export default Landing;
