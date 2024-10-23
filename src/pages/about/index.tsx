import { motion } from "framer-motion";
import AnimatedBorderBox from "../../components/AnimatedBorderBox";
import TypewriterText from "../../components/TypewriterText";
import styles from "./about.module.scss";
import cn from "classnames";
import MapViewer from "../../components/MapViewer";
import { MapProvider } from "../../components/MapViewer/MapContext";

const aboutPageVariants = {
  initial: {
    // opacity: 0,
  },
  animate: {
    // opacity: 1,
    transition: {
      duration: 0.3,
      staggerChildren: 0.8, // Stagger children animation
    },
  },
  exit: {
    // opacity: 0,
    transition: {
      duration: 0.3,
    },
  },
};

const About = ({
  navigate,
  fullScreen = false,
}: {
  navigate: (path: string) => void;
  fullScreen?: boolean;
}) => {
  return (
    <MapProvider>
      <motion.div
        key="aboutPage"
        className={cn(styles.page, { [styles.pageFullScreen]: fullScreen })}
      >
        <motion.div
          variants={aboutPageVariants}
          className={cn(styles.content, {
            [styles.contentFullScreen]: fullScreen,
          })}
        >
          <motion.h1
            onClick={() => {
              navigate(`/`);
            }}
          >
            <TypewriterText text={`About`} staggerChildren={0.5} />
          </motion.h1>

          <AnimatedBorderBox
            className={styles.viewer}
            contentClassName={styles.viewerContent}
            borderWidth={fullScreen ? 10 : 5}
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
      </motion.div>
    </MapProvider>
  );
};

export default About;
