import { motion } from "framer-motion";
import { useRef, createRef } from "react";
import ExperienceEntry from "@components/ExperienceEntry";
import PageContents from "@components/Page/PageContents";
import TypewriterText from "@components/TypewriterText";
import { useAnimations } from "@context/AnimationContext";
import { projectsData, projectsOrder } from "@data/projects";
import { useExperienceEntryModal } from "@components/ExperienceEntry/ExperienceEntryModalContext";
import styles from "./projects.module.scss";
import GlitchMedia from "@components/GlitchMedia";
import cn from "classnames";
import { usePage } from "@context/PageContext";

const Projects = () => {
  const { TRANSITIONS } = useAnimations();
  const { embedded } = usePage();
  const { openModal, selectedEntry } = useExperienceEntryModal();

  const projectsVariants = {
    animate: {
      transition: TRANSITIONS.PROJECTS.ANIMATE_STAGGER,
    },
  };

  const entryContentVariants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: TRANSITIONS.PROJECTS.ENTRY_ANIMATE,
    },
    exit: {
      opacity: 0,
      transition: TRANSITIONS.PROJECTS.EXIT,
    },
  };

  // Helper to get media children for each project
  const getProjectMedia = (id: string) => {
    const mediaMap: Record<string, React.ReactNode> = {
      portfoliov2: (
        <motion.div className={styles.video} variants={entryContentVariants}>
          <GlitchMedia
            video={
              <video
                autoPlay
                loop
                muted
                src="video/v2-loop.mp4"
                style={{ objectPosition: "0%" }}
              />
            }
          />
        </motion.div>
      ),
      virtualportfolio: (
        <motion.div className={styles.video} variants={entryContentVariants}>
          <GlitchMedia
            video={<video autoPlay loop muted src="video/tower-loop.mp4" />}
          />
        </motion.div>
      ),
      portfoliov1: (
        <motion.div className={styles.video} variants={entryContentVariants}>
          <GlitchMedia img={<img src="images/v1.png" />} />
        </motion.div>
      ),
      thesis: (
        <motion.div className={styles.video} variants={entryContentVariants}>
          <GlitchMedia img={<img src="images/thesis.png" />} />
        </motion.div>
      ),
    };
    return mediaMap[id];
  };

  // Create refs for each entry
  const entryRefs = useRef<Record<string, React.RefObject<HTMLDivElement>>>(
    projectsOrder.reduce((acc, id) => {
      acc[id] = createRef<HTMLDivElement>();
      return acc;
    }, {} as Record<string, React.RefObject<HTMLDivElement>>)
  );

  return (
    <PageContents key={"projects"} className={styles.projects}>
      <motion.div
        variants={projectsVariants}
        className={cn(styles.content, { [styles.fullscreen]: !embedded })}
      >
        <motion.h1>
          <TypewriterText
            text={"Projects"}
            staggerChildren={TRANSITIONS.PROJECTS_TITLE.ANIMATE_STAGGER.staggerChildren}
          />
        </motion.h1>

        {projectsOrder.map((id) => {
          const isSelected = selectedEntry?.id === id;
          const project = projectsData[id];
          return (
            <ExperienceEntry
              key={`${id}-inList`}
              data={project}
              entryRef={entryRefs.current[id]}
              onClick={() =>
                openModal(
                  project,
                  entryRefs.current[id],
                  getProjectMedia(id),
                  project.url,
                  project.dateString
                )
              }
              inList={true}
              isSelected={isSelected}
            >
              {getProjectMedia(id)}
            </ExperienceEntry>
          );
        })}
      </motion.div>
    </PageContents>
  );
};

export default Projects;
