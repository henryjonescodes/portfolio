import { motion } from "framer-motion";
import AnimatedBorderBox from "../../components/AnimatedBorderBox";
import PageContents, {
  PageContentsProps,
} from "../../components/Page/PageContents";
import TypewriterText from "../../components/TypewriterText";
import styles from "./projects.module.scss";

const Projects = ({ initialLoad }: PageContentsProps) => {
  return (
    <PageContents initialLoad={initialLoad}>
      <motion.h1
        onClick={() => {
          // navigate(`/`);
        }}
      >
        <TypewriterText text={"Projects"} staggerChildren={0.05} />
      </motion.h1>
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
    </PageContents>
  );
};

export default Projects;