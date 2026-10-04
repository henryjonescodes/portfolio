import { animated, useSpring } from '@react-spring/three';
import { useAnimations } from '@context/AnimationContext';
import { useEffect, useState } from 'react';
import { ThreeEvent } from '@react-three/fiber';
import { InteractiveElement, InteractiveElementProps } from '@context/InteractionContext';

type ButtonProps = {
  position?: [number, number, number];
  axis?: 'x' | 'y' | 'z';
  flip?: boolean;
  on?: boolean;
  onChange?: (value: boolean) => void;
  onClick?: () => void;
  travel?: number;
} & InteractiveElementProps;

export function Button({
  position = [0, 0, 0],
  axis = 'z',
  flip = false,
  on,
  onChange,
  onClick,
  travel = 0.01,
  children,
  onPointerOver,
  onPointerOut,
  onPointerDown,
  onPointerUp,
  ...rest
}: ButtonProps) {
  const [internalOn, setInternalOn] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const isControlled = on !== undefined && onChange !== undefined;
  const currentOn = isControlled ? on : internalOn;

  // Use spring for animation, animating the position directly
  const { SPRINGS } = useAnimations();
  const [spring, api] = useSpring(() => ({ position, config: SPRINGS.button }));

  // Update spring when currentOn changes
  useEffect(() => {
    const offset = currentOn ? (flip ? travel : -travel) : 0;
    const newPos = [...position] as [number, number, number];
    if (axis === 'x') {
      newPos[0] += offset;
    } else if (axis === 'y') {
      newPos[1] += offset;
    } else if (axis === 'z') {
      newPos[2] += offset;
    }
    api.start({ position: newPos, config: SPRINGS.button });
  }, [currentOn, flip, travel, axis, position, api, SPRINGS.button]);

  // Handle pointer events
  const handlePointerDown = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setIsPressed(true);
    if (!isControlled) {
      setInternalOn(true);
    } else {
      onChange?.(true);
    }
    if (onPointerDown) {
      onPointerDown(e);
    }
  };

  const handlePointerUp = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setIsPressed(false);
    if (!isControlled) {
      setInternalOn(false);
    } else {
      onChange?.(false);
    }
    // Fire onClick only once when user clicks the button
    if (onClick) {
      onClick();
    }
    if (onPointerUp) {
      onPointerUp(e);
    }
  };

  const handlePointerOver = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    if (onPointerOver) {
      onPointerOver(e);
    }
  };

  const handlePointerOut = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    if (isPressed) {
      setIsPressed(false);
      if (!isControlled) {
        setInternalOn(false);
      } else {
        onChange?.(false);
      }
    }
    if (onPointerOut) {
      onPointerOut(e);
    }
  };

  return (
    <animated.group position={spring.position}>
      <InteractiveElement
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        {...rest}
      >
        {children}
      </InteractiveElement>
    </animated.group>
  );
}
