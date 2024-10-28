import { AnimatePresence, motion } from "framer-motion";
import { Suspense, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Page from "../../components/Page";
// import About from "../about";
// import Experience from "../experience";
// import Projects from "../projects";
import styles from "./home.module.scss";
import Scene from "./Scene";
import cn from "classnames";
import React from "react";

const About = React.lazy(() => import("../about"));
const Experience = React.lazy(() => import("../experience"));
const Projects = React.lazy(() => import("../projects"));

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

  const isHidden = !fullScreen || page === undefined;

  const wrapperVariants = {
    show: {
      opacity: 1,
      transition: {
        duration: 1.3,
        delay: 0.6,
      },
    },
    hide: {
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <motion.div className={styles.home}>
      <AnimatePresence>
        {fullScreen && (
          <motion.div
            className={cn(styles.wrapper, { [styles.disabled]: isHidden })}
            variants={wrapperVariants}
            initial="hide"
            animate={isHidden ? "hide" : "show"}
            exit="hide"
          >
            <Page
              navigate={navigate}
              fullScreen={fullScreen}
              setFullScreen={setFullScreen}
              visible={page !== undefined}
              page={page}
            >
              <Suspense fallback={<div>Loading...</div>}>
                {page === "about" && (
                  <About key="about" initialLoad={initialLoad} />
                )}
              </Suspense>
              <Suspense fallback={<div>Loading...</div>}>
                {page === "experience" && (
                  <Experience key="experience" initialLoad={initialLoad} />
                )}
              </Suspense>
              <Suspense fallback={<div>Loading...</div>}>
                {page === "projects" && (
                  <Projects key="projects" initialLoad={initialLoad} />
                )}
              </Suspense>
            </Page>
          </motion.div>
        )}
      </AnimatePresence>
      <Scene fullScreen={fullScreen} setFullScreen={setFullScreen} />;
    </motion.div>
  );
};

export default Home;
