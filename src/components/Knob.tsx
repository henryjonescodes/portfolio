import { motion } from "framer-motion-3d";
import React, { useContext, useEffect, useRef, useState } from "react";
import {
  InteractionContext,
  InteractiveElement,
  InteractiveElementProps,
} from "../context/InteractionContext";

type KnobProps = {
  rotation?: number; // Optional, controlled if provided
  setRotation?: (newVal: number) => void;
  axis?: "x" | "y" | "z";
  min?: number; // In degrees
  max?: number; // In degrees
  mapMin?: number; // Output range min
  mapMax?: number; // Output range max
  onChange?: (value: number) => void;
  position?: [number, number, number];
} & InteractiveElementProps;

export function Knob({
  name,
  rotation,
  setRotation,
  axis = "z",
  min = 0,
  max = 360, // Degrees
  mapMin = 0,
  mapMax = 360,
  onChange,
  position = [0, 0, 0],
  children,
  onPointerOver,
  onPointerOut,
  onPointerDown,
}: KnobProps) {
  const { activeObject } = useContext(InteractionContext);
  const [internalRotation, setInternalRotation] = useState(rotation || 0);

  const isControlled = rotation !== undefined && setRotation !== undefined;
  const currentRotation = isControlled ? rotation : internalRotation;

  const isActive = activeObject === name;

  // Use a ref to store the latest rotation value synchronously
  const rotationRef = useRef(currentRotation);

  useEffect(() => {
    rotationRef.current = currentRotation;
  }, [currentRotation]);

  // Convert degrees to radians for internal usage
  const degreesToRadians = (degrees: number) => (degrees * Math.PI) / 180;
  const radiansToDegrees = (radians: number) => (radians * 180) / Math.PI;

  useEffect(() => {
    if (isActive) {
      const handleWheel = (event: WheelEvent) => {
        event.preventDefault();
        const deltaRotation = -event.deltaY * 0.05; // Adjusting for degree-based control
        let newRotation = rotationRef.current + deltaRotation;
        newRotation = Math.max(min, Math.min(newRotation, max));

        if (onChange) {
          const normalizedValue =
            ((newRotation - min) / (max - min)) * (mapMax - mapMin) + mapMin;
          onChange(normalizedValue);
        }

        rotationRef.current = newRotation;

        if (isControlled) {
          setRotation && setRotation(newRotation);
        } else {
          setInternalRotation(newRotation);
        }
      };

      window.addEventListener("wheel", handleWheel);
      return () => {
        window.removeEventListener("wheel", handleWheel);
      };
    }
  }, [isActive, setRotation, min, max, mapMin, mapMax, onChange, isControlled]);

  // Set rotation array using radians for internal 3D transformation
  const invertedRotation = max - currentRotation; // Inverting rotation so 0 is fully left
  const rotationArray: [number, number, number] = [0, 0, 0];
  rotationArray[axis === "x" ? 0 : axis === "y" ? 1 : 2] =
    degreesToRadians(invertedRotation);

  return (
    <motion.group rotation={rotationArray} position={position}>
      <InteractiveElement
        name={name}
        onPointerOver={onPointerOver}
        onPointerOut={onPointerOut}
        onPointerDown={onPointerDown}
      >
        {children}
      </InteractiveElement>
    </motion.group>
  );
}
