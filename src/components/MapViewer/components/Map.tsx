import grid from "@assets/png/backgrounds/grid.png";
import USA from "@assets/svg/backgrounds/usa.svg";
import Corner from "@assets/svg/icons/corner.svg";
import cn from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import { useContext, useEffect } from "react";
import AnimatedBorderBox from "../../AnimatedBorderBox";
import { MapContext } from "../MapContext";
import { LocationPinKeys } from "../types";
import styles from "./map-components.module.scss";
import MapSlider from "./MapSlider";
import Pin from "./Pin";

const mapContainerVariants = {
  initial: {},
  animate: {
    transition: {},
  },
  exit: {},
};

const mapContentVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 2.3,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.3,
    },
  },
};

const Map = () => {
  const { currentKey, setCurrentKey, locationData } = useContext(MapContext);
  const { mapTitle: title, mapHighlights: highlights } =
    locationData[currentKey ?? "nyc"] ?? {};

  const stopKeys = Object.keys(locationData) as LocationPinKeys[];

  useEffect(() => {
    console.log(currentKey);
  }, [currentKey]);

  return (
    <motion.div
      key="mapContent"
      variants={mapContainerVariants}
      className={styles.mapViewer}
    >
      <motion.div
        className={cn(styles.mapViewerContents, {
          [locationData[currentKey ?? "nyc"].className]: currentKey !== null,
        })}
        onClick={() => {
          console.log("null");
          setCurrentKey(null);
        }}
      >
        <motion.div
          key="blackBackground"
          variants={mapContentVariants} // Use variants for animation
          className={styles.blackBackground}
        />
        <motion.div
          className={styles.map}
          layout
          key="map"
          variants={mapContentVariants} // Use variants for animation
        >
          <motion.div className={styles.pins}>
            <AnimatePresence>
              {!!currentKey && (
                <motion.div className={styles.details} layout>
                  <motion.span>
                    <motion.h4>{title ?? ""}</motion.h4>
                  </motion.span>
                  {highlights?.map((highlight, index) => (
                    <motion.span key={index}>
                      <img src={highlight.icon} />
                      <motion.h5>{highlight.text}</motion.h5>
                    </motion.span>
                  ))}
                  <motion.div>
                    <img src={Corner} />
                    <img src={Corner} />
                    <img src={Corner} />
                    <img src={Corner} />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
            {stopKeys.map((key) => (
              <Pin
                key={key}
                className={locationData[key].pinClassName} // Use the className from locationData
                selected={currentKey === key}
                minimized={!!currentKey && currentKey !== key}
                onClick={() => {
                  setCurrentKey(key);
                }}
              />
            ))}
          </motion.div>
          <img src={USA} alt="USA Background" className={styles.usa} />;
          <motion.img src={grid} className={styles.grid} />
        </motion.div>
        <AnimatedBorderBox
          className={styles.border}
          borderRadius={32}
          borderWidth={5}
        />
      </motion.div>
      <MapSlider />
    </motion.div>
  );
};

export default Map;
