import { motion, useIsPresent } from "framer-motion";
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
        x={borderWidth / 2}
        y={borderWidth / 2}
        rx={borderRadius}
        ry={borderRadius}
        width={width - borderWidth}
        height={height - borderWidth}
        // stroke={borderColor}
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

// TODO: Add a speed control prop for animation
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
  const { width: windowWidth } = useWindowDimensions();
  const [cssBorderVisible, setCssBorderVisible] = useState<boolean>(false);
  const isPresent = useIsPresent();

  // Update dimensions when the component mounts and when window width changes
  useEffect(() => {
    if (containerRef.current) {
      const { offsetWidth, offsetHeight } = containerRef.current;
      setDimensions({ width: offsetWidth, height: offsetHeight });
    }
  }, [windowWidth]);

  // Use ResizeObserver to update dimensions when content size changes
  useEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        setDimensions({ width, height });
      }
    });

    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  // Handle CSS border visibility
  useEffect(() => {
    if (cssBorderVisible && !isPresent) {
      setCssBorderVisible(false);
    }
  }, [isPresent, cssBorderVisible]);

  return (
    <motion.div ref={containerRef} className={cn(styles.borderBox, className)}>
      {/* {!cssBorderVisible && ( */}
      <AnimatedBorder
        width={dimensions.width}
        height={dimensions.height}
        borderWidth={borderWidth}
        borderColor={borderColor}
        borderRadius={borderRadius}
        onAnimationComplete={() => setCssBorderVisible(true)}
      />
      {/* )} */}
      {/* <motion.div
        className={styles.cssBorder}
        style={{
          borderRadius: `${borderRadius * 1.13}px`,
          borderWidth: `${borderWidth}px`,
          borderColor: cssBorderVisible ? borderColor : "transparent",
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
