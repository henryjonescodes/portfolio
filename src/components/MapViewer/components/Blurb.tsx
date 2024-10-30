import { motion } from "framer-motion";
import { useContext } from "react";
import AnimatedBorderBox from "../../AnimatedBorderBox";
import TypewriterText from "../../TypewriterText";
import { MapContext } from "../MapContext";
import styles from "./map-components.module.scss";

const Blurb = () => {
  const { currentKey, previousKey, setCurrentKey, locationData } =
    useContext(MapContext);
  const keyToShow = currentKey !== null ? currentKey : previousKey;
  const { title, prefix, description } =
    locationData[keyToShow ?? "portland"] ?? {};

  return (
    // <AnimatedBorderBox
    //   className={styles.blurb}
    //   contentClassName={styles.content}
    //   borderWidth={4}
    // >
    <motion.div className={styles.blurb}>
      <span className={styles.header}>
        {!!prefix && (
          <motion.h3 className={styles.prefix}>
            <TypewriterText text={prefix} />
          </motion.h3>
        )}
        <motion.h3
          className={styles.title}
          onClick={() => {
            setCurrentKey(previousKey);
          }}
        >
          <TypewriterText text={title} />
        </motion.h3>
      </span>
      <motion.p className={styles.description}>
        <TypewriterText text={description} />
      </motion.p>
    </motion.div>
    // </AnimatedBorderBox>
  );
};

export default Blurb;
