import { motion } from "framer-motion";
import Blurb from "./components/Blurb";
import Map from "./components/Map";
import styles from "./map-viewer.module.scss";
import { MapProvider } from "./MapContext";

const MapViewer = () => {
  return (
    <MapProvider>
      <motion.div className={styles.locations}>
        <motion.div className={styles.content}>
          <Map />
          <Blurb />
        </motion.div>
      </motion.div>
    </MapProvider>
  );
};
export default MapViewer;
