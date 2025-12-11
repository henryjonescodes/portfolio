import { motion } from "framer-motion";
import { ANIMATION_DURATIONS } from "@config/animations";
import NavBarButton from "./NavBarButton";
import AnimatedLine from "@components/AnimatedLine";
import Close from "@assets/svg/icons/close.svg?react";
import styles from "./modal-nav-bar.module.scss";

const modalNavBarVariants = {
  initial: {
    height: 0,
    opacity: 0,
  },
  animate: {
    height: "auto",
    opacity: 1,
    transition: {
      duration: ANIMATION_DURATIONS.MODAL_CONTAINER,
      delay: ANIMATION_DURATIONS.MODAL_BLURB_DELAY,
      delayChildren: 1,
    },
  },
  exit: {
    height: 0,
    opacity: 0,
    transition: {
      duration: ANIMATION_DURATIONS.MODAL_CONTAINER,
    },
  },
};

type ModalNavBarProps = {
  title: string;
  onClose?: () => void;
};

const ModalNavBar = ({ title, onClose }: ModalNavBarProps) => {
  return (
    <motion.div
      className={styles.modalNavbar}
      variants={modalNavBarVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <motion.div className={styles.contents}>
        <motion.div className={styles.left} />
        <motion.div className={styles.center}>
          <motion.h2 className={styles.title}>{title}</motion.h2>
        </motion.div>
        <motion.div className={styles.right}>
          {onClose && <NavBarButton onClick={onClose} Icon={Close} />}
        </motion.div>
        <AnimatedLine
          className={styles.navbarBorder}
          borderWidth={5}
          horizontal
        />
      </motion.div>
    </motion.div>
  );
};

export default ModalNavBar;
