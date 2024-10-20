import { motion } from "framer-motion-3d";
import { useEffect, useState, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Knob } from "../../components/Knob";
import useModel from "../../hooks/useModel";
import useRaycaster from "../../hooks/useRaycaster";
import Screen from "./Screen";
import ToolBar from "./ToolBar";
import { useParams } from "react-router-dom";
import * as THREE from "three";

export default function Scene() {
  const gizmo = useModel("/models/Gizmo.glb");
  const buttons = useModel("/models/Buttons.glb");
  const colorToggle = useModel("/models/ColorToggle.glb");
  const cornerDialR = useModel("/models/CornerDialR.glb");
  const cornerDialL = useModel("/models/CornerDialL.glb");
  const dial = useModel("/models/Dial.glb");
  const knobR = useModel("/models/KnobR.glb");
  const knobL = useModel("/models/KnobL.glb");

  const [dialRot, setDialRot] = useState(0);
  const [knobRotR, setKnobRotR] = useState(0);
  const [knobRotL, setKnobRotL] = useState(0);

  const { activeObject, handlePointerMove } = useRaycaster();
  const { page } = useParams<{ page: string }>();

  // Ref for the screen group
  const screenGroupRef = useRef<THREE.Group>(null);

  // Access the camera
  const { camera } = useThree();

  // // Animate the camera to focus on the screen group when the page param is set
  // useFrame(() => {
  //   if (page && screenGroupRef.current) {
  //     // Get the screen group's position
  //     const screenPosition = screenGroupRef.current.position.clone();

  //     // Smoothly move the camera closer to the screen group and orient it toward the screen
  //     camera.position.lerp(
  //       new THREE.Vector3(
  //         screenPosition.x,
  //         screenPosition.y,
  //         screenPosition.z + 2
  //       ),
  //       0.15
  //     );
  //     camera.lookAt(screenPosition);

  //     // Ensure the camera projection matrix is updated
  //     camera.updateProjectionMatrix();
  //   }
  // });

  return (
    <motion.group scale={3} onPointerMove={handlePointerMove}>
      {/* Group containing the screen, referenced with screenGroupRef */}
      <motion.group
        ref={screenGroupRef}
        position={[0.001, 0.473, 0.025]}
        scale={0.1}
      >
        <Screen />
      </motion.group>
      <ToolBar position={[0.001, 0, 0.059]} />
      <primitive object={gizmo} />
      <primitive object={buttons} />
      <primitive object={colorToggle} />
      <primitive object={cornerDialR} />
      <primitive object={cornerDialL} />
      <Knob
        model={dial}
        rotation={dialRot}
        setRotation={setDialRot}
        activeObject={activeObject}
        name={"Dial"}
      />
      <Knob
        model={knobR}
        rotation={knobRotR}
        setRotation={setKnobRotR}
        activeObject={activeObject}
        name={"KnobR"}
        axis="x"
      />
      <Knob
        model={knobL}
        rotation={knobRotL}
        setRotation={setKnobRotL}
        activeObject={activeObject}
        name={"KnobL"}
        axis="x"
      />
    </motion.group>
  );
}
