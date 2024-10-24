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

type ScreenProps = {
  fullScreen: boolean;
  setFullScreen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Screen = ({ fullScreen, setFullScreen }: ScreenProps) => {
  const { page } = useParams<{ page: string }>();
  const navigate = useNavigate(); // Initialize the navigate function

  return (
    <Html transform>
      <motion.div
        className={styles.screen}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Background />
        <Menu page={page} navigate={navigate} />
        {!fullScreen && (
          <Page
            navigate={navigate}
            fullScreen={fullScreen}
            setFullScreen={setFullScreen}
            visible={page !== undefined}
          >
            {page === "about" && <About key="about" initialLoad={true} />}
            {page === "experience" && (
              <Experience key="experience" initialLoad={true} />
            )}
            {page === "projects" && (
              <Projects key="projects" initialLoad={true} />
            )}
          </Page>
        )}
      </motion.div>
    </Html>
  );
};

export default Screen;
