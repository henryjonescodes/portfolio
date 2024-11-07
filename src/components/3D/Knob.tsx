import { motion } from "framer-motion-3d";
import { useContext, useEffect, useRef, useState } from "react";
import {
  InteractionContext,
  InteractiveElement,
  InteractiveElementProps,
} from "../../context/InteractionContext";

type KnobProps = {
  position?: [number, number, number];
  axis?: "x" | "y" | "z";
  min?: number; // In degrees
  max?: number; // In degrees
  mapMin?: number; // Output range min
  mapMax?: number; // Output range max
  rotation?: number; // Optional, controlled if provided
  setRotation?: (newVal: number) => void;
  onChange?: (value: number) => void;
} & InteractiveElementProps;

export function Knob({
  axis = "z",
  min = 0,
  max = 360,
  mapMin = 0,
  mapMax = 360,
  rotation,
  setRotation,
  onChange,
  name,
  position = [0, 0, 0],
  ...rest
}: KnobProps) {
  const [internalRotation, setInternalRotation] = useState(rotation || 0);
  const { activeObject } = useContext(InteractionContext);
  const isActive = activeObject === name;

  const isControlled = rotation !== undefined && setRotation !== undefined;
  const currentRotation = isControlled ? rotation : internalRotation;
  const rotationRef = useRef(currentRotation);

  const degreesToRadians = (degrees: number) => (degrees * Math.PI) / 180;

  useEffect(() => {
    rotationRef.current = currentRotation;
  }, [currentRotation]);

  // effect to synchronize internalRotation with rotation prop when not interacting
  useEffect(() => {
    if (!isActive && rotation !== undefined) {
      setInternalRotation(rotation);
    }
  }, [rotation, isActive]);

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
      <InteractiveElement {...rest} name={name} />
    </motion.group>
  );
}
