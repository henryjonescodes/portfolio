import { Html } from "@react-three/drei";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import Background from "./components/Background";
import Menu from "./components/Menu";
import Page from "./components/Page";
import styles from "./home.module.scss";

type ScreenProps = {
  fullScreen?: boolean;
};

const Screen = ({ fullScreen }: ScreenProps) => {
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
        {!fullScreen && <Page page={page} navigate={navigate} />}
      </motion.div>
    </Html>
  );
};

export default Screen;
