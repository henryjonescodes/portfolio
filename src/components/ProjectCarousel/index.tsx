import { motion, useReducedMotion } from 'framer-motion';
import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
import type { EntryData } from '@components/ExperienceEntry/types';
import { useAnimations } from '@context/AnimationContext';
import ProjectCard from './ProjectCard';
import styles from './project-carousel.module.scss';

type Selection = { id: string; from: CSSProperties; to: CSSProperties };

/** Measures `el` against `root` in root's own CSS pixels, undoing any ancestor scale. */
function boxWithin(
  el: Element,
  root: HTMLElement,
  size?: { width: number; height: number },
): CSSProperties {
  const rootRect = root.getBoundingClientRect();
  const rect = el.getBoundingClientRect();
  const scale = rootRect.width / root.offsetWidth || 1;
  return {
    top: (rect.top - rootRect.top) / scale,
    left: (rect.left - rootRect.left) / scale,
    width: size?.width ?? rect.width / scale,
    height: size?.height ?? rect.height / scale,
  };
}

/**
 * Projects as a horizontal row of tiles for phones. Selecting one mounts an overlay copy
 * exactly over it, then opens it to fill the visible scroll area, so `layout` morphs tile to
 * page; closing morphs back and unmounts when the layout animation completes.
 */
const ProjectCarousel = ({ projects }: { projects: EntryData[] }) => {
  const { TRANSITIONS } = useAnimations();
  const rootRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Record<string, HTMLElement | null>>({});
  const [selection, setSelection] = useState<Selection | null>(null);
  const [open, setOpen] = useState(false);
  // With reduced motion the layout snaps and may not report completion, so close outright.
  const reduceMotion = useReducedMotion();

  const variants = useMemo(
    () => ({
      row: { animate: { transition: TRANSITIONS.CAROUSEL.ROW_STAGGER } },
      slot: { initial: { opacity: 0 }, animate: { opacity: 1 } },
    }),
    [TRANSITIONS],
  );

  const select = (id: string) => {
    const card = cardRefs.current[id];
    const root = rootRef.current;
    if (!card || !root) return;
    const scroller = root.closest<HTMLElement>('[data-scroll-root]') ?? root;
    setSelection({
      id,
      from: boxWithin(card, root),
      to: boxWithin(scroller, root, { width: scroller.clientWidth, height: scroller.clientHeight }),
    });
  };

  // Open after the overlay copy has rendered at the tile's spot, so the morph has an origin.
  useEffect(() => {
    if (selection) setOpen(true);
  }, [selection]);

  // Hold the page still while a project is open.
  useEffect(() => {
    const scroller = rootRef.current?.closest<HTMLElement>('[data-scroll-root]');
    if (!selection || !scroller) return;
    const previous = scroller.style.overflow;
    scroller.style.overflow = 'hidden';
    return () => {
      scroller.style.overflow = previous;
    };
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
    <div ref={rootRef} className={styles.carousel}>
      <motion.div layoutScroll className={styles.row} variants={variants.row}>
        {projects.map((project) => (
          <motion.div key={project.id} className={styles.slot} variants={variants.slot}>
            <ProjectCard
              ref={(el) => (cardRefs.current[project.id] = el)}
              project={project}
              layoutKey={`${project.id}-tile`}
              isOpen={false}
              hidden={selection?.id === project.id}
              onSelect={() => select(project.id)}
            />
          </motion.div>
        ))}
      </motion.div>
      {selection && selected && (
        <>
          <motion.div
            className={styles.backdrop}
            style={selection.to}
            initial={{ opacity: 0 }}
            animate={{ opacity: open ? 1 : 0 }}
            transition={TRANSITIONS.CAROUSEL.CARD}
          />
          {/* initial={false}: the open copy shows its text instead of replaying the paint-in. */}
          <motion.div
            className={styles.overlay}
            style={open ? selection.to : selection.from}
            initial={false}
            animate="open"
          >
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
          </motion.div>
        </>
      )}
    </div>
  );
};

export default ProjectCarousel;
