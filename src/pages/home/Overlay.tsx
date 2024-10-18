import { Html } from "@react-three/drei";
import { motion } from "framer-motion";
import { Vector3 } from "@react-three/fiber";
import styles from "./home.module.scss";

type OverlayProps = {
  position?: Vector3;
};

export default function Overlay({ position = [0, 0, 0.227] }: OverlayProps) {
  return (
    <Html position={position} scale={0.1} transform>
      <motion.div
        className={styles.screen}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <video src="landing-01.mp4" autoPlay loop muted />
      </motion.div>
    </Html>
  );
}
