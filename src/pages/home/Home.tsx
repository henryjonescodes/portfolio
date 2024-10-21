import { useState } from "react";
import Scene from "./Scene";
import { useNavigate, useParams } from "react-router-dom";
import Page from "./components/Page";
import { motion } from "framer-motion";
import styles from "./home.module.scss";

const Home = () => {
  const { page } = useParams<{ page: string }>();
  const navigate = useNavigate(); // Initialize the navigate function

  return (
    <motion.div className={styles.home}>
      <Page page={page} navigate={navigate} fullScreen={true} />
      <Scene />;
    </motion.div>
  );
};

export default Home;
