import { motion } from "framer-motion";
import React from "react";
import AnimatedLine from "@components/AnimatedLine";
import styles from "./modal-nav-bar.module.scss";

type ModalNavBarProps = {
  title: string;
  modalId: string;
  onClose: () => void;
};

const ModalNavBar = ({ title, modalId, onClose }: ModalNavBarProps) => {
  return (
    <motion.div className={styles.modalNavBar}>
      <motion.div className={styles.contents}>
        {/* Left side - empty for modal */}
        <motion.div className={styles.left} />

        {/* Center - title with layout animation */}
        <motion.div className={styles.center}>
          <motion.h2
            layoutId={`${modalId}-title`}
            className={styles.navTitle}
            transition={{
              duration: 2.35,
              ease: [0.4, 0, 0.2, 1],
            }}
          >
            {title}
          </motion.h2>
        </motion.div>

        {/* Right side - close button */}
        <motion.div className={styles.right}>
          <motion.button
            className={styles.closeButton}
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2, delay: 0.1 }}
            aria-label="Close modal"
          >
            ×
          </motion.button>
        </motion.div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.15 }}
      >
        <AnimatedLine
          className={styles.navbarBorder}
          borderWidth={5}
          horizontal
        />
      </motion.div>
    </motion.div>
  );
};

export default ModalNavBar;
