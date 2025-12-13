import cn from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import { lazy, Suspense, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

import { useLoading } from "@context/LoadingContext";
import { useZoom } from "@context/ZoomContext";
import { useAnimations } from "@context/AnimationContext";
import { PageProviders } from "./PageProviders";

import styles from "./page.module.scss";

const LazyBackground = lazy(() => import("@components/Background"));
const LazyNavBar = lazy(() => import("@components/NavBar"));
const LazyAnimatedOutlet = lazy(() => import("@components/AnimatedOutlet"));
const Page = ({ embedded }: { embedded?: boolean }) => {
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);
  const page = pathSegments[0];

  const contentRef = useRef<HTMLDivElement | null>(null);
  const { firstPageLoad, setFirstPageLoad } = useLoading();

  const { zoomLevel } = useZoom();
  const { durations } = useAnimations();

  const pageVariants = {
    initial: {
      opacity: firstPageLoad ? 1 : 0,
    },
    animate: {
      opacity: 1,
      transition: {
        duration: firstPageLoad ? 0 : durations.PAGE_FADE_IN,
        delay: firstPageLoad
          ? durations.PAGE_FIRST_LOAD_DELAY
          : durations.PAGE_ENTER_DELAY,
        delayChildren: firstPageLoad
          ? durations.PAGE_FIRST_LOAD_DELAY_CHILDREN
          : durations.PAGE_DELAY_CHILDREN,
        when: "beforeChildren",
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: durations.PAGE_FADE_OUT,
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
    <PageProviders embedded={embedded}>
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
          <Suspense fallback={null}>{!embedded && <LazyBackground />}</Suspense>
          <Suspense fallback={null}>
            <LazyNavBar page={page} />
          </Suspense>
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
                <Suspense fallback={null}>
                  <LazyAnimatedOutlet key={page} />
                </Suspense>
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </PageProviders>
  );
};

export default Page;
