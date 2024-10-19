import { useGLTF } from "@react-three/drei";
import { motion } from "framer-motion-3d";
import { useState } from "react";
import { useThree } from "@react-three/fiber";
import { Vector3 } from "three";

const useModel = (url: any) => {
  if (!url) {
    return null;
  }
  const { scene } = useGLTF(url);
  return scene;
};

export default function Model() {
  const gizmo = useModel("/models/Gizmo.glb");
  const buttons = useModel("/models/Buttons.glb");
  const colorToggle = useModel("/models/ColorToggle.glb");
  const cornerDialR = useModel("/models/CornerDialR.glb");
  const cornerDialL = useModel("/models/CornerDialL.glb");
  const dial = useModel("/models/Dial.glb");
  const knobR = useModel("/models/KnobR.glb");
  const knobL = useModel("/models/KnobL.glb");

  const [isDragging, setIsDragging] = useState(false);
  const [rotation, setRotation] = useState(0); // Track rotation in radians
  const { camera } = useThree();

  console.log(gizmo);

  // Helper function to calculate angle from mouse movement
  const handlePointerMove = (event) => {
    if (isDragging) {
      const { offsetX, offsetY } = event.nativeEvent;
      const deltaX = offsetX / window.innerWidth;
      const deltaY = offsetY / window.innerHeight;
      const deltaRotation = deltaX + deltaY; // Adjust this formula based on how you want to rotate
      setRotation((prev) => prev + deltaRotation * Math.PI); // Adjust sensitivity as needed
    }
  };

  const handlePointerDown = () => {
    setIsDragging(true);
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  return (
    <motion.group
      scale={3}
      onPointerMove={handlePointerMove}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
    >
      <primitive object={gizmo} />
      <primitive object={buttons} />
      <primitive object={colorToggle} />
      <primitive object={cornerDialR} />
      <primitive object={cornerDialL} />
      {dial && (
        <motion.primitive
          object={dial.children[0]}
          rotation={[0, 0, rotation]} // Apply rotation to dial (adjust axis as needed)
        />
      )}
      <primitive object={knobR} />
      <primitive object={knobL} />
    </motion.group>
  );
}
