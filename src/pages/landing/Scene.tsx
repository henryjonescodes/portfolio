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
import { OrbitControls } from "@react-three/drei";
import { folder, useControls } from "leva";

export default function Scene() {
  const screenGroupRef = useRef<THREE.Group>(null);

  const {
    dirLightPosition,
    ambientIntensity,
    dirLightIntensity,
    maxPolarAngle,
    maxAzimuthAngle,
    useOrbitControls,
  } = useControls({
    Lights: folder({
      dirLightPosition: {
        value: [5.2, 2.1, 6.5],
        step: 0.1,
      },
      dirLightIntensity: { value: 0.4, min: 0, max: 3, step: 0.1 },
      ambientIntensity: { value: 0.7, min: 0, max: 3, step: 0.1 },
    }),
    Controls: folder({
      maxPolarAngle: { value: Math.PI / 4, min: 0, max: Math.PI, step: 0.01 },
      maxAzimuthAngle: { value: Math.PI / 4, min: 0, max: Math.PI, step: 0.01 },
      useOrbitControls: true,
    }),
  });

  return (
    <InteractionProvider>
      <Canvas
        className={styles.canvas}
        camera={{ position: [0, 0, 5] }}
        shadows
      >
        <ambientLight intensity={ambientIntensity} />
        <directionalLight
          position={dirLightPosition}
          intensity={dirLightIntensity}
          castShadow
        />
        {useOrbitControls ? (
          <OrbitControls />
        ) : (
          <CustomControls
            targetRef={screenGroupRef}
            maxPolarAngle={maxPolarAngle}
            maxAzimuthAngle={maxAzimuthAngle}
          />
        )}
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
