// InteractionContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";

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

  useEffect(() => {
    console.log(`active object: ${activeObject}`);
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
  onPointerOver?: (e: any) => void;
  onPointerOut?: (e: any) => void;
  onPointerDown?: (e: any) => void;
  onPointerUp?: (e: any) => void;
};

export const InteractiveElement = ({
  name,
  children,
  onPointerOver,
  onPointerOut,
  onPointerDown,
  onPointerUp,
}: InteractiveElementProps) => {
  const { activeObject, setActiveObject } = useContext(InteractionContext);

  return React.cloneElement(children, {
    onPointerOver: (e: any) => {
      e.stopPropagation();
      setActiveObject(name);
      if (onPointerOver) {
        onPointerOver(e);
      }
    },
    onPointerOut: (e: any) => {
      e.stopPropagation();
      setActiveObject(null);
      if (onPointerOut) {
        onPointerOut(e);
      }
    },
    onPointerDown: (e: any) => {
      e.stopPropagation();
      setActiveObject(name);
      if (onPointerDown) {
        onPointerDown(e);
      }
    },
    onPointerUp: (e: any) => {
      e.stopPropagation();
      if (onPointerUp) {
        onPointerUp(e);
      }
    },
  });
};
