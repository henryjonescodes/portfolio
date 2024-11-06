// Scene.tsx
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import * as THREE from "three";
import CustomControls from "../../components/CustomControls";
import { Knob } from "../../components/Knob";
import useModel from "../../hooks/useModel";
import useRaycaster from "../../hooks/useRaycaster";
import styles from "./landing.module.scss";
import Screen from "./Screen";
import InfoPanel from "./InfoPanel";
import { SiteMixer } from "../../models/SiteMixer";
import { OrbitControls } from "@react-three/drei";

export default function Scene() {
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);
  const page = pathSegments[0];

  const { activeObject, handlePointerMove } = useRaycaster();
  const [zoomLevel, setZoomLevel] = useState<"info" | "handheld" | undefined>(
    !!page ? "handheld" : undefined
  );

  // Ref for the screen group
  const screenGroupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    setZoomLevel(!!page ? "handheld" : undefined);
  }, [page]);

  return (
    <Canvas className={styles.canvas} camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={1} />
      <directionalLight position={[2, 5, 2]} />
      <CustomControls
        zoomMode={zoomLevel} // or "handheld" or undefined
        targetRef={screenGroupRef}
        maxPolarAngle={Math.PI / 6}
        maxAzimuthAngle={Math.PI / 6}
      />
      {/* <OrbitControls /> */}
      <group scale={3} onPointerMove={handlePointerMove}>
        <Suspense fallback={null}>
          <group
            ref={screenGroupRef}
            position={[-0.243, 0, 0.013]}
            scale={0.0851}
            onClick={() => {
              console.log("Click2");
            }}
          >
            <Screen />
          </group>
          <group position={[0.764, 0.297, 0.038]} scale={0.0351}>
            <InfoPanel
              onClick={() => {
                console.log("Click");
              }}
            />
          </group>
          <SiteMixer position={[0, 0, 0]} />
        </Suspense>
      </group>
    </Canvas>
  );
}

// {/* <ToolBar position={[0.001, 0, 0.059]} />
// {gizmo && <primitive object={gizmo} />}
// {buttons && <primitive object={buttons} />}
// {colorToggle && <primitive object={colorToggle} />}
// {cornerDialR && <primitive object={cornerDialR} />}
// {cornerDialL && <primitive object={cornerDialL} />}
// <Knob
//   model={dial}
//   rotation={dialRot}
//   setRotation={setDialRot}
//   activeObject={activeObject}
//   name={"Dial"}
// />
// <Knob
//   model={knobR}
//   rotation={knobRotR}
//   setRotation={setKnobRotR}
//   activeObject={activeObject}
//   name={"KnobR"}
//   axis="x"
// />
// <Knob
//   model={knobL}
//   rotation={knobRotL}
//   setRotation={setKnobRotL}
//   activeObject={activeObject}
//   name={"KnobL"}
//   axis="x"
// /> */}

// const gizmo = useModel("/models/Gizmo.glb");
// const buttons = useModel("/models/Buttons.glb");
// const colorToggle = useModel("/models/ColorToggle.glb");
// const cornerDialR = useModel("/models/CornerDialR.glb");
// const cornerDialL = useModel("/models/CornerDialL.glb");
// const dial = useModel("/models/Dial.glb");
// const knobR = useModel("/models/KnobR.glb");
// const knobL = useModel("/models/KnobL.glb");

// const [dialRot, setDialRot] = useState(0);
// const [knobRotR, setKnobRotR] = useState(0);
// const [knobRotL, setKnobRotL] = useState(0);
