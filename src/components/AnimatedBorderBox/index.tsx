import { motion } from "framer-motion";
import { useEffect, useRef, useState, ReactNode } from "react";
import cn from "classnames"; // Import classnames
import styles from "./local.module.scss";

interface AnimatedBorderProps {
  width: number;
  height: number;
  borderWidth: number;
  borderColor: string;
  borderRadius?: number;
}

const AnimatedBorder = ({
  width,
  height,
  borderWidth,
  borderColor,
  borderRadius = 20,
}: AnimatedBorderProps) => {
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
        x={borderWidth / 2}
        y={borderWidth / 2}
        rx={borderRadius}
        ry={borderRadius}
        width={width - borderWidth}
        height={height - borderWidth}
        stroke={borderColor}
        fill="transparent"
        strokeWidth={borderWidth}
        variants={pathVariants}
      />
    </motion.svg>
  );
};

interface AnimatedBorderBoxProps {
  borderWidth?: number;
  borderColor?: string;
  borderRadius?: number;
  className?: string;
  contentClassName?: string;
  children: ReactNode;
}

const AnimatedBorderBox = ({
  borderWidth = 4, // Default to 4
  borderColor = "#00d67d", // Default to black
  className,
  children,
  contentClassName,
  borderRadius = 20,
}: AnimatedBorderBoxProps) => {
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
    <motion.div
      ref={containerRef}
      className={cn(styles.borderBox, className)}
      style={{
        padding: `${borderWidth}px`,
      }}
    >
      {/* The AnimatedBorder component now takes the dynamic size and customizable props */}
      <AnimatedBorder
        width={dimensions.width}
        height={dimensions.height}
        borderWidth={borderWidth}
        borderColor={borderColor}
        borderRadius={borderRadius}
      />
      <motion.div
        style={{ borderRadius: `${borderRadius}px` }}
        className={cn(styles.content, contentClassName)}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export default AnimatedBorderBox;
