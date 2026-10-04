import cn from 'classnames';
import { motion, type Variants } from 'framer-motion';
import { useMemo } from 'react';
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
        well: {
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
    <motion.a {...linkProps(href)} className={styles.key} variants={variants.entry}>
      <motion.span
        className={cn(styles.well, {
          [styles.iconFill]: paint === 'fill',
          [styles.iconStroke]: paint === 'stroke',
        })}
        variants={variants.well}
        aria-hidden
      >
        <motion.span className={styles.icon} variants={variants.icon}>
          <Icon />
        </motion.span>
      </motion.span>
      <span className={styles.label}>
        <TypewriterText text={label} staggerChildren={0.05} />
      </span>
    </motion.a>
  );
};

export default LinkEntry;
