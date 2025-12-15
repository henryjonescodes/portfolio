import { motion } from "framer-motion";
import { useAnimations } from "@context/AnimationContext";
import NavBarButton from "./NavBarButton";
import AnimatedLine from "@components/AnimatedLine";
import Close from "@assets/svg/icons/close.svg?react";
import styles from "./modal-nav-bar.module.scss";

type ModalNavBarProps = {
  title: string;
  onClose?: () => void;
};

const ModalNavBar = ({ title, onClose }: ModalNavBarProps) => {
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
      <motion.div className={styles.contents}>
        <motion.div className={`${styles.left} ${styles.dragHandle}`} />
        <motion.div className={`${styles.center} ${styles.dragHandle}`}>
          <motion.h2 className={styles.title}>{title}</motion.h2>
        </motion.div>
        <motion.div className={styles.right}>
          {onClose && <NavBarButton onClick={onClose} Icon={Close} />}
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
