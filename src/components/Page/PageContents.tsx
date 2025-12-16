import classNames from "classnames";
import { motion } from "framer-motion";
import { ReactNode, useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSettings } from "@context/SettingsContext";
import { useAnimations } from "@context/AnimationContext";
import styles from "./page.module.scss";
import { usePage } from "@context/PageContext";

// Define the props interface
export type PageContentsProps = {
  className?: string; // Add an optional className prop
};

type Props = {
  children: ReactNode;
} & PageContentsProps;

const PageContents: React.FC<Props> = ({ children, className }) => {
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);
  const page = pathSegments[0];
  const [delayedPage, setDelayedPage] = useState(page);
  const { animationDisabled } = useSettings();
  const { embedded } = usePage();
  const { TRANSITIONS } = useAnimations();

  useEffect(() => {
    let timerDur = 400;
    if (animationDisabled) {
      timerDur = 400;
    }
    const timer = setTimeout(() => setDelayedPage(`${page}`), timerDur);
    return () => clearTimeout(timer); // Clean up on unmount or page change
  }, [page, animationDisabled]);

  const pageVariants = useMemo(
    () => ({
      initial: {
        opacity: 0,
      },
      animate: {
        opacity: 1,
        transition: !embedded
          ? TRANSITIONS.PAGE_CONTENTS.FULLSCREEN_ANIMATE
          : TRANSITIONS.PAGE_CONTENTS.EMBEDDED_ANIMATE,
      },
      exit: {
        opacity: 0,
        transition: TRANSITIONS.PAGE_CONTENTS.EXIT,
      },
    }),
    [embedded, TRANSITIONS]
  );

  const minimalPageVariants = useMemo(
    () => ({
      animate: {
        opacity: 0,
      },
      shown: {
        opacity: 1,
        transition: TRANSITIONS.PAGE_CONTENTS.MINIMAL_SHOWN,
      },
      removed: {
        opacity: 0,
        transition: TRANSITIONS.PAGE_CONTENTS.MINIMAL_REMOVED,
      },
    }),
    [TRANSITIONS]
  );

  const { initial, animate, exit, variants } = useMemo(() => {
    if (animationDisabled) {
      return {
        initial: "animate",
        animate: "shown",
        exit: "removed",
        variants: minimalPageVariants,
      };
    }
    return {
      initial: "initial",
      animate: "animate",
      exit: "exit",
      variants: pageVariants,
    };
  }, [delayedPage]);

  return (
    <motion.div
      className={classNames(styles.pageContents, className)} // Merge classnames
      variants={variants}
      initial={initial}
      animate={animate}
      exit={exit}
    >
      {children}
    </motion.div>
  );
};

export default PageContents;
