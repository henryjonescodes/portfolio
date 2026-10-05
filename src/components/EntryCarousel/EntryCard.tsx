import { motion } from 'framer-motion';
import { forwardRef } from 'react';
import AnimatedBorderBox from '@components/AnimatedBorderBox';
import AnimatedLine from '@components/AnimatedLine';
import RichText from '@components/Efforts/RichText';
import EntryMediaView from '@components/EntryMedia';
import type { EntryData } from '@components/ExperienceEntry/types';
import TypewriterText from '@components/TypewriterText';
import { useAnimations } from '@context/AnimationContext';
import { radius } from '@styles/sass-variables';
import { formatDateRange } from '@utils/text';
import styles from './entry-carousel.module.scss';

type EntryCardProps = {
  entry: EntryData;
  hidden?: boolean;
  onSelect: () => void;
};

const BORDER = 2.5;

/**
 * One entry as a tile: title bar, media, then text, never text over media. It paints in (border
 * drawn, text typed, parts staggered) and opens the shared entry window.
 */
const EntryCard = forwardRef<HTMLElement, EntryCardProps>(function EntryCard(
  { entry, hidden, onSelect },
  ref,
) {
  const { TRANSITIONS } = useAnimations();
  const date = entry.dateString ?? formatDateRange(entry.startDate, entry.endDate);
  const stagger = { animate: { transition: TRANSITIONS.CAROUSEL.TILE_STAGGER } };

  return (
    <motion.article
      ref={ref}
      data-testid="carousel-card"
      data-entry-id={entry.id}
      className={styles.card}
      style={{ borderRadius: radius.md, visibility: hidden ? 'hidden' : 'visible' }}
      variants={stagger}
      onClick={onSelect}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect();
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`Open ${entry.title}`}
    >
      <AnimatedBorderBox className={styles.paintedBorder} borderWidth={BORDER} />
      <header className={styles.titleBar}>
        <h2>
          <TypewriterText text={entry.title} />
        </h2>
        {date && (
          <p>
            <TypewriterText text={date} />
          </p>
        )}
        <AnimatedLine horizontal borderWidth={BORDER} className={styles.barLine} />
      </header>
      <motion.div className={styles.scroll} variants={stagger}>
        {entry.media && (
          <>
            <div className={styles.media}>
              <EntryMediaView media={entry.media} />
            </div>
            <AnimatedLine horizontal borderWidth={BORDER} className={styles.line} />
          </>
        )}
        <motion.div className={styles.body} variants={stagger}>
          {entry.subtitle && (
            <h3>
              <TypewriterText text={entry.subtitle} />
            </h3>
          )}
          {entry.description.map((line) => (
            <p key={line}>
              <RichText text={line} staggerChildren={0.004} />
            </p>
          ))}
        </motion.div>
      </motion.div>
    </motion.article>
  );
});

export default EntryCard;
