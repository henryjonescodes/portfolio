import { motion } from 'framer-motion';
import { useMemo, useRef } from 'react';
import { useExperienceEntryModal } from '@components/ExperienceEntry/ExperienceEntryModalContext';
import type { EntryData } from '@components/ExperienceEntry/types';
import { useAnimations } from '@context/AnimationContext';
import EntryCard from './EntryCard';
import styles from './entry-carousel.module.scss';

/**
 * Entries as a horizontal row of tiles for phones. A tile opens the shared entry window, which
 * grows out of the tile and shrinks back into it.
 */
const EntryCarousel = ({ entries }: { entries: EntryData[] }) => {
  const { TRANSITIONS } = useAnimations();
  const { openModal, selectedEntry } = useExperienceEntryModal();
  const cardRefs = useRef<Record<string, HTMLElement | null>>({});

  const variants = useMemo(
    () => ({
      row: { animate: { transition: TRANSITIONS.CAROUSEL.ROW_STAGGER } },
      slot: { initial: { opacity: 0 }, animate: { opacity: 1 } },
    }),
    [TRANSITIONS],
  );

  return (
    <div className={styles.carousel}>
      <motion.div layoutScroll className={styles.row} variants={variants.row}>
        {entries.map((entry) => (
          <motion.div key={entry.id} className={styles.slot} variants={variants.slot}>
            <EntryCard
              ref={(el) => (cardRefs.current[entry.id] = el)}
              entry={entry}
              hidden={selectedEntry?.id === entry.id}
              onSelect={() =>
                openModal(entry, { current: cardRefs.current[entry.id] as HTMLDivElement })
              }
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default EntryCarousel;
