import { motion, useReducedMotion } from 'framer-motion';
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react';
import { useAnimations } from '@context/AnimationContext';
import type { EntryData } from '@components/ExperienceEntry/types';
import ProjectCard from './ProjectCard';
import styles from './project-carousel.module.scss';

type Selection = { id: string; from: CSSProperties };

/**
 * A horizontal row of project cards. Selecting one mounts an overlay copy exactly over it,
 * then opens it, so `layout` morphs card to page; closing morphs back and unmounts once
 * the layout animation completes.
 *
 * Positions come from offsetLeft/offsetTop, which ignore CSS transforms, because in 3D
 * mode the page renders inside a scaled screen where client rects are not page pixels.
 * `children` render above the row and are covered by the open card like the rest of the page.
 */
const ProjectCarousel = ({
  projects,
  children,
}: {
  projects: EntryData[];
  children?: ReactNode;
}) => {
  const { TRANSITIONS } = useAnimations();
  const rowRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Record<string, HTMLElement | null>>({});
  const [selection, setSelection] = useState<Selection | null>(null);
  const [open, setOpen] = useState(false);
  // With reduced motion the layout snaps and may not report completion, so close outright.
  const reduceMotion = useReducedMotion();

  const rowVariants = useMemo(
    () => ({ animate: { transition: TRANSITIONS.CAROUSEL.ROW_STAGGER } }),
    [TRANSITIONS],
  );

  const select = (id: string) => {
    const card = cardRefs.current[id];
    const row = rowRef.current;
    if (!card || !row) return;
    setSelection({
      id,
      from: {
        top: card.offsetTop - row.scrollTop,
        left: card.offsetLeft - row.scrollLeft,
        width: card.offsetWidth,
        height: card.offsetHeight,
      },
    });
  };

  // Open after the overlay copy has rendered at the card's spot, so the morph has an origin.
  useEffect(() => {
    if (selection) setOpen(true);
  }, [selection]);

  const close = useCallback(() => {
    setOpen(false);
    if (reduceMotion) setSelection(null);
  }, [reduceMotion]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, close]);

  const selected = selection && projects.find((p) => p.id === selection.id);

  return (
    <div className={styles.carousel}>
      {children}
      <motion.div ref={rowRef} layoutScroll className={styles.row} variants={rowVariants}>
        {projects.map((project) => (
          <motion.div
            key={project.id}
            className={styles.slot}
            variants={{ initial: { opacity: 0 }, animate: { opacity: 1 } }}
          >
            <ProjectCard
              ref={(el) => (cardRefs.current[project.id] = el)}
              project={project}
              layoutKey={`${project.id}-list`}
              isOpen={false}
              hidden={selection?.id === project.id}
              onSelect={() => select(project.id)}
            />
          </motion.div>
        ))}
      </motion.div>
      {selection && selected && (
        <div className={styles.overlay} style={open ? undefined : selection.from} onClick={close}>
          <ProjectCard
            key={selection.id}
            project={selected}
            layoutKey={selection.id}
            isOpen={open}
            onClose={close}
            onLayoutAnimationComplete={() => {
              if (!open) setSelection(null);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ProjectCarousel;
