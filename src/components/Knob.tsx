import { useEffect, useState } from "react";
import { useThree } from "@react-three/fiber";
import { motion } from "framer-motion-3d";
import { Group } from "three";

type KnobProps = {
  model: Group;
  rotation: number;
  setRotation: React.Dispatch<React.SetStateAction<number>>;
  activeObject: string | null;
  name: string;
  axis?: "x" | "y" | "z"; // Optional axis prop
  stops?: number[]; // Optional array of angles
};

export function Knob({
  model,
  rotation,
  setRotation,
  activeObject,
  name,
  axis = "z", // Default to 'z' axis if not provided
  stops,
}: KnobProps) {
  const { gl } = useThree();

  const [focused, setFocused] = useState<boolean>(false);

  useEffect(() => {
    if (activeObject === name) {
      setFocused(true);
    } else {
      setFocused(false);
    }
  }, [activeObject]);

  // Handle null models internally
  if (!model) {
    return null; // Safely return null if model is missing
  }

  // Assign a name to the object for identification
  if (model.children[0] && model.children[0].name !== name) {
    model.children[0].name = name;
  }

  // Handle wheel event when the knob is focused
  useEffect(() => {
    if (focused) {
      const handleWheel = (event: WheelEvent) => {
        const deltaRotation = event.deltaY * 0.0005;
        setRotation((prev) => {
          let newRotation = prev + deltaRotation;

          // Limit rotation between first and last stops if stops are provided
          if (stops && stops.length >= 2) {
            const minRotation = Math.min(stops[0], stops[stops.length - 1]);
            const maxRotation = Math.max(stops[0], stops[stops.length - 1]);
            newRotation = Math.max(
              minRotation,
              Math.min(newRotation, maxRotation)
            );
          }

          return newRotation;
        });
      };

      gl.domElement.addEventListener("wheel", handleWheel);
      return () => {
        gl.domElement.removeEventListener("wheel", handleWheel);
      };
    }
  }, [focused, gl.domElement, setRotation, stops]);

  // Implement snapping when losing focus
  useEffect(() => {
    if (!focused && stops && stops.length > 0) {
      // Find the closest stop to the current rotation
      const closestStop = stops.reduce((prev, curr) => {
        return Math.abs(curr - rotation) < Math.abs(prev - rotation)
          ? curr
          : prev;
      });

      // Animate rotation to closest stop
      const startRotation = rotation;
      const duration = 200; // Animation duration in milliseconds
      const startTime = performance.now();

      const animateRotation = (currentTime: number) => {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        const newRotation =
          startRotation + (closestStop - startRotation) * progress;
        setRotation(newRotation);

        if (progress < 1) {
          requestAnimationFrame(animateRotation);
        }
      };

      requestAnimationFrame(animateRotation);
    }
  }, [focused, rotation, setRotation, stops]);

  const rotationArray: [number, number, number] = [0, 0, 0];
  if (axis === "x") {
    rotationArray[0] = rotation;
  } else if (axis === "y") {
    rotationArray[1] = rotation;
  } else if (axis === "z") {
    rotationArray[2] = rotation;
  }

  return (
    <motion.primitive
      object={model.children[0]}
      rotation={rotationArray} // Apply rotation to the selected axis
    />
  );
}
