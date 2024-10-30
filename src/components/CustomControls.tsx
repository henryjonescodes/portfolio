import { useSpring } from "@react-spring/three";
import { useFrame, useThree } from "@react-three/fiber";
import { useGesture } from "@use-gesture/react";
import { useEffect, useState } from "react";
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

  // State for zoomLevel and initialCameraPosition
  const [zoomLevel2, setZoomLevel2] = useState<ZoomLevel>(zoomLevels.default);
  const [initialCameraPosition, setInitialCameraPosition] = useState<
    [number, number, number]
  >([0, 0, 4.2]);

  // State for initial spherical coordinates
  const [initialSpherical, setInitialSpherical] = useState(() => {
    const [x, y, z] = initialCameraPosition;
    const radius = Math.sqrt(x ** 2 + y ** 2 + z ** 2);
    const theta = Math.atan2(x, z);
    const phi = Math.acos(y / radius);
    return { radius, theta, phi };
  });

  // State to control user drag and animation
  const [dragEnabled, setDragEnabled] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  // Spring for smooth animation
  const [spring, api] = useSpring(() => ({
    theta: initialSpherical.theta,
    phi: initialSpherical.phi,
    radius: initialSpherical.radius,
    position: initialCameraPosition,
    config: { mass: 1, tension: 25, friction: 7.5 },
  }));

  // Gesture handling
  useGesture(
    {
      onDrag: ({ down, movement: [mx, my] }) => {
        if (dragEnabled) {
          if (down) {
            // User is dragging
            // Calculate new theta and phi based on mouse movement
            const deltaTheta = (mx / window.innerWidth) * maxAzimuthAngle * 2;
            const deltaPhi = (my / window.innerHeight) * maxPolarAngle * 2;

            const newTheta = spring.theta.get() + deltaTheta;
            const newPhi = spring.phi.get() + deltaPhi;

            // Clamp phi to prevent flipping over poles
            const clampedPhi = Math.max(
              initialSpherical.phi - maxPolarAngle,
              Math.min(initialSpherical.phi + maxPolarAngle, newPhi)
            );

            // Clamp theta within specified azimuth angle limits
            const clampedTheta = Math.max(
              initialSpherical.theta - maxAzimuthAngle,
              Math.min(initialSpherical.theta + maxAzimuthAngle, newTheta)
            );

            const x =
              spring.radius.get() *
              Math.sin(clampedPhi) *
              Math.sin(clampedTheta);
            const y = spring.radius.get() * Math.cos(clampedPhi);
            const z =
              spring.radius.get() *
              Math.sin(clampedPhi) *
              Math.cos(clampedTheta);

            api.start({
              theta: clampedTheta,
              phi: clampedPhi,
              position: [x, y, z],
              immediate: true,
            });
          } else {
            // User released the drag; animate back to initial position
            api.start({
              theta: initialSpherical.theta,
              phi: initialSpherical.phi,
              radius: initialSpherical.radius,
              position: initialCameraPosition,
              config: { mass: 1, tension: 85, friction: 13 },
            });
          }
        }
      },
    },
    { target: window } // Attach events to the window
  );

  useEffect(() => {
    const getZoomLevel2 = () => {
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
      console.log("Current width category: mobile");
      return zoomLevels.mobile;
    };

    const newZoomLevel = getZoomLevel2();
    setZoomLevel2(newZoomLevel);
    setInitialCameraPosition(
      newZoomLevel.wide.toArray() as [number, number, number]
    );
  }, [fullScreen, width]);

  // Update initialSpherical and animate camera when initialCameraPosition changes
  useEffect(() => {
    const [x, y, z] = initialCameraPosition;
    const radius = Math.sqrt(x ** 2 + y ** 2 + z ** 2);
    const theta = Math.atan2(x, z);
    const phi = Math.acos(y / radius);
    setInitialSpherical({ radius, theta, phi });

    // Animate to the new initialCameraPosition if not zoomed in
    if (!zoomIn) {
      api.start({
        theta,
        phi,
        radius,
        position: initialCameraPosition,
        config: { mass: 1, tension: 85, friction: 13 },
      });
    }
  }, [initialCameraPosition]);

  // Update camera position when zoomIn, zoomLevel2, targetRef, or fullScreen changes
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
      // const offset = fullScreen
      //   ? new Vector3(0, 0, 0).add(zoomLevel2.fullScreen)
      //   : new Vector3(0, 0, 0).add(zoomLevel2.handheld);

      // const cameraPosition = screenPosition.add(offset);

      const cameraPosition = fullScreen
        ? (zoomLevel2.fullScreen.toArray() as [number, number, number])
        : (zoomLevel2.handheld.toArray() as [number, number, number]);

      api.start({
        position: cameraPosition,
        config: { mass: 1, tension: 85, friction: 13 },
        onRest: () => {
          setIsAnimating(false);
        },
      });
    };

    const calculateAndStartWideAnimation = () => {
      // Exiting fullscreen or entering wide mode
      setIsAnimating(true);

      // Animate to the initialCameraPosition
      api.start({
        position: initialCameraPosition,
        theta: initialSpherical.theta,
        phi: initialSpherical.phi,
        radius: initialSpherical.radius,
        config: { mass: 1, tension: 85, friction: 13 },
        onRest: () => {
          setDragEnabled(true);
          setIsAnimating(false);
        },
      });
    };

    updateCameraPosition();
  }, [zoomIn, zoomLevel2, targetRef, fullScreen, initialCameraPosition]);

  // Update camera position each frame
  useFrame(() => {
    if (!camera) {
      console.error("Camera not found");
      return;
    }

    // Always use the spring's position
    camera.position.set(...(spring.position.get() as [number, number, number]));

    // Adjust the camera's target/lookAt
    if (!isAnimating && !zoomIn && dragEnabled) {
      camera.lookAt(0, 0, 0);
    }
  });

  return null; // No visual component rendered
}
