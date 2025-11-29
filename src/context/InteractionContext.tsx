// InteractionContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { ThreeEvent } from "@react-three/fiber";
import { useSettings } from "./SettingsContext";

type InteractionContextType = {
  activeObject: string | null;
  setActiveObject: (objectName: string | null) => void;
};

export const InteractionContext = createContext<InteractionContextType>({
  activeObject: null,
  setActiveObject: () => {},
});

export const InteractionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [activeObject, setActiveObject] = useState<string | null>(null);
  const { isDebugMode } = useSettings();

  useEffect(() => {
    if (!isDebugMode) return;
    console.log(`[InteractionContext]: active object: ${activeObject}`);
  }, [activeObject]);

  return (
    <InteractionContext.Provider value={{ activeObject, setActiveObject }}>
      {children}
    </InteractionContext.Provider>
  );
};

export type InteractiveElementProps = {
  name: string;
  children: React.ReactElement;
  onPointerOver?: (e: ThreeEvent<PointerEvent>) => void;
  onPointerOut?: (e: ThreeEvent<PointerEvent>) => void;
  onPointerDown?: (e: ThreeEvent<PointerEvent>) => void;
  onPointerUp?: (e: ThreeEvent<PointerEvent>) => void;
  onPointerMove?: (e: ThreeEvent<PointerEvent>) => void;
};

export const InteractiveElement = ({
  name,
  children,
  onPointerOver,
  onPointerOut,
  onPointerDown,
  onPointerUp,
  onPointerMove,
}: InteractiveElementProps) => {
  const { setActiveObject } = useContext(InteractionContext);

  return React.cloneElement(children, {
    onPointerOver: (e: ThreeEvent<PointerEvent>) => {
      e.stopPropagation();
      setActiveObject(name);
      if (onPointerOver) {
        onPointerOver(e);
      }
    },
    onPointerOut: (e: ThreeEvent<PointerEvent>) => {
      e.stopPropagation();
      setActiveObject(null);
      if (onPointerOut) {
        onPointerOut(e);
      }
    },
    onPointerDown: (e: ThreeEvent<PointerEvent>) => {
      e.stopPropagation();
      setActiveObject(name);
      if (onPointerDown) {
        onPointerDown(e);
      }
    },
    onPointerUp: (e: ThreeEvent<PointerEvent>) => {
      e.stopPropagation();
      if (onPointerUp) {
        onPointerUp(e);
      }
    },
    onPointerMove: (e: ThreeEvent<PointerEvent>) => {
      e.stopPropagation();
      if (onPointerMove) {
        onPointerMove(e);
      }
    },
  });
};
