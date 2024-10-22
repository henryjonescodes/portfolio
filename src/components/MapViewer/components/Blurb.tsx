import React, { useContext } from "react";
import { motion } from "framer-motion";
import styles from "./map-components.module.scss";
import { MapContext } from "../MapContext";
import TypewriterText from "../../TypewriterText";
import AnimatedBorderBox from "../../AnimatedBorderBox";

const Blurb = () => {
  const { currentKey, previousKey, setCurrentKey, locationData } =
    useContext(MapContext);
  const keyToShow = currentKey !== null ? currentKey : previousKey;
  const { title, prefix, description } =
    locationData[keyToShow ?? "portland"] ?? {};

  return (
    <AnimatedBorderBox
      className={styles.blurbBox}
      contentClassName={styles.blurb}
      borderWidth={5}
    >
      <span>
        <motion.h3>
          <TypewriterText text={prefix ?? ""} />
        </motion.h3>
        <motion.h3
          onClick={() => {
            setCurrentKey(previousKey);
          }}
        >
          <TypewriterText text={title ?? ""} />
        </motion.h3>
      </span>
      <motion.p>
        <TypewriterText text={description ?? ""} />
      </motion.p>
    </AnimatedBorderBox>
  );
};

export default Blurb;
