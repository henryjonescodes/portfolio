import { motion } from "framer-motion";
import { useRef, createRef } from "react";
import ExperienceEntry from "@components/ExperienceEntry";
import PageContents from "@components/Page/PageContents";
import TypewriterText from "@components/TypewriterText";
import { projectsData, projectsOrder } from "@data/projects";
import { useModal } from "@context/ModalContext";
import styles from "./projects.module.scss";
import GlitchMedia from "@components/GlitchMedia";
import { usePage } from "@components/Page";
import cn from "classnames";

const projectsVariants = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const entryContentVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 2.3,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.3,
    },
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

const Projects = () => {
  const { embedded } = usePage();
  const { openModal, selectedEntry } = useModal();

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
          <TypewriterText text={"Projects"} staggerChildren={0.05} />
        </motion.h1>

        {projectsOrder.map((id) => {
          const isSelected = selectedEntry?.id === id;
          const project = projectsData[id];
          return (
            <ExperienceEntry
              key={`${id}-inList`}
              data={project}
              entryRef={entryRefs.current[id]}
              onClick={() => openModal(project, entryRefs.current[id], getProjectMedia(id), project.url, project.dateString)}
              url={project.url}
              dateString={project.dateString}
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
