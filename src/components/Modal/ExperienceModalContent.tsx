import { motion } from "framer-motion";
import React from "react";
import AnimatedBorderBox from "@components/AnimatedBorderBox";
import ModalNavBar from "./ModalNavBar";
import { useModal } from "@context/ModalContext";
import styles from "./modal.module.scss";

type ExperienceModalContentProps = {
  title: string;
  subtitle?: string;
  dateRange: string | null;
  description: string[];
  children?: React.ReactNode;
  isExpanded: boolean;
  modalId: string;
  borderWidth?: number;
  onClose: () => void;
};

const ExperienceModalContent = ({
  title,
  subtitle,
  dateRange,
  description,
  children,
  isExpanded,
  modalId,
  borderWidth = 2.5,
  onClose,
}: ExperienceModalContentProps) => {
  const { modalState, toggleFullscreen } = useModal();
  return (
    <motion.div className={styles.modalWrapper}>
      {/* Absolute border SVG wrapping entire modal */}
      <motion.svg
        className={styles.modalBorderSvg}
        xmlns="http://www.w3.org/2000/svg"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      >
        <motion.rect
          x={borderWidth / 2}
          y={borderWidth / 2}
          rx={20}
          ry={20}
          width="calc(100% - 5px)"
          height="calc(100% - 5px)"
          fill="transparent"
          strokeWidth={borderWidth}
          stroke="var(--foreground-primary)"
          layoutId={`${modalId}-border`}
          layout
          // transition={{
          //   duration: 2.35,
          //   ease: [0.4, 0, 0.2, 1],
          // }}
        />
      </motion.svg>

      <ModalNavBar
        title={title}
        modalId={modalId}
        isFullscreen={modalState.isFullscreen}
        onClose={onClose}
        onToggleFullscreen={toggleFullscreen}
      />

      {/* Header - date and subtitle matching entry header structure */}
      <motion.div className={styles.modalHeader}>
        {dateRange && (
          <motion.p layoutId={`${modalId}-date`} className={styles.modalDate}>
            {dateRange}
          </motion.p>
        )}
        {subtitle && (
          <motion.h3
            layoutId={`${modalId}-subtitle`}
            className={styles.modalSubtitle}
          >
            {subtitle}
          </motion.h3>
        )}
      </motion.div>

      {/* Content - descriptions and children matching entry box content */}
      <motion.div className={styles.modalContent}>
        {description.map((desc, index) => (
          <motion.p
            key={index}
            layoutId={`${modalId}-desc-${index}`}
            className={styles.modalDescription}
          >
            {desc}
          </motion.p>
        ))}
        {children && (
          <motion.div
            layoutId={`${modalId}-children`}
            className={styles.modalChildren}
          >
            {children}
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default ExperienceModalContent;
