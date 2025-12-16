import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { useAnimations } from "@context/AnimationContext";
import styles from "./nav-bar.module.scss";
import GlitchIcon from "@components/GlitchIcon";

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
  const { TRANSITIONS } = useAnimations();

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
