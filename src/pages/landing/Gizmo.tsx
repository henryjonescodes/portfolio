// Scene.tsx
import { SiteMixer } from '@components/3D/SiteMixer';
import { useZoom } from '@context/ZoomContext';
import { PresentationControls } from '@react-three/drei';
import { GroupProps } from '@react-three/fiber';
import { useAnimations } from '@context/AnimationContext';
import { useSettings } from '@context/SettingsContext';
import InfoPanel from './InfoPanel';
import Screen from './Screen';

const Gizmo = ({ ...rest }: GroupProps) => {
  const { zoomLevel } = useZoom();

  const { SCENE } = useAnimations();
  const { globalRotation } = useSettings();
  const polar = (Math.PI * SCENE.polarLimitDeg) / 180;
  const azimuth = (Math.PI * SCENE.azimuthLimitDeg) / 180;

  return (
    <>
      <group {...rest}>
        <ambientLight intensity={SCENE.ambientIntensity} />
        <directionalLight
          position={SCENE.dirLightPosition}
          intensity={SCENE.dirLightIntensity}
          castShadow
        />
        <PresentationControls
          global={globalRotation}
          enabled={zoomLevel !== 'info'}
          config={SCENE.drag}
          snap={SCENE.snap}
          rotation={[0, 0, 0]}
          polar={[-polar, polar]}
          azimuth={[-azimuth, azimuth]}
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
