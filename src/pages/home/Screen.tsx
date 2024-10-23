import { Html } from "@react-three/drei";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import Menu from "./components/Menu";
import styles from "./home.module.scss";
import Background from "../../components/Background";

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
        {/* {!fullScreen && (
          <Page visible={page !== undefined} fullScreen={false}>
            <About />
          </Page>
        )} */}
      </motion.div>
    </Html>
  );
};

export default Screen;
