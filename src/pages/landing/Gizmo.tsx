// Scene.tsx
import { SiteMixer } from "@components/3D/SiteMixer";
import { useZoom } from "@context/ZoomContext";
import { PresentationControls } from "@react-three/drei";
import { GroupProps } from "@react-three/fiber";
import { folder, useControls } from "leva";
import InfoPanel from "./InfoPanel";
import Screen from "./Screen";

const Gizmo = ({ ...rest }: GroupProps) => {
  const { zoomLevel } = useZoom();

  const {
    dirLightPosition,
    ambientIntensity,
    dirLightIntensity,
    snapMass,
    snapTension,
    configMass,
    configTension,
    polarLimit,
    azimuthLimit,
    global,
  } = useControls({
    Lights: folder(
      {
        dirLightPosition: {
          value: [5.2, 2.1, 6.5],
          step: 0.1,
        },
        dirLightIntensity: { value: 0.4, min: 0, max: 3, step: 0.1 },
        ambientIntensity: { value: 0.7, min: 0, max: 3, step: 0.1 },
      },
      { collapsed: true }
    ),
    PresentationControls: folder(
      {
        global: { value: false },
        Spring: folder(
          {
            snapMass: { value: 2.5, min: 0, max: 10, step: 0.1 },
            snapTension: { value: 600, min: 0, max: 1000, step: 10 },
            configMass: { value: 0.7, min: 0, max: 10, step: 0.1 },
            configTension: { value: 950, min: 0, max: 1000, step: 10 },
          },
          { collapsed: true }
        ),
        Limit: folder(
          {
            polarLimit: {
              value: 32,
              min: 0,
              max: 90,
              step: 1,
            },
            azimuthLimit: {
              value: 32,
              min: 0,
              max: 90,
              step: 1,
            },
          },
          { collapsed: true }
        ),
      },
      { collapsed: true }
    ),
  });

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
          global={global}
          enabled={zoomLevel !== "info"}
          config={{ mass: configMass, tension: configTension }}
          snap={{ mass: snapMass, tension: snapTension }}
          rotation={[0, 0, 0]}
          polar={[-(Math.PI * polarLimit) / 180, (Math.PI * polarLimit) / 180]}
          azimuth={[
            -(Math.PI * azimuthLimit) / 180,
            (Math.PI * azimuthLimit) / 180,
          ]}
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

export default Gizmo;
