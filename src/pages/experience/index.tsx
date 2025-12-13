import { motion } from "framer-motion";
import { useRef, createRef } from "react";
import ExperienceEntry from "@components/ExperienceEntry";
import PageContents from "@components/Page/PageContents";
import TypewriterText from "@components/TypewriterText";
import { experienceData, experienceOrder } from "@data/experience";
import { useExperienceEntryModal } from "@components/ExperienceEntry/ExperienceEntryModalContext";
import styles from "./experience.module.scss";

const experienceVariants = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const Experience = () => {
  const { openModal, selectedEntry } = useExperienceEntryModal();

  // Create refs for each entry
  const entryRefs = useRef<Record<string, React.RefObject<HTMLDivElement>>>(
    experienceOrder.reduce((acc, id) => {
      acc[id] = createRef<HTMLDivElement>();
      return acc;
    }, {} as Record<string, React.RefObject<HTMLDivElement>>)
  );

  return (
    <PageContents key={"experience"} className={styles.experience}>
      <motion.div variants={experienceVariants} className={styles.content}>
        <motion.h1>
          <TypewriterText text={"Experience"} staggerChildren={0.05} />
        </motion.h1>

        {experienceOrder.map((id) => {
          const isSelected = selectedEntry?.id === id;
          return (
            <ExperienceEntry
              key={`${id}-inList`}
              data={experienceData[id]}
              entryRef={entryRefs.current[id]}
              onClick={() =>
                openModal(experienceData[id], entryRefs.current[id])
              }
              inList={true}
              isSelected={isSelected}
            />
          );
        })}
      </motion.div>
    </PageContents>
  );
};

export default Experience;
