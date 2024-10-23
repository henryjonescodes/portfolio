import { motion } from "framer-motion";
import { useMemo, ReactNode } from "react";
import styles from "./page.module.scss";

// Define the props interface
export type PageContentsProps = {
  initialLoad: boolean;
};

type Props = {
  children: ReactNode;
} & PageContentsProps;

const PageContents: React.FC<Props> = ({ children, initialLoad }) => {
  // Memoized variants based on initialLoad
  const pageVariants = useMemo(
    () => ({
      initial: {
        opacity: 0,
      },
      animate: {
        opacity: 1,
        transition: {
          delay: initialLoad ? 2 : 0.5,
          delayChildren: initialLoad ? 2 : 0.5,
          staggerChildren: 0.5,
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
      className={styles.pageContents}
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
