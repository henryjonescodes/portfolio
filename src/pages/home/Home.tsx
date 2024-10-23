import { AnimatePresence, motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import About from "../about";
import styles from "./home.module.scss";
import Scene from "./Scene";
import { useEffect, useState } from "react";
import Page from "../../components/Page";
import Experience from "../experience";
import Projects from "../projects";

const Home = () => {
  const { page } = useParams<{ page: string }>();
  const navigate = useNavigate(); // Initialize the navigate function
  const [fullScreen, setFullScreen] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    if (page !== undefined) {
      setInitialLoad(false);
    } else {
      setInitialLoad(true);
    }
  }, [page]);

  return (
    // <>
    // {/* <div className={styles.tools}>
    //   <button
    //     type="button"
    //     onClick={() => {
    //       setFullScreen(!fullScreen);
    //     }}
    //   >
    //     {fullScreen ? "fullScreen off" : "fullScreen on"}
    //   </button>
    // </div> */}
    <motion.div className={styles.home}>
      {fullScreen && (
        <Page
          navigate={navigate}
          fullScreen={fullScreen}
          visible={page !== undefined}
        >
          <AnimatePresence mode="wait">
            {page === "about" && (
              <About key="about" initialLoad={initialLoad} />
            )}
            {page === "experience" && <Experience key="experience" />}
            {page === "projects" && <Projects key="projects" />}
          </AnimatePresence>
        </Page>
      )}
      <Scene fullScreen={fullScreen} />;
    </motion.div>
    // </>
  );
};

export default Home;
