import { motion } from "framer-motion";
import { useState, useRef, createRef } from "react";
import ExperienceEntry from "@components/ExperienceEntry";
import PageContents from "@components/Page/PageContents";
import TypewriterText from "@components/TypewriterText";
import { experienceData, experienceOrder } from "@data/experience";
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

  // Create refs for each entry
  const entryRefs = useRef<Record<string, React.RefObject<HTMLDivElement>>>(
    experienceOrder.reduce((acc, id) => {
      acc[id] = createRef<HTMLDivElement>();
      return acc;
    }, {} as Record<string, React.RefObject<HTMLDivElement>>)
  );

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
          return (
            <ExperienceEntry
              key={id}
              title={entry.title}
              subtitle={entry.subtitle}
              description={entry.description}
              startDate={entry.startDate}
              endDate={entry.endDate}
              entryRef={entryRefs.current[id]}
              onClick={() => handleEntryClick(id)}
            />
          );
        })}
      </motion.div>

      {/* Modal overlay */}
      {selectedId && (
        <div
          className={styles.overlay}
          onClick={() => setSelectedId(null)}
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
              title={experienceData[selectedId].title}
              subtitle={experienceData[selectedId].subtitle}
              description={experienceData[selectedId].description}
              startDate={experienceData[selectedId].startDate}
              endDate={experienceData[selectedId].endDate}
            />
          </motion.div>
        </div>
      )}
    </PageContents>
  );
};

export default Experience;
