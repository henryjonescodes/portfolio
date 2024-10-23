import { motion, useIsPresent, usePresence } from "framer-motion";
import { useEffect, useRef, useState, ReactNode } from "react";
import cn from "classnames";
import styles from "./local.module.scss";
import { useWindowDimensions } from "../../context/WindowDimensionContext";

interface AnimatedBorderProps {
  width: number;
  height: number;
  borderWidth: number;
  borderColor: string;
  borderRadius?: number;
  onAnimationComplete?: () => void;
}

const pathVariants = {
  initial: { pathLength: 0 },
  animate: {
    pathLength: 1,
    transition: {
      duration: 1.5,
      ease: "easeInOut",
    },
  },
  exit: {
    pathLength: 0,
    transition: {
      duration: 1,
      ease: "easeInOut",
    },
  },
};

const AnimatedBorder = ({
  width,
  height,
  borderWidth,
  borderColor,
  borderRadius = 20,
  onAnimationComplete,
}: AnimatedBorderProps) => {
  return (
    <motion.svg
      className={styles.animatedBorder}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <motion.rect
        x={borderWidth / 2} /* Centers the stroke */
        y={borderWidth / 2} /* Centers the stroke */
        rx={borderRadius}
        ry={borderRadius}
        width={width - borderWidth} /* Adjust to fit within the container */
        height={height - borderWidth} /* Adjust to fit within the container */
        stroke={borderColor}
        fill="transparent"
        strokeWidth={borderWidth}
        variants={pathVariants}
        onAnimationComplete={onAnimationComplete}
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
  children?: ReactNode;
}

const AnimatedBorderBox = ({
  borderWidth = 4,
  borderColor = "#00d67d",
  className,
  children,
  contentClassName,
  borderRadius = 20,
}: AnimatedBorderBoxProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const { width } = useWindowDimensions();
  // const [cssBorderVisible, setCssBorderVisible] = useState<boolean>(false);

  // const isPresent = useIsPresent();

  // useEffect(() => {
  //   if (containerRef.current) {
  //     const { offsetWidth, offsetHeight } = containerRef.current;
  //     setDimensions({ width: offsetWidth, height: offsetHeight });
  //   }
  //   if (cssBorderVisible && !isPresent) {
  //     setCssBorderVisible(false);
  //   }
  // }, [isPresent, cssBorderVisible]);

  useEffect(() => {
    if (containerRef.current) {
      const { offsetWidth, offsetHeight } = containerRef.current;
      setDimensions({ width: offsetWidth, height: offsetHeight });
    }
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      const { offsetWidth, offsetHeight } = containerRef.current;
      setDimensions({ width: offsetWidth, height: offsetHeight });
    }
  }, [width]);

  return (
    <motion.div ref={containerRef} className={cn(styles.borderBox, className)}>
      <AnimatedBorder
        width={dimensions.width}
        height={dimensions.height}
        borderWidth={borderWidth}
        borderColor={borderColor}
        borderRadius={borderRadius}
        // onAnimationComplete={() => setCssBorderVisible(true)} // Trigger CSS border after animation
      />
      {/* <motion.div
        className={styles.cssBorder}
        style={{
          borderRadius: `${borderRadius * 1.13}px`,
          borderWidth: `${borderWidth}px`,
          borderColor: cssBorderVisible ? borderColor : "transparent", // Show CSS border after animation completes
        }}
      /> */}
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
