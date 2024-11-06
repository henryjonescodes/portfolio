// Scene.tsx
import { Canvas } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import * as THREE from "three";
import CustomControls from "../../components/CustomControls";
import { SiteMixer } from "../../models/SiteMixer";
import InfoPanel from "./InfoPanel";
import styles from "./landing.module.scss";
import Screen from "./Screen";

export default function Scene() {
  // const { activeObject, handlePointerMove } = useRaycaster();
  const screenGroupRef = useRef<THREE.Group>(null);

  return (
    <Canvas className={styles.canvas} camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={1} />
      <directionalLight position={[2, 5, 2]} />
      <CustomControls
        // zoomMode={zoomLevel} // or "handheld" or undefined
        targetRef={screenGroupRef}
        maxPolarAngle={Math.PI / 6}
        maxAzimuthAngle={Math.PI / 6}
      />
      {/* <OrbitControls /> */}
      <group
        scale={3}
        // onPointerMove={handlePointerMove}
      >
        <Suspense fallback={null}>
          <group
            ref={screenGroupRef}
            position={[-0.243, 0, 0.013]}
            scale={0.0851}
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
