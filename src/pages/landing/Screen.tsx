import cn from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import Background from "../../components/Background";
import { CustomHTML } from "../../components/CustomHTML";
import Page from "../../components/Page";
import { useSettings } from "../../context/SettingsContext";
import { screenSize } from "../../styles/constants";
import styles from "./landing.module.scss";

const Screen = () => {
  const { zoomLevel } = useSettings();
  const { width, height } = screenSize;

  const wrapperVariants = {
    show: {
      opacity: 1,
      transition: {
        delay: 0.2,
        duration: 1,
      },
    },
    hide: {
      opacity: 0,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <CustomHTML transform occlude="blending">
      <motion.div
        className={styles.screen}
        style={{ height: `${height}px`, width: `${width}px` }}
      >
        <Background />
        <motion.div
          className={cn(styles.wrapper, {
            [styles.disabled]: false,
          })}
          variants={wrapperVariants}
          initial="hide"
          animate={zoomLevel === "fullscreen" ? "hide" : "show"}
        >
          <AnimatePresence>
            {zoomLevel !== "fullscreen" && <Page key={"screen"} />}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </CustomHTML>
  );
};

export default Screen;
