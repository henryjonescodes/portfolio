import cn from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import { folder, useControls } from "leva";
import { createContext, ReactNode, useContext, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useLoading } from "../../context/LoadingContext";
import { useZoom } from "../../context/ZoomContext";
import AnimatedOutlet from "../AnimatedOutlet";
import Background from "../Background";
import NavBar from "../NavBar";
import styles from "./page.module.scss";

const Page = ({ embedded }: { embedded?: boolean }) => {
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);
  const page = pathSegments[0];

  const contentRef = useRef<HTMLDivElement | null>(null);
  const { firstPageLoad, setFirstPageLoad } = useLoading();

  const { zoomLevel } = useZoom();

  const {
    pageAnimateDuration,
    pageExitDuration,
    pageAnimateDelay,
    pageAnimateDelayChildren,
    pageFirstLoadDelayChildren,
    pageFirstLoadDelay,
  } = useControls({
    PageTransition: folder(
      {
        pageAnimateDuration: { value: 0.5, min: 0, max: 1, step: 0.1 },
        pageAnimateDelayChildren: { value: 0.2, min: 0, max: 1, step: 0.1 },
        pageFirstLoadDelayChildren: {
          value: 0.2,
          min: 0,
          max: 1,
          step: 0.1,
        },

        pageAnimateDelay: { value: 0.1, min: 0, max: 1, step: 0.1 },
        pageFirstLoadDelay: { value: 0.5, min: 0, max: 1, step: 0.1 },
        pageExitDuration: { value: 0.2, min: 0, max: 1, step: 0.1 },
      },
      { collapsed: true }
    ),
  });

  const pageVariants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        duration: pageAnimateDuration, // Controlled by Leva
        delay: firstPageLoad ? pageFirstLoadDelay : pageAnimateDelay, // Controlled by Leva
        delayChildren: firstPageLoad
          ? pageFirstLoadDelayChildren
          : pageAnimateDelayChildren, // Controlled by Leva
        when: "beforeChildren",
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: pageExitDuration, // Controlled by Leva
        when: "beforeChildren",
      },
    },
  };

  useEffect(() => {
    const scrollToTop = () => {
      if (contentRef.current) {
        setTimeout(() => {
          contentRef.current?.scrollTo(0, 0);
        }, 1000);
      }
    };
    scrollToTop();
  }, [page]);

  return (
    <PageProvider embedded={embedded}>
      <AnimatePresence>
        <motion.div
          key={"page"}
          className={cn(styles.page, {
            [styles.pageHandheld]: embedded,
            [styles.pageDisabled]: zoomLevel === "info",
          })}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageVariants}
          onAnimationComplete={(definition) => {
            if (definition === "animate" && firstPageLoad) {
              setFirstPageLoad(false);
            }
          }}
        >
          {!embedded && <Background />}
          <NavBar page={page} />
          <motion.div
            className={cn(styles.content, {
              [styles.contentFullScreen]: !embedded,
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
    </PageProvider>
  );
};

interface PageContextType {
  embedded?: boolean;
}

const PageContext = createContext<PageContextType | undefined>(undefined);

export const PageProvider = ({
  children,
  embedded,
}: {
  children: ReactNode;
  embedded?: boolean;
}) => {
  return (
    <PageContext.Provider value={{ embedded }}>{children}</PageContext.Provider>
  );
};

export const usePage = () => {
  const context = useContext(PageContext);
  if (context === undefined) {
    throw new Error("usePage must be used within an PageProvider");
  }
  return context;
};

export default Page;
