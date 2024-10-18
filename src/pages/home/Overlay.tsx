// Overlay.jsx
import { Html } from "@react-three/drei";
import { motion } from "framer-motion";

export default function Overlay() {
  return (
    <Html
      position={[0, 0, 2]}
      transform // Ensures the HTML content is transformed along with the scene
      occlude // Allows the content to be occluded by other objects
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{
          // backgroundColor: "rgba(255, 255, 255, 0.8)",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        <h1>Hello World</h1>
      </motion.div>
    </Html>
  );
}
