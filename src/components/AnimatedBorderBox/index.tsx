import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import styles from "./local.module.scss";

interface AnimatedBorderProps {
  width: number;
  height: number;
}

const AnimatedBorder = ({ width, height }: AnimatedBorderProps) => {
  const borderRadius = 20; // Adjust the border radius
  const strokeWidth = 4; // Line width for the stroke

  const pathVariants = {
    hidden: {
      pathLength: 0,
    },
    visible: {
      pathLength: 1,
      transition: {
        duration: 1.5, // Time to draw the border
        ease: "easeInOut",
        delay: 2, // Delay to start after page animation
      },
    },
  };

  return (
    <motion.svg
      className={styles.animatedBorder}
      width={width}
      height={height}
      initial="hidden"
      animate="visible"
      viewBox={`0 0 ${width} ${height}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Animated Rounded Rectangle */}
      <motion.rect
        x={strokeWidth / 2}
        y={strokeWidth / 2}
        rx={borderRadius}
        ry={borderRadius}
        width={width - strokeWidth}
        height={height - strokeWidth}
        stroke="black"
        fill="transparent"
        strokeWidth={strokeWidth}
        variants={pathVariants}
      />
    </motion.svg>
  );
};

const AnimatedBorderBox = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    // Update the dimensions based on the container's current size
    if (containerRef.current) {
      const { offsetWidth, offsetHeight } = containerRef.current;
      setDimensions({ width: offsetWidth, height: offsetHeight });
    }
  }, []);

  return (
    <motion.div ref={containerRef} className={styles.content}>
      {/* The AnimatedBorder component now takes the dynamic size */}
      <AnimatedBorder width={dimensions.width} height={dimensions.height} />
      <h3>I'm in the box</h3>
    </motion.div>
  );
};

export default AnimatedBorderBox;
