import React from "react";
import { motion } from "framer-motion";
import { NavigateFunction } from "react-router-dom";
import cn from "classnames";
import styles from "./nav-bar.module.scss";

// Importing SVG icons
import Checklist from "./../../assets/svg/icons/check-list.svg?react";
import Code from "./../../assets/svg/icons/code.svg?react";
import User from "./../../assets/svg/icons/user.svg?react";
import Close from "./../../assets/svg/icons/close.svg?react";
import Expand from "./../../assets/svg/icons/expand.svg?react";

// Importing TypewriterText component
import TypewriterText from "../TypewriterText";

const navBarVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.6,
      delay: 1.2,
      staggerChildren: 0.5,
      delayChildren: 2.1,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.3,
    },
  },
};

// NavBarItem Component
type NavBarItemProps = {
  label: string;
  onClick: () => void;
  selected: boolean;
  fullScreen: boolean;
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
  fullScreen,
  Icon,
}: NavBarItemProps) => {
  return (
    <motion.span
      className={cn(styles.navItem, { [styles.fullScreenFalse]: !fullScreen })}
      onClick={onClick}
    >
      <motion.span
        className={cn(styles.border, { [styles.selected]: selected })}
      />
      {!fullScreen && <Icon className={styles.icon} />}
      <motion.span className={styles.label}>
        <TypewriterText text={label} staggerChildren={0.03} />
      </motion.span>
    </motion.span>
  );
};

// NavBarButton Component
type NavBarButtonProps = {
  onClick: () => void;
  Icon: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string;
    }
  >;
};

const NavBarButton = ({ onClick, Icon }: NavBarButtonProps) => {
  return (
    <motion.span className={styles.navButton} onClick={onClick}>
      <Icon className={styles.icon} />
    </motion.span>
  );
};

type NavBarProps = {
  setFullScreen: React.Dispatch<React.SetStateAction<boolean>>;
  fullScreen: boolean;
  navigate: NavigateFunction;
  page: string | undefined;
};

const NavBar = ({ setFullScreen, fullScreen, navigate, page }: NavBarProps) => {
  const handleNavClick = (path: string) => {
    navigate(path);
  };

  return (
    <motion.span
      className={styles.navigationBar}
      variants={navBarVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <motion.span className={styles.contents}>
        <motion.span className={styles.left}>
          <NavBarItem
            fullScreen={fullScreen}
            label="About"
            onClick={() => handleNavClick("/about")}
            selected={page === "about"}
            Icon={User}
          />
          <NavBarItem
            fullScreen={fullScreen}
            label="Experience"
            onClick={() => handleNavClick("/experience")}
            selected={page === "experience"}
            Icon={Checklist}
          />
          <NavBarItem
            fullScreen={fullScreen}
            label="Projects"
            onClick={() => handleNavClick("/projects")}
            selected={page === "projects"}
            Icon={Code}
          />
        </motion.span>
        <motion.span className={styles.center}>
          <motion.h3>
            <TypewriterText
              key={page}
              text={`$henry-jones/${page}`}
              staggerChildren={0.09}
            />
          </motion.h3>
        </motion.span>
        <motion.span className={styles.right}>
          <NavBarButton
            onClick={() => setFullScreen(!fullScreen)}
            Icon={Expand}
          />
          <NavBarButton
            onClick={() => navigate(`/`, { replace: true })}
            Icon={Close}
          />
        </motion.span>
      </motion.span>
    </motion.span>
  );
};

export default NavBar;
