import { Html } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import { Vector3 } from "@react-three/fiber";
import styles from "./home.module.scss";
import cn from "classnames";
import { useParams, useNavigate } from "react-router-dom";
import Background from "./components/Background";
import Page from "./components/Page";
import Menu from "./components/Menu";

type OverlayProps = {
  position?: Vector3;
};

const Screen = ({ position = [0, 0, 0.227] }: OverlayProps) => {
  const { page } = useParams<{ page: string }>();
  const navigate = useNavigate(); // Initialize the navigate function

  return (
    <Html position={position} scale={0.1} transform>
      <motion.div
        className={styles.screen}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Background />
        <motion.div className={cn(styles.body)}>
          <Menu page={page} navigate={navigate} />
          <Page page={page} navigate={navigate} />
        </motion.div>
      </motion.div>
    </Html>
  );
};

export default Screen;
