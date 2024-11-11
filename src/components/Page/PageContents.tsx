import classNames from "classnames";
import { motion } from "framer-motion";
import { ReactNode, useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSettings } from "../../context/SettingsContext";
import styles from "./page.module.scss";

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
  const { animationDisabled } = useSettings();
  const [delayedPage, setDelayedPage] = useState(page);

  useEffect(() => {
    let timerDur = 500;
    if (animationDisabled) {
      timerDur = 1000;
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
          duration: 0.1, // Control exit duration
          delay: 0,
          delayChildren: 0,
          staggerChildren: 0.5,
        },
      },
      exit: {
        transition: {
          duration: 0.1, // Control exit duration
          when: "afterChildren", // Ensure parent waits for children to exit
        },
      },
    }),
    []
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
