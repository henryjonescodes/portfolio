import { AnimatePresence, motion } from "framer-motion";
import { useContext } from "react";
import AnimatedBorderBox from "../../AnimatedBorderBox";
import TypewriterText from "../../TypewriterText";
import { MapContext } from "../MapContext";
import styles from "./map-components.module.scss";
import { commonExit, commonInitial } from "../../../styles/variants";

const blurbVariants = {
  initial: commonInitial,
  animate: {
    opacity: 1,
    transition: {
      duration: 0.3,
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 1.5, // Control exit duration
      staggerChildren: 0.3, // Stagger the children by 0.3 seconds
      when: "afterChildren", // Ensure parent waits for children to exit
    },
  },
};

const Blurb = () => {
  const { currentKey, previousKey, setCurrentKey, locationData } =
    useContext(MapContext);
  const keyToShow = currentKey !== null ? currentKey : previousKey;
  const { title, prefix, description } =
    locationData[keyToShow ?? "portland"] ?? {};

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className={styles.blurb}
        variants={blurbVariants}
        key={keyToShow}
      >
        <motion.span className={styles.header}>
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
        </motion.span>
        <motion.p
          className={styles.description}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <TypewriterText text={description} />
        </motion.p>
      </motion.div>
    </AnimatePresence>
  );
};

export default Blurb;
