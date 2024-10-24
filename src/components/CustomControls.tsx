import { useSpring } from "@react-spring/three";
import { useFrame, useThree } from "@react-three/fiber";
import { useGesture } from "@use-gesture/react";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useWindowDimensions } from "../context/WindowDimensionContext";

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
  const { width, height } = useWindowDimensions();

  // Initial camera position is [0, 0, 5]
  const initialCameraPosition: [number, number, number] = [0, 0, 5];

  // Initial spherical coordinates (radius, theta, phi)
  const radius = Math.sqrt(
    initialCameraPosition[0] ** 2 +
      initialCameraPosition[1] ** 2 +
      initialCameraPosition[2] ** 2
  );

  const theta = Math.atan2(initialCameraPosition[0], initialCameraPosition[2]); // Should be 0
  const phi = Math.acos(initialCameraPosition[1] / radius); // Should be π/2

  const initialSpherical = {
    radius: radius,
    theta: theta,
    phi: phi,
  };

  // State to control user drag and animation
  const [dragEnabled, setDragEnabled] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  // Ref to keep track of previous fullScreen state
  const prevFullScreen = useRef(zoomIn);

  // Spring for smooth animation
  const [spring, api] = useSpring(() => ({
    theta: initialSpherical.theta,
    phi: initialSpherical.phi,
    position: initialCameraPosition,
    config: { mass: 1, tension: 25, friction: 7.5 }, // Adjusted animation config
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
          const phi = initialSpherical.phi + deltaPhi;
          const clampedPhi = Math.max(
            initialSpherical.phi - maxPolarAngle,
            Math.min(initialSpherical.phi + maxPolarAngle, phi)
          );

          // Clamp theta within specified azimuth angle limits
          const theta = initialSpherical.theta + deltaTheta;
          const clampedTheta = Math.max(
            initialSpherical.theta - maxAzimuthAngle,
            Math.min(initialSpherical.theta + maxAzimuthAngle, theta)
          );

          // Update spring values immediately during drag
          api.start({ theta: clampedTheta, phi: clampedPhi, immediate: true });
        } else if (!down && dragEnabled) {
          // Optionally animate back to initial position when drag ends
          // If you don't want this, you can remove this block
          api.start({
            theta: initialSpherical.theta,
            phi: initialSpherical.phi,
          });
        }
      },
    },
    { target: window } // Attach events to the window
  );

  useEffect(() => {
    if (prevFullScreen.current !== zoomIn || zoomIn) {
      if (zoomIn && targetRef?.current && !isAnimating) {
        // Entering fullscreen or starting in fullscreen
        setDragEnabled(false);
        setIsAnimating(true);

        // Then animate into fullscreen position
        const screenPosition = targetRef.current.position;

        const zoomModifier = fullScreen
          ? width > 1700
            ? width > 3000
              ? 0.5
              : 0.9
            : 1.5
          : 2.5;

        const fullscreenCameraPosition: [number, number, number] = [
          screenPosition.x,
          screenPosition.y + 1,
          screenPosition.z + zoomModifier, // Adjust as needed
        ];

        api.start({
          position: fullscreenCameraPosition,
          config: { mass: 1, tension: 85, friction: 13 }, // Adjusted animation config
          onRest: () => {
            setIsAnimating(false);
          },
        });
      } else if (!zoomIn && prevFullScreen.current && !isAnimating) {
        // Exiting fullscreen
        setIsAnimating(true);

        // Animate back to initial camera position
        api.start({
          position: initialCameraPosition,
          config: { mass: 1, tension: 85, friction: 13 }, // Adjusted animation config
          onRest: () => {
            // Re-enable user drag control
            setDragEnabled(true);
            setIsAnimating(false);
          },
        });
      }
      // Update the previous fullScreen state
      prevFullScreen.current = zoomIn;
    }
  }, [zoomIn, targetRef, api, fullScreen, width]);

  // Update camera position each frame
  useFrame(() => {
    if (isAnimating || zoomIn) {
      // During animation or fullscreen mode, use the spring position
      camera.position.set(
        ...(spring.position.get() as [number, number, number])
      );
    } else {
      // Normal mode with user drag
      const theta = spring.theta.get();
      const phi = spring.phi.get();
      const radius = initialSpherical.radius;

      // Convert spherical coordinates to Cartesian coordinates
      const x = radius * Math.sin(phi) * Math.sin(theta);
      const y = radius * Math.cos(phi);
      const z = radius * Math.sin(phi) * Math.cos(theta);

      camera.position.set(x, y, z);
      camera.lookAt(0, 0, 0); // Center the camera on the origin

      // Update the spring's position value without animation
      api.set({
        position: [x, y, z],
      });
    }
  });

  return null; // No visual component rendered
}
