import { AnimatePresence, motion } from "framer-motion";
import GradientBackground from "../../components/GradientBackground";
import Loading from "../../components/Loading";
import Page from "../../components/Page";
import { ColorsProvider, useColors } from "../../context/ColorsContext";
import { SettingsProvider, useSettings } from "../../context/SettingsContext";
import styles from "./landing.module.scss";
import Scene from "./Scene";

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
        {zoomLevel === "fullscreen" && <Page />}
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
