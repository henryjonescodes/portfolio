import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, createRef, useEffect } from "react";
import { createPortal } from "react-dom";
import ExperienceEntry from "@components/ExperienceEntry";
import PageContents from "@components/Page/PageContents";
import TypewriterText from "@components/TypewriterText";
import { ANIMATION_DURATIONS } from "@config/animations";
import { projectsData, projectsOrder } from "@data/projects";
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
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [overlayStyle, setOverlayStyle] = useState<React.CSSProperties>({});
  const [pageOpen, setPageOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  // Create refs for each entry
  const entryRefs = useRef<Record<string, React.RefObject<HTMLDivElement>>>(
    projectsOrder.reduce((acc, id) => {
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

    // Get the page container
    const pageContainer = document.querySelector(
      '[class*="page"]:not([class*="pageContents"])'
    ) as HTMLElement;
    const pageRect = pageContainer?.getBoundingClientRect();

    if (!pageRect) return;

    setOverlayStyle({
      width: rect.width,
      height: rect.height,
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
        ANIMATION_DURATIONS.MODAL_CONTAINER) *
      1000;
    setTimeout(() => {
      setSelectedId(null);
      setIsClosing(false);
    }, totalDuration);
  };

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
          const isSelected = selectedId === id;
          const project = projectsData[id];
          return (
            <ExperienceEntry
              key={`${id}-inList`}
              data={project}
              entryRef={entryRefs.current[id]}
              onClick={() => handleEntryClick(id)}
              url={project.url}
              dateString={project.dateString}
              pageOpen={pageOpen}
              inList={true}
              isSelected={isSelected}
            >
              {getProjectMedia(id)}
            </ExperienceEntry>
          );
        })}
      </motion.div>

      {/* Modal overlay - portaled to page container */}
      {selectedId &&
        createPortal(
          <AnimatePresence>
            {selectedId && (
              <motion.div
                key="modal-overlay"
                className={styles.overlay}
                onClick={handleClose}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: ANIMATION_DURATIONS.MODAL_CONTAINER }}
              >
                <div onClick={(e) => e.stopPropagation()}>
                  <ExperienceEntry
                    key={selectedId}
                    data={projectsData[selectedId]}
                    pageOpen={pageOpen}
                    inList={false}
                    overlayStyle={overlayStyle}
                    onClose={handleClose}
                    url={projectsData[selectedId].url}
                    dateString={projectsData[selectedId].dateString}
                  >
                    {getProjectMedia(selectedId)}
                  </ExperienceEntry>
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.querySelector(
            '[class*="page"]:not([class*="pageContents"])'
          ) as HTMLElement
        )}
    </PageContents>
  );
};

export default Projects;
