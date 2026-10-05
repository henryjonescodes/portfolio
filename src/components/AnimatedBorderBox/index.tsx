import { motion, useIsPresent } from 'framer-motion';
import { useEffect, useRef, useState, ReactNode } from 'react';
import cn from 'classnames';
import { useAnimations } from '@context/AnimationContext';
import { radius } from '@styles/sass-variables';
import styles from './local.module.scss';
import { useWindowDimensions } from '@context/WindowDimensionContext';

interface AnimatedBorderProps {
  width: number;
  height: number;
  borderWidth: number;
  borderRadius?: number;
  animationDuration?: number;
  /** Draws from nothing on mount, for a border mounted after its parent finished animating. */
  drawOnMount?: boolean;
  onAnimationComplete?: () => void;
}

const AnimatedBorder = ({
  width,
  height,
  borderWidth,
  borderRadius = radius.md,
  animationDuration,
  drawOnMount,
  onAnimationComplete,
}: AnimatedBorderProps) => {
  const { TRANSITIONS } = useAnimations();

  const pathVariants = {
    initial: { pathLength: 0 },
    animate: {
      pathLength: 1,
      transition:
        animationDuration === undefined
          ? TRANSITIONS.BORDER_BOX.ANIMATE
          : { ...TRANSITIONS.BORDER_BOX.ANIMATE, duration: animationDuration },
    },
    exit: {
      pathLength: 0,
      transition: TRANSITIONS.BORDER_BOX.EXIT,
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
        width={Math.max(0, width - borderWidth)}
        height={Math.max(0, height - borderWidth)}
        fill="transparent"
        strokeWidth={borderWidth}
        variants={pathVariants}
        {...(drawOnMount && { initial: 'initial', animate: 'animate' })}
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
  /** Overrides the draw time, in seconds. */
  animationDuration?: number;
  /** Changing it redraws the border from nothing without remounting the content. */
  redrawKey?: number;
  children?: ReactNode;
}

// TODO: Add a speed control prop for animation
const AnimatedBorderBox = ({
  borderWidth = 4,
  className,
  children,
  contentClassName,
  animationDuration,
  redrawKey,
  borderRadius = radius.md,
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
      for (const entry of entries) {
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
        key={redrawKey}
        width={dimensions.width}
        height={dimensions.height}
        borderWidth={borderWidth}
        borderRadius={borderRadius}
        animationDuration={animationDuration}
        drawOnMount={!!redrawKey}
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
