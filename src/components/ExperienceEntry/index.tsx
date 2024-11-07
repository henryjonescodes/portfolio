import React from "react";
import { motion } from "framer-motion";
import styles from "./experience-entry.module.scss";
import TypewriterText from "../3D/TypewriterText";
import AnimatedBorderBox from "../AnimatedBorderBox";
import AnimatedLine from "../AnimatedLine";
import { useWindowDimensions } from "../../context/WindowDimensionContext";
import { widthMobile } from "../../styles/layout.constants";
import cn from "classnames";

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
      url?: string;
      onClick?: never;
    }
  | {
      onClick?: () => void;
      url?: never;
    }
) &
  (
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

// Animation variants
const entryTextVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.3,
      staggerChildren: 0.6,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.3,
    },
  },
};

const ExperienceEntry = ({
  institution,
  title,
  description,
  startDate,
  endDate,
  borderWidth = 2.5,
  children,
  dateString,
  url,
  onClick,
}: ExperienceEntryProps) => {
  const dateRange = startDate
    ? formatDateRange(startDate, endDate)
    : dateString;
  const { width } = useWindowDimensions();

  return (
    <motion.div className={styles.entry}>
      <motion.span className={styles.header}>
        <motion.div className={styles.title}>
          {url ? (
            <motion.h2>
              <a href={url} target="_blank" className={styles.linkText}>
                <TypewriterText text={institution} />
              </a>
            </motion.h2>
          ) : onClick ? (
            <motion.h2 onClick={onClick} className={styles.linkText}>
              <TypewriterText text={institution} />
            </motion.h2>
          ) : (
            <motion.h2>
              <TypewriterText text={institution} />
            </motion.h2>
          )}
          {!!dateRange && (
            <motion.p>
              <TypewriterText text={dateRange} />
            </motion.p>
          )}
        </motion.div>
        {!!title && (
          <motion.div
            className={styles.subtitle}
            animate={{
              transition: {
                delay: 0.5,
              },
            }}
          >
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
        <motion.div
          className={styles.descriptionWrapper}
          variants={entryTextVariants}
        >
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
            {url ? (
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(styles.children, styles.linkArea)}
              >
                {children}
              </a>
            ) : onClick ? (
              <motion.div
                onClick={onClick}
                className={cn(styles.children, styles.linkArea)}
                style={{ cursor: "pointer" }}
              >
                {children}
              </motion.div>
            ) : (
              <motion.div className={styles.children}>{children}</motion.div>
            )}
          </motion.div>
        )}
      </AnimatedBorderBox>
    </motion.div>
  );
};

export default ExperienceEntry;
