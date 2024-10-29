import cn from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Page from "../../components/Page";
import styles from "./home.module.scss";
import Scene from "./Scene";

const Home = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);
  const page = pathSegments[0];

  const navigate = useNavigate(); // Initialize the navigate function
  const [fullScreen, setFullScreen] = useState(true);

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
            key={"home"}
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
            />
          </motion.div>
        )}
      </AnimatePresence>
      <Scene fullScreen={fullScreen} setFullScreen={setFullScreen} />;
    </motion.div>
  );
};

export default Home;
