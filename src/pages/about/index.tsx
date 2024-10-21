import { motion } from "framer-motion";
import AnimatedBorderBox from "../../components/AnimatedBorderBox";
import TypewriterText from "../../components/TypewriterText";
import styles from "./about.module.scss";
import cn from "classnames";

const About = ({
  navigate,
  fullScreen = false,
}: {
  navigate: (path: string) => void;
  fullScreen?: boolean;
}) => {
  const delay = fullScreen ? 1 : 0;

  return (
    <motion.div
      className={cn(styles.page, { [styles.pageFullScreen]: fullScreen })}
    >
      <motion.div
        className={cn(styles.content, {
          [styles.contentFullScreen]: fullScreen,
        })}
      >
        <h1
          onClick={() => {
            navigate(`/`);
          }}
        >
          <TypewriterText text={`About`} lineIndex={3} delay={delay} />
        </h1>
        <AnimatedBorderBox
          className={styles.viewer}
          contentClassName={styles.viewerContent}
          borderWidth={fullScreen ? 10 : 5}
        >
          <p>
            <TypewriterText
              text={`My journey into creative development began with a passion for poster and screenprinting design, which quickly evolved into a love for coding and web development in my teens. Since then, I’ve had the opportunity to build dynamic, customer-facing UIs for dynamic startups in Silicon Valley hard at work building an accessible future for human-AI interaction.`}
              lineIndex={3}
              delay={delay}
            />
          </p>
          <p>
            <TypewriterText
              text={`Currently, I focus on creating accessible and intuitive user interfaces, thriving in the intersection of design and engineering. I enjoy crafting software that not only looks good but performs seamlessly. In my free time, I delve into personal projects involving Three.js and React, exploring the creative potentials of web development.`}
              lineIndex={5}
              delay={delay}
            />
          </p>
        </AnimatedBorderBox>
      </motion.div>
    </motion.div>
  );
};

export default About;
