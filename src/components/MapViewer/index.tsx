import { motion } from "framer-motion";
import Blurb from "./components/Blurb";
import Map from "./components/Map";
import styles from "./map-viewer.module.scss";

const MapViewer = () => {
  return (
    <motion.div className={styles.locations}>
      <motion.div className={styles.content}>
        {/* <motion.div className={styles.viewer}> */}
        <Map />
        {/* </motion.div> */}
        <Blurb />
      </motion.div>
    </motion.div>
  );
};
export default MapViewer;
