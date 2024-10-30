import grid from "@assets/png/backgrounds/grid.png";
import USA from "@assets/svg/backgrounds/usa.svg?react";
import Corner from "@assets/svg/icons/corner.svg?react";
import cn from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import { useContext } from "react";
import AnimatedBorderBox from "../../AnimatedBorderBox";
import { MapContext } from "../MapContext";
import { LocationPinKeys } from "../types";
import styles from "./map-components.module.scss";
import MapSlider from "./MapSlider";
import Pin from "./Pin";
import AnimatedLine from "../../AnimatedLine";

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

  return (
    <motion.div
      key="mapContent"
      variants={mapContainerVariants}
      className={styles.mapViewer}
    >
      <motion.div
        className={cn(styles.contents, {
          [locationData[currentKey ?? "nyc"].className]: currentKey !== null,
        })}
        onClick={() => {
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
                <motion.div className={styles.details} layout key={"map"}>
                  <motion.span>
                    <motion.h4>{title ?? ""}</motion.h4>
                  </motion.span>
                  {highlights?.map((highlight, index) => (
                    <motion.span key={index}>
                      <highlight.icon />
                      <motion.h5>{highlight.text}</motion.h5>
                    </motion.span>
                  ))}
                  <motion.div>
                    <Corner />
                    <Corner />
                    <Corner />
                    <Corner />
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
          <USA className={styles.usa} />;
          <motion.img src={grid} className={styles.grid} />
        </motion.div>
      </motion.div>
      <AnimatedLine className={styles.divider} horizontal={true} />
      <motion.div className={styles.slider}>
        <MapSlider />
      </motion.div>
      <AnimatedBorderBox className={styles.border} borderWidth={5} />
    </motion.div>
  );
};

export default Map;
