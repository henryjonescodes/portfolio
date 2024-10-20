import { Html } from "@react-three/drei";
import { motion } from "framer-motion";
import { Vector3 } from "@react-three/fiber";
import styles from "./home.module.scss";

type OverlayProps = {
  position?: Vector3;
};

export default function ToolBar({ position = [0, 0, 0.227] }: OverlayProps) {
  return (
    <Html position={position} scale={0.1} transform>
      <motion.div
        className={styles.controlBar}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.div className={styles.left}>ARIAL BLACK</motion.div>
        <motion.div className={styles.center}></motion.div>
        <motion.div className={styles.right}></motion.div>
      </motion.div>
    </Html>
  );
}
