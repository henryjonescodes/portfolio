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
};

export function Knob({
  model,
  rotation,
  setRotation,
  activeObject,
  name,
  axis = "z", // Default to 'z' axis if not provided
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
        const deltaRotation = event.deltaY * 0.01;
        setRotation((prev) => prev + deltaRotation);
      };

      gl.domElement.addEventListener("wheel", handleWheel);
      return () => {
        gl.domElement.removeEventListener("wheel", handleWheel);
      };
    }
  }, [focused, gl.domElement, setRotation]);

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
