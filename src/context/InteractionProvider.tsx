import { ThreeEvent } from '@react-three/fiber';
import { debugLog } from '@utils/debug';
import React, { useContext, useEffect, useState } from 'react';
import { InteractionContext } from './InteractionContext';

export const InteractionProvider = ({ children }: { children: React.ReactNode }) => {
  const [activeObject, setActiveObject] = useState<string | null>(null);

  useEffect(() => {
    debugLog('InteractionContext', `active object: ${activeObject}`);
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
