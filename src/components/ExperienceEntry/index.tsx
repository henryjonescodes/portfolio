import React from "react";
import { motion } from "framer-motion";
import styles from "./experience-entry.module.scss";
import TypewriterText from "../TypewriterText";
import AnimatedBorderBox from "../AnimatedBorderBox";

// Date formatter function
const formatDateRange = (startDate: Date, endDate?: Date): string => {
  const formatOptions: Intl.DateTimeFormatOptions = {
    month: "short",
    year: "numeric",
  };
  const start = startDate.toLocaleDateString("en-US", formatOptions);

  if (!endDate) {
    return `${start}`;
  }

  const sameYear = startDate.getFullYear() === endDate.getFullYear();
  const sameMonth = sameYear && startDate.getMonth() === endDate.getMonth();

  if (sameYear) {
    if (sameMonth) {
      return `${start}`;
    } else {
      const endMonth = endDate.toLocaleDateString("en-US", { month: "short" });
      return `${startDate.toLocaleDateString("en-US", {
        month: "short",
      })} - ${endMonth} ${startDate.getFullYear()}`;
    }
  } else {
    const end = endDate.toLocaleDateString("en-US", formatOptions);
    return `${start} - ${end}`;
  }
};

const borderVariants = {
  initial: {
    height: 0,
  },
  animate: {
    height: "100%",
    transition: {
      duration: 0.8,
      ease: "easeInOut",
    },
  },
  exit: {
    height: 0,
    transition: {
      duration: 0.6,
    },
  },
};

// ExperienceEntry component
type ExperienceEntryProps = {
  institution: string;
  title: string;
  description: string[];
  startDate: Date;
  endDate?: Date;
  borderWidth?: number;
  children?: React.ReactNode;
};

const ExperienceEntry = ({
  institution,
  title,
  description,
  startDate,
  endDate,
  borderWidth = 2.5,
  children,
}: ExperienceEntryProps) => {
  const dateRange = formatDateRange(startDate, endDate);

  return (
    <motion.div className={styles.entry}>
      <motion.span className={styles.header}>
        <motion.div className={styles.title}>
          <motion.h2>
            <TypewriterText text={institution} />
          </motion.h2>
          <motion.p>
            <TypewriterText text={dateRange} />
          </motion.p>
        </motion.div>
        <motion.div className={styles.subtitle}>
          <motion.h3>
            <TypewriterText text={title} />
          </motion.h3>
        </motion.div>
      </motion.span>

      <AnimatedBorderBox
        className={styles.box}
        contentClassName={styles.boxContent}
        borderWidth={borderWidth}
      >
        <motion.div className={styles.descriptionWrapper}>
          {description.map((desc, index) => (
            <motion.p key={index}>
              <TypewriterText text={desc} />
            </motion.p>
          ))}
        </motion.div>
        {children && (
          <motion.div
            className={styles.childrenWrapper}
            // style={{ borderWidth: `${borderWidth}px` }}
          >
            <motion.div
              className={styles.animatedBorder}
              variants={borderVariants}
              style={{ width: `${borderWidth}px` }}
            />
            {children}
          </motion.div>
        )}
      </AnimatedBorderBox>
    </motion.div>
  );
};

export default ExperienceEntry;
