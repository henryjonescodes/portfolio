import cn from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import { useContext } from "react";
import { commonInitial } from "../../../styles/variants";
import TypewriterText from "../../3D/TypewriterText";
import { usePage } from "../../Page";
import { MapContext } from "../MapContext";
import styles from "./map-components.module.scss";
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
      duration: 0, // Control exit duration
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

  const { embedded } = usePage();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className={cn(styles.blurb, {
          [styles.fullscreen]: !embedded,
          [styles.handheld]: embedded,
        })}
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
        <motion.p className={styles.description}>
          <TypewriterText text={description} />
        </motion.p>
      </motion.div>
    </AnimatePresence>
  );
};

export default Blurb;
