import cn from 'classnames';
import { animate, motion, LayoutGroup, MotionConfig, useMotionValue } from 'framer-motion';
import { useEffect, useMemo } from 'react';
import { useWindowDimensions } from '@context/WindowDimensionContext';
import { widthMobile } from '@styles/layout.constants.ts';
import TypewriterText from '@components/TypewriterText';
import AnimatedBorderBox from '@components/AnimatedBorderBox';
import AnimatedLine from '@components/AnimatedLine';
import ModalNavBar from '@components/NavBar/ModalNavBar';
import { useAnimations } from '@context/AnimationContext';
import { buildEntryVariants } from './variants';
import PanelGrid from '@components/Panels';
import styles from './experience-entry.module.scss';
import { usePage } from '@context/PageContext';
import { formatDateRange } from '@utils/text';
import type { ExperienceEntryProps } from './types';
import GlitchIconItem from '@components/GlitchIconItem';
import EffortNav from '@components/Efforts/EffortNav';
import { GALLERY } from '@components/Efforts/subpages';
import MasonryGallery from '@components/MasonryGallery';
import EffortView from '@components/Efforts/EffortView';
import RichText from '@components/Efforts/RichText';
import { useEntryRedraw } from '@components/EntryList/EntryRedrawContext';

const ExperienceEntry = ({
  data,
  borderWidth = 2.5,
  children,
  url,
  onClick,
  entryRef,
  pageOpen = false,
  inList = false,
  isSelected = false,
  modal = false,
  windowStyle,
  onLayoutAnimationComplete,
  mediaWhenClosed = true,
  mediaInTilesOnly = false,
  onClose,
  expanded = false,
  onToggleExpand,
  effortId = null,
  onSelectEffort,
  onMention,
}: ExperienceEntryProps) => {
  const {
    id,
    title,
    subtitle,
    description,
    blurb,
    startDate,
    endDate,
    dateString,
    tools,
    panels,
    efforts,
    gallery,
  } = data;
  const dateRange = dateString ? dateString : formatDateRange(startDate, endDate);
  const { width } = useWindowDimensions();
  const { embedded } = usePage();
  const { TRANSITIONS } = useAnimations();
  // After the list switches layout, its borders and lines remount and draw again quickly.
  const redraw = useEntryRedraw();
  const redrawDuration = redraw ? TRANSITIONS.ENTRY_LIST.REDRAW.duration : undefined;
  const isOpen = pageOpen && !inList;
  const effort = isOpen ? efforts?.find((e) => e.id === effortId) : undefined;
  const showGallery = isOpen && effortId === GALLERY && !!gallery?.length;
  const subpageId = effort?.id ?? (showGallery ? GALLERY : null);
  // Mentions are buttons only in the open entry; a list item is already one big button.
  const mentionHandler = isOpen ? onMention : undefined;

  const variants = useMemo(() => buildEntryVariants(TRANSITIONS), [TRANSITIONS]);

  // Expanding snaps the modal back from wherever it was dragged; closing drops the offset so
  // the window lands on its source.
  const dragX = useMotionValue(0);
  const dragY = useMotionValue(0);
  useEffect(() => {
    // Closing, or shrinking to a phone where the window is full screen, drops any drag offset.
    if (!pageOpen || width < widthMobile) {
      dragX.set(0);
      dragY.set(0);
    }
    if (!expanded) return;
    const { duration } = TRANSITIONS.MODAL.CONTAINER_ANIMATE;
    const controls = [animate(dragX, 0, { duration }), animate(dragY, 0, { duration })];
    return () => controls.forEach((c) => c.stop());
  }, [expanded, pageOpen, width, dragX, dragY, TRANSITIONS]);

  // The open entry's heading. Both the overview and an effort render it, so its shared
  // layoutIds stay mounted when tabs switch instead of handing back to the list item.
  const bodyTitle = (
    <motion.div layoutId="bodyTitle">
      <motion.h2 layoutId="title" layout="position">
        <TypewriterText text={title} />
      </motion.h2>
      {!!subtitle && (
        <motion.h3 layoutId="subtitle" layout="position">
          {subtitle}
        </motion.h3>
      )}
      {!!dateRange && (
        <motion.p layoutId="date" layout="position">
          {dateRange}
        </motion.p>
      )}
    </motion.div>
  );

  const containerContent = (
    <>
      <motion.div
        ref={entryRef}
        data-testid={inList ? 'entry' : 'modal-entry'}
        data-entry-id={id}
        layout
        layoutId={id}
        onLayoutAnimationComplete={onLayoutAnimationComplete}
        className={cn(styles.entry, {
          [styles.fullScreen]: !embedded,
          [styles.inList]: inList,
          [styles.notInList]: !inList,
          [styles.expanded]: !inList && expanded,
        })}
        onClick={onClick}
        style={onClick ? { cursor: 'pointer' } : undefined}
        {...(onClick && {
          role: 'button',
          tabIndex: 0,
          'aria-label': `Open ${title}`,
          onKeyDown: (e: React.KeyboardEvent) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onClick();
            }
          },
        })}
        initial={false}
        animate={{
          // The open window stands in for its list item, then hands back without a fade.
          opacity: inList && isSelected ? 0 : 1,
          transition: { duration: 0 },
        }}
      >
        {!isOpen && (
          <motion.span layoutId="header" className={styles.header}>
            <motion.div className={styles.title}>
              <motion.h2 layoutId="title" layout="position" variants={variants.headerText}>
                <TypewriterText text={title} />
              </motion.h2>
              {!!dateRange && (
                <motion.p layoutId="date" layout="position" variants={variants.headerText}>
                  <TypewriterText text={dateRange} />
                </motion.p>
              )}
            </motion.div>
            {!!subtitle && (
              <motion.div className={styles.subtitle} variants={variants.headerText}>
                <motion.h3 layoutId="subtitle" layout="position">
                  <TypewriterText text={subtitle} />
                </motion.h3>
              </motion.div>
            )}
            {inList && (
              <AnimatedLine
                key={redraw}
                borderWidth={borderWidth}
                animationDuration={redrawDuration}
                horizontal
                drawOnMount
                className={styles.barLine}
              />
            )}
          </motion.span>
        )}

        <AnimatedBorderBox
          redrawKey={inList ? redraw : undefined}
          animationDuration={inList ? redrawDuration : undefined}
          className={styles.box}
          contentClassName={styles.boxContent}
          borderWidth={borderWidth}
        >
          {!inList && (
            <motion.div
              className={styles.background}
              initial={false}
              animate={{
                opacity: isOpen ? 1 : 0,
              }}
              transition={TRANSITIONS.MODAL.CONTAINER_ANIMATE}
            />
          )}
          {isOpen && (
            // The frame's fixed top: the title bar, with the section tabs on its left. Only the body below scrolls,
            // and `layout` keeps this pinned to the top edge while the window resizes.
            <motion.div layout className={styles.windowHeader}>
              <ModalNavBar
                title={title}
                onClose={onClose}
                expanded={expanded}
                onToggleExpand={onToggleExpand}
                left={
                  (!!efforts?.length || !!gallery?.length) &&
                  onSelectEffort && (
                    <EffortNav
                      inline
                      idPrefix={id}
                      efforts={efforts ?? []}
                      hasGallery={!!gallery?.length}
                      selected={subpageId}
                      onSelect={onSelectEffort}
                    />
                  )
                }
              />
            </motion.div>
          )}
          <motion.div
            layoutId="body"
            layoutScroll={isOpen}
            className={styles.body}
            initial={inList ? 'initial' : 'animate'}
            animate={inList ? 'animate' : 'modalAnimate'}
            exit={inList ? 'exit' : 'animate'}
          >
            <motion.div
              layoutId="bodyContent"
              className={styles.description}
              variants={variants.entryText}
            >
              {subpageId ? (
                <motion.div
                  layout
                  key={subpageId}
                  className={styles.effortContents}
                  role="tabpanel"
                  id={`${id}-panel`}
                  aria-labelledby={`${id}-tab-${subpageId}`}
                >
                  {effort ? (
                    <EffortView effort={effort} onMention={mentionHandler} />
                  ) : (
                    <MasonryGallery items={gallery ?? []} />
                  )}
                </motion.div>
              ) : (
                <>
                  <motion.div layout className={styles.descriptionContents}>
                    <motion.div className={styles.descriptionContentsFlex}>
                      <motion.div className={styles.text}>
                        {isOpen && bodyTitle}
                        {description.map((desc, index) => (
                          <motion.p key={index}>
                            <RichText text={desc} onMention={mentionHandler} />
                          </motion.p>
                        ))}
                        {isOpen && blurb && (
                          <motion.div
                            variants={variants.entryText}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            transition={TRANSITIONS.MODAL.DESCRIPTION_ANIMATE}
                          >
                            <motion.p>
                              <RichText text={blurb} onMention={mentionHandler} />
                            </motion.p>
                          </motion.div>
                        )}
                      </motion.div>
                      {!!tools && (
                        <motion.div className={styles.tools} variants={variants.tools}>
                          <AnimatedLine
                            borderWidth={borderWidth}
                            horizontal={true}
                            className={styles.line}
                          />
                          {tools.map((t, index) => (
                            <GlitchIconItem key={index} Icon={t.Icon}>
                              {t.label}
                            </GlitchIconItem>
                          ))}
                        </motion.div>
                      )}
                    </motion.div>
                    {children && (
                      <motion.div
                        className={cn(styles.childrenWrapper, {
                          [styles.mediaCollapsed]: modal && !isOpen && !mediaWhenClosed,
                          [styles.tilesOnly]: inList && mediaInTilesOnly,
                        })}
                        layoutId="childrenWrapper"
                        // Only the modal window drives this itself; in a list item an own `animate`
                        // would cut the list's variants off from the media inside.
                        {...(modal && {
                          initial: false,
                          animate: { opacity: !isOpen && !mediaWhenClosed ? 0 : 1 },
                        })}
                      >
                        {inList ? (
                          // Both lines exist; the list's CSS shows the one that fits its layout.
                          <>
                            <AnimatedLine
                              key={`v${redraw}`}
                              borderWidth={borderWidth}
                              animationDuration={redrawDuration}
                              className={cn(styles.line, styles.lineVertical)}
                            />
                            <AnimatedLine
                              key={`h${redraw}`}
                              borderWidth={borderWidth}
                              animationDuration={redrawDuration}
                              horizontal
                              className={cn(styles.line, styles.lineHorizontal)}
                            />
                          </>
                        ) : (
                          <AnimatedLine
                            borderWidth={borderWidth}
                            horizontal={width < widthMobile}
                            className={styles.line}
                          />
                        )}
                        {url ? (
                          <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={cn(styles.children, styles.linkArea)}
                          >
                            {children}
                          </a>
                        ) : onClick ? (
                          <motion.div
                            onClick={onClick}
                            className={cn(styles.children, styles.linkArea)}
                            style={{ cursor: 'pointer' }}
                          >
                            {children}
                          </motion.div>
                        ) : (
                          <motion.div className={styles.children}>{children}</motion.div>
                        )}
                      </motion.div>
                    )}
                  </motion.div>
                  {isOpen && !!panels?.length && (
                    <div className={styles.panels}>
                      <AnimatedLine borderWidth={borderWidth} horizontal className={styles.line} />
                      <PanelGrid panels={panels} />
                    </div>
                  )}
                </>
              )}
            </motion.div>
          </motion.div>
        </AnimatedBorderBox>
      </motion.div>
    </>
  );

  return (
    // One timing for every layout animation inside the entry, so the content moves with
    // the window instead of on its own clock.
    <MotionConfig transition={TRANSITIONS.MODAL.CONTAINER_ANIMATE}>
      <LayoutGroup id={modal ? `${id}-modal` : id}>
        {!inList && modal ? (
          <motion.div
            className={cn(styles.modalWrapper, { [styles.modalWrapperExpanded]: expanded })}
            style={{ ...windowStyle, x: dragX, y: dragY }}
            // Phones show the window full screen, so it does not drag there.
            drag={!expanded && width >= widthMobile}
            dragMomentum={false}
            dragElastic={0.1}
            dragConstraints={{
              top: -1000,
              left: -1000,
              right: 1000,
              bottom: 1000,
            }}
          >
            {containerContent}
          </motion.div>
        ) : (
          containerContent
        )}
      </LayoutGroup>
    </MotionConfig>
  );
};

export default ExperienceEntry;
