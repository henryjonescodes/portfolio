import cn from 'classnames';
import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { useAnimations } from '@context/AnimationContext';
import NavBarButton from './NavBarButton';
import AnimatedLine from '@components/AnimatedLine';
import Close from '@assets/svg/icons/x.svg?react';
import Expand from '@assets/svg/icons/expand.svg?react';
import Shrink from '@assets/svg/icons/shrink.svg?react';
import styles from './modal-nav-bar.module.scss';

type ModalNavBarProps = {
  title: string;
  onClose?: () => void;
  expanded?: boolean;
  onToggleExpand?: () => void;
  /** Fills the bar's left side, such as an entry's section tabs. */
  left?: ReactNode;
};

const ModalNavBar = ({
  title,
  onClose,
  expanded = false,
  onToggleExpand,
  left,
}: ModalNavBarProps) => {
  const { TRANSITIONS } = useAnimations();

  const modalNavBarVariants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        ...TRANSITIONS.MODAL_NAVBAR.ANIMATE,
        delayChildren: 1,
      },
    },
    exit: {
      height: 0,
      opacity: 0,
      transition: TRANSITIONS.MODAL.CONTAINER_ANIMATE,
    },
  };
  return (
    <motion.div
      className={styles.modalNavbar}
      variants={modalNavBarVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <motion.div className={cn(styles.contents, { [styles.hasLeft]: !!left })}>
        <motion.div className={cn(styles.left, { [styles.dragHandle]: !left })}>{left}</motion.div>
        <motion.div className={`${styles.center} ${styles.dragHandle}`}>
          <motion.h2 className={styles.title}>{title}</motion.h2>
        </motion.div>
        <motion.div className={styles.right}>
          {onToggleExpand && (
            // Phones show the window full screen already, so they get no Expand.
            <span className={styles.expand}>
              <NavBarButton
                onClick={onToggleExpand}
                Icon={Expand}
                ActiveIcon={Shrink}
                active={expanded}
                label={expanded ? 'Restore' : 'Expand'}
              />
            </span>
          )}
          {onClose && <NavBarButton onClick={onClose} Icon={Close} label="Close" filled />}
        </motion.div>
        <AnimatedLine
          className={styles.navbarBorder}
          borderWidth={5}
          horizontal
          animationDuration={TRANSITIONS.MODAL_NAVBAR.LINE_ANIMATE.duration}
        />
      </motion.div>
    </motion.div>
  );
};

export default ModalNavBar;
