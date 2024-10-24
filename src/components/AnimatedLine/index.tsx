import { motion } from "framer-motion";
import styles from "./animated-line.module.scss";

type AnimatedLineProps = {
  className?: string;
  borderWidth?: number;
  animationDuration?: number; // Duration of the animation
  horizontal?: boolean; // If true, line animates horizontally; otherwise, vertically
};

const AnimatedLine = ({
  className,
  borderWidth = 2.5,
  horizontal = false,
  animationDuration = 1,
}: AnimatedLineProps) => {
  // Define animation variants for horizontal and vertical orientations
  const lineVariants = {
    initial: horizontal ? { width: 0 } : { height: 0 },
    animate: horizontal
      ? {
          width: "100%",
          transition: {
            duration: animationDuration,
            ease: "easeInOut",
          },
        }
      : {
          height: "100%",
          transition: {
            duration: animationDuration,
            ease: "easeInOut",
          },
        },
    exit: horizontal ? { width: 0 } : { height: 0 },
  };

  return (
    <motion.div
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
