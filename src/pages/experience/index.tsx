import { motion } from "framer-motion";
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

  // Create refs for each entry
  const entryRefs = useRef<Record<string, React.RefObject<HTMLDivElement>>>(
    experienceOrder.reduce((acc, id) => {
      acc[id] = createRef<HTMLDivElement>();
      return acc;
    }, {} as Record<string, React.RefObject<HTMLDivElement>>)
  );

  // Delay pageOpen to trigger layout animations
  useEffect(() => {
    if (selectedId) {
      setPageOpen(false);
      const timer = setTimeout(() => {
        setPageOpen(true);
      }, ANIMATION_DURATIONS.MODAL_LAYOUT_DELAY_MS);
      return () => clearTimeout(timer);
    } else {
      setPageOpen(false);
    }
  }, [selectedId]);

  const handleEntryClick = (id: string) => {
    const entryElement = entryRefs.current[id].current;
    if (!entryElement) return;

    const rect = entryElement.getBoundingClientRect();

    setOverlayStyle({
      position: 'fixed',
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
    });

    setSelectedId(id);
  };

  return (
    <PageContents key={"experience"} className={styles.experience}>
      <motion.div variants={experienceVariants} className={styles.content}>
        <motion.h1>
          <TypewriterText text={"Experience"} staggerChildren={0.05} />
        </motion.h1>

        {experienceOrder.map((id) => {
          const entry = experienceData[id];
          const isSelected = selectedId === id;
          return (
            <ExperienceEntry
              key={`${id}-inList`}
              id={`${id}-inList`}
              title={entry.title}
              subtitle={entry.subtitle}
              description={entry.description}
              startDate={entry.startDate}
              endDate={entry.endDate}
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
      {selectedId && (
        <motion.div
          className={styles.overlay}
          onClick={() => setSelectedId(null)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            style={overlayStyle}
            initial={{
              width: overlayStyle.width,
              left: overlayStyle.left
            }}
            animate={{
              width: '70%',
              left: '15%' // Centers at 50%: 15% left + 70% width + 15% right
            }}
          >
            <ExperienceEntry
              key={selectedId}
              id={selectedId}
              title={experienceData[selectedId].title}
              subtitle={experienceData[selectedId].subtitle}
              description={experienceData[selectedId].description}
              startDate={experienceData[selectedId].startDate}
              endDate={experienceData[selectedId].endDate}
              pageOpen={pageOpen}
              inList={false}
            />
          </motion.div>
        </motion.div>
      )}
    </PageContents>
  );
};

export default Experience;
