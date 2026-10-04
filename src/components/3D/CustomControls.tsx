import { useFrame, useThree } from '@react-three/fiber';
import React, { useEffect, useMemo, useState } from 'react';
import { useSpring } from '@react-spring/three';
import { useAnimations } from '@context/AnimationContext';
import { Vector3 } from '$three';
import { useWindowDimensions } from '@context/WindowDimensionContext';
import { useZoom } from '@context/ZoomContext';
import { useMobileOrientation, isMobile } from 'react-device-detect';
import { landscapeZoomPositionOffset } from '@styles/layout.constants';

const CustomControls: React.FC = () => {
  const { camera } = useThree();
  const { zoomLevel } = useZoom();
  const { zoomPositions } = useWindowDimensions();
  const { isLandscape } = useMobileOrientation();
  const { SPRINGS, CAMERA_LERP } = useAnimations();
  const target = useMemo(() => new Vector3(), []);

  const [focus, setFocus] = useState<Vector3>(new Vector3(0, 0, 0));

  // Adjust focus based on zoom level
  useEffect(() => {
    let focusLocal = undefined;
    switch (zoomLevel) {
      case 'wide':
        focusLocal = zoomPositions.wide.clone();
        break;
      case 'handheld':
        focusLocal = zoomPositions.handheld.clone();
        break;
      case 'info':
        focusLocal = zoomPositions.info.clone();
        break;
      case 'fullscreen':
        focusLocal = zoomPositions.fullScreen.clone();
        break;
      default:
        focusLocal = new Vector3(0, 0, 0);
        break;
    }
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
