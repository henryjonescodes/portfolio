import cn from 'classnames';
import { LayoutGroup, motion } from 'framer-motion';
import { useState } from 'react';
import EntryMediaView from '@components/EntryMedia';
import type { GalleryItem } from '@components/ExperienceEntry/types';
import { useAnimations } from '@context/AnimationContext';
import styles from './masonry-gallery.module.scss';

/**
 * A two-column masonry: square, wide (2:1) and tall (1:2) cards packed densely by CSS grid,
 * so a wide card can span both columns. Opening a card widens it to the full row; the others
 * reflow around it with a layout animation.
 */
const MasonryGallery = ({ items }: { items: GalleryItem[] }) => {
  const { TRANSITIONS } = useAnimations();
  const [open, setOpen] = useState<number | null>(null);

  return (
    <LayoutGroup>
      <div className={styles.gallery}>
        <motion.div
          className={styles.grid}
          initial="hidden"
          animate="shown"
          variants={{ shown: { transition: TRANSITIONS.PANELS.STAGGER } }}
        >
          {items.map((item, i) => (
            <motion.figure
              key={i}
              layout
              className={cn(styles.card, styles[item.shape ?? 'square'], {
                [styles.open]: open === i,
              })}
              variants={{
                hidden: { opacity: 0, y: 8 },
                shown: { opacity: 1, y: 0, transition: TRANSITIONS.PANELS.PANEL },
              }}
              transition={TRANSITIONS.MODAL.CONTENT_ANIMATE}
            >
              <button
                type="button"
                className={styles.hit}
                aria-label={open === i ? 'Shrink' : `Enlarge ${item.caption ?? `item ${i + 1}`}`}
                aria-expanded={open === i}
                onClick={(e) => {
                  e.stopPropagation();
                  setOpen(open === i ? null : i);
                }}
              >
                <EntryMediaView media={item.media} alt={item.caption} />
              </button>
              {item.caption && (
                <motion.figcaption layout="position">{item.caption}</motion.figcaption>
              )}
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </LayoutGroup>
  );
};

export default MasonryGallery;
