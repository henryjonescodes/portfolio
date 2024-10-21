import { useSpring } from "@react-spring/three";
import { useFrame, useThree } from "@react-three/fiber";
import { useGesture } from "@use-gesture/react";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface CustomControlsProps {
  fullScreen?: boolean;
  targetRef?: React.RefObject<THREE.Group>;
  maxPolarAngle?: number;
  maxAzimuthAngle?: number;
}

export default function CustomControls({
  fullScreen = false,
  targetRef,
  maxPolarAngle = Math.PI / 6,
  maxAzimuthAngle = Math.PI / 6,
}: CustomControlsProps) {
  const { camera } = useThree();

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
  const prevFullScreen = useRef(fullScreen);

  // Spring for smooth animation
  const [spring, api] = useSpring(() => ({
    theta: initialSpherical.theta,
    phi: initialSpherical.phi,
    position: initialCameraPosition,
    config: { mass: 1, tension: 25, friction: 7.5 }, // Slowed down animation
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
          // Animate back to initial position when drag ends
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
    // Only proceed if fullScreen state has changed
    if (prevFullScreen.current !== fullScreen) {
      if (fullScreen && targetRef?.current) {
        // Entering fullscreen
        // Disable user drag
        setDragEnabled(false);
        setIsAnimating(true);

        // Reset camera to initial position immediately
        api.start({
          theta: initialSpherical.theta,
          phi: initialSpherical.phi,
          position: initialCameraPosition,
          immediate: true,
        });

        // Then animate into fullscreen position
        const screenPosition = targetRef.current.position;

        const fullscreenCameraPosition: [number, number, number] = [
          screenPosition.x,
          screenPosition.y + 1,
          screenPosition.z + 2, // Adjust as needed
        ];

        api.start({
          position: fullscreenCameraPosition,
          config: { mass: 1, tension: 85, friction: 13 }, // Slowed down animation
          onRest: () => {
            setIsAnimating(false);
          },
        });
      } else if (!fullScreen && prevFullScreen.current) {
        // Exiting fullscreen
        setIsAnimating(true);

        // Animate back to initial camera position
        api.start({
          position: initialCameraPosition,
          config: { mass: 1, tension: 85, friction: 13 }, // Slowed down animation
          onRest: () => {
            // Re-enable user drag control
            setDragEnabled(true);
            setIsAnimating(false);
          },
        });
      }
      // Update the previous fullScreen state
      prevFullScreen.current = fullScreen;
    }
  }, [fullScreen, targetRef, api, initialCameraPosition, initialSpherical]);

  // Update camera position each frame
  useFrame(() => {
    if (fullScreen || isAnimating) {
      // In fullscreen mode or animating
      camera.position.set(
        ...(spring.position.get() as [number, number, number])
      );
      // Optionally set camera.lookAt here
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
    }
  });

  return null; // No visual component rendered
}
