import cn from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSettings } from "../../context/SettingsContext";
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

const Page = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);
  const page = pathSegments[0];

  const contentRef = useRef<HTMLDivElement | null>(null);
  const { zoomLevel } = useSettings();

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
      <motion.div
        key={"page"}
        className={cn(styles.page, {
          [styles.pageHandheld]: zoomLevel !== "fullscreen",
          [styles.pageDisabled]: zoomLevel === "info",
        })}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
      >
        {zoomLevel === "fullscreen" && (
          <motion.div
            className={styles.background}
            variants={backgroundVariants}
          >
            <Background />
          </motion.div>
        )}
        <NavBar navigate={navigate} page={page} />
        <motion.div
          className={cn(styles.content, {
            [styles.contentFullScreen]: zoomLevel === "fullscreen",
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
    </AnimatePresence>
  );
};

export default Page;
