import { motion } from "framer-motion";
import AnimatedBorderBox from "../../components/AnimatedBorderBox";
import MapViewer from "../../components/MapViewer";
import PageContents, {
  PageContentsProps,
} from "../../components/Page/PageContents";
import TypewriterText from "../../components/TypewriterText";
import styles from "./about.module.scss";

import Home from "@assets/svg/icons/home.svg?react";
import Book from "@assets/svg/icons/book-01.svg?react";
import AnimatedLine from "../../components/AnimatedLine";

const About = ({ fullScreen }: PageContentsProps) => {
  return (
    <PageContents
      fullScreen={fullScreen}
      key={"about"}
      className={styles.about}
    >
      <motion.div className={styles.hero}>
        {/* Info Section (Left/Top) */}
        <motion.div className={styles.info}>
          <motion.div className={styles.title}>
            <motion.h1>
              <TypewriterText text={"Henry Jones"} staggerChildren={0.05} />
            </motion.h1>
            <motion.h3>
              <TypewriterText text="Creative Developer" />
            </motion.h3>
          </motion.div>
          <motion.div className={styles.blurb}>
            <motion.p>
              <TypewriterText text="An early fascination with robotics led him to study computer science with a focus on UI and human interaction. In Silicon Valley, he built fast, high-impact social media UIs, refining his approach to accessible design. Now in NYC, he continues his journey, seeking fresh challenges that unite design with technology to create intuitive digital experiences." />
            </motion.p>
          </motion.div>
          <motion.div className={styles.tags}>
            <motion.span className={styles.tag}>
              <Home className={styles.icon} />
              <motion.h4 className={styles.text}>Brooklyn, NY</motion.h4>
            </motion.span>
            <motion.span className={styles.tag}>
              <Book className={styles.icon} />
              <motion.h4 className={styles.text}>Union College</motion.h4>
            </motion.span>
          </motion.div>
        </motion.div>

        {/* Stats Section (Right/Bottom) */}
        <AnimatedBorderBox className={styles.stats}>
          <motion.div className={styles.viewer}>
            <img
              src="/gif/Avatar-ASCII-Clear.gif"
              alt="Avatar"
              className={styles.avatar}
            />
          </motion.div>
          <AnimatedLine
            className={styles.divider}
            horizontal={true}
            borderWidth={5}
          />
          <motion.div className={styles.values}>
            <StatTracker label="UI Implementation" rating={10} />
            <StatTracker label="Design" rating={6} />
            <StatTracker label="3D Art" rating={5} />
            <StatTracker label="Skiing" rating={10} />
            <StatTracker label="Rock Climbing" rating={4} />
            <StatTracker label="Photography" rating={7} />
            <StatTracker label="Sailing" rating={5} />
          </motion.div>
        </AnimatedBorderBox>
      </motion.div>
      <motion.div className={styles.map}>
        <MapViewer />
      </motion.div>
    </PageContents>
  );
};

type StatTrackerProps = {
  label: string;
  rating: number;
};

const statTrackerVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.4,
      staggerDirection: -1,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.1,
      staggerDirection: 1,
    },
  },
};

const trackerStagger = 0.07;

const trackerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: trackerStagger,
      delayChildren: trackerStagger,
      staggerDirection: -1,
    },
  },
  exit: { opacity: 0 },
};

const blockVariants = {
  initial: { scaleX: 0 },
  animate: { scaleX: 1, transition: { duration: trackerStagger } },
  exit: { scaleX: 0, transition: { duration: trackerStagger } },
};

const StatTracker = ({ label, rating }: StatTrackerProps) => {
  return (
    <motion.div className={styles.statTracker} variants={statTrackerVariants}>
      <AnimatedBorderBox
        className={styles.tracker}
        contentClassName={styles.trackerContent}
        borderRadius={11}
        borderWidth={3}
      >
        <motion.span className={styles.track} variants={trackerVariants}>
          {Array.from({ length: 16 }).map((_, index) => (
            <motion.div
              key={index}
              className={styles.block}
              variants={blockVariants}
            />
          ))}
        </motion.span>
      </AnimatedBorderBox>
      <motion.h4 className={styles.label}>
        <TypewriterText
          text={label}
          staggerDirection={-1}
          staggerChildren={0.03}
        />
      </motion.h4>
    </motion.div>
  );
};

export default About;
