import cn from 'classnames';
import { motion } from 'framer-motion';
import { createRef, useEffect, useRef, useState } from 'react';
import EntryMediaView from '@components/EntryMedia';
import ExperienceEntry from '@components/ExperienceEntry';
import { useExperienceEntryModal } from '@components/ExperienceEntry/ExperienceEntryModalContext';
import type { EntryData } from '@components/ExperienceEntry/types';
import { fade } from '@config/animation';
import { useAnimations } from '@context/AnimationContext';
import { usePage } from '@context/PageContext';
import { screenWidths } from '@styles/layout.constants';
import { EntryRedrawContext } from './EntryRedrawContext';
import styles from './entry-list.module.scss';

type EntryListProps = {
  entries: EntryData[];
  /** Show each entry's media in the wide list too; otherwise only the tiles show it. */
  mediaInList?: boolean;
};

/**
 * Entries as a vertical list, or below mobileLarge a scroll-snapped row of tiles. The layout
 * is CSS alone (a container query on the list's own width), so crossing it keeps every
 * element; this component only restarts the border and line draws, quickly.
 */
const EntryList = ({ entries, mediaInList = false }: EntryListProps) => {
  const { TRANSITIONS } = useAnimations();
  const { embedded } = usePage();
  const { openModal, selectedEntry } = useExperienceEntryModal();
  const listRef = useRef<HTMLDivElement>(null);
  const refs = useRef<Record<string, React.RefObject<HTMLDivElement>>>({});
  const [redraw, setRedraw] = useState(0);

  useEffect(() => {
    const list = listRef.current;
    if (!list || embedded) return;
    let tiles: boolean | null = null;
    const observer = new ResizeObserver(([{ contentRect }]) => {
      const next = contentRect.width < screenWidths.mobileLarge;
      if (tiles !== null && next !== tiles) setRedraw((n) => n + 1);
      tiles = next;
    });
    observer.observe(list);
    return () => observer.disconnect();
  }, [embedded]);

  const mediaVariants = fade(TRANSITIONS.PROJECTS.ENTRY_ANIMATE, TRANSITIONS.PROJECTS.EXIT);

  return (
    <EntryRedrawContext.Provider value={redraw}>
      <div ref={listRef} className={cn(styles.list, { [styles.embedded]: embedded })}>
        <motion.div layoutScroll className={styles.row} data-testid="entry-row">
          {entries.map((entry) => {
            const ref = (refs.current[entry.id] ??= createRef<HTMLDivElement>());
            return (
              <ExperienceEntry
                key={entry.id}
                data={entry}
                entryRef={ref}
                onClick={() => openModal(entry, ref)}
                inList
                isSelected={selectedEntry?.id === entry.id}
                mediaInTilesOnly={!mediaInList}
              >
                {entry.media && (
                  <motion.div
                    className={styles.media}
                    variants={mediaVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  >
                    <EntryMediaView media={entry.media} />
                  </motion.div>
                )}
              </ExperienceEntry>
            );
          })}
        </motion.div>
      </div>
    </EntryRedrawContext.Provider>
  );
};

export default EntryList;
