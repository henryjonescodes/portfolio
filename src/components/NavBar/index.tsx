import React from "react";
import styles from "./nav-bar.module.scss";
import { motion } from "framer-motion";
import TypewriterText from "../TypewriterText";
import { useNavigate, useParams } from "react-router-dom";
import cn from "classnames";
import closeSVG from "@assets/svg/icons/close.svg";
import Close from "./../../assets/svg/icons/close.svg?react";
import Expand from "./../../assets/svg/icons/expand.svg?react";

const navBarVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.6,
      delay: 1.2,
      staggerChildren: 0.2,
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
  selected?: boolean;
};

const NavBarItem = ({ label, onClick, selected = false }: NavBarItemProps) => {
  return (
    <motion.span className={styles.navItem} onClick={onClick}>
      <motion.span
        className={cn(styles.border, { [styles.selected]: selected })}
        onClick={onClick}
      />
      {label}
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
      <Icon />
    </motion.span>
  );
};

type NavBarProps = {
  setFullScreen: React.Dispatch<React.SetStateAction<boolean>>;
  fullScreen: boolean;
};

const NavBar = ({ setFullScreen, fullScreen }: NavBarProps) => {
  const { page } = useParams<{ page: string }>();
  const navigate = useNavigate(); // Initialize the navigate function

  const handleNavClick = (path: string) => {
    navigate(path);
  };

  return (
    <motion.span className={styles.navigationBar} variants={navBarVariants}>
      <motion.span className={styles.contents}>
        <motion.span className={styles.left}>
          <NavBarItem
            label="About"
            onClick={() => handleNavClick("/about")}
            selected={page === "about"}
          />
          <NavBarItem
            label="Experience"
            onClick={() => handleNavClick("/experience")}
            selected={page === "experience"}
          />
          <NavBarItem
            label="Projects"
            onClick={() => handleNavClick("/projects")}
            selected={page === "projects"}
          />
        </motion.span>
        <motion.span className={styles.center}>
          <motion.h3>
            <TypewriterText
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
