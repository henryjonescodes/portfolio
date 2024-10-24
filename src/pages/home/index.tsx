import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Page from "../../components/Page";
import About from "../about";
import Experience from "../experience";
import Projects from "../projects";
import styles from "./home.module.scss";
import Scene from "./Scene";
import cn from "classnames";

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
        // when: "beforeChildren",
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
      <motion.div
        className={cn(styles.wrapper, { [styles.disabled]: isHidden })}
        variants={wrapperVariants}
        initial="hide"
        animate={isHidden ? "hide" : "show"}
      >
        <Page
          navigate={navigate}
          fullScreen={fullScreen}
          setFullScreen={setFullScreen}
          visible={page !== undefined}
          page={page}
        >
          {page === "about" && <About key="about" initialLoad={initialLoad} />}
          {page === "experience" && (
            <Experience key="experience" initialLoad={initialLoad} />
          )}
          {page === "projects" && (
            <Projects key="projects" initialLoad={initialLoad} />
          )}
        </Page>
      </motion.div>
      <Scene fullScreen={fullScreen} setFullScreen={setFullScreen} />;
    </motion.div>
  );
};

export default Home;
