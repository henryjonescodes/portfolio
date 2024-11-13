import classNames from "classnames";
import { motion } from "framer-motion";
import { ReactNode, useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSettings } from "../../context/SettingsContext";
import styles from "./page.module.scss";
import { folder, useControls } from "leva";

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
  const { animationDisabled, zoomLevel } = useSettings();
  const [delayedPage, setDelayedPage] = useState(page);

  const {
    transitionDuration,
    exitDuration,
    staggerChildren,
    fullscreenDelay,
    notFullscreenDelay,
  } = useControls({
    PageContentsTransition: folder(
      {
        transitionDuration: { value: 0.1, min: 0, max: 0.5, step: 0.1 },
        exitDuration: { value: 0.1, min: 0, max: 0.5, step: 0.1 },
        staggerChildren: { value: 0.5, min: 0, max: 1, step: 0.1 },
        fullscreenDelay: { value: 0.3, min: 0, max: 2, step: 0.1 },
        notFullscreenDelay: { value: 0.3, min: 0, max: 2, step: 0.1 },
      },
      { collapsed: true }
    ),
  });

  useEffect(() => {
    let timerDur = 100;
    if (animationDisabled) {
      timerDur = 100;
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
        transition: {
          duration: transitionDuration, // Controlled by Leva
          delay:
            zoomLevel === "fullscreen" ? fullscreenDelay : notFullscreenDelay, // Controlled by Leva
          delayChildren:
            zoomLevel === "fullscreen" ? fullscreenDelay : notFullscreenDelay, // Controlled by Leva
          staggerChildren: staggerChildren, // Controlled by Leva
        },
      },
      exit: {
        transition: {
          duration: exitDuration, // Controlled by Leva
          when: "afterChildren", // Ensure parent waits for children to exit
        },
      },
    }),
    [
      transitionDuration,
      fullscreenDelay,
      notFullscreenDelay,
      staggerChildren,
      exitDuration,
      zoomLevel,
    ]
  );

  const minimalPageVariants = {
    animate: {
      opacity: 0,
    },
    shown: {
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
    removed: {
      opacity: 0,
      transition: {
        when: "beforeChildren",
      },
    },
  };

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
