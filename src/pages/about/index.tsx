import { motion } from "framer-motion";
import AnimatedBorderBox from "../../components/AnimatedBorderBox";
import MapViewer from "../../components/MapViewer";
import TypewriterText from "../../components/TypewriterText";
import styles from "./about.module.scss";

const About = () => {
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
            text={`My journey into creative development began with a passion for poster and screenprinting design, which quickly evolved into a love for coding and web development in my teens. Since then, I’ve had the opportunity to build dynamic, customer-facing UIs for dynamic startups in Silicon Valley hard at work building an accessible future for human-AI interaction.`}
          />
        </motion.p>
        <motion.p>
          <TypewriterText
            text={`Currently, I focus on creating accessible and intuitive user interfaces, thriving in the intersection of design and engineering. I enjoy crafting software that not only looks good but performs seamlessly. In my free time, I delve into personal projects involving Three.js and React, exploring the creative potentials of web development.`}
          />
        </motion.p>
      </AnimatedBorderBox>
      <MapViewer />
    </motion.div>
  );
};

export default About;
