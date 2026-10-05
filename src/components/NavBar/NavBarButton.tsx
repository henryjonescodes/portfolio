import cn from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { useAnimations } from '@context/AnimationContext';
import styles from './nav-bar.module.scss';
import { useSound } from '@hooks/useSound';
import GlitchIcon from '@components/GlitchIcon';

// NavBarButton Component
// Define mutually exclusive types
type NavBarButtonIconOnlyProps = {
  onClick: () => void;
  label?: string;
  /** Fills the whole button with the border colour; the icon shows the background through it. */
  filled?: boolean;
  Icon: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string;
    }
  >;
  ActiveIcon?: never;
  active?: never;
};

type NavBarButtonWithActiveProps = {
  onClick: () => void;
  label?: string;
  filled?: never;
  Icon: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string;
    }
  >;
  ActiveIcon: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string;
    }
  >;
  active: boolean;
};

// Combine the mutually exclusive types using a union
type NavBarButtonProps = NavBarButtonIconOnlyProps | NavBarButtonWithActiveProps;

const NavBarButton = ({ onClick, label, Icon, ActiveIcon, active, filled }: NavBarButtonProps) => {
  const { TRANSITIONS } = useAnimations();
  const play = useSound();
  const press = () => {
    play('click');
    onClick();
  };

  return (
    <motion.span
      className={cn(styles.navButton, { [styles.filled]: filled })}
      onClick={press}
      role="button"
      tabIndex={0}
      aria-label={label}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          press();
        }
      }}
    >
      <AnimatePresence mode="wait">
        {active && ActiveIcon ? (
          <motion.span
            className={styles.icon}
            key="activeIcon"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={TRANSITIONS.NAV_BUTTON.ACTIVE_ANIMATE}
          >
            <GlitchIcon Icon={ActiveIcon} className={styles.image} />
          </motion.span>
        ) : (
          <motion.span
            className={styles.icon}
            key="icon"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={TRANSITIONS.NAV_BUTTON.INACTIVE_ANIMATE}
          >
            <GlitchIcon Icon={Icon} className={styles.image} />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.span>
  );
};

export default NavBarButton;
