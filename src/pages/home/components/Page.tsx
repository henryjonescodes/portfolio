import { AnimatePresence, motion } from "framer-motion";
import styles from "./components.module.scss";
import { PageProps } from "./types";

// Define the variants for the animation
const pageContentVariants = {
  initial: { opacity: 0, y: 20 }, // Initial hidden state
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      delay: 1, // Delay only for animate state
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3, // No delay for exit
    },
  },
};

const Page = ({ page, navigate }: PageProps) => {
  return (
    <AnimatePresence>
      {page && (
        <motion.div
          className={styles.page}
          key="pageContent"
          variants={pageContentVariants} // Use variants for animation
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <h2
            onClick={() => {
              navigate(`/`);
            }}
          >
            {page.charAt(0).toUpperCase() + page.slice(1)}
          </h2>
          <p>This is the {page} page content.</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Page;
