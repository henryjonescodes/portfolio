// Scene.tsx
import { Canvas } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import * as THREE from "three";
import { SiteMixer } from "../../components/3D/SiteMixer";
import InfoPanel from "./InfoPanel";
import styles from "./landing.module.scss";
import Screen from "./Screen";
import { InteractionProvider } from "../../context/InteractionContext";
import CustomControls from "../../components/3D/CustomControls";

export default function Scene() {
  const screenGroupRef = useRef<THREE.Group>(null);

  return (
    <InteractionProvider>
      <Canvas className={styles.canvas} camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={1} />
        <directionalLight position={[2, 5, 2]} />
        <CustomControls
          targetRef={screenGroupRef}
          maxPolarAngle={Math.PI / 6}
          maxAzimuthAngle={Math.PI / 6}
        />
        {/* <OrbitControls /> */}
        <group scale={3}>
          <Suspense fallback={null}>
            <group
              ref={screenGroupRef}
              position={[-0.243, 0, 0.013]}
              scale={0.0851}
            >
              <Screen />
            </group>
            <group position={[0.764, 0.297, 0.038]} scale={0.0351}>
              <InfoPanel />
            </group>
            <SiteMixer position={[0, 0, 0]} />
          </Suspense>
        </group>
      </Canvas>
    </InteractionProvider>
  );
}
