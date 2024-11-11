import { OrbitControls } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { folder, useControls } from "leva";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useSpring } from "react-spring";
import { Vector3 } from "three";
import {
  screenWidths,
  ZoomLevel,
  zoomLevels,
} from "../styles/layout.constants";
import { useSettings } from "./SettingsContext";
import { useWindowDimensions } from "./WindowDimensionContext";

interface ControlsContextProps {
  focus: Vector3;
  setFocus: (v: Vector3) => void;
}

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
  const [focus, setFocus] = useState<Vector3>(new Vector3(0, 0, 0));
  const [zoomPositions, setZoomPositions] = useState<ZoomLevel>(
    zoomLevels.default
  );
  const { camera } = useThree();
  const { zoomLevel } = useSettings();
  const { width } = useWindowDimensions();

  // Leva Controls
  const { useOrbitControls } = useControls({
    Controls: folder({
      useOrbitControls: false,
    }),
  });

  // ?? Get offset adjusted for screen size
  useEffect(() => {
    const getZoomLevel = () => {
      if (width > 3000) {
        console.log("Current width category: extraLarge");
        return zoomLevels.extraLarge;
      }
      if (width > screenWidths.large) {
        console.log("Current width category: large");
        return zoomLevels.large;
      }
      if (width > screenWidths.default) {
        console.log("Current width category: default");
        return zoomLevels.default;
      }
      if (width > screenWidths.compact) {
        console.log("Current width category: compact");
        return zoomLevels.compact;
      }
      if (width > screenWidths.medium) {
        console.log("Current width category: medium");
        return zoomLevels.medium;
      }
      if (width > screenWidths.small) {
        console.log("Current width category: small");
        return zoomLevels.small;
      }
      if (width > screenWidths.mobile) {
        console.log("Current width category: mobile");
        return zoomLevels.mobile;
      }
      console.log("Current width category: tiny");
      return zoomLevels.tiny;
    };

    const newZoomLevel = getZoomLevel();
    setZoomPositions(newZoomLevel);
  }, [width, zoomLevels]);

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
