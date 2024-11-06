import { AnimatePresence, motion } from "framer-motion";
import styles from "./home.module.scss";
import TypewriterText from "../../components/TypewriterText";
import PageContents from "../../components/Page/PageContents";
import { useLocation, useNavigate } from "react-router-dom";

// Define animation variants for the menu with staggered children
const menuVariants = {
  initial: {
    // opacity: 0,
  },
  animate: {
    // opacity: 1,
    transition: {
      staggerChildren: 0.05, // Stagger the children by 0.3 seconds
    },
  },
  exit: {
    // opacity: 0,
    transition: {
      duration: 1.5, // Control exit duration
      staggerChildren: 0.3, // Stagger the children by 0.3 seconds
      when: "afterChildren", // Ensure parent waits for children to exit
    },
  },
};

const Home = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);
  const page = pathSegments[0];
  const navigate = useNavigate(); // Initialize the navigate function

  const textStaggerSeconds = 0.03;
  return (
    // <AnimatePresence>
    //   {!page && (
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
    // )}
    // </AnimatePresence>
  );
};

export default Home;
