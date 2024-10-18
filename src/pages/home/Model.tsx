import { useGLTF } from "@react-three/drei";
import { motion } from "framer-motion-3d";
import Overlay from "./Overlay"; // Adjust the import path if necessary

export default function Model() {
  const { scene } = useGLTF("/models/Console.glb");

  return (
    <motion.group
      scale={3}
      // initial={{ y: -1 }}
      // animate={{ y: 0 }}
      // transition={{ duration: 1 }}
    >
      <primitive object={scene} />
      <Overlay position={[0, 0.46, 0.08]} />
    </motion.group>
  );
}
