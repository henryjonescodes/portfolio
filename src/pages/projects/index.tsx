import { motion } from 'framer-motion';
import { useRef, createRef } from 'react';
import ExperienceEntry from '@components/ExperienceEntry';
import PageContents from '@components/Page/PageContents';
import TypewriterText from '@components/TypewriterText';
import { useAnimations } from '@context/AnimationContext';
import { projectsData, projectsOrder } from '@data/projects';
import type { EntryMedia } from '@components/ExperienceEntry/types';
import { useExperienceEntryModal } from '@components/ExperienceEntry/ExperienceEntryModalContext';
import styles from './projects.module.scss';
import GlitchMedia from '@components/GlitchMedia';
import cn from 'classnames';
import { usePage } from '@context/PageContext';

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

  const renderMedia = (media?: EntryMedia) =>
    media && (
      <motion.div className={styles.video} variants={entryContentVariants}>
        {'video' in media ? (
          <GlitchMedia
            video={
              <video
                autoPlay
                loop
                muted
                playsInline
                src={media.video}
                style={{ objectPosition: media.objectPosition }}
              />
            }
          />
        ) : (
          <GlitchMedia img={<img src={media.img} alt="" />} />
        )}
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
        })}
      </motion.div>
    </PageContents>
  );
};

export default Projects;
