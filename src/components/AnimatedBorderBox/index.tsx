import { motion, useIsPresent } from "framer-motion";
import { useEffect, useRef, useState, ReactNode } from "react";
import cn from "classnames";
import { useAnimations } from "@context/AnimationContext";
import styles from "./local.module.scss";
import { useWindowDimensions } from "@context/WindowDimensionContext";

interface AnimatedBorderProps {
  width: number;
  height: number;
  borderWidth: number;
  borderRadius?: number;
  onAnimationComplete?: () => void;
}

const AnimatedBorder = ({
  width,
  height,
  borderWidth,
  borderRadius = 20,
  onAnimationComplete,
}: AnimatedBorderProps) => {
  const { TRANSITIONS } = useAnimations();

  const pathVariants = {
    initial: { pathLength: 0 },
    animate: {
      pathLength: 1,
      transition: {
        ...TRANSITIONS.BORDER_BOX.ANIMATE,
        ease: "easeInOut",
      },
    },
    exit: {
      pathLength: 0,
      transition: {
        ...TRANSITIONS.BORDER_BOX.EXIT,
        ease: "easeInOut",
      },
    },
  };

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
  borderRadius?: number;
  className?: string;
  contentClassName?: string;
  children?: ReactNode;
}

// TODO: Add a speed control prop for animation
const AnimatedBorderBox = ({
  borderWidth = 4,
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
