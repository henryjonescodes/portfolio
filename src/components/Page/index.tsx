import cn from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import { ReactNode } from "react";
import { useParams } from "react-router-dom";
import TypewriterText from "../../components/TypewriterText";
import styles from "./page.module.scss";
import Background from "../Background";
import NavBar from "../NavBar";

// Animation variants
const pageVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.3,
      staggerChildren: 0.8,
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
  navigate: (path: string) => void;
  fullScreen?: boolean;
  visible: boolean;
  children?: ReactNode;
  setFullScreen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Page = ({
  navigate,
  visible = true,
  fullScreen = false,
  children,
  setFullScreen,
}: PageProps) => {
  const { page } = useParams<{ page: string }>();

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className={styles.page}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageVariants}
        >
          {fullScreen && (
            <motion.div
              className={styles.background}
              variants={backgroundVariants}
            >
              <Background />
            </motion.div>
          )}
          <NavBar setFullScreen={setFullScreen} fullScreen={fullScreen} />
          <motion.div
            className={cn(styles.content, {
              [styles.contentFullScreen]: fullScreen,
            })}
            key="pageContent"
            variants={pageVariants}
          >
            <motion.div className={styles.contentInner}>
              <AnimatePresence mode="wait">{children}</AnimatePresence>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Page;
