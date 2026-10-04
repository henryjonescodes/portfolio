import React, { useContext, useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import { animate, motion, type AnimationPlaybackControls } from 'framer-motion';
import { useAnimations } from '@context/AnimationContext';
import styles from './map-components.module.scss';
import { MapContext } from './MapContext';
import { LocationPinKeys } from './map-viewer.contents';

const MapSlider = () => {
  const { TRANSITIONS, MAP_SLIDER_CASCADE_MS } = useAnimations();

  const staggerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: TRANSITIONS.MAP_SLIDER.ANIMATE,
    },
    exit: {
      opacity: 0,
      transition: TRANSITIONS.MAP_SLIDER.EXIT,
    },
  };

  const lineVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };
  const { currentKey, setCurrentKey, locationData } = useContext(MapContext);
  const [selectedStop, setSelectedStop] = useState<number | null>(null);
  const [requestedStop, setRequestedStop] = useState<number | null>(null);
  const [bulgingIndex, setBulgingIndex] = useState<number | null>(null);
  const cascade = useRef<AnimationPlaybackControls>();
  useEffect(() => () => cascade.current?.stop(), []);

  const stopKeys = Object.keys(locationData) as LocationPinKeys[];
  // const numStops = stopKeys.length;

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

    // The bulge walks line by line from the current stop to the requested one.
    cascade.current?.stop();
    cascade.current = animate(startIndex, endIndex, {
      duration: MAP_SLIDER_CASCADE_MS / 1000,
      ease: 'linear',
      onUpdate: (index) => setBulgingIndex(Math.round(index)),
      onComplete: () => {
        setSelectedStop(newIndex);
        setBulgingIndex(null);
        setRequestedStop(null);
      },
    });
  };

  const renderLines = () => {
    const lines: React.ReactNode[] = [];
    let lineIndex = 0;

    stopKeys.forEach((key, i) => {
      lines.push(
        <motion.div
          key={`stop-${key}-${i}`}
          className={cn(styles.stop, {
            [styles.selected]: selectedStop === i,
            [styles.requested]: requestedStop === i,
            [styles.bulging]: selectedStop !== i && bulgingIndex === lineIndex,
          })}
          variants={lineVariants}
          onClick={() => handleClick(i)}
        />,
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
            />,
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
