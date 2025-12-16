import cn from "classnames";
import { motion } from "framer-motion";
import React from "react";
import TypewriterText from "@components/TypewriterText";
import { useAnimations } from "@context/AnimationContext";
import styles from "./nav-bar.module.scss";

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
};

const NavBarItem = ({
  label,
  onClick,
  selected = false,
  mini,
  Icon,
}: NavBarItemProps) => {
  const { TRANSITIONS } = useAnimations();

  const borderVariants = {
    initial: {
      width: "0%",
    },
    animate: {
      width: "100%",
      transition: TRANSITIONS.NAV_ITEM.BORDER_ANIMATE,
    },
    show: {
      width: "100%",
    },
    exit: {
      width: "0%",
      transition: TRANSITIONS.NAV_ITEM.BORDER_EXIT,
    },
  };

  return (
    <motion.span
      className={cn(styles.navItem, { [styles.mini]: mini })}
      onClick={onClick}
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
