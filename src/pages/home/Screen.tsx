import { Html } from "@react-three/drei";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import Menu from "./components/Menu";
import styles from "./home.module.scss";
import Background from "../../components/Background";
import Page from "../../components/Page";
import About from "../about";
import Experience from "../experience";
import Projects from "../projects";
import { screenSize } from "../../styles/constants";
import cn from "classnames";

type ScreenProps = {
  fullScreen: boolean;
  setFullScreen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Screen = ({ fullScreen, setFullScreen }: ScreenProps) => {
  const { page } = useParams<{ page: string }>();
  const navigate = useNavigate(); // Initialize the navigate function
  const { width, height } = screenSize;

  const isHidden = fullScreen && page !== undefined;

  const wrapperVariants = {
    show: {
      opacity: 1,
      transition: {
        duration: 0.8,
        delay: 1,
      },
    },
    hide: {
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <Html transform>
      <motion.div
        className={styles.screen}
        style={{ height: `${height}px`, width: `${width}px` }}
      >
        <Background />
        <Menu page={page} navigate={navigate} />
        <motion.div
          className={cn(styles.wrapper, {
            [styles.disabled]: isHidden || page === undefined,
          })}
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
            {page === "about" && <About key="about" fullScreen={false} />}
            {page === "experience" && (
              <Experience key="experience" fullScreen={false} />
            )}
            {page === "projects" && (
              <Projects key="projects" fullScreen={false} />
            )}
          </Page>
        </motion.div>
      </motion.div>
    </Html>
  );
};

export default Screen;
