import { motion } from "framer-motion";
import AnimatedBorderBox from "../../components/AnimatedBorderBox";
import MapViewer from "../../components/MapViewer";
import TypewriterText from "../../components/TypewriterText";
import styles from "./experience.module.scss";

const Experience = () => {
  return (
    <motion.div
      className={styles.about}
      // initial="initial"
      // animate="animate"
      // exit="exit"
    >
      <AnimatedBorderBox
        className={styles.viewer}
        contentClassName={styles.viewerContent}
        borderWidth={5}
      >
        <motion.p>
          <TypewriterText
            text={`Experience content the quick brown fox jumps over the lazy dog.`}
          />
        </motion.p>
      </AnimatedBorderBox>
    </motion.div>
  );
};

export default Experience;
