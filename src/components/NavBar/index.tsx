import { motion } from "framer-motion";
import React, { useEffect, useMemo, useState } from "react";
import { NavigateFunction } from "react-router-dom";
import { useWindowDimensions } from "../../context/WindowDimensionContext";
import { widthSmall } from "../../styles/layout.constants";
import AnimatedLine from "../AnimatedLine";
import TypewriterText from "../TypewriterText";
import Checklist from "./../../assets/svg/icons/check-list.svg?react";
import Close from "./../../assets/svg/icons/close.svg?react";
import Code from "./../../assets/svg/icons/code.svg?react";
import Expand from "./../../assets/svg/icons/expand.svg?react";
import Pause from "./../../assets/svg/icons/pause.svg?react";
import Play from "./../../assets/svg/icons/play.svg?react";
import User from "./../../assets/svg/icons/user.svg?react";
import styles from "./nav-bar.module.scss";
import NavBarButton from "./NavBarButton";
import NavBarItem from "./NavbarItem";
import { useSettings } from "../../context/SettingsContext";

const navBarVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.6,
      delay: 0.2,
      staggerChildren: 0.5,
      delayChildren: 0.5,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.3,
    },
  },
};

const minimalNavBarVariants = {
  animate: {
    opacity: 0,
  },
  shown: {
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
  removed: {
    opacity: 0,
    transition: {
      when: "beforeChildren",
    },
  },
};

type NavBarProps = {
  setFullScreen: React.Dispatch<React.SetStateAction<boolean>>;
  fullScreen: boolean;
  navigate: NavigateFunction;
  page: string | undefined;
};

const NavBar = ({ setFullScreen, fullScreen, navigate, page }: NavBarProps) => {
  const { width } = useWindowDimensions();
  const { animationDisabled, setAnimationDisabled } = useSettings();

  const [delayedPage, setDelayedPage] = useState(page);

  useEffect(() => {
    let timerDur = 500;
    if (animationDisabled) {
      timerDur = 1000;
    }
    const timer = setTimeout(() => setDelayedPage(`${page}`), timerDur);
    return () => clearTimeout(timer); // Clean up on unmount or page change
  }, [page, animationDisabled]);

  const { initial, animate, exit, variants } = useMemo(() => {
    if (animationDisabled) {
      return {
        initial: "animate",
        animate: "shown",
        exit: "removed",
        variants: minimalNavBarVariants,
      };
    }
    return {
      initial: "initial",
      animate: "animate",
      exit: "exit",
      variants: navBarVariants,
    };
  }, [delayedPage]);

  const handleNavClick = (path: string) => {
    navigate(path);
  };

  const mini = !fullScreen || width < widthSmall;
  const centerText = mini ? page : `$henry-jones/${page}`;

  return (
    <motion.span
      className={styles.navigationBar}
      variants={variants}
      initial={initial}
      animate={animate}
      exit={exit}
    >
      <AnimatedLine
        className={styles.navbarBorder}
        borderWidth={5}
        horizontal
      />

      <motion.span className={styles.contents}>
        <motion.span className={styles.left}>
          <NavBarItem
            mini={mini}
            label="About"
            onClick={() => handleNavClick("/about")}
            selected={page === "about"}
            Icon={User}
          />
          <NavBarItem
            mini={mini}
            label="Experience"
            onClick={() => handleNavClick("/experience")}
            selected={page === "experience"}
            Icon={Checklist}
          />
          <NavBarItem
            mini={mini}
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
              text={centerText ?? ""}
              staggerChildren={0.05}
            />
          </motion.h3>
        </motion.span>
        <motion.span className={styles.right}>
          <NavBarButton
            onClick={() => setAnimationDisabled(!animationDisabled)}
            Icon={Pause}
            ActiveIcon={Play}
            active={animationDisabled}
          />
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
