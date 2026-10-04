import cn from 'classnames';
import { LayoutGroup, motion } from 'framer-motion';
import { forwardRef, useState } from 'react';
import Close from '@assets/svg/icons/close.svg?react';
import AnimatedBorderBox from '@components/AnimatedBorderBox';
import AnimatedLine from '@components/AnimatedLine';
import EffortNav from '@components/Efforts/EffortNav';
import EffortView from '@components/Efforts/EffortView';
import RichText from '@components/Efforts/RichText';
import EntryMediaView from '@components/EntryMedia';
import { useExperienceEntryModal } from '@components/ExperienceEntry/ExperienceEntryModalContext';
import type { EntryData } from '@components/ExperienceEntry/types';
import GlitchIconItem from '@components/GlitchIconItem';
import NavBarButton from '@components/NavBar/NavBarButton';
import PanelGrid from '@components/Panels';
import TypewriterText from '@components/TypewriterText';
import { useAnimations } from '@context/AnimationContext';
import { radius } from '@styles/sass-variables';
import { trapFocus } from '@utils/focus';
import { formatDateRange } from '@utils/text';
import styles from './entry-carousel.module.scss';

type EntryCardProps = {
  entry: EntryData;
  /** Namespaces the inner layoutIds; list and overlay copies use different keys on purpose. */
  layoutKey: string;
  isOpen: boolean;
  hidden?: boolean;
  onSelect?: () => void;
  onClose?: () => void;
  onLayoutAnimationComplete?: () => void;
};

const BORDER = 2.5;

/**
 * One entry as a tile: title bar, media, then text, never text over media. The open
 * overlay copy is the same component; flipping `isOpen` morphs it to fill the view. Tiles
 * paint in (border drawn, text typed, parts staggered); the overlay copy starts painted.
 */
const EntryCard = forwardRef<HTMLElement, EntryCardProps>(function EntryCard(
  { entry, layoutKey, isOpen, hidden, onSelect, onClose, onLayoutAnimationComplete },
  ref,
) {
  const { TRANSITIONS } = useAnimations();
  const T = TRANSITIONS.CAROUSEL;
  const snap = { duration: 0 };
  const isTile = !!onSelect;
  const date = entry.dateString ?? formatDateRange(entry.startDate, entry.endDate);
  const stagger = { animate: { transition: T.TILE_STAGGER } };
  const { openEffort } = useExperienceEntryModal();
  const [effortId, setEffortId] = useState<string | null>(null);
  const effort = isOpen ? entry.efforts?.find((e) => e.id === effortId) : undefined;
  // A mention of this entry's own effort switches tabs; any other opens that entry's modal.
  const onMention = isOpen
    ? (entryId: string, id: string) =>
        entryId === entry.id ? setEffortId(id) : openEffort(entryId, id)
    : undefined;

  return (
    <LayoutGroup id={layoutKey}>
      <motion.article
        ref={ref}
        layout
        layoutId={layoutKey}
        data-testid={isTile ? 'carousel-card' : 'carousel-card-open'}
        data-entry-id={entry.id}
        className={cn(styles.card, { [styles.open]: isOpen, [styles.tile]: isTile })}
        // Real values, not CSS variables, so the morph does not distort.
        style={{ borderRadius: isOpen ? 0 : radius.md, visibility: hidden ? 'hidden' : 'visible' }}
        variants={stagger}
        transition={T.CARD}
        onLayoutAnimationComplete={onLayoutAnimationComplete}
        onClick={(e) => (onSelect ? onSelect() : e.stopPropagation())}
        onKeyDown={(e) => {
          if (!onSelect) return trapFocus(e);
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onSelect();
          }
        }}
        role={isTile ? 'button' : 'dialog'}
        aria-modal={isTile ? undefined : true}
        tabIndex={isTile ? 0 : -1}
        aria-label={isTile ? `Open ${entry.title}` : entry.title}
      >
        {isTile && <AnimatedBorderBox className={styles.paintedBorder} borderWidth={BORDER} />}
        <motion.header layoutId="header" className={styles.titleBar} transition={snap}>
          <motion.h2 layoutId="title" layout="position" transition={T.CARD}>
            <TypewriterText text={entry.title} />
          </motion.h2>
          {date && (
            <motion.p layoutId="date" layout="position" transition={isOpen ? T.DATE_OPEN : T.CARD}>
              <TypewriterText text={date} />
            </motion.p>
          )}
          {isOpen && onClose && (
            <span className={styles.close}>
              <NavBarButton onClick={onClose} Icon={Close} label="Close" />
            </span>
          )}
          {isTile && <AnimatedLine horizontal borderWidth={BORDER} className={styles.barLine} />}
        </motion.header>
        <motion.div className={styles.scroll} variants={stagger}>
          {entry.media && (
            <motion.div
              layoutId="media"
              className={styles.media}
              transition={isOpen ? T.MEDIA_OPEN : T.CARD}
            >
              <EntryMediaView media={entry.media} />
            </motion.div>
          )}
          {entry.media &&
            (isTile ? (
              <AnimatedLine horizontal borderWidth={BORDER} className={styles.line} />
            ) : (
              <div className={styles.rule} />
            ))}
          <motion.div
            layoutId="body"
            className={styles.body}
            transition={T.CONTENT}
            variants={stagger}
          >
            {entry.subtitle && (
              <motion.h3 layout="position" transition={T.CONTENT}>
                <TypewriterText text={entry.subtitle} />
              </motion.h3>
            )}
            {isOpen && !!entry.efforts?.length && (
              <EffortNav
                idPrefix={`${layoutKey}-card`}
                efforts={entry.efforts}
                selected={effort?.id ?? null}
                onSelect={setEffortId}
              />
            )}
            {effort ? (
              <div
                role="tabpanel"
                id={`${layoutKey}-card-panel`}
                aria-labelledby={`${layoutKey}-card-tab-${effort.id}`}
              >
                <EffortView key={effort.id} effort={effort} onMention={onMention} />
              </div>
            ) : (
              entry.description.map((line) => (
                <motion.p key={line} layout="position" transition={T.CONTENT}>
                  <RichText text={line} onMention={onMention} staggerChildren={0.004} />
                </motion.p>
              ))
            )}
            {isOpen && !effort && (
              <motion.div
                className={styles.details}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: T.DETAILS_ANIMATE }}
              >
                {entry.blurb && (
                  <p>
                    <RichText text={entry.blurb} onMention={onMention} />
                  </p>
                )}
                {!!entry.tools?.length && (
                  <div className={styles.tools}>
                    {entry.tools.map((t) => (
                      <GlitchIconItem key={t.label} Icon={t.Icon}>
                        {t.label}
                      </GlitchIconItem>
                    ))}
                  </div>
                )}
                {!!entry.panels?.length && <PanelGrid panels={entry.panels} />}
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      </motion.article>
    </LayoutGroup>
  );
});

export default EntryCard;
