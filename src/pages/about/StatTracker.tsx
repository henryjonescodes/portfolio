import { motion } from "framer-motion";
import AnimatedBorderBox from "../../components/AnimatedBorderBox";
import TypewriterText from "../../components/3D/TypewriterText";
import styles from "./about.module.scss";

import cn from "classnames";

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
              className={cn(styles.block, {
                [styles.blockActive]: index + 1 <= rating,
              })}
              variants={blockVariants}
            />
          ))}
        </motion.span>
      </AnimatedBorderBox>
      <motion.div className={styles.label}>
        <motion.h4 className={styles.label}>
          <TypewriterText
            text={label}
            staggerDirection={-1}
            staggerChildren={0.03}
          />
        </motion.h4>
      </motion.div>
    </motion.div>
  );
};

export default StatTracker;
