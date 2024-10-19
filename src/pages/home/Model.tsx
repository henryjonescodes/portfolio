import { useGLTF } from "@react-three/drei";
import { motion } from "framer-motion-3d";
import { useState, useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { Vector2, Raycaster } from "three";

const useModel = (url) => {
  if (!url) {
    return null;
  }
  const { scene } = useGLTF(url);
  return scene;
};

function getNamedParent(object) {
  while (object) {
    if (object.name && object.name !== "") {
      return object;
    }
    object = object.parent;
  }
  return null;
}

export default function Model() {
  const gizmo = useModel("/models/Gizmo.glb");
  const buttons = useModel("/models/Buttons.glb");
  const colorToggle = useModel("/models/ColorToggle.glb");
  const cornerDialR = useModel("/models/CornerDialR.glb");
  const cornerDialL = useModel("/models/CornerDialL.glb");
  const dial = useModel("/models/Dial.glb");
  const knobR = useModel("/models/KnobR.glb");
  const knobL = useModel("/models/KnobL.glb");

  const [rotation, setRotation] = useState(0); // Track rotation in radians
  const { gl, scene, camera } = useThree();

  // Assign names to meshes for identification
  useEffect(() => {
    if (dial) {
      dial.traverse((child) => {
        if (child.isMesh) {
          child.name = "Dial";
        }
      });
    }
    // Repeat for other interactive objects if needed
  }, [dial]);

  useEffect(() => {
    const handleWheel = (event) => {
      // Get mouse coordinates
      const mouse = new Vector2();
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      // Raycast to find intersected objects
      const raycaster = new Raycaster();
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(scene.children, true);

      if (intersects.length > 0) {
        const namedParent = getNamedParent(intersects[0].object);
        if (namedParent && namedParent.name === "Dial") {
          // Adjust rotation based on scroll wheel delta
          const deltaY = event.deltaY;
          const deltaRotation = deltaY * 0.001; // Adjust sensitivity as needed
          setRotation((prev) => prev + deltaRotation);
        }
      }
    };

    gl.domElement.addEventListener("wheel", handleWheel);

    return () => {
      gl.domElement.removeEventListener("wheel", handleWheel);
    };
  }, [gl, camera, scene]);

  return (
    <motion.group scale={3}>
      <primitive object={gizmo} />
      <primitive object={buttons} />
      <primitive object={colorToggle} />
      <primitive object={cornerDialR} />
      <primitive object={cornerDialL} />
      {dial && (
        <motion.primitive
          object={dial.children[0]}
          rotation={[0, 0, rotation]} // Apply rotation to dial
        />
      )}
      <primitive object={knobR} />
      <primitive object={knobL} />
    </motion.group>
  );
}
