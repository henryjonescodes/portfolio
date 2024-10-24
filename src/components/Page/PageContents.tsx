import { motion, usePresence } from "framer-motion";
import { useMemo, ReactNode } from "react";
import classNames from "classnames";
import styles from "./page.module.scss";

// Define the props interface
export type PageContentsProps = {
  initialLoad?: boolean;
  className?: string; // Add an optional className prop
  fullScreen?: boolean;
};

type Props = {
  children: ReactNode;
} & PageContentsProps;

const PageContents: React.FC<Props> = ({
  children,
  initialLoad = false,
  className,
  fullScreen = true,
}) => {
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
          delayChildren: initialLoad ? 1 : fullScreen ? 0.2 : 0.2,
          staggerChildren: 0.5,
          // when: !fullScreen ? "beforeChildren" : null, // Ensure parent waits for children to enter
        },
      },
      exit: {
        // opacity: 0,
        transition: {
          duration: 1.5, // Control exit duration
          when: "afterChildren", // Ensure parent waits for children to exit
        },
      },
    }),
    [initialLoad]
  );

  return (
    <motion.div
      className={classNames(styles.pageContents, className)} // Merge classnames
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {children}
    </motion.div>
  );
};

export default PageContents;
