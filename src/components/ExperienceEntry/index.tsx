import cn from "classnames";
import { motion } from "framer-motion";
import React, { useRef } from "react";
import { useWindowDimensions } from "@context/WindowDimensionContext";
import { widthMobile } from "@styles/layout.constants.ts";
import TypewriterText from "@components/TypewriterText";
import AnimatedBorderBox from "@components/AnimatedBorderBox";
import AnimatedLine from "@components/AnimatedLine";
import styles from "./experience-entry.module.scss";
import { useModal } from "@context/ModalContext";
import ExperienceModalContent from "@components/Modal/ExperienceModalContent";

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
  title: string;
  subtitle?: string;
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

// TODO: discriminated union type for the props, see dates
const ExperienceEntry = ({
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
}: ExperienceEntryProps) => {
  const dateRange = dateString
    ? dateString
    : formatDateRange(startDate, endDate);
  const { width } = useWindowDimensions();
  const { embedded } = usePage();
  const { openModal, closeModal, modalState } = useModal();
  const entryRef = useRef<HTMLDivElement>(null);

  const modalId = `experience-${title.replace(/\s+/g, '-')}`;

  const handleBoxClick = (e: React.MouseEvent) => {
    // Only open modal if onClick is provided and we're not clicking a link
    if (onClick && !url) {
      onClick();
    } else if (!url && !onClick) {
      // Open modal for viewing details - use entire entry as source
      openModal(
        modalId,
        <ExperienceModalContent
          title={title}
          subtitle={subtitle}
          dateRange={dateRange}
          description={description}
          children={children}
          isExpanded={modalState.isExpanded}
          modalId={modalId}
          borderWidth={borderWidth}
          onClose={closeModal}
        />,
        entryRef.current!
      );
    }
  };

  return (
    <motion.div
      ref={entryRef}
      className={cn(styles.entry, {
        [styles.fullScreen]: !embedded,
      })}
    >
      <motion.span className={styles.header}>
        <motion.div className={styles.title}>
          {url ? (
            <motion.h2>
              <a href={url} target="_blank" className={styles.linkText}>
                <TypewriterText text={title} />
              </a>
            </motion.h2>
          ) : onClick ? (
            <motion.h2 onClick={onClick} className={styles.linkText}>
              <TypewriterText text={title} />
            </motion.h2>
          ) : (
            <motion.h2 layoutId={`${modalId}-title`}>
              <TypewriterText text={title} />
            </motion.h2>
          )}
          {!!dateRange && (
            <motion.p layoutId={!url ? `${modalId}-date` : undefined}>
              {dateRange}
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
            <motion.h3 layoutId={`${modalId}-subtitle`}>
              <TypewriterText text={subtitle} />
            </motion.h3>
          </motion.div>
        )}
      </motion.span>

      <AnimatedBorderBox
        className={styles.box}
        contentClassName={styles.boxContent}
        borderWidth={borderWidth}
        onClick={!url ? handleBoxClick : undefined}
        style={!url ? { cursor: "pointer" } : undefined}
        layoutId={!url ? `${modalId}-border` : undefined}
      >
        <motion.div
          className={styles.descriptionWrapper}
          variants={entryTextVariants}
        >
          {description.map((desc, index) => (
            <motion.p key={index} layoutId={!url ? `${modalId}-desc-${index}` : undefined}>
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
              <motion.div className={styles.children} layoutId={`${modalId}-children`}>
                {children}
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatedBorderBox>
    </motion.div>
  );
};

export default ExperienceEntry;
