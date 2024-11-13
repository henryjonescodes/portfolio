import { OrbitControls } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { folder, useControls } from "leva";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useSpring } from "react-spring";
import { Vector3 } from "@three";
import { useSettings } from "./SettingsContext";
import { useWindowDimensions } from "./WindowDimensionContext";

interface ControlsContextProps {
  focus: Vector3;
  setFocus: (v: Vector3) => void;
}
// TODO: no longer needs to be a context, make a controls component
// Default values for the context
const defaultControlsContext: ControlsContextProps = {
  focus: new Vector3(0, 0, 0),
  setFocus: () => {
    console.warn(
      "setFocus is not initialized. Make sure to use ControlsProvider."
    );
  },
};

const ControlsContext = createContext<ControlsContextProps>(
  defaultControlsContext
);

export const ControlsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { camera } = useThree();
  const { zoomLevel } = useSettings();
  const { zoomPositions } = useWindowDimensions();

  // Leva Controls
  const { useOrbitControls } = useControls({
    Controls: folder(
      {
        useOrbitControls: false,
      },
      { collapsed: true }
    ),
  });

  const [focus, setFocus] = useState<Vector3>(new Vector3(0, 0, 0));

  // ?? Adjust focus based on zoom level
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
    }
  }, [zoomLevel, zoomPositions]);

  // ?? Animate position
  const { position } = useSpring({
    from: {
      position: [camera.position.x, camera.position.y, camera.position.z],
    },
    to: { position: focus.toArray() },
    config: { mass: 1, tension: 170, friction: 26 },
    reset: false,
  });

  useFrame(() => {
    if (useOrbitControls) {
      return;
    }
    const newPosition = new Vector3(
      position.get()[0],
      position.get()[1],
      position.get()[2]
    );

    camera.position.lerp(newPosition, 0.1);
    camera.updateProjectionMatrix();
  });

  return (
    <ControlsContext.Provider value={{ focus, setFocus }}>
      {useOrbitControls && <OrbitControls />}
      {children}
    </ControlsContext.Provider>
  );
};

export const useControlsContext = () => {
  const context = useContext(ControlsContext);
  if (!context) {
    throw new Error(
      "useControlsContext must be used within a ControlsProvider"
    );
  }
  return context;
};
