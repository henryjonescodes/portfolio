import { motion } from "framer-motion";
import TypewriterText from "@components/TypewriterText";
import PageContents from "@components/Page/PageContents";
import { useNavigatePreserveQuery } from "@hooks/useNavigatePreserveQuery";
import { ANIMATION_DURATIONS } from "@config/animations";
import styles from "./home.module.scss";

// Define animation variants for the menu with staggered children
const menuVariants = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const Home = () => {
  const navigate = useNavigatePreserveQuery(); // Initialize the navigate function

  const textStaggerSeconds = ANIMATION_DURATIONS.TYPEWRITER_CHAR_STAGGER;

  return (
    <PageContents key={"menu"} className={styles.menu}>
      {/* Henry Jones */}
      <motion.h1 variants={menuVariants}>
        <TypewriterText
          text="Henry Jones"
          staggerChildren={textStaggerSeconds}
        />
      </motion.h1>

      {/* Creative Developer */}
      <motion.h3 variants={menuVariants}>
        <TypewriterText
          text="Creative Developer"
          staggerChildren={textStaggerSeconds}
        />
      </motion.h3>

      {/* About (Link) */}
      <motion.h2 variants={menuVariants} onClick={() => navigate("/about")}>
        <TypewriterText text="About" staggerChildren={textStaggerSeconds} />
      </motion.h2>

      {/* Experience (Link) */}
      <motion.h2
        variants={menuVariants}
        onClick={() => navigate("/experience")}
      >
        <TypewriterText
          text="Experience"
          staggerChildren={textStaggerSeconds}
        />
      </motion.h2>

      {/* Projects (Link) */}
      <motion.h2 variants={menuVariants} onClick={() => navigate("/projects")}>
        <TypewriterText text="Projects" staggerChildren={textStaggerSeconds} />
      </motion.h2>
    </PageContents>
  );
};

export default Home;
