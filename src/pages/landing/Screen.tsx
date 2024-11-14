import { AnimatePresence, motion } from "framer-motion";
import { CustomHTML } from "../../components/3D/CustomHTML";
import Background from "../../components/Background";
import Page from "../../components/Page";
import { useZoom } from "../../context/ZoomContext";
import { screenSize } from "../../styles/layout.constants";
import styles from "./landing.module.scss";

const Screen = () => {
  const { zoomLevel } = useZoom();
  const { width, height } = screenSize;

  return (
    <CustomHTML transform occlude="blending">
      <motion.div
        className={styles.screen}
        style={{ height: `${height}px`, width: `${width}px` }}
      >
        <Background />
        <motion.div className={styles.wrapper}>
          <AnimatePresence>
            {zoomLevel !== "fullscreen" && <Page key={"screen"} embedded />}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </CustomHTML>
  );
};

export default Screen;
