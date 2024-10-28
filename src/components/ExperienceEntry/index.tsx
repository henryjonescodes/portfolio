import React from "react";
import { motion } from "framer-motion";
import styles from "./experience-entry.module.scss";
import TypewriterText from "../TypewriterText";
import AnimatedBorderBox from "../AnimatedBorderBox";
import AnimatedLine from "../AnimatedLine";
import { useWindowDimensions } from "../../context/WindowDimensionContext";
import { widthMobile } from "../../styles/layout.constants";

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

type ExperienceEntryProps = {
  institution: string;
  title?: string;
  description: string[];
  borderWidth?: number;
  children?: React.ReactNode;
} & (
  | {
      dateString?: string;
      startDate?: never;
      endDate?: never;
    }
  | {
      startDate: Date;
      endDate?: Date;
      dateString?: never;
    }
);

const ExperienceEntry = ({
  institution,
  title,
  description,
  startDate,
  endDate,
  borderWidth = 2.5,
  children,
  dateString,
}: ExperienceEntryProps) => {
  const dateRange = startDate
    ? formatDateRange(startDate, endDate)
    : dateString;

  const { width } = useWindowDimensions();

  return (
    <motion.div className={styles.entry}>
      <motion.span className={styles.header}>
        <motion.div className={styles.title}>
          <motion.h2>
            <TypewriterText text={institution} />
          </motion.h2>
          {!!dateRange && (
            <motion.p>
              <TypewriterText text={dateRange} />
            </motion.p>
          )}
        </motion.div>
        {!!title && (
          <motion.div className={styles.subtitle}>
            <motion.h3>
              <TypewriterText text={title} />
            </motion.h3>
          </motion.div>
        )}
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
          <motion.div className={styles.childrenWrapper}>
            <AnimatedLine
              borderWidth={borderWidth}
              horizontal={width < widthMobile}
              className={styles.line}
            />
            <motion.div className={styles.children}>{children}</motion.div>
          </motion.div>
        )}
      </AnimatedBorderBox>
    </motion.div>
  );
};

export default ExperienceEntry;
