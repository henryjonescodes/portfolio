import cn from "classnames";
import { motion, LayoutGroup } from "framer-motion";
import React from "react";
import { useWindowDimensions } from "@context/WindowDimensionContext";
import { widthMobile } from "@styles/layout.constants.ts";
import TypewriterText from "@components/TypewriterText";
import AnimatedBorderBox from "@components/AnimatedBorderBox";
import AnimatedLine from "@components/AnimatedLine";
import ModalNavBar from "@components/NavBar/ModalNavBar";
import { ANIMATION_DURATIONS } from "@config/animations";
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

import type { ExperienceData } from "@data/experience";

type ExperienceEntryProps = {
  data: ExperienceData;
  borderWidth?: number;
  children?: React.ReactNode;
  entryRef?: React.RefObject<HTMLDivElement>;
  pageOpen?: boolean;
  inList?: boolean;
  isSelected?: boolean;
  overlayStyle?: React.CSSProperties;
  dateString?: string;
  onClose?: () => void;
} & (
  | {
      url?: string;
      onClick?: never;
    }
  | {
      onClick?: () => void;
      url?: never;
    }
);

// Animation variants for initial page paint-in
const entryTextVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: ANIMATION_DURATIONS.MODAL_TEXT_PAINT_DURATION,
      staggerChildren: ANIMATION_DURATIONS.MODAL_TEXT_STAGGER,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: ANIMATION_DURATIONS.MODAL_TEXT_PAINT_DURATION,
    },
  },
  // Modal states - start at animate state, no paint-in effect
  modalAnimate: {
    opacity: 1,
    transition: {
      duration: ANIMATION_DURATIONS.MODAL_TEXT_PAINT_DURATION,
    },
  },
  modalExit: {
    opacity: 1,
    transition: {
      duration: ANIMATION_DURATIONS.MODAL_TEXT_PAINT_DURATION,
    },
  },
};

// Modal container width/position animation
const modalContainerVariants = {
  animate: (
    overlayStyle: React.CSSProperties & {
      centeredTop?: number;
      centeredLeft?: number;
    }
  ) => ({
    width: overlayStyle.width,
    left: overlayStyle.left,
    top: overlayStyle.top,
  }),
  modalAnimate: (
    overlayStyle: React.CSSProperties & {
      centeredTop?: number;
      centeredLeft?: number;
    }
  ) => ({
    width: "70%",
    left: "15%", // Centers at 50%: 15% left + 70% width + 15% right
    top: overlayStyle.centeredTop,
  }),
  modalExit: (
    overlayStyle: React.CSSProperties & {
      centeredTop?: number;
      centeredLeft?: number;
    }
  ) => ({
    width: overlayStyle.width,
    left: overlayStyle.left,
    top: overlayStyle.top,
  }),
};

const ExperienceEntry = ({
  data,
  borderWidth = 2.5,
  children,
  dateString,
  url,
  onClick,
  entryRef,
  pageOpen = false,
  inList = false,
  isSelected = false,
  overlayStyle,
  onClose,
}: ExperienceEntryProps) => {
  const { id, title, subtitle, description, blurb, startDate, endDate } = data;
  const dateRange = dateString
    ? dateString
    : formatDateRange(startDate, endDate);
  const { width } = useWindowDimensions();
  const { embedded } = usePage();
  const isOpen = pageOpen && !inList;

  const containerContent = (
    <>
      <motion.div
        ref={entryRef}
        layout
        layoutId={id}
        className={cn(styles.entry, {
          [styles.fullScreen]: !embedded,
        })}
        onClick={onClick}
        style={onClick ? { cursor: "pointer" } : undefined}
        transition={{ duration: ANIMATION_DURATIONS.MODAL_CONTAINER }}
        initial={false}
        animate={{
          opacity: inList && isSelected ? 0 : !inList ? 1 : 1,
        }}
      >
        <motion.span
          layoutId="header"
          className={styles.header}
          transition={{ duration: 0 }}
        >
          <motion.div className={styles.title}>
            <motion.h2 layoutId="title">
              <TypewriterText text={title} />
            </motion.h2>
            {!!dateRange && (
              <motion.p
                layoutId="date"
                transition={{
                  duration: pageOpen
                    ? ANIMATION_DURATIONS.MODAL_DATE_OPEN
                    : ANIMATION_DURATIONS.MODAL_CONTAINER,
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
          {!inList && (
            <motion.div
              className={styles.background}
              initial={false}
              animate={{
                opacity: isOpen ? 0.8 : 0,
              }}
              transition={{ duration: ANIMATION_DURATIONS.MODAL_CONTAINER }}
            />
          )}
          <motion.div
            layoutId="body"
            className={styles.body}
            transition={{ duration: 0 }}
          >
            <motion.div
              layoutId="bodyContent"
              className={styles.descriptionWrapper}
              transition={{ duration: ANIMATION_DURATIONS.MODAL_CONTENT }}
              variants={entryTextVariants}
              initial={inList ? "initial" : "animate"}
              animate={inList ? "animate" : "modalAnimate"}
              exit={inList ? "exit" : "modalExit"}
            >
              {isOpen && <ModalNavBar title={title} onClose={onClose} />}
              <motion.div className={styles.descriptionContents}>
                {isOpen && (
                  <motion.div layoutId="bodyTitle">
                    <motion.h2 layoutId="title">
                      <TypewriterText text={title} />
                    </motion.h2>
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
                {isOpen && blurb && (
                  <motion.div
                    variants={entryTextVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{
                      delay: ANIMATION_DURATIONS.MODAL_BLURB_DELAY,
                    }}
                  >
                    <motion.p>
                      <TypewriterText text={blurb} />
                    </motion.p>
                  </motion.div>
                )}
              </motion.div>
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
                  <motion.div className={styles.children}>
                    {children}
                  </motion.div>
                )}
              </motion.div>
            )}
          </motion.div>
        </AnimatedBorderBox>
      </motion.div>
    </>
  );

  return (
    <LayoutGroup id={id}>
      {!inList && overlayStyle ? (
        <motion.div
          style={overlayStyle}
          custom={overlayStyle}
          variants={modalContainerVariants}
          initial="animate"
          animate="modalAnimate"
          exit="modalExit"
          drag
          dragMomentum={false}
          dragElastic={0.1}
          dragConstraints={{
            top: -1000,
            left: -1000,
            right: 1000,
            bottom: 1000,
          }}
        >
          {containerContent}
        </motion.div>
      ) : (
        containerContent
      )}
    </LayoutGroup>
  );
};

export default ExperienceEntry;
