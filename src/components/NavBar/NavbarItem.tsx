import cn from 'classnames';
import { motion } from 'framer-motion';
import React from 'react';
import TypewriterText from '@components/TypewriterText';
import { useAnimations } from '@context/AnimationContext';
import styles from './nav-bar.module.scss';

// NavBarItem Component
type NavBarItemProps = {
  label: string;
  onClick: () => void;
  selected: boolean;
  mini: boolean;
  /** Shows only the icon, never the label (a home key, say); the label stays its name. */
  iconOnly?: boolean;
  /** Icon and label together, as a mini item looks when it opens on hover. */
  withIcon?: boolean;
  /** The icon is drawn with strokes, so it is themed on the stroke. */
  strokeIcon?: boolean;
  Icon?: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string;
    }
  >;
  /** Role and state when the item is a tab rather than a page link. */
  tab?: { id: string; controls?: string; onKeyDown: (e: React.KeyboardEvent) => void };
  itemRef?: (el: HTMLElement | null) => void;
  /** Shown as a name rather than a control: hero type, no role, out of the tab order. */
  hero?: boolean;
};

const NavBarItem = ({
  label,
  onClick,
  selected = false,
  mini,
  iconOnly = false,
  withIcon = false,
  strokeIcon = false,
  Icon,
  tab,
  itemRef,
  hero = false,
}: NavBarItemProps) => {
  const { TRANSITIONS } = useAnimations();

  const borderVariants = {
    initial: {
      width: '0%',
    },
    animate: {
      width: '100%',
      transition: TRANSITIONS.NAV_ITEM.BORDER_ANIMATE,
    },
    show: {
      width: '100%',
    },
    exit: {
      width: '0%',
      transition: TRANSITIONS.NAV_ITEM.BORDER_EXIT,
    },
  };

  return (
    <motion.span
      ref={itemRef}
      className={cn(styles.navItem, {
        [styles.mini]: mini,
        [styles.iconOnly]: iconOnly,
        [styles.withIcon]: withIcon,
        [styles.strokeIcon]: strokeIcon,
        [styles.hero]: hero,
      })}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      aria-label={hero ? undefined : label}
      {...(hero
        ? { 'aria-hidden': true }
        : tab
          ? {
              role: 'tab',
              id: tab.id,
              'aria-selected': selected,
              'aria-controls': tab.controls,
              tabIndex: selected ? 0 : -1,
            }
          : { role: 'link', tabIndex: 0, 'aria-current': selected ? 'page' : undefined })}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        } else tab?.onKeyDown(e);
      }}
    >
      <motion.span
        className={cn(styles.border, { [styles.selected]: selected })}
        variants={borderVariants}
      />
      {(mini || iconOnly || withIcon) && Icon && (
        <motion.span className={styles.icon}>
          <Icon className={styles.image} />
        </motion.span>
      )}
      {!iconOnly && (
        <motion.span className={styles.label}>
          <TypewriterText
            text={label}
            staggerChildren={TRANSITIONS.NAV_ITEM.TEXT_ANIMATE_STAGGER.staggerChildren}
          />
        </motion.span>
      )}
    </motion.span>
  );
};

export default NavBarItem;
