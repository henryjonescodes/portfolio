import cn from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import AnimatedBorderBox from "../../../components/AnimatedBorderBox";
import styles from "./components.module.scss";
import { PageProps } from "./types";

// Define the variants for the animation
const pageContentVariants = {
  initial: { opacity: 0 }, // Initial hidden state
  animate: {
    opacity: 1,
    transition: {
      duration: 0.3,
      delay: 1.5, // Delay only for animate state
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.3, // No delay for exit
    },
  },
};

const Page = ({ page, navigate, fullScreen = false }: PageProps) => {
  return (
    <AnimatePresence>
      {page && (
        <>
          <motion.div
            className={cn(styles.page, { [styles.pageFullScreen]: fullScreen })}
            key="pageContent"
            variants={pageContentVariants} // Use variants for animation
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {/* {fullScreen && <Background />} */}
            <h2
              onClick={() => {
                navigate(`/`);
              }}
            >
              {page.charAt(0).toUpperCase() + page.slice(1)}
            </h2>
            <AnimatedBorderBox />
            {/* <AnimatedBorder width={300} height={200} /> */}
            <p>This is the {page} page content.</p>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Page;
