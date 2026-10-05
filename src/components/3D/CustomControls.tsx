import { useFrame, useThree } from '@react-three/fiber';
import React, { useEffect, useMemo, useState } from 'react';
import { useSpring } from '@react-spring/three';
import { useAnimations } from '@context/AnimationContext';
import { Vector3 } from '$three';
import { useWindowDimensions } from '@context/WindowDimensionContext';
import { useZoom } from '@context/ZoomContext';
import { isMobile } from 'react-device-detect';
import { landscapeZoomPositionOffset } from '@styles/layout.constants';

const CustomControls: React.FC = () => {
  const { camera } = useThree();
  const { zoomLevel } = useZoom();
  // The stage's own size, so an upright phone showing the stage sideways counts as landscape.
  const { zoomPositions, width, height } = useWindowDimensions();
  const isLandscape = width > height;
  const { SPRINGS, CAMERA_LERP } = useAnimations();
  const target = useMemo(() => new Vector3(), []);

  const [focus, setFocus] = useState<Vector3>(new Vector3(0, 0, 0));

  // Adjust focus based on zoom level
  useEffect(() => {
    const key = zoomLevel === 'fullscreen' ? 'fullScreen' : zoomLevel;
    const focusLocal = new Vector3(...(zoomPositions[key] ?? [0, 0, 0]));
    // Adjust focus based on landscape orientation
    if (isLandscape && isMobile) {
      focusLocal.z = focusLocal.z * landscapeZoomPositionOffset;
    }
    setFocus(focusLocal);
  }, [zoomLevel, zoomPositions, isLandscape]);

  // Animate camera position
  const { position } = useSpring({
    from: {
      position: [camera.position.x, camera.position.y, camera.position.z],
    },
    to: { position: focus.toArray() },
    config: SPRINGS.camera,
    reset: false,
  });

  useFrame(() => {
    camera.position.lerp(target.fromArray(position.get()), CAMERA_LERP);
    camera.updateProjectionMatrix();
  });

  return null;
};

export default CustomControls;
