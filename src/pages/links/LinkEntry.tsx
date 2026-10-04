import cn from 'classnames';
import { motion, type Variants } from 'framer-motion';
import { useMemo } from 'react';
import AnimatedBorderBox from '@components/AnimatedBorderBox';
import TypewriterText from '@components/TypewriterText';
import { useAnimations } from '@context/AnimationContext';
import type { LinkData } from '@data/links';
import { linkProps } from '@utils/links';
import styles from './links.module.scss';

type LinkEntryProps = LinkData;

const LinkEntry = ({ label, href, Icon, paint }: LinkEntryProps) => {
  const { TRANSITIONS } = useAnimations();
  const variants = useMemo(
    () =>
      ({
        // The root joins the variant tree so the list's stagger reaches it.
        entry: { initial: { opacity: 0 }, animate: { opacity: 1 } },
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

  return (
    <motion.a {...linkProps(href)} className={styles.entryWrapper} variants={variants.entry}>
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
