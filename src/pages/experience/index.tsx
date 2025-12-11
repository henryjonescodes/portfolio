import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, createRef, useEffect } from "react";
import ExperienceEntry from "@components/ExperienceEntry";
import PageContents from "@components/Page/PageContents";
import TypewriterText from "@components/TypewriterText";
import { experienceData, experienceOrder } from "@data/experience";
import { ANIMATION_DURATIONS } from "@config/animations";
import styles from "./experience.module.scss";

const experienceVariants = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const Experience = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [overlayStyle, setOverlayStyle] = useState<React.CSSProperties>({});
  const [pageOpen, setPageOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  // Create refs for each entry
  const entryRefs = useRef<Record<string, React.RefObject<HTMLDivElement>>>(
    experienceOrder.reduce((acc, id) => {
      acc[id] = createRef<HTMLDivElement>();
      return acc;
    }, {} as Record<string, React.RefObject<HTMLDivElement>>)
  );

  // Delay pageOpen to trigger layout animations
  useEffect(() => {
    if (selectedId && !isClosing) {
      setPageOpen(false);
      const timer = setTimeout(() => {
        setPageOpen(true);
      }, ANIMATION_DURATIONS.MODAL_LAYOUT_DELAY * 1000);
      return () => clearTimeout(timer);
    } else {
      setPageOpen(false);
    }
  }, [selectedId, isClosing]);

  const handleEntryClick = (id: string) => {
    const entryElement = entryRefs.current[id].current;
    if (!entryElement) return;

    const rect = entryElement.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;

    // Calculate centered position
    const centeredTop = (viewportHeight - rect.height) / 2;
    const centeredLeft = (viewportWidth - rect.width) / 2;

    setOverlayStyle({
      position: "fixed",
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
      centeredTop,
      centeredLeft,
    });

    setIsClosing(false);
    setSelectedId(id);
  };

  const handleClose = () => {
    setIsClosing(true);
    setPageOpen(false);

    // Wait for layout animation to reverse + exit animation
    const totalDuration =
      (ANIMATION_DURATIONS.MODAL_LAYOUT_DELAY +
      ANIMATION_DURATIONS.MODAL_CONTAINER) * 1000;
    setTimeout(() => {
      setSelectedId(null);
      setIsClosing(false);
    }, totalDuration);
  };

  return (
    <PageContents key={"experience"} className={styles.experience}>
      <motion.div variants={experienceVariants} className={styles.content}>
        <motion.h1>
          <TypewriterText text={"Experience"} staggerChildren={0.05} />
        </motion.h1>

        {experienceOrder.map((id) => {
          const isSelected = selectedId === id;
          return (
            <ExperienceEntry
              key={`${id}-inList`}
              data={experienceData[id]}
              entryRef={entryRefs.current[id]}
              onClick={() => handleEntryClick(id)}
              pageOpen={pageOpen}
              inList={true}
              isSelected={isSelected}
            />
          );
        })}
      </motion.div>

      {/* Modal overlay */}
      <AnimatePresence>
        {selectedId && (
          <motion.div
            className={styles.overlay}
            onClick={handleClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ExperienceEntry
              key={selectedId}
              data={experienceData[selectedId]}
              pageOpen={pageOpen}
              inList={false}
              overlayStyle={overlayStyle}
              onClose={handleClose}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </PageContents>
  );
};

export default Experience;
