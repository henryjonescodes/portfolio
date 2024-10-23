import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Page from "../../components/Page";
import About from "../about";
import Experience from "../experience";
import Projects from "../projects";
import styles from "./home.module.scss";
import Scene from "./Scene";

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

  return (
    <motion.div className={styles.home}>
      {fullScreen && (
        <Page
          navigate={navigate}
          fullScreen={fullScreen}
          setFullScreen={setFullScreen}
          visible={page !== undefined}
        >
          {page === "about" && <About key="about" initialLoad={initialLoad} />}
          {page === "experience" && (
            <Experience key="experience" initialLoad={initialLoad} />
          )}
          {page === "projects" && (
            <Projects key="projects" initialLoad={initialLoad} />
          )}
        </Page>
      )}
      <Scene fullScreen={fullScreen} setFullScreen={setFullScreen} />;
    </motion.div>
  );
};

export default Home;
