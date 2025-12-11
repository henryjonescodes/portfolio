import cn from "classnames";
import { motion, LayoutGroup } from "framer-motion";
import React from "react";
import { useWindowDimensions } from "@context/WindowDimensionContext";
import { widthMobile } from "@styles/layout.constants.ts";
import TypewriterText from "@components/TypewriterText";
import AnimatedBorderBox from "@components/AnimatedBorderBox";
import AnimatedLine from "@components/AnimatedLine";
import styles from "./experience-entry.module.scss";

import { usePage } from "@components/Page";

const formatDateRange = (startDate?: Date, endDate?: Date): string | null => {
  const formatOptions: Intl.DateTimeFormatOptions = {
    month: "short",
    year: "numeric",
  };

  if (!startDate && endDate) {
    return endDate.toLocaleDateString("en-US", formatOptions);
  }
  if (startDate && !endDate) {
    return `${startDate.toLocaleDateString("en-US", formatOptions)} - Present`;
  }
  if (!startDate || !endDate) {
    return null;
  }

  const sameYear = startDate.getFullYear() === endDate.getFullYear();
  const sameMonth = sameYear && startDate.getMonth() === endDate.getMonth();

  if (sameMonth) {
    return startDate.toLocaleDateString("en-US", formatOptions);
  }
  if (sameYear) {
    const startMonth = startDate.toLocaleDateString("en-US", {
      month: "short",
    });
    const endMonth = endDate.toLocaleDateString("en-US", { month: "short" });
    return `${startMonth} - ${endMonth} ${startDate.getFullYear()}`;
  }

  // Different years
  const start = startDate.toLocaleDateString("en-US", formatOptions);
  const end = endDate.toLocaleDateString("en-US", formatOptions);
  return `${start} - ${end}`;
};

type ExperienceEntryProps = {
  id: string;
  title: string;
  subtitle?: string;
  description: string[];
  borderWidth?: number;
  children?: React.ReactNode;
  entryRef?: React.RefObject<HTMLDivElement>;
  pageOpen?: boolean;
  inList?: boolean;
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
        startDate?: Date;
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

const ANIMATION_DURATION = 0.35;

// TODO: discriminated union type for the props, see dates
const ExperienceEntry = ({
  id,
  title,
  subtitle,
  description,
  startDate,
  endDate,
  borderWidth = 2.5,
  children,
  dateString,
  url,
  onClick,
  entryRef,
  pageOpen = false,
  inList = false,
}: ExperienceEntryProps) => {
  const dateRange = dateString
    ? dateString
    : formatDateRange(startDate, endDate);
  const { width } = useWindowDimensions();
  const { embedded } = usePage();
  const isOpen = pageOpen && !inList;

  return (
    <LayoutGroup id={id}>
      <motion.div
        ref={entryRef}
        layout
        layoutId={id}
        className={cn(styles.entry, {
          [styles.fullScreen]: !embedded,
        })}
        onClick={onClick}
        style={onClick ? { cursor: "pointer" } : undefined}
        transition={{ duration: ANIMATION_DURATION }}
      >
        <motion.span
          layoutId="header"
          className={styles.header}
          transition={{ duration: 0 }}
        >
          <motion.div className={styles.title}>
            {url ? (
              <motion.h2>
                <a href={url} target="_blank" className={styles.linkText}>
                  <TypewriterText text={title} />
                </a>
              </motion.h2>
            ) : (
              <motion.h2 layoutId="title">
                <TypewriterText text={title} />
              </motion.h2>
            )}
            {!!dateRange && (
              <motion.p
                layoutId="date"
                transition={{
                  duration: pageOpen
                    ? ANIMATION_DURATION * 1.1
                    : ANIMATION_DURATION,
                }}
              >
                <TypewriterText text={dateRange} />
              </motion.p>
            )}
          </motion.div>
          {!!subtitle && (
            <motion.div
              className={styles.subtitle}
              animate={{
                transition: {
                  delay: 0.5,
                },
              }}
            >
              <motion.h3 layoutId="subtitle">
                <TypewriterText text={subtitle} />
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
          layoutId="body"
          className={styles.body}
          transition={{ duration: 0 }}
        >
          <motion.div
            layoutId="bodyContent"
            className={styles.descriptionWrapper}
            transition={{ duration: ANIMATION_DURATION * 0.9 }}
            variants={entryTextVariants}
          >
            {isOpen && (
              <motion.div layoutId="bodyTitle">
                <motion.h2 layoutId="title">{title}</motion.h2>
                {!!subtitle && (
                  <motion.h3 layoutId="subtitle">{subtitle}</motion.h3>
                )}
                {!!dateRange && (
                  <motion.p layoutId="date">{dateRange}</motion.p>
                )}
              </motion.div>
            )}
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
        </motion.div>
      </AnimatedBorderBox>
    </motion.div>
    </LayoutGroup>
  );
};

export default ExperienceEntry;
