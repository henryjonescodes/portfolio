import { motion } from "framer-motion";
import AnimatedBorderBox from "../../components/AnimatedBorderBox";
import PageContents, {
  PageContentsProps,
} from "../../components/Page/PageContents";
import TypewriterText from "../../components/TypewriterText";
import styles from "./projects.module.scss";
import ExperienceEntry from "../../components/ExperienceEntry";

const projectsVariants = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const entryContentVariants = {
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

const Projects = ({ initialLoad, fullScreen }: PageContentsProps) => {
  return (
    <PageContents initialLoad={initialLoad} fullScreen={fullScreen}>
      <motion.div variants={projectsVariants}>
        <motion.h1>
          <TypewriterText text={"Projects"} staggerChildren={0.05} />
        </motion.h1>
        <ExperienceEntry
          institution="Portfolio v2"
          description={[
            "Portfolio site showcasing 2D animations, work experience, and my presence online",
            "Tools: Framer Motion, React, SASS, Webpack, SVG",
          ]}
          dateString={"2023"}
        >
          <motion.div className={styles.video} variants={entryContentVariants}>
            <video
              autoPlay
              loop
              muted
              src="/video/v2-loop.mp4"
              style={{ objectPosition: "0%" }}
            />
          </motion.div>
        </ExperienceEntry>
        <ExperienceEntry
          institution="3D Portfolio"
          description={["— lorem ipsum"]}
          dateString={"2022"}
        >
          <motion.div className={styles.video} variants={entryContentVariants}>
            <video autoPlay loop muted src="/video/tower-loop.mp4" />
          </motion.div>
        </ExperienceEntry>
        <ExperienceEntry
          institution="Portfolio v1"
          description={["— lorem ipsum"]}
          dateString={"2021"}
        />
      </motion.div>
    </PageContents>
  );
};

export default Projects;
