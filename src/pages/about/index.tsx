import { motion } from "framer-motion";
import AnimatedBorderBox from "../../components/AnimatedBorderBox";
import PageContents from "../../components/Page/PageContents";
import TypewriterText from "../../components/3D/TypewriterText";
import styles from "./about.module.scss";
import Map from "../../components/MapViewer/components/Map";

import GitHub from "@assets/svg/socials/github.svg?react";
import Instagram from "@assets/svg/socials/Instagram.svg?react";
import LinkedIn from "@assets/svg/socials/linkedIn.svg?react";

import Book from "@assets/svg/icons/book-01.svg?react";
import Home from "@assets/svg/icons/home.svg?react";
import AnimatedLine from "../../components/AnimatedLine";
import GlitchIcon from "../../components/GlitchIcon";
import { iconVariants } from "../../styles/variants";
import StatTracker from "./StatTracker";
import Blurb from "../../components/MapViewer/components/Blurb";
import { MapProvider } from "../../components/MapViewer/MapContext";
import cn from "classnames";
import { useWindowDimensions } from "../../context/WindowDimensionContext";
import { screenWidths } from "../../styles/layout.constants";
import { useSettings } from "../../context/SettingsContext";
import { useColors } from "../../context/ColorsContext";

const commonExit = {
  opacity: 0,
  transition: {
    duration: 0,
    when: "afterChildren",
  },
};

const commonInitial = {
  opacity: 0,
};

const heroVariants = {
  initial: commonInitial,
  animate: {
    opacity: 1,
    transition: {
      duration: 0.3,
      staggerChildren: 0.1,
    },
  },
  exit: commonExit,
};

const mapViewerVariants = {
  initial: commonInitial,
  animate: {
    opacity: 1,
    transition: {
      duration: 0.3,
      staggerChildren: 0.1,
    },
  },
  exit: commonExit,
};

const socialsVariants = {
  initial: commonInitial,
  animate: {
    opacity: 1,
    transition: {
      delay: 1.5,
      delayChildren: 1.5,
      duration: 0.3,
      staggerChildren: 0.4,
    },
  },
  exit: commonExit,
};

const statsVariants = {
  initial: commonInitial,
  animate: {
    opacity: 1,
    transition: {
      duration: 0.3,
      staggerChildren: 0.4,
    },
  },
  exit: commonExit,
};

const tagsVariants = {
  initial: commonInitial,
  animate: {
    opacity: 1,
    transition: {
      delay: 1,
      delayChildren: 1,
      duration: 0.3,
      staggerChildren: 0.4,
    },
  },
  exit: commonExit,
};
const avatarVariants = {
  initial: commonInitial,
  animate: {
    opacity: 1,
    transition: {
      delay: 1.5,
      duration: 2.5,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.3,
    },
  },
};

const About = () => {
  const { width } = useWindowDimensions();
  const { zoomLevel } = useSettings();

  const { primaryHues } = useColors();

  const normalizedHue = (primaryHues.accentPrimary + 335) % 360;

  const dynamicFilterStyle = {
    filter: `sepia(100%) hue-rotate(${normalizedHue}deg) saturate(6)`,
  };

  const moveTags =
    width > screenWidths.mobileLarge ||
    width < screenWidths.tiny ||
    zoomLevel !== "fullscreen";

  // const moveSocials = width < screenWidths.tiny && zoomLevel === "fullscreen";

  return (
    <PageContents
      key={"about"}
      className={cn(styles.about, {
        [styles.handheld]: zoomLevel !== "fullscreen",
        [styles.fullscreen]: zoomLevel === "fullscreen",
      })}
    >
      <motion.div className={cn(styles.content, styles.aboutMe)}>
        {/* First Page */}
        <motion.div
          className={cn(styles.twoColumns, styles.flex)}
          variants={heroVariants}
        >
          {/* Info Section (Left/Top) */}
          <motion.div className={styles.left}>
            {/* Title */}
            <motion.div className={styles.title}>
              <motion.h1>
                <TypewriterText text={"Henry Jones"} staggerChildren={0.05} />
              </motion.h1>
              <motion.h3>
                <TypewriterText text="Creative Developer" />
              </motion.h3>
            </motion.div>

            {/* Blurb */}
            <motion.div className={styles.blurb}>
              <motion.p>
                <TypewriterText text="An early fascination with robotics led him to study computer science with a focus on UI and human interaction. In Silicon Valley, he built fast, high-impact social media UIs, refining his approach to accessible design. Now in NYC, he continues his journey, seeking fresh challenges that unite design with technology to create intuitive digital experiences." />
              </motion.p>
            </motion.div>

            {/* Socials */}
            {/* {!moveSocials && ( */}
            <motion.div className={styles.socials} variants={socialsVariants}>
              <motion.div
                variants={iconVariants}
                className={styles.iconWrapper}
              >
                <GlitchIcon
                  Icon={GitHub}
                  className={styles.icon}
                  url="https://github.com/henryjonescodes"
                />
              </motion.div>
              <motion.div
                variants={iconVariants}
                className={styles.iconWrapper}
              >
                <GlitchIcon
                  Icon={LinkedIn}
                  className={styles.icon}
                  url="https://www.linkedin.com/in/henryjonescodes/"
                />
              </motion.div>
              <motion.div
                variants={iconVariants}
                className={styles.iconWrapper}
              >
                <GlitchIcon
                  Icon={Instagram}
                  className={styles.icon}
                  url="https://www.instagram.com/theycallmezonez/"
                />
              </motion.div>
            </motion.div>
            {/* )} */}
          </motion.div>

          {/* Stats Section (Right/Bottom) */}
          <motion.div className={styles.right} variants={statsVariants}>
            <AnimatedBorderBox
              className={styles.border}
              contentClassName={styles.borderContent}
            >
              {/* Avatar */}
              <motion.div className={styles.viewer}>
                <motion.img
                  src="/gif/Avatar-ASCII-Clear.gif"
                  alt="Avatar"
                  className={styles.avatar}
                  variants={avatarVariants}
                  style={dynamicFilterStyle}
                />
              </motion.div>

              {/* Tags */}
              {moveTags && (
                <>
                  <AnimatedLine
                    className={styles.divider}
                    horizontal={true}
                    borderWidth={2}
                  />
                  <motion.div className={styles.tags} variants={tagsVariants}>
                    <motion.span className={styles.tag}>
                      <motion.div
                        variants={iconVariants}
                        className={styles.iconWrapper}
                      >
                        <Home className={styles.icon} />
                      </motion.div>
                      <motion.h4 className={styles.text}>
                        <TypewriterText
                          text="Brooklyn, NY"
                          staggerChildren={0.05}
                        />
                      </motion.h4>
                    </motion.span>
                    <motion.span className={styles.tag}>
                      <motion.div
                        variants={iconVariants}
                        className={styles.iconWrapper}
                      >
                        <Book className={styles.icon} />
                      </motion.div>
                      <motion.h4 className={styles.text}>
                        <TypewriterText
                          text="Union College"
                          staggerChildren={0.05}
                        />
                      </motion.h4>
                    </motion.span>
                  </motion.div>
                  <AnimatedLine
                    className={styles.divider}
                    horizontal={true}
                    borderWidth={2}
                  />
                </>
              )}

              {/* <StatTracker label="UI Implementation" rating={10} /> */}
              {/* <StatTracker label="Design" rating={6} /> */}
              {/* <StatTracker label="3D Art" rating={5} /> */}
              {/* Values */}
              <motion.div className={styles.values}>
                <motion.div className={styles.sliders}>
                  <StatTracker label="Skiing" rating={14} />
                  <StatTracker label="Rock Climbing" rating={6} />
                  <StatTracker label="Photography" rating={11} />
                  <StatTracker label="Sailing" rating={8} />
                </motion.div>
              </motion.div>
            </AnimatedBorderBox>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div className={cn(styles.content, styles.mapViewer)}>
        {/* Second Page */}
        <MapProvider>
          <motion.div
            className={cn(styles.twoColumns, styles.flex)}
            variants={mapViewerVariants}
          >
            {/* Map Viewer */}
            <motion.div className={styles.left}>
              <Map />
            </motion.div>
            {/* Map Blurb */}
            <motion.div className={styles.right}>
              <Blurb />
            </motion.div>
          </motion.div>
        </MapProvider>
      </motion.div>
    </PageContents>
  );
};

export default About;
