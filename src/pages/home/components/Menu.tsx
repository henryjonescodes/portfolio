import { AnimatePresence, motion } from "framer-motion";
import styles from "./components.module.scss";
import { ScreenProps } from "./types";
import TypewriterText from "../../../components/TypewriterText";

// Define animation variants for the menu with staggered children
const menuVariants = {
  initial: {
    // opacity: 0,
  },
  animate: {
    // opacity: 1,
    transition: {
      staggerChildren: 0.3, // Stagger the children by 0.3 seconds
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

const Menu = ({ page, navigate }: ScreenProps) => {
  const textStaggerSeconds = 0.09;
  return (
    <AnimatePresence>
      {!page && (
        <motion.div
          className={styles.menu}
          variants={menuVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
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

          {/* Projects (Link) */}
          <motion.h2
            variants={menuVariants}
            onClick={() => navigate("/projects")}
          >
            <TypewriterText
              text="Projects"
              staggerChildren={textStaggerSeconds}
            />
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
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Menu;
