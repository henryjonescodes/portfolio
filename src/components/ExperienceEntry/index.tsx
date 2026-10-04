import cn from 'classnames';
import { animate, motion, LayoutGroup, useMotionValue } from 'framer-motion';
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
  overlayStyle,
  onClose,
  expanded = false,
  onToggleExpand,
}: ExperienceEntryProps) => {
  const { id, title, subtitle, description, blurb, startDate, endDate, dateString, tools, panels } =
    data;
  const dateRange = dateString ? dateString : formatDateRange(startDate, endDate);
  const { width } = useWindowDimensions();
  const { embedded } = usePage();
  const { TRANSITIONS } = useAnimations();
  const isOpen = pageOpen && !inList;

  // Shared layout transition for all layoutId elements
  const layoutTransition = TRANSITIONS.MODAL.CONTAINER_ANIMATE;

  const variants = useMemo(() => buildEntryVariants(TRANSITIONS), [TRANSITIONS]);

  // Expanding snaps the modal back from wherever it was dragged.
  const dragX = useMotionValue(0);
  const dragY = useMotionValue(0);
  useEffect(() => {
    if (!expanded) return;
    const { duration } = TRANSITIONS.MODAL.CONTAINER_ANIMATE;
    const controls = [animate(dragX, 0, { duration }), animate(dragY, 0, { duration })];
    return () => controls.forEach((c) => c.stop());
  }, [expanded, dragX, dragY, TRANSITIONS]);

  const containerContent = (
    <>
      <motion.div
        ref={entryRef}
        data-testid={inList ? 'entry' : 'modal-entry'}
        data-entry-id={id}
        layout
        layoutId={id}
        className={cn(styles.entry, {
          [styles.fullScreen]: !embedded,
          [styles.inList]: inList,
          [styles.notInList]: !inList,
          [styles.expanded]: !inList && expanded,
        })}
        onClick={onClick}
        style={onClick ? { cursor: 'pointer' } : undefined}
        transition={TRANSITIONS.MODAL.CONTAINER_ANIMATE}
        initial={false}
        animate={{
          opacity: inList && isSelected ? 0 : !inList ? 1 : 1,
          transition: {
            duration: inList && isSelected ? 0 : TRANSITIONS.MODAL.CONTAINER_ANIMATE.duration,
          },
        }}
      >
        {!isOpen && (
          <motion.span layoutId="header" className={styles.header} transition={layoutTransition}>
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
                <motion.h3 layoutId="subtitle" layout="position" transition={layoutTransition}>
                  <TypewriterText text={subtitle} />
                </motion.h3>
              </motion.div>
            )}
          </motion.span>
        )}

        <AnimatedBorderBox
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
          <motion.div
            layoutId="body"
            className={styles.body}
            initial={inList ? 'initial' : 'animate'}
            animate={inList ? 'animate' : 'modalAnimate'}
            exit={inList ? 'exit' : 'animate'}
          >
            <motion.div
              layoutId="bodyContent"
              className={styles.description}
              transition={TRANSITIONS.MODAL.CONTENT_ANIMATE}
              variants={variants.entryText}
            >
              {isOpen && (
                <ModalNavBar
                  title={title}
                  onClose={onClose}
                  expanded={expanded}
                  onToggleExpand={onToggleExpand}
                />
              )}
              <motion.div className={styles.descriptionContents}>
                <motion.div className={styles.descriptionContentsFlex}>
                  <motion.div className={styles.text}>
                    {isOpen && (
                      <motion.div layoutId="bodyTitle" transition={layoutTransition}>
                        <motion.h2 layoutId="title" layout="position" transition={layoutTransition}>
                          <TypewriterText text={title} />
                        </motion.h2>
                        {!!subtitle && (
                          <motion.h3
                            layoutId="subtitle"
                            layout="position"
                            transition={layoutTransition}
                          >
                            {subtitle}
                          </motion.h3>
                        )}
                        {!!dateRange && (
                          <motion.p layoutId="date" layout="position" transition={layoutTransition}>
                            {dateRange}
                          </motion.p>
                        )}
                      </motion.div>
                    )}
                    {description.map((desc, index) => (
                      <motion.p key={index}>
                        <TypewriterText text={desc} />
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
                          <TypewriterText text={blurb} />
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
                    className={styles.childrenWrapper}
                    layoutId="childrenWrapper"
                    transition={TRANSITIONS.MODAL.CONTENT_ANIMATE}
                  >
                    <AnimatedLine
                      borderWidth={borderWidth}
                      horizontal={width < widthMobile}
                      className={styles.line}
                    />
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
            </motion.div>
          </motion.div>
        </AnimatedBorderBox>
      </motion.div>
    </>
  );

  return (
    <LayoutGroup id={id}>
      {!inList && overlayStyle ? (
        <motion.div
          className={cn(styles.modalWrapper, { [styles.modalWrapperExpanded]: expanded })}
          variants={variants.modalContainer}
          initial="animate"
          animate={expanded ? 'expanded' : 'modalAnimate'}
          exit="modalExit"
          style={{ x: dragX, y: dragY }}
          drag={!expanded}
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
  );
};

export default ExperienceEntry;
