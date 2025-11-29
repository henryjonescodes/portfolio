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
  } = useControls("3D Scene", {
    "Lighting": folder({
      dirLightPosition: {
        value: [5.2, 2.1, 6.5],
        step: 0.1,
        label: "Dir Light Position",
        hint: "Position of the main directional light (x, y, z)",
      },
      dirLightIntensity: {
        value: 0.4,
        min: 0,
        max: 3,
        step: 0.1,
        label: "Dir Light Intensity",
        hint: "Brightness of the main light (creates shadows)",
      },
      ambientIntensity: {
        value: 0.7,
        min: 0,
        max: 3,
        step: 0.1,
        label: "Ambient Intensity",
        hint: "Overall scene brightness (no shadows)",
      },
    }, { collapsed: false }),

    "Interaction": folder({
      "Rotation": folder({
        global: {
          value: false,
          label: "Global Rotation",
          hint: "Enable rotating the entire scene with mouse drag",
        },
        polarLimit: {
          value: 32,
          min: 0,
          max: 90,
          step: 1,
          label: "Vertical Limit (°)",
          hint: "Max rotation up/down from center",
        },
        azimuthLimit: {
          value: 32,
          min: 0,
          max: 90,
          step: 1,
          label: "Horizontal Limit (°)",
          hint: "Max rotation left/right from center",
        },
      }, { collapsed: false }),

      "Spring Physics": folder({
        "Snap Back": folder({
          snapMass: {
            value: 2.5,
            min: 0,
            max: 10,
            step: 0.1,
            label: "Mass",
            hint: "Mass for snap-back animation (higher = slower)",
          },
          snapTension: {
            value: 600,
            min: 0,
            max: 1000,
            step: 10,
            label: "Tension",
            hint: "Tension for snap-back (higher = snappier)",
          },
        }, { collapsed: true }),
        "Drag Feel": folder({
          configMass: {
            value: 0.7,
            min: 0,
            max: 10,
            step: 0.1,
            label: "Mass",
            hint: "Mass during drag (higher = heavier feel)",
          },
          configTension: {
            value: 950,
            min: 0,
            max: 1000,
            step: 10,
            label: "Tension",
            hint: "Tension during drag (higher = less smooth)",
          },
        }, { collapsed: true }),
      }, { collapsed: true }),
    }, { collapsed: false }),
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
