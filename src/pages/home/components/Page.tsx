import cn from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import { ReactNode } from "react";
import Background from "./Background";
import styles from "./components.module.scss";
import { useParams } from "react-router-dom";
import TypewriterText from "../../../components/TypewriterText";

// Define the variants for the animation
const pageContentVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.3,
      delay: 1,
      staggerChildren: 0.2,
      delayChildren: 0.1, // Optional: Delay the start of child animations
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.3,
    },
  },
};

const navBarVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.6,
      delay: 1.2,
      staggerChildren: 0.2,
      delayChildren: 2.1, // Optional: Delay the start of child animations
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.3,
    },
  },
};

const backgroundVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.6,
      delay: 1.2,
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
  const { page } = useParams<{ page: string }>();

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className={styles.page}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {fullScreen && (
            <motion.div variants={backgroundVariants}>
              <Background />
            </motion.div>
          )}
          <motion.span
            className={styles.navigationBar}
            variants={navBarVariants}
          >
            <motion.h3>
              <TypewriterText
                text={`$henry-jones/${page}`}
                staggerChildren={0.09}
              />
            </motion.h3>
          </motion.span>
          <motion.div
            className={cn(styles.contents, {
              [styles.contentsFullScreen]: fullScreen,
            })}
            key="pageContent"
            variants={pageContentVariants}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Page;
