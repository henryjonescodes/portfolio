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
  Icon: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string;
    }
  >;
  /** Role and state when the item is a tab rather than a page link. */
  tab?: { id: string; controls?: string; onKeyDown: (e: React.KeyboardEvent) => void };
  itemRef?: (el: HTMLElement | null) => void;
};

const NavBarItem = ({
  label,
  onClick,
  selected = false,
  mini,
  Icon,
  tab,
  itemRef,
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
      className={cn(styles.navItem, { [styles.mini]: mini })}
      onClick={onClick}
      aria-label={label}
      {...(tab
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
      {mini && (
        <motion.span className={styles.icon}>
          <Icon className={styles.image} />
        </motion.span>
      )}
      <motion.span className={styles.label}>
        <TypewriterText
          text={label}
          staggerChildren={TRANSITIONS.NAV_ITEM.TEXT_ANIMATE_STAGGER.staggerChildren}
        />
      </motion.span>
    </motion.span>
  );
};

export default NavBarItem;
