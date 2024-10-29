import cn from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { NavigateFunction } from "react-router-dom";
import AnimatedOutlet from "../AnimatedOutlet";
import Background from "../Background";
import NavBar from "../NavBar";
import styles from "./page.module.scss";

// Animation variants
const pageVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.3,
      staggerChildren: 0.4,
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
      delay: 0,
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
  navigate: NavigateFunction;
  fullScreen?: boolean;
  visible: boolean;
  setFullScreen: React.Dispatch<React.SetStateAction<boolean>>;
  page: string | undefined;
};

const Page = ({
  navigate,
  visible = true,
  fullScreen = false,
  setFullScreen,
  page,
}: PageProps) => {
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const scrollToTop = () => {
      if (contentRef.current) {
        setTimeout(() => {
          contentRef.current?.scrollTo(0, 0);
        }, 1500);
      }
    };
    scrollToTop();
  }, [page]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key={"page"}
          className={cn(styles.page, { [styles.pageHandheld]: !fullScreen })}
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
          <NavBar
            setFullScreen={setFullScreen}
            fullScreen={fullScreen}
            navigate={navigate}
            page={page}
          />
          <motion.div
            className={cn(styles.content, {
              [styles.contentFullScreen]: fullScreen,
            })}
            key="pageContent"
            variants={pageVariants}
            ref={contentRef}
          >
            <motion.div className={styles.contentInner}>
              <AnimatePresence mode="wait">
                <AnimatedOutlet key={page} />
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Page;
