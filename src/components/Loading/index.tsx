import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { useSettings } from "../../context/SettingsContext";
import styles from "./loading.module.scss";

const Spinner: React.FC = () => {
  return (
    <div className={styles.spinner}>
      <div className={`${styles.spinnerItem} ${styles.item1}`}></div>
      <div className={`${styles.spinnerItem} ${styles.item2}`}></div>
      <div className={`${styles.spinnerItem} ${styles.item3}`}></div>
    </div>
  );
};

const Loading = () => {
  const { loadingState, setLoadingState } = useSettings();

  const wrapperVariants = {
    visible: { opacity: 1 },
    hidden: {
      opacity: 0,
      transition: {
        duration: 0.5,
        delay: 1.7,
      },
    },
  };

  if (!loadingState || loadingState === "complete") {
    return null;
  }

  return (
    <AnimatePresence
      onExitComplete={() => {
        setLoadingState("complete");
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
