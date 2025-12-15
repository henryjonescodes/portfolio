import { useLoading } from "@context/LoadingContext";
import { useAnimations } from "@context/AnimationContext";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
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
  const { TRANSITIONS } = useAnimations();

  const wrapperVariants = {
    visible: { opacity: 1 },
    hidden: {
      opacity: 0,
      transition: TRANSITIONS.LOADING_PAGE.ANIMATE,
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
  const { loadingState, finishLoading } = useLoading();
  const { TRANSITIONS } = useAnimations();

  const wrapperVariants = {
    visible: { opacity: 1 },
    hidden: {
      opacity: 0,
      transition: TRANSITIONS.LOADING_PAGE.ANIMATE,
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
        </motion.div>
      )}
    </AnimatePresence>
  );
};
export default Loading;
