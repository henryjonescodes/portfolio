import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useSpring,
} from "framer-motion";
import React, { useEffect, useState } from "react";
import { useLoading } from "../../context/LoadingContext";
import styles from "./loading.module.scss";

export const Spinner: React.FC = () => {
  return (
    <div className={styles.spinner}>
      <div className={`${styles.spinnerItem} ${styles.item1}`}></div>
      <div className={`${styles.spinnerItem} ${styles.item2}`}></div>
      <div className={`${styles.spinnerItem} ${styles.item3}`}></div>
    </div>
  );
};

export const PageLoading: React.FC = () => {
  const wrapperVariants = {
    visible: { opacity: 1 },
    hidden: {
      opacity: 0,
      transition: {
        duration: 0.5,
        delay: 0,
      },
    },
  };
  return (
    <AnimatePresence>
      <motion.div
        className={styles.pageLoading}
        initial="visible"
        animate="visible"
        exit="hidden"
        variants={wrapperVariants}
      >
        <Spinner />
      </motion.div>
    </AnimatePresence>
  );
};

const Loading = () => {
  const { loadingState, finishLoading, progress } = useLoading();

  const displayedProgress = useSpring(0, {
    stiffness: 50,
    damping: 15,
  });

  const [displayedProgressValue, setDisplayedProgressValue] = useState(0);

  useEffect(() => {
    displayedProgress.set(progress);
  }, [progress, displayedProgress]);

  useMotionValueEvent(displayedProgress, "change", (value) => {
    setDisplayedProgressValue(value);
    console.log(value);
  });

  const wrapperVariants = {
    visible: { opacity: 1 },
    hidden: {
      opacity: 0,
      transition: {
        duration: 0.3,
        delay: 1.95,
      },
    },
  };

  if (!loadingState || loadingState === "complete") {
    return null;
  }

  return (
    <AnimatePresence
      onExitComplete={() => {
        finishLoading();
      }}
    >
      {loadingState === "loading" && (
        <motion.div
          className={styles.loadingWrapper}
          initial="visible"
          animate="visible"
          exit="hidden"
          variants={wrapperVariants}
        >
          <Spinner />
          {/* <motion.h1 className={styles.progress}>
            {Math.min(100, Math.round(displayedProgressValue))} %
          </motion.h1> */}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
export default Loading;
