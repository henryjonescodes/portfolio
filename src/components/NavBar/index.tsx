import { motion } from "framer-motion";
import { useSettings } from "../../context/SettingsContext";
import { useWindowDimensions } from "../../context/WindowDimensionContext";
import { useNavigatePreserveQuery } from "../../hooks/useNavigatePreserveQuery";
import { widthSmall } from "../../styles/layout.constants";
import TypewriterText from "../3D/TypewriterText";
import AnimatedLine from "../AnimatedLine";
import Checklist from "./../../assets/svg/icons/check-list.svg?react";
import Code from "./../../assets/svg/icons/code.svg?react";
import Expand from "./../../assets/svg/icons/expand.svg?react";
import Handheld from "./../../assets/svg/icons/handheld.svg?react";
import Icon from "./../../assets/svg/icons/icon.svg?react";
import Pause from "./../../assets/svg/icons/pause.svg?react";
import Play from "./../../assets/svg/icons/play.svg?react";
import User from "./../../assets/svg/icons/user.svg?react";
import styles from "./nav-bar.module.scss";
import NavBarButton from "./NavBarButton";
import NavBarItem from "./NavbarItem";

const navBarVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.6,
      delay: 0.2,
      staggerChildren: 0.2,
      delayChildren: 0.2,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.3,
    },
  },
};

type NavBarProps = {
  page: string | undefined;
};

const NavBar = ({ page }: NavBarProps) => {
  const { width } = useWindowDimensions();
  const navigate = useNavigatePreserveQuery(); // Initialize the navigate function

  const {
    animationDisabled,
    setAnimationDisabled,
    zoomLevel,
    toggleFullScreen,
  } = useSettings();

  const handleNavClick = (path: string) => {
    navigate(path);
  };

  const pageName = !!page ? page : "home";
  const mini = zoomLevel !== "fullscreen" || width < widthSmall;
  const centerText = mini ? pageName : `$henry-jones/${pageName}`;

  return (
    <motion.span
      className={styles.navigationBar}
      variants={animationDisabled ? undefined : navBarVariants}
      initial={animationDisabled ? "animate" : "initial"}
      animate={animationDisabled ? "animate" : "animate"}
      exit={animationDisabled ? "animate" : "exit"}
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
            onClick={() => setAnimationDisabled(!animationDisabled, true)}
            Icon={Pause}
            ActiveIcon={Play}
            active={animationDisabled}
          />
          <NavBarButton
            onClick={() => {
              toggleFullScreen();
            }}
            active={zoomLevel === "fullscreen"}
            Icon={Expand}
            ActiveIcon={Handheld}
          />
          <NavBarButton
            onClick={() => navigate(`/`, { replace: true })}
            Icon={Icon}
          />
        </motion.span>
      </motion.span>
    </motion.span>
  );
};

export default NavBar;
