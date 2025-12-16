import cn from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import { useContext } from "react";
import { commonInitial } from "@styles/variants";
import TypewriterText from "@components/TypewriterText";
import { useAnimations } from "@context/AnimationContext";
import { usePage } from "@context/PageContext";
import { MapContext } from "./MapContext";
import styles from "./map-components.module.scss";

const Blurb = () => {
  const { TRANSITIONS } = useAnimations();

  const blurbVariants = {
    initial: commonInitial,
    animate: {
      opacity: 1,
      transition: TRANSITIONS.MAP_DESCRIPTION.ANIMATE,
    },
    exit: {
      opacity: 0,
      transition: TRANSITIONS.MAP_DESCRIPTION.EXIT,
    },
  };
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
