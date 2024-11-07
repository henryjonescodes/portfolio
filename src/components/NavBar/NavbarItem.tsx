import cn from "classnames";
import { motion } from "framer-motion";
import React from "react";
import TypewriterText from "../3D/TypewriterText";
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
const borderVariants = {
  initial: {
    width: "0%",
  },
  animate: {
    width: "100%",
    transition: {
      duration: 0.5,
      delay: 1.5, // Delay the border animation by 0.5 seconds
      ease: "easeInOut",
    },
  },
  exit: {
    width: "0%",
    transition: {
      duration: 0.3,
    },
  },
};

const NavBarItem = ({
  label,
  onClick,
  selected = false,
  mini,
  Icon,
}: NavBarItemProps) => {
  return (
    <motion.span
      className={cn(styles.navItem, { [styles.mini]: mini })}
      onClick={onClick}
    >
      <motion.span
        className={cn(styles.border, { [styles.selected]: selected })}
        variants={borderVariants} // Apply variants for the border
      />
      {mini && (
        <motion.span className={styles.icon}>
          <Icon className={styles.image} />
        </motion.span>
      )}
      <motion.span className={styles.label}>
        <TypewriterText text={label} staggerChildren={0.03} />
      </motion.span>
    </motion.span>
  );
};

export default NavBarItem;
