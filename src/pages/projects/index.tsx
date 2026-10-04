import { motion } from 'framer-motion';
import { useRef, createRef } from 'react';
import ExperienceEntry from '@components/ExperienceEntry';
import PageContents from '@components/Page/PageContents';
import TypewriterText from '@components/TypewriterText';
import { useAnimations } from '@context/AnimationContext';
import { fade } from '@config/animation';
import { projectsData, projectsOrder } from '@data/projects';
import type { EntryMedia } from '@components/ExperienceEntry/types';
import { useExperienceEntryModal } from '@components/ExperienceEntry/ExperienceEntryModalContext';
import styles from './projects.module.scss';
import EntryMediaView from '@components/EntryMedia';
import cn from 'classnames';
import { usePage } from '@context/PageContext';
import { useWindowDimensions } from '@context/WindowDimensionContext';
import ProjectCarousel from '@components/ProjectCarousel';
import { screenWidths } from '@styles/layout.constants';

const projectList = projectsOrder.map((id) => projectsData[id]);

const Projects = () => {
  const { TRANSITIONS } = useAnimations();
  const { embedded } = usePage();
  const { width } = useWindowDimensions();
  // Phones get the carousel; the 3D screen and wider lite views keep the list.
  const asCarousel = !embedded && width < screenWidths.mobileLarge;
  const { openModal, selectedEntry } = useExperienceEntryModal();

  const projectsVariants = {
    animate: {
      transition: TRANSITIONS.PROJECTS.ANIMATE_STAGGER,
    },
  };

  const entryContentVariants = fade(TRANSITIONS.PROJECTS.ENTRY_ANIMATE, TRANSITIONS.PROJECTS.EXIT);

  const renderMedia = (media?: EntryMedia) =>
    media && (
      <motion.div className={styles.video} variants={entryContentVariants}>
        <EntryMediaView media={media} />
      </motion.div>
    );

  // Create refs for each entry
  const entryRefs = useRef<Record<string, React.RefObject<HTMLDivElement>>>(
    projectsOrder.reduce(
      (acc, id) => {
        acc[id] = createRef<HTMLDivElement>();
        return acc;
      },
      {} as Record<string, React.RefObject<HTMLDivElement>>,
    ),
  );

  return (
    <PageContents key={'projects'} className={styles.projects}>
      <motion.div
        variants={projectsVariants}
        className={cn(styles.content, { [styles.fullscreen]: !embedded })}
      >
        <motion.h1>
          <TypewriterText
            text={'Projects'}
            staggerChildren={TRANSITIONS.PROJECTS_TITLE.ANIMATE_STAGGER.staggerChildren}
          />
        </motion.h1>

        {asCarousel ? (
          <ProjectCarousel projects={projectList} />
        ) : (
          projectsOrder.map((id) => {
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
                    renderMedia(project.media),
                    project.url,
                    project.dateString,
                  )
                }
                inList={true}
                isSelected={isSelected}
              >
                {renderMedia(project.media)}
              </ExperienceEntry>
            );
          })
        )}
      </motion.div>
    </PageContents>
  );
};

export default Projects;
