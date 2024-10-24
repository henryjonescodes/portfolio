import React, { useContext, useEffect, useState } from "react";
import cn from "classnames";
import { motion } from "framer-motion";
import styles from "./map-components.module.scss";
import { MapContext } from "../MapContext";
import { LocationPinKeys } from "../types";

const staggerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.2,
      staggerChildren: 0.05, // Stagger each child by 0.05s when enterin
      staggerDirection: -1, // Reverse the stagger order on exitg
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2,
      staggerChildren: 0.02, // Stagger each child by 0.05s when exiting
      // staggerDirection: -1, // Reverse the stagger order on exit
      when: "afterChildren", // Ensure parent waits for children to exit
    },
  },
};

const lineVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 }, // Fade out each child when exiting
};

const MapSlider = () => {
  const { currentKey, setCurrentKey, locationData } = useContext(MapContext);
  const [selectedStop, setSelectedStop] = useState<number | null>(null);
  const [requestedStop, setRequestedStop] = useState<number | null>(null);
  const [bulgingIndex, setBulgingIndex] = useState<number | null>(null);

  const stopKeys = Object.keys(locationData) as LocationPinKeys[];
  const numStops = stopKeys.length;

  useEffect(() => {
    const index = currentKey !== null ? stopKeys.indexOf(currentKey) : -1;

    if (index !== -1) {
      if (selectedStop !== null) {
        triggerCascadingAnimation(index);
      }
      setSelectedStop(index);
    } else {
      setSelectedStop(null);
    }
  }, [currentKey]);

  const handleClick = (index: number) => {
    setCurrentKey(stopKeys[index]);
    triggerCascadingAnimation(index);
  };

  const triggerCascadingAnimation = (newIndex: number) => {
    setRequestedStop(newIndex);
    setSelectedStop(null);

    const start = selectedStop !== null ? selectedStop : 0;
    const end = newIndex;
    const startIndex = start * 10;
    const endIndex = end * 10;

    const steps = Math.abs(endIndex - startIndex);
    const direction = endIndex > startIndex ? 1 : -1;

    const totalDuration = 600;
    const interval = totalDuration / steps;

    for (let i = 0; i <= steps; i++) {
      setTimeout(() => {
        setBulgingIndex(startIndex + i * direction);
      }, i * interval);
    }

    setTimeout(() => {
      setSelectedStop(newIndex);
      setBulgingIndex(null);
      setRequestedStop(null);
    }, totalDuration);
  };

  const renderLines = () => {
    const lines: React.ReactNode[] = [];
    let lineIndex = 0;

    stopKeys.forEach((key, i) => {
      lines.push(
        <motion.div
          key={`stop-${i}`}
          className={cn(styles.stop, {
            [styles.selected]: selectedStop === i,
            [styles.requested]: requestedStop === i,
            [styles.bulging]: selectedStop !== i && bulgingIndex === lineIndex,
          })}
          variants={lineVariants}
          onClick={() => handleClick(i)}
        />
      );
      lineIndex++;

      if (i < stopKeys.length - 1) {
        for (let j = 0; j < 9; j++) {
          lines.push(
            <motion.div
              key={`line-${i}-${j}`}
              className={cn(styles.line, {
                [styles.bulging]: bulgingIndex === lineIndex,
              })}
              variants={lineVariants}
            />
          );
          lineIndex++;
        }
      }
    });

    return lines;
  };

  return (
    <motion.div className={styles.slider} variants={staggerVariants}>
      {renderLines()}
    </motion.div>
  );
};

export default MapSlider;
