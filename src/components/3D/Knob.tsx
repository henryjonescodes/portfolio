import React, {
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import { ThreeEvent } from "@react-three/fiber";
import {
  InteractionContext,
  InteractiveElement,
  InteractiveElementProps,
} from "@context/InteractionContext";

type KnobProps = {
  position?: [number, number, number];
  axis?: "x" | "y" | "z";
  min?: number;
  max?: number;
  mapMin?: number;
  mapMax?: number;
  rotation?: number;
  setRotation?: (newVal: number) => void;
  onChange?: (value: number) => void;
  name: string;
  children: React.ReactElement;
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
  children,
  ...rest
}: KnobProps) {
  const [internalRotation, setInternalRotation] = useState(rotation || 0);
  const { activeObject } = useContext(InteractionContext);
  const isActive = activeObject === name;

  const isControlled = rotation !== undefined && setRotation !== undefined;
  const currentRotation = isControlled ? rotation : internalRotation;
  const rotationRef = useRef(currentRotation);

  const [isDragging, setIsDragging] = useState(false);
  const startDragPosition = useRef({ x: 0, y: 0 });
  const sensitivity = 0.5;

  const degreesToRadians = (degrees: number) => (degrees * Math.PI) / 180;

  useEffect(() => {
    rotationRef.current = currentRotation;
  }, [currentRotation]);

  useEffect(() => {
    if (!isActive && rotation !== undefined) {
      setInternalRotation(rotation);
    }
  }, [rotation, isActive]);

  const applyRotation = useCallback(
    (deltaRotation: number) => {
      let newRotation = rotationRef.current + deltaRotation;
      newRotation = Math.max(min, Math.min(newRotation, max));

      const normalizedValue =
        ((newRotation - min) / (max - min)) * (mapMax - mapMin) + mapMin;

      onChange?.(normalizedValue);
      rotationRef.current = newRotation;

      if (isControlled) {
        setRotation?.(newRotation);
      } else {
        setInternalRotation(newRotation);
      }
    },
    [isControlled, min, max, mapMin, mapMax, onChange, setRotation]
  );

  useEffect(() => {
    if (isActive && !isDragging) {
      const handleWheel = (event: WheelEvent) => {
        event.preventDefault();
        const deltaRotation = -event.deltaY * 0.05;
        applyRotation(deltaRotation);
      };

      window.addEventListener("wheel", handleWheel);
      return () => {
        window.removeEventListener("wheel", handleWheel);
      };
    }
  }, [isActive, isDragging, applyRotation]);

  useEffect(() => {
    if (isDragging) {
      const handlePointerMove = (e: PointerEvent) => {
        e.preventDefault();
        const deltaX = e.clientX - startDragPosition.current.x;
        const deltaY = e.clientY - startDragPosition.current.y;

        const deltaRotation = (deltaX - deltaY) * sensitivity;
        applyRotation(deltaRotation);

        startDragPosition.current = { x: e.clientX, y: e.clientY };
      };

      const handlePointerUp = () => {
        setIsDragging(false);
      };

      window.addEventListener("pointermove", handlePointerMove);
      window.addEventListener("pointerup", handlePointerUp);

      return () => {
        window.removeEventListener("pointermove", handlePointerMove);
        window.removeEventListener("pointerup", handlePointerUp);
      };
    }
  }, [isDragging, applyRotation, sensitivity]);

  const handlePointerDown = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setIsDragging(true);
    startDragPosition.current = { x: e.clientX, y: e.clientY };
  };

  const rotationArray: [number, number, number] = [0, 0, 0];
  rotationArray[axis === "x" ? 0 : axis === "y" ? 1 : 2] =
    degreesToRadians(currentRotation);

  return (
    <group rotation={rotationArray} position={position}>
      <InteractiveElement
        {...rest}
        name={name}
        onPointerDown={handlePointerDown}
      >
        {children}
      </InteractiveElement>
    </group>
  );
}
