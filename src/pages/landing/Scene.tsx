// Scene.tsx
import { PresentationControls } from "@react-three/drei";
import { Canvas, GroupProps } from "@react-three/fiber";
import { folder, useControls } from "leva";
import { Suspense } from "react";
import { SiteMixer } from "../../components/3D/SiteMixer";
import LoadingHelper from "../../components/Loading/LoadingHelper";
import { ControlsProvider } from "../../context/ControlsContext";
import { InteractionProvider } from "../../context/InteractionContext";
import { useSettings } from "../../context/SettingsContext";
import { useWindowDimensions } from "../../context/WindowDimensionContext";
import InfoPanel from "./InfoPanel";
import styles from "./landing.module.scss";
import Screen from "./Screen";

export default function Scene() {
  const { zoomLevel } = useSettings();
  const { zoomPositions } = useWindowDimensions();

  return (
    <InteractionProvider>
      <Canvas
        className={styles.canvas}
        shadows
        camera={{
          position:
            zoomLevel === "wide"
              ? zoomPositions.wide.toArray()
              : zoomPositions.handheld.toArray(),
        }}
      >
        <LoadingHelper />
        <ControlsProvider>
          <Suspense fallback={null}>
            <CanvasContent renderOrder={10} />
          </Suspense>
        </ControlsProvider>
      </Canvas>
    </InteractionProvider>
  );
}

const CanvasContent = ({ ...rest }: GroupProps) => {
  const { zoomLevel } = useSettings();
  const { dirLightPosition, ambientIntensity, dirLightIntensity } = useControls(
    {
      Lights: folder({
        dirLightPosition: {
          value: [5.2, 2.1, 6.5],
          step: 0.1,
        },
        dirLightIntensity: { value: 0.4, min: 0, max: 3, step: 0.1 },
        ambientIntensity: { value: 0.7, min: 0, max: 3, step: 0.1 },
      }),
    }
  );

  return (
    <>
      <group {...rest}>
        <ambientLight intensity={ambientIntensity} />
        <directionalLight
          position={dirLightPosition as [number, number, number]}
          intensity={dirLightIntensity}
          castShadow
        />
        <PresentationControls
          global={false}
          enabled={zoomLevel !== "info"}
          config={{ mass: 0.7, tension: 950 }}
          snap={{ mass: 2.5, tension: 600 }}
          rotation={[0, 0, 0]}
          polar={[-Math.PI / 2.8, Math.PI / 2.8]}
          azimuth={[-Math.PI / 2.8, Math.PI / 2.8]}
          cursor={false}
        >
          <group scale={3}>
            <group position={[-0.243, 0, 0.013]} scale={0.0851}>
              <Screen />
            </group>
            <group position={[0.764, 0.297, 0.038]} scale={0.0351}>
              <InfoPanel />
            </group>
            <SiteMixer position={[0, 0, 0]} />
          </group>
        </PresentationControls>
      </group>
    </>
  );
};
