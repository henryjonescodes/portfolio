import { motion } from "framer-motion";
import React from "react";
import AnimatedLine from "@components/AnimatedLine";
import NavBarButton from "@components/NavBar/NavBarButton";
import Expand from "@assets/svg/icons/expand.svg?react";
import Compress from "@assets/svg/icons/handheld.svg?react";
import styles from "./modal-nav-bar.module.scss";

type ModalNavBarProps = {
  title: string;
  modalId: string;
  isFullscreen: boolean;
  onClose: () => void;
  onToggleFullscreen: () => void;
};

const ModalNavBar = ({
  title,
  modalId,
  isFullscreen,
  onClose,
  onToggleFullscreen,
}: ModalNavBarProps) => {
  // Shared transition config matching ExperienceModalContent
  const layoutTransition = {
    duration: 0.35,
    ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
  };

  return (
    <motion.div className={styles.modalNavBar}>
      <AnimatedLine
        className={styles.navbarBorder}
        borderWidth={5}
        horizontal
      />

      <motion.div className={styles.contents}>
        {/* Left side - empty for modal */}
        <motion.div className={styles.left} />

        {/* Center - title with layout animation */}
        <motion.div className={styles.center}>
          <motion.h2
            layoutId={`${modalId}-title`}
            className={styles.navTitle}
            transition={layoutTransition}
          >
            {title}
          </motion.h2>
        </motion.div>

        {/* Right side - expand and close buttons */}
        <motion.div className={styles.right}>
          <NavBarButton
            onClick={onToggleFullscreen}
            active={isFullscreen}
            Icon={Expand}
            ActiveIcon={Compress}
          />
          <motion.button
            className={styles.closeButton}
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            // transition={{ duration: 0.2, delay: 0.1 }}
            aria-label="Close modal"
          >
            ×
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ModalNavBar;
