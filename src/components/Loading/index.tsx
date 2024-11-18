import { useLoading } from "@context/LoadingContext";
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
  const { loadingState, finishLoading } = useLoading();

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
        </motion.div>
      )}
    </AnimatePresence>
  );
};
export default Loading;
