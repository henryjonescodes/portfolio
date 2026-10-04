import { motion } from 'framer-motion';
import cn from 'classnames';

import GitHub from '@assets/svg/socials/github.svg?react';
import Instagram from '@assets/svg/socials/Instagram.svg?react';
import LinkedIn from '@assets/svg/socials/linkedIn.svg?react';
import Book from '@assets/svg/icons/book-01.svg?react';
import Home from '@assets/svg/icons/home.svg?react';

import TypewriterText from '@components/TypewriterText';
import AnimatedBorderBox from '@components/AnimatedBorderBox';
import Map from '@components/MapViewer/Map';
import PageContents from '@components/Page/PageContents';
import AnimatedLine from '@components/AnimatedLine';
import GlitchIcon from '@components/GlitchIcon';
import Blurb from '@components/MapViewer/Blurb';
import { MapProvider } from '@components/MapViewer/MapProvider';
import { usePage } from '@context/PageContext';
import { useColors } from '@context/ColorsContext';
import { useWindowDimensions } from '@context/WindowDimensionContext';
import { useAnimations } from '@context/AnimationContext';
import { fade } from '@config/animation';

import { screenWidths } from '@styles/layout.constants.ts';

import styles from './about.module.scss';
import StatTracker from './StatTracker';

const About = () => {
  const { width } = useWindowDimensions();
  const { TRANSITIONS } = useAnimations();

  const heroVariants = fade(TRANSITIONS.ABOUT_HERO.ANIMATE, TRANSITIONS.ABOUT_HERO.EXIT);

  const mapViewerVariants = fade(TRANSITIONS.ABOUT_MAP.ANIMATE, TRANSITIONS.ABOUT_MAP.EXIT);

  const socialsVariants = fade(TRANSITIONS.ABOUT_SOCIALS.ANIMATE, TRANSITIONS.ABOUT_SOCIALS.EXIT);

  const statsVariants = fade(TRANSITIONS.ABOUT_STATS.ANIMATE, TRANSITIONS.ABOUT_STATS.EXIT);

  const tagsVariants = fade(TRANSITIONS.ABOUT_TAGS.ANIMATE, TRANSITIONS.ABOUT_TAGS.EXIT);

  const iconVariants = fade(TRANSITIONS.ICON.ANIMATE, TRANSITIONS.ICON.EXIT);
  const avatarVariants = fade(TRANSITIONS.ABOUT_AVATAR.ANIMATE, TRANSITIONS.ABOUT_AVATAR.EXIT);

  const { primaryHues } = useColors();
  const { embedded } = usePage();

  const normalizedHue = (primaryHues.accentPrimary + 335) % 360;

  const dynamicFilterStyle = {
    filter: `sepia(100%) hue-rotate(${normalizedHue}deg) saturate(6)`,
  };

  const moveTags = width > screenWidths.mobileLarge || embedded;

  return (
    <PageContents
      key={'about'}
      className={cn(styles.about, {
        [styles.handheld]: embedded,
        [styles.fullscreen]: !embedded,
      })}
    >
      <motion.div className={cn(styles.content, styles.aboutMe)}>
        {/* First Page */}
        <motion.div className={cn(styles.twoColumns, styles.flex)} variants={heroVariants}>
          {/* Info Section (Left/Top) */}
          <motion.div className={styles.left}>
            {/* Title */}
            <motion.div className={styles.title}>
              <motion.h1>
                <TypewriterText text={'Henry Jones'} staggerChildren={0.05} />
              </motion.h1>
              <motion.h3 aria-level={2}>
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
              <motion.div variants={iconVariants} className={styles.iconWrapper}>
                <GlitchIcon
                  Icon={GitHub}
                  className={styles.icon}
                  url="https://github.com/henryjonescodes"
                  label="GitHub"
                />
              </motion.div>
              <motion.div variants={iconVariants} className={styles.iconWrapper}>
                <GlitchIcon
                  Icon={LinkedIn}
                  className={styles.icon}
                  url="https://www.linkedin.com/in/henryjonescodes/"
                  label="LinkedIn"
                />
              </motion.div>
              <motion.div variants={iconVariants} className={styles.iconWrapper}>
                <GlitchIcon
                  Icon={Instagram}
                  className={styles.icon}
                  url="https://www.instagram.com/theycallmezonez/"
                  label="Instagram"
                />
              </motion.div>
            </motion.div>
            {/* )} */}
          </motion.div>

          {/* Stats Section (Right/Bottom) */}
          <motion.div className={styles.right} variants={statsVariants}>
            <AnimatedBorderBox className={styles.border} contentClassName={styles.borderContent}>
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
                  <AnimatedLine className={styles.divider} horizontal={true} borderWidth={2} />
                  <motion.div className={styles.tags} variants={tagsVariants}>
                    <motion.span className={styles.tag}>
                      <motion.div variants={iconVariants} className={styles.iconWrapper}>
                        <Home className={styles.icon} />
                      </motion.div>
                      <motion.h4 className={styles.text} role="none">
                        <TypewriterText text="Brooklyn, NY" staggerChildren={0.05} />
                      </motion.h4>
                    </motion.span>
                    <motion.span className={styles.tag}>
                      <motion.div variants={iconVariants} className={styles.iconWrapper}>
                        <Book className={styles.icon} />
                      </motion.div>
                      <motion.h4 className={styles.text} role="none">
                        <TypewriterText text="Union College" staggerChildren={0.05} />
                      </motion.h4>
                    </motion.span>
                  </motion.div>
                  <AnimatedLine className={styles.divider} horizontal={true} borderWidth={2} />
                </>
              )}

              {/* <StatTracker label="UI Implementation" rating={10} /> */}
              {/* <StatTracker label="Design" rating={6} /> */}
              {/* <StatTracker label="3D Art" rating={5} /> */}
              {/* Values */}
              <motion.div className={styles.values}>
                {!moveTags && (
                  <>
                    <AnimatedLine
                      className={styles.verticalLine}
                      horizontal={false}
                      borderWidth={2}
                    />
                    <motion.div className={styles.tags} variants={tagsVariants}>
                      <motion.span className={styles.tag}>
                        <motion.div variants={iconVariants} className={styles.iconWrapper}>
                          <Home className={styles.icon} />
                        </motion.div>
                        <motion.h4 className={styles.text} role="none">
                          <TypewriterText text="Brooklyn, NY" staggerChildren={0.05} />
                        </motion.h4>
                      </motion.span>
                      <motion.span className={styles.tag}>
                        <motion.div variants={iconVariants} className={styles.iconWrapper}>
                          <Book className={styles.icon} />
                        </motion.div>
                        <motion.h4 className={styles.text} role="none">
                          <TypewriterText text="Union College" staggerChildren={0.05} />
                        </motion.h4>
                      </motion.span>
                    </motion.div>
                    <AnimatedLine className={styles.divider} horizontal={true} borderWidth={2} />
                  </>
                )}
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
          <motion.div className={cn(styles.twoColumns, styles.flex)} variants={mapViewerVariants}>
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
