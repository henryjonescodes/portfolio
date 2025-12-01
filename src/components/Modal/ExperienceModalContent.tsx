import { motion } from "framer-motion";
import React from "react";
import AnimatedBorderBox from "@components/AnimatedBorderBox";
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
}: ExperienceModalContentProps) => {
  return (
    <AnimatedBorderBox
      borderWidth={borderWidth}
      layoutId={`${modalId}-border`}
      className={styles.modalBorderBox}
    >
      <motion.div className={styles.modalContent}>
        <motion.div className={styles.modalHeader}>
          <motion.h2
            layoutId={`${modalId}-title`}
            className={styles.modalTitle}
          >
            {title}
          </motion.h2>
          {dateRange && (
            <motion.p
              layoutId={`${modalId}-date`}
              className={styles.modalDate}
            >
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
        <motion.div className={styles.modalBody}>
          {description.map((desc, index) => (
            <motion.p
              key={index}
              layoutId={`${modalId}-desc-${index}`}
              className={styles.modalDescription}
            >
              {desc}
            </motion.p>
          ))}
        </motion.div>
        {children && (
          <motion.div layoutId={`${modalId}-children`} className={styles.modalChildren}>
            {children}
          </motion.div>
        )}
      </motion.div>
    </AnimatedBorderBox>
  );
};

export default ExperienceModalContent;
