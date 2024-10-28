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
      <motion.div variants={projectsVariants} className={styles.projects}>
        <motion.h1>
          <TypewriterText text={"Projects"} staggerChildren={0.05} />
        </motion.h1>
        <ExperienceEntry
          institution="Portfolio v2"
          url="https://v2.henryjones.xyz"
          description={[
            "Portfolio site showcasing 2D animations, work experience, and my presence online,",
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
          institution="Virtual Portfolio"
          url="https://tower.henryjones.xyz"
          description={[
            "Experiment with using Three.js to build a 3D portfolio site.",
            "All models were custom made in Blender.",
            "Tools: Three.js, React, Blender",
          ]}
          dateString={"2022"}
        >
          <motion.div className={styles.video} variants={entryContentVariants}>
            <video autoPlay loop muted src="/video/tower-loop.mp4" />
          </motion.div>
        </ExperienceEntry>
        <ExperienceEntry
          institution="Portfolio v1"
          url="https://v1.henryjones.xyz"
          description={[
            "Playful portfolio site showcasing pre-tech work experience & interactive 2D animations,",
            "Tools: Framer Motion, React",
          ]}
          dateString={"2021"}
        >
          <motion.div className={styles.video} variants={entryContentVariants}>
            <img src="/images/v1.png" />
          </motion.div>
        </ExperienceEntry>
        <ExperienceEntry
          institution="Senior Thesis"
          title="Trust Response to Anticipatory Software Agents"
          url="/pdf/TrustResponseToAnticipatorySoftwareAgents.pdf"
          description={[
            "Undergraduate capstone project on human computer interaction exploring the trust response of study subjects with unreliable suggestions from a software agent,",
            "Tools: Java, Swing",
          ]}
          startDate={new Date(2020, 8)}
          endDate={new Date(2021, 5)}
        >
          <motion.div className={styles.video} variants={entryContentVariants}>
            <img src="/images/thesis.png" />
          </motion.div>
        </ExperienceEntry>
      </motion.div>
    </PageContents>
  );
};

export default Projects;
