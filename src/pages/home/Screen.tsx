import { Html } from "@react-three/drei";
import { motion } from "framer-motion";
import { Vector3 } from "@react-three/fiber";
import styles from "./home.module.scss";
import cn from "classnames";

type OverlayProps = {
  position?: Vector3;
};

export default function Screen({ position = [0, 0, 0.227] }: OverlayProps) {
  return (
    <Html position={position} scale={0.1} transform>
      <motion.div
        className={styles.screen}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.div className={cn(styles.backdrop)} />
        <motion.div className={cn(styles.scanlines)} />
        <motion.div className={cn(styles.body)}>
          <h1>Henry Jones</h1>
          <h2>About</h2>
          <h2>Projects</h2>
          <h2>Experience</h2>
        </motion.div>
        {/* <video src="landing-01.mp4" autoPlay loop muted /> */}
      </motion.div>
    </Html>
  );
}
