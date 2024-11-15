// CustomControls.tsx
import { useFrame, useThree } from "@react-three/fiber";
import React, { useEffect, useState } from "react";
import { useSpring } from "react-spring";
import { Vector3 } from "three";
import { useWindowDimensions } from "@context/WindowDimensionContext";
import { useZoom } from "@context/ZoomContext";

const CustomControls: React.FC = () => {
  const { camera } = useThree();
  const { zoomLevel } = useZoom();
  const { zoomPositions } = useWindowDimensions();

  const [focus, setFocus] = useState<Vector3>(new Vector3(0, 0, 0));

  // Adjust focus based on zoom level
  useEffect(() => {
    switch (zoomLevel) {
      case "wide":
        setFocus(zoomPositions.wide);
        break;
      case "handheld":
        setFocus(zoomPositions.handheld);
        break;
      case "info":
        setFocus(zoomPositions.info);
        break;
      case "fullscreen":
        setFocus(zoomPositions.fullScreen);
        break;
      default:
        setFocus(new Vector3(0, 0, 0));
        break;
    }
  }, [zoomLevel, zoomPositions]);

  // Animate camera position
  const { position } = useSpring({
    from: {
      position: [camera.position.x, camera.position.y, camera.position.z],
    },
    to: { position: focus.toArray() },
    config: { mass: 1, tension: 170, friction: 26 },
    reset: false,
  });

  useFrame(() => {
    const newPosition = new Vector3(...position.get());

    camera.position.lerp(newPosition, 0.1);
    camera.updateProjectionMatrix();
  });

  return null;
};

export default CustomControls;
