import cn from "classnames";
import { motion, LayoutGroup } from "framer-motion";
import React, { useRef } from "react";
import { useWindowDimensions } from "@context/WindowDimensionContext";
import { widthMobile } from "@styles/layout.constants.ts";
import TypewriterText from "@components/TypewriterText";
import AnimatedBorderBox from "@components/AnimatedBorderBox";
import AnimatedLine from "@components/AnimatedLine";
import NavBarButton from "@components/NavBar/NavBarButton";
import Expand from "@assets/svg/icons/expand.svg?react";
import Compress from "@assets/svg/icons/handheld.svg?react";
import styles from "./experience-entry.module.scss";
import { useModal } from "@context/ModalContext";

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
  isExpanded?: boolean; // New prop for modal mode
  onClose?: () => void; // For closing modal
} & (
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
  isExpanded = false,
  onClose,
}: ExperienceEntryProps) => {
  const dateRange = dateString
    ? dateString
    : formatDateRange(startDate, endDate);
  const { width } = useWindowDimensions();
  const { embedded } = usePage();
  const { openModal, closeModal, modalState, toggleFullscreen } = useModal();
  const entryRef = useRef<HTMLDivElement>(null);

  const modalId = `experience-${title.replace(/\s+/g, "-")}`;

  // Base animation duration
  const ANIMATION_DURATION = 3.35;

  const handleBoxClick = (e: React.MouseEvent) => {
    if (!isExpanded) {
      // Open modal for viewing details - render same component in expanded mode
      openModal(
        modalId,
        <ExperienceEntry
          title={title}
          subtitle={subtitle}
          description={description}
          children={children}
          isExpanded={true}
          onClose={closeModal}
          borderWidth={borderWidth}
          startDate={startDate}
          endDate={endDate}
          dateString={dateString}
        />,
        entryRef.current!
      );
    }
  };

  return (
    <LayoutGroup id={modalId}>
      <motion.div
        ref={entryRef}
        layout
        layoutId={modalId}
        className={cn(styles.entry, {
          [styles.fullScreen]: !embedded,
          [styles.modal]: isExpanded,
        })}
        transition={{ duration: ANIMATION_DURATION }}
        style={{
          // background: "red",
          originX: 0,
          originY: 1,
          ...(isExpanded && {
            width: "600px",
          }),
        }}
      >
        {/* Navbar for expanded mode */}
        {/* {isExpanded && (
          <motion.div className={styles.modalNavbar}>
            <motion.div className={styles.navContents}>
              <motion.div className={styles.navLeft} />
              <motion.div className={styles.navCenter}>
                <motion.h2
                  layoutId={`${modalId}-title`}
                  className={styles.navTitle}
                  transition={layoutTransition}
                >
                  {title}
                </motion.h2>
              </motion.div>
              <motion.div className={styles.navRight}>
                <NavBarButton
                  onClick={toggleFullscreen}
                  active={modalState.isFullscreen}
                  Icon={Expand}
                  ActiveIcon={Compress}
                />
                <motion.button
                  className={styles.closeButton}
                  onClick={onClose}
                  aria-label="Close modal"
                >
                  ×
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
        )} */}

        <motion.span
          className={styles.header}
          layoutId={`${modalId}-header`}
          style={{ background: "pink" }}
          // transition={{ duration: ANIMATION_DURATION * 1.5 }}

          // transition={{ duration: 0 }}
        >
          <motion.div
            className={styles.title}
            // layoutId={`${modalId}-titleWrapper`}
          >
            <motion.h2
              layoutId={`${modalId}-title`}
              // transition={{ duration: 0 }}
            >
              <TypewriterText text={title} />
            </motion.h2>
            {!!dateRange && (
              <motion.p
                layoutId={`${modalId}-date`}
                // transition={{ duration: 0 }}
              >
                <TypewriterText text={dateRange} />
              </motion.p>
            )}
          </motion.div>
          {!!subtitle && (
            <motion.div
              className={styles.subtitle}
              // animate={{
              //   transition: {
              //     delay: 0.5,
              //   },
              // }}
            >
              <motion.h3
                layoutId={`${modalId}-subtitle`}
                // transition={{ duration: 0 }}
              >
                <TypewriterText text={subtitle} />
              </motion.h3>
            </motion.div>
          )}
        </motion.span>

        <AnimatedBorderBox
          className={styles.box}
          contentClassName={styles.boxContent}
          borderWidth={borderWidth}
          onClick={handleBoxClick}
          style={{ cursor: "pointer", background: "green" }}
          layoutId={`${modalId}-border`}
        >
          <motion.div
            className={styles.descriptionWrapper}
            style={{ background: "blue" }}
            layoutId={`${modalId}-body`}
            // transition={{ duration: 0 }}
            variants={entryTextVariants}
          >
            {description.map((desc, index) => (
              <motion.p
                key={index}
                layoutId={`${modalId}-desc-${index}`}
                // transition={{ duration: 0 }}
              >
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
              <motion.div
                className={styles.children}
                layoutId={`${modalId}-children`}
                // transition={{ duration: 0 }}
              >
                {children}
              </motion.div>
            </motion.div>
          )}
        </AnimatedBorderBox>
      </motion.div>
    </LayoutGroup>
  );
};

export default ExperienceEntry;
