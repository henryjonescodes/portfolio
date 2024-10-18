// Model.jsx
import React from "react";
import { useGLTF, Center } from "@react-three/drei";
import { motion } from "framer-motion-3d";

export default function Model() {
  const { scene } = useGLTF("/models/Console.glb");

  return (
    <Center>
      <motion.primitive
        object={scene}
        scale={2}
        // You can add framer-motion-3d animations here
        // initial={{ y: -1 }}
        // animate={{ y: 0 }}
        // transition={{ duration: 1 }}
      />
    </Center>
  );
}
