import { motion } from "framer-motion";
import React from "react";
import styles from "./modal.module.scss";

type ExperienceModalContentProps = {
  title: string;
  dateRange: string | null;
  isExpanded: boolean;
  modalId: string;
};

const ExperienceModalContent = ({
  title,
  dateRange,
  isExpanded,
  modalId,
}: ExperienceModalContentProps) => {
  return (
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
      </motion.div>
      {isExpanded && (
        <motion.div
          className={styles.modalBody}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2, delay: 0.15 }}
        >
          {/* Future: Add description and other content here */}
        </motion.div>
      )}
    </motion.div>
  );
};

export default ExperienceModalContent;
