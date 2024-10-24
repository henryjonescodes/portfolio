// Scene.tsx
import { Canvas } from "@react-three/fiber";
import { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import * as THREE from "three";
import CustomControls from "../../components/CustomControls";
import { Knob } from "../../components/Knob";
import useModel from "../../hooks/useModel";
import useRaycaster from "../../hooks/useRaycaster";
import styles from "./home.module.scss";
import Screen from "./Screen";
import ToolBar from "./ToolBar";

type SceneProps = {
  fullScreen: boolean;
  setFullScreen: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function Scene({ fullScreen, setFullScreen }: SceneProps) {
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

  return (
    <Canvas className={styles.canvas} camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 5, 2]} />
      <CustomControls
        zoomIn={!!page}
        fullScreen={fullScreen}
        targetRef={screenGroupRef}
        maxPolarAngle={Math.PI / 6}
        maxAzimuthAngle={Math.PI / 6}
      />
      <group scale={3} onPointerMove={handlePointerMove}>
        {/* Group containing the screen, referenced with screenGroupRef */}
        <group
          ref={screenGroupRef}
          position={[0.001, 0.473, 0.025]}
          scale={0.067}
        >
          <Screen fullScreen={fullScreen} setFullScreen={setFullScreen} />
        </group>
        <ToolBar position={[0.001, 0, 0.059]} />
        {gizmo && <primitive object={gizmo} />}
        {buttons && <primitive object={buttons} />}
        {colorToggle && <primitive object={colorToggle} />}
        {cornerDialR && <primitive object={cornerDialR} />}
        {cornerDialL && <primitive object={cornerDialL} />}
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
      </group>
    </Canvas>
  );
}
