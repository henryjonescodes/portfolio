import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import styles from "./nav-bar.module.scss";
import GlitchIcon from "../GlitchIcon";

// NavBarButton Component
// Define mutually exclusive types
type NavBarButtonIconOnlyProps = {
  onClick: () => void;
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
type NavBarButtonProps =
  | NavBarButtonIconOnlyProps
  | NavBarButtonWithActiveProps;

export const NavBarButton = ({
  onClick,
  Icon,
  ActiveIcon,
  active,
}: NavBarButtonProps) => {
  return (
    <motion.span className={styles.navButton} onClick={onClick}>
      <AnimatePresence mode="wait">
        {active && ActiveIcon ? (
          <motion.span
            className={styles.icon}
            key="activeIcon"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
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
            transition={{ duration: 0.3 }}
          >
            <GlitchIcon Icon={Icon} className={styles.image} />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.span>
  );
};

export default NavBarButton;
