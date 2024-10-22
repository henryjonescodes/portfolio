import cn from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import { ReactNode } from "react";
import Background from "./Background";
import styles from "./components.module.scss";

// Define the variants for the animation
const pageContentVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.3,
      delay: 0.5,
      staggerChildren: 0.2,
      delayChildren: 3.1, // Optional: Delay the start of child animations
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.3,
    },
  },
};

type PageProps = {
  fullScreen?: boolean;
  children?: ReactNode;
  visible: boolean;
};

const Page = ({ visible, fullScreen = false, children }: PageProps) => {
  return (
    <AnimatePresence>
      {visible && (
        <>
          <motion.div
            className={cn(styles.page, { [styles.pageFullScreen]: fullScreen })}
            key="pageContent"
            // variants={pageContentVariants} // Use variants for animation
            // initial="initial"
            // animate="animate"
            // exit="exit"
          >
            {fullScreen && <Background />}
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Page;
