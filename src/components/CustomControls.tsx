// CustomControls.jsx
import { useThree, useFrame } from "@react-three/fiber";
import { useGesture } from "@use-gesture/react";
import { useSpring } from "@react-spring/three";
import React from "react";

export default function CustomControls({
  maxPolarAngle = Math.PI / 6,
  maxAzimuthAngle = Math.PI / 6,
}) {
  const { camera } = useThree();

  // Initial spherical coordinates (radius, theta, phi)
  const initialSpherical = {
    radius: camera.position.length(),
    theta: 0, // Horizontal angle
    phi: Math.PI / 2, // Vertical angle (looking at the center)
  };

  // Spring for smooth animation
  const [spring, api] = useSpring(() => ({
    theta: initialSpherical.theta,
    phi: initialSpherical.phi,
    config: { mass: 1, tension: 50, friction: 15 }, // Adjust tension and friction for softer return
  }));

  // Gesture handling
  useGesture(
    {
      onDrag: ({ down, movement: [mx, my] }) => {
        if (down) {
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
        } else {
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

  // Update camera position each frame
  useFrame(() => {
    const { theta, phi } = spring;
    const radius = initialSpherical.radius;

    // Convert spherical coordinates to Cartesian coordinates
    const x = radius * Math.sin(phi.get()) * Math.sin(theta.get());
    const y = radius * Math.cos(phi.get());
    const z = radius * Math.sin(phi.get()) * Math.cos(theta.get());

    camera.position.set(x, y, z);
    camera.lookAt(0, 0, 0); // Keep camera looking at the scene center
  });

  return null; // No visual component rendered
}
