import cn from 'classnames';
import { LayoutGroup, motion } from 'framer-motion';
import { forwardRef } from 'react';
import GlitchMedia from '@components/GlitchMedia';
import GlitchIconItem from '@components/GlitchIconItem';
import NavBarButton from '@components/NavBar/NavBarButton';
import Close from '@assets/svg/icons/close.svg?react';
import { useAnimations } from '@context/AnimationContext';
import type { EntryData, EntryMedia } from '@components/ExperienceEntry/types';
import styles from './project-carousel.module.scss';

const CARD_RADIUS = 24;

function Media({ media }: { media: EntryMedia }) {
  return 'video' in media ? (
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
  );
}

type ProjectCardProps = {
  project: EntryData;
  /** Namespaces the inner layoutIds; list and overlay copies use different ids on purpose. */
  layoutKey: string;
  isOpen: boolean;
  hidden?: boolean;
  onSelect?: () => void;
  onClose?: () => void;
  onLayoutAnimationComplete?: () => void;
};

/**
 * One project as a card. The overlay copy is the same component placed over the clicked
 * card; flipping `isOpen` swaps its class and `layout` morphs it to fill the page.
 */
const ProjectCard = forwardRef<HTMLElement, ProjectCardProps>(function ProjectCard(
  { project, layoutKey, isOpen, hidden, onSelect, onClose, onLayoutAnimationComplete },
  ref,
) {
  const { TRANSITIONS } = useAnimations();
  const T = TRANSITIONS.CAROUSEL;
  const snap = { duration: 0 };

  return (
    <LayoutGroup id={layoutKey}>
      <motion.article
        ref={ref}
        layout
        layoutId={layoutKey}
        data-testid={onSelect ? 'project-card' : 'project-card-open'}
        data-project-id={project.id}
        className={cn(styles.card, { [styles.open]: isOpen })}
        // Real values, not CSS variables, so the morph does not distort.
        style={{
          borderRadius: isOpen ? 0 : CARD_RADIUS,
          visibility: hidden ? 'hidden' : 'visible',
        }}
        transition={T.CARD}
        onLayoutAnimationComplete={onLayoutAnimationComplete}
        onClick={(e) => (onSelect ? onSelect() : e.stopPropagation())}
        onKeyDown={(e) => {
          if (onSelect && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            onSelect();
          }
        }}
        role={onSelect ? 'button' : 'dialog'}
        tabIndex={onSelect ? 0 : -1}
        aria-label={onSelect ? `Open ${project.title}` : project.title}
      >
        {project.media && (
          <motion.div
            layoutId="media"
            className={styles.media}
            transition={isOpen ? T.MEDIA_OPEN : T.CARD}
          >
            <Media media={project.media} />
          </motion.div>
        )}
        <motion.header layoutId="header" className={styles.header} transition={snap}>
          <motion.h2 layoutId="title" layout="position" transition={T.CARD}>
            {project.title}
          </motion.h2>
          {project.dateString && (
            <motion.p layoutId="date" layout="position" transition={isOpen ? T.DATE_OPEN : T.CARD}>
              {project.dateString}
            </motion.p>
          )}
          {isOpen && onClose && (
            <span className={styles.close} onClick={(e) => e.stopPropagation()}>
              <NavBarButton onClick={onClose} Icon={Close} label="Close" />
            </span>
          )}
        </motion.header>
        <motion.div layoutId="body" className={styles.body} transition={T.CONTENT}>
          {project.description.map((line) => (
            <motion.p key={line} layout="position" transition={T.CONTENT}>
              {line}
            </motion.p>
          ))}
          {isOpen && (
            <motion.div
              className={styles.details}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: T.DETAILS_ANIMATE }}
            >
              {project.blurb && <p>{project.blurb}</p>}
              {!!project.tools?.length && (
                <div className={styles.tools}>
                  {project.tools.map((t) => (
                    <GlitchIconItem key={t.label} Icon={t.Icon}>
                      {t.label}
                    </GlitchIconItem>
                  ))}
                </div>
              )}
              {project.url && (
                <a
                  className={styles.visit}
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit {project.title}
                </a>
              )}
            </motion.div>
          )}
        </motion.div>
      </motion.article>
    </LayoutGroup>
  );
});

export default ProjectCard;
