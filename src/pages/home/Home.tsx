import { AnimatePresence, motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import About from "../about";
import styles from "./home.module.scss";
import Scene from "./Scene";
import { useState } from "react";
import Page from "../../components/Page";
import Experience from "../experience";

const Home = () => {
  const { page } = useParams<{ page: string }>();
  const navigate = useNavigate(); // Initialize the navigate function
  const [fullScreen, setFullScreen] = useState(true);

  return (
    <>
      {/* <div className={styles.tools}>
        <button
          type="button"
          onClick={() => {
            setFullScreen(!fullScreen);
          }}
        >
          {fullScreen ? "fullScreen off" : "fullScreen on"}
        </button>
      </div> */}
      <motion.div className={styles.home}>
        {fullScreen && (
          <Page
            navigate={navigate}
            fullScreen={fullScreen}
            visible={page !== undefined}
          >
            <motion.div
              key={page}
              // initial="initial"
              // animate="animate"
              // exit="exit"
            >
              <AnimatePresence>
                {page === "about" && <About />}
                {page === "experience" && <Experience />}
              </AnimatePresence>
            </motion.div>
          </Page>
        )}
        <Scene fullScreen={fullScreen} />;
      </motion.div>
    </>
  );
};

export default Home;
