import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import About from "../about";
import Page from "./components/Page";
import styles from "./home.module.scss";
import Scene from "./Scene";
import { useState } from "react";

const Home = () => {
  const { page } = useParams<{ page: string }>();
  const navigate = useNavigate(); // Initialize the navigate function
  // const [fullScreen, setFullScreen] = useState(false);
  const fullScreen = false;
  return (
    <>
      {/* <div className={styles.tools}>
        <button
          type="button"
          onClick={() => {
            setFullScreen(!fullScreen);
          }}
        >
          {fullScreen ? "fullScreen off" : "fullScreen on"}
        </button>
      </div> */}
      <motion.div className={styles.home}>
        {fullScreen && (
          <Page visible={page !== undefined} fullScreen={true}>
            <About navigate={navigate} />
          </Page>
        )}
        <Scene fullScreen={fullScreen} />;
      </motion.div>
    </>
  );
};

export default Home;
