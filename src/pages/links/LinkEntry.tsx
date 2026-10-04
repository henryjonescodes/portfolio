import cn from 'classnames';
import { motion, type Variants } from 'framer-motion';
import { useMemo } from 'react';
import AnimatedBorderBox from '@components/AnimatedBorderBox';
import TypewriterText from '@components/TypewriterText';
import { useAnimations } from '@context/AnimationContext';
import type { LinkData } from '@data/links';
import styles from './links.module.scss';

type LinkEntryProps = LinkData & {
  isHovered: boolean;
  isOtherHovered: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
};

const LinkEntry = ({
  label,
  href,
  Icon,
  paint,
  isHovered,
  isOtherHovered,
  onHoverStart,
  onHoverEnd,
}: LinkEntryProps) => {
  const { TRANSITIONS } = useAnimations();
  const variants = useMemo(
    () =>
      ({
        background: {
          initial: { opacity: 0 },
          animate: { opacity: 1, transition: TRANSITIONS.LINKS.BACKGROUND_ANIMATE },
        },
        icon: {
          initial: { opacity: 0 },
          animate: { opacity: 1, transition: TRANSITIONS.LINKS.ICON_ANIMATE },
        },
      }) satisfies Record<string, Variants>,
    [TRANSITIONS],
  );
  const external = href.startsWith('http');

  return (
    <motion.a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className={styles.entryWrapper}
      animate={{
        scale: isHovered ? 1.02 : 1,
        filter: isOtherHovered ? 'saturate(0.5)' : 'saturate(1)',
      }}
      transition={TRANSITIONS.LINKS.HOVER}
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
      onFocus={onHoverStart}
      onBlur={onHoverEnd}
    >
      <AnimatedBorderBox
        className={styles.entry}
        contentClassName={styles.entryContent}
        borderWidth={4}
      >
        <motion.div className={styles.background} variants={variants.background} />
        <motion.div
          className={cn(styles.icon, {
            [styles.iconFill]: paint === 'fill',
            [styles.iconStroke]: paint === 'stroke',
          })}
          variants={variants.icon}
          aria-hidden
        >
          <Icon />
        </motion.div>
        <motion.h3 className={styles.label}>
          <TypewriterText text={label} staggerChildren={0.08} />
        </motion.h3>
      </AnimatedBorderBox>
    </motion.a>
  );
};

export default LinkEntry;
