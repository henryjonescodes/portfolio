import { useSpring } from "@react-spring/three";
import { useFrame, useThree } from "@react-three/fiber";
import { useGesture } from "@use-gesture/react";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Vector3 } from "three";
import { useWindowDimensions } from "../context/WindowDimensionContext";
import {
  screenWidths,
  ZoomLevel,
  zoomLevels,
} from "../styles/layout.constants";

interface CustomControlsProps {
  zoomIn?: boolean;
  fullScreen?: boolean;
  targetRef?: React.RefObject<THREE.Group>;
  maxPolarAngle?: number;
  maxAzimuthAngle?: number;
}

export default function CustomControls({
  zoomIn = false,
  fullScreen = false,
  targetRef,
  maxPolarAngle = Math.PI / 6,
  maxAzimuthAngle = Math.PI / 6,
}: CustomControlsProps) {
  const { camera } = useThree();
  const { width } = useWindowDimensions();

  // State for zoomModifier

  // Initial camera position (kept constant)
  const initialCameraPosition: [number, number, number] = [0, 0, 4.2];

  // Calculate initial spherical coordinates (kept constant)
  const [x0, y0, z0] = initialCameraPosition;
  const initialRadius = Math.sqrt(x0 ** 2 + y0 ** 2 + z0 ** 2);
  const initialTheta = Math.atan2(x0, z0);
  const initialPhi = Math.acos(y0 / initialRadius);

  const initialSpherical = {
    radius: initialRadius,
    theta: initialTheta,
    phi: initialPhi,
  };

  // State to control user drag and animation
  const [dragEnabled, setDragEnabled] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  // Spring for smooth animation
  const [spring, api] = useSpring(() => ({
    theta: initialSpherical.theta,
    phi: initialSpherical.phi,
    position: initialCameraPosition,
    config: { mass: 1, tension: 25, friction: 7.5 },
  }));

  // Gesture handling
  useGesture(
    {
      onDrag: ({ down, movement: [mx, my] }) => {
        if (down && dragEnabled) {
          // Calculate new theta and phi based on mouse movement
          const deltaTheta = (mx / window.innerWidth) * maxAzimuthAngle * 2;
          const deltaPhi = (my / window.innerHeight) * maxPolarAngle * 2;

          // Clamp phi to prevent flipping over poles
          const phi = spring.phi.get() + deltaPhi;
          const clampedPhi = Math.max(
            initialSpherical.phi - maxPolarAngle,
            Math.min(initialSpherical.phi + maxPolarAngle, phi)
          );

          // Clamp theta within specified azimuth angle limits
          const theta = spring.theta.get() + deltaTheta;
          const clampedTheta = Math.max(
            initialSpherical.theta - maxAzimuthAngle,
            Math.min(initialSpherical.theta + maxAzimuthAngle, theta)
          );

          // Update spring values immediately during drag
          api.start({ theta: clampedTheta, phi: clampedPhi, immediate: true });
        }
      },
    },
    { target: window } // Attach events to the window
  );

  const [zoomLevel2, setZoomLevel2] = useState<ZoomLevel>(zoomLevels.default);

  useEffect(() => {
    const getZoomLevel2 = () => {
      if (width > 3000) return zoomLevels.extraLarge;
      if (width > screenWidths.large) return zoomLevels.large;
      if (width > screenWidths.default) return zoomLevels.default;
      if (width > screenWidths.compact) return zoomLevels.compact;
      if (width > screenWidths.medium) return zoomLevels.medium;
      if (width > screenWidths.small) return zoomLevels.small;
      return zoomLevels.mobile;
    };

    const newZoomLevel = getZoomLevel2();
    setZoomLevel2(newZoomLevel);
  }, [fullScreen, width]);

  // Update camera position when zoomIn, zoomModifier, or targetRef changes
  useEffect(() => {
    const updateCameraPosition = () => {
      if (zoomIn && targetRef?.current) {
        console.log("1");
        calculateAndStartFullScreenAnimation();
      } else if (!zoomIn) {
        console.log("2");
        calculateAndStartWideAnimation();
      }
    };

    const calculateAndStartFullScreenAnimation = () => {
      if (!targetRef?.current) {
        console.error("Target ref not found");
        return;
      }
      // Entering fullscreen or starting in fullscreen
      setDragEnabled(false);
      setIsAnimating(true);

      // Then animate into fullscreen position
      const screenPosition = targetRef.current.position.clone();

      // Create an offset Vector3 that includes zoomModifier
      const offset = fullScreen
        ? new Vector3(0, 0.7, 0).add(zoomLevel2.fullScreen)
        : new Vector3(0, 0.7, 0).add(zoomLevel2.handheld);

      const cameraPosition = screenPosition.add(offset);

      api.start({
        position: cameraPosition.toArray() as [number, number, number],
        config: { mass: 1, tension: 85, friction: 13 },
        onRest: () => {
          setIsAnimating(false);
        },
      });
    };

    const calculateAndStartWideAnimation = () => {
      // Exiting fullscreen or entering handheld zoom-in mode
      setIsAnimating(true);

      // Animate to the handheld position
      const handheldPosition = new Vector3(0, 0, zoomLevel2.wide.z);

      api.start({
        position: handheldPosition.toArray() as [number, number, number],
        config: { mass: 1, tension: 85, friction: 13 },
        onRest: () => {
          setDragEnabled(true);
          setIsAnimating(false);
        },
      });
    };

    updateCameraPosition();
  }, [zoomIn, zoomLevel2, targetRef, fullScreen]);

  // Update camera position each frame
  useFrame(() => {
    if (!camera) {
      console.error("Camera not found");
      return;
    }

    // Always use the spring's position
    camera.position.set(...(spring.position.get() as [number, number, number]));

    if (!isAnimating && !zoomIn && dragEnabled) {
      // Convert spherical coordinates to Cartesian coordinates
      const theta = spring.theta.get();
      const phi = spring.phi.get();
      const radius = initialSpherical.radius;

      const x = radius * Math.sin(phi) * Math.sin(theta);
      const y = radius * Math.cos(phi);
      const z = radius * Math.sin(phi) * Math.cos(theta);

      camera.position.set(x, y, z);
      camera.lookAt(0, 0, 0);

      // Update the spring's position value without animation
      api.set({
        position: [x, y, z],
      });
    }
  });

  return null; // No visual component rendered
}
