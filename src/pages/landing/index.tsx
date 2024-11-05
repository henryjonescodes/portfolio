import cn from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import Page from "../../components/Page";
import { useSettings } from "../../context/SettingsContext";
import styles from "./landing.module.scss";
import Scene from "./Scene";
import { useControls } from "leva";
import { useEffect } from "react";
import { colors as defaultColors } from "./../../styles/sass-variables";
import { useColors } from "../../hooks/useColors";

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

const Landing = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Initialize the navigate function
  const { fullScreen } = useSettings();

  const pathSegments = location.pathname.split("/").filter(Boolean);
  const page = pathSegments[0];
  const isHidden = !fullScreen || page === undefined;

  useColors();

  return (
    <motion.div className={styles.landing}>
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
              visible={page !== undefined}
              page={page}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <Scene />;
    </motion.div>
  );
};

export default Landing;
