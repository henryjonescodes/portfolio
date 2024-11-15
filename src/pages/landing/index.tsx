import { AnimatePresence, motion } from "framer-motion";
import GradientBackground from "@components/GradientBackground";
import Page from "@components/Page";
import { ColorsProvider } from "@context/ColorsContext";
import { LoadingProvider, useLoading } from "@context/LoadingContext";
import { SettingsProvider } from "@context/SettingsContext";
import { useZoom, ZoomProvider } from "@context/ZoomContext";
import styles from "./landing.module.scss";
import Scene from "./Scene";

export const LandingWrapper = () => {
  return (
    <LoadingProvider>
      <SettingsProvider>
        <ZoomProvider>
          <ColorsProvider>
            <Landing />
          </ColorsProvider>
        </ZoomProvider>
      </SettingsProvider>
    </LoadingProvider>
  );
};

const Landing = () => {
  const { zoomLevel } = useZoom();
  const { loadingState } = useLoading();

  return (
    <motion.div className={styles.landing}>
      <AnimatePresence>
        {(loadingState === undefined || zoomLevel === "fullscreen") && <Page />}
      </AnimatePresence>
      {loadingState !== undefined && (
        <>
          <Scene />
          <GradientBackground />
        </>
      )}
    </motion.div>
  );
};

export default Landing;
