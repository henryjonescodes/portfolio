import { motion } from "framer-motion";
import AnimatedBorderBox from "@components/AnimatedBorderBox";
import TypewriterText from "@components/TypewriterText";
import { useAnimations } from "@context/AnimationContext";
import styles from "./about.module.scss";

import cn from "classnames";

type StatTrackerProps = {
  label: string;
  rating: number;
};

const StatTracker = ({ label, rating }: StatTrackerProps) => {
  const { TRANSITIONS } = useAnimations();

  const statTrackerVariants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: TRANSITIONS.STAT_TRACKER.ANIMATE,
    },
    exit: {
      opacity: 0,
      transition: TRANSITIONS.STAT_TRACKER.EXIT,
    },
  };

  const trackerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: TRANSITIONS.STAT_TRACKER.BLOCK_ANIMATE,
    },
    exit: { opacity: 0 },
  };

  const blockVariants = {
    initial: { scaleX: 0 },
    animate: {
      scaleX: 1,
      transition: TRANSITIONS.STAT_TRACKER.BLOCK_ANIMATE,
    },
    exit: {
      scaleX: 0,
      transition: TRANSITIONS.STAT_TRACKER.BLOCK_ANIMATE,
    },
  };
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
            staggerChildren={TRANSITIONS.STAT_TRACKER.TEXT_ANIMATE_STAGGER.staggerChildren}
          />
        </motion.h4>
      </motion.div>
    </motion.div>
  );
};

export default StatTracker;
