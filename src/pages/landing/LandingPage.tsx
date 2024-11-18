import GradientBackground from "@components/GradientBackground";
import Page from "@components/Page";
import { useLoading } from "@context/LoadingContext";
import { useZoom } from "@context/ZoomContext";
import { AnimatePresence } from "framer-motion";
import styles from "./landing.module.scss";
import Scene from "./Scene";

const LandingPage = () => {
  const { zoomLevel } = useZoom();
  const { loadingState } = useLoading();

  return (
    <div className={styles.landing}>
      <AnimatePresence>
        {(loadingState === undefined || zoomLevel === "fullscreen") && <Page />}
      </AnimatePresence>
      {loadingState !== undefined && (
        <>
          <Scene />
          <GradientBackground />
        </>
      )}
    </div>
  );
};

export default LandingPage;
