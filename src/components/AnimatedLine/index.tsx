import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useAnimations } from "@context/AnimationContext";
import styles from "./animated-line.module.scss";

type AnimatedLineProps = {
  className?: string;
  borderWidth?: number;
  animationDuration?: number;
  horizontal?: boolean;
};

const AnimatedLine = ({
  className,
  borderWidth = 2.5,
  horizontal = false,
  animationDuration,
}: AnimatedLineProps) => {
  const { TRANSITIONS } = useAnimations();
  const [animateOnLoad, setAnimateOnLoad] = useState(true);

  // Use provided duration or fall back to TRANSITIONS
  const duration = animationDuration ?? TRANSITIONS.ANIMATED_LINE.ANIMATE.duration;

  // When horizontal changes, stop animation on load
  useEffect(() => {
    setAnimateOnLoad(false);
  }, [horizontal]);

  // Define animation variants with or without transition based on horizontal updates
  const lineVariants = {
    initial: horizontal ? { width: 0 } : { height: 0 },
    animate: horizontal
      ? {
          width: "100%",
          transition: animateOnLoad
            ? {
                duration,
                ease: "easeInOut",
              }
            : { duration: 0 }, // Disable animation when horizontal updates
        }
      : {
          height: "100%",
          transition: animateOnLoad
            ? {
                duration,
                ease: "easeInOut",
              }
            : { duration: 0 },
        },
    show: horizontal
      ? {
          width: "100%",
        }
      : {
          height: "100%",
        },
    exit: horizontal ? { width: 0 } : { height: 0 },
  };

  return (
    <motion.div
      key={horizontal ? "horizontal" : "vertical"} // Ensures animation reset when prop changes
      className={`${styles.animatedLine} ${className}`}
      style={{
        width: horizontal ? 0 : `${borderWidth}px`,
        height: horizontal ? `${borderWidth}px` : 0,
      }}
      variants={lineVariants}
    />
  );
};

export default AnimatedLine;
