import classNames from "classnames";
import { motion } from "framer-motion";
import { ReactNode, useEffect, useMemo, useState } from "react";
import styles from "./page.module.scss";
import { useLocation } from "react-router-dom";
import { useSettings } from "../../context/SettingsContext";

// Define the props interface
export type PageContentsProps = {
  className?: string; // Add an optional className prop
  fullScreen?: boolean;
};

type Props = {
  children: ReactNode;
} & PageContentsProps;

const PageContents: React.FC<Props> = ({
  children,
  className,
  fullScreen = true,
}) => {
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);
  const page = pathSegments[0];
  const { animationDisabled } = useSettings();

  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    if (page !== undefined) {
      setInitialLoad(false);
    } else {
      setInitialLoad(true);
    }
  }, [page]);

  // Memoized variants based on initialLoad
  const pageVariants = useMemo(
    () => ({
      initial: {
        opacity: 0,
      },
      animate: {
        opacity: 1,
        transition: {
          delay: initialLoad ? 1 : fullScreen ? 0.2 : 0.2,
          delayChildren: initialLoad ? 1 : fullScreen ? 1.2 : 0.2,
          staggerChildren: 0.5,
        },
      },
      exit: {
        transition: {
          duration: 1.5, // Control exit duration
          when: "afterChildren", // Ensure parent waits for children to exit
        },
      },
    }),
    [initialLoad]
  );

  const minimalPageVariants = {
    animate: {
      opacity: 0,
    },
    shown: {
      opacity: 1,
      transition: {
        // when: "afterChildren",
        delay: 0.5,
        duration: 1.3,
      },
    },
    removed: {
      opacity: 0,
      transition: {
        // when: "beforeChildren",
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
  }, [page]);

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
