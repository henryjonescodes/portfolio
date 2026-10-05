import { a, useSpring } from '@react-spring/three';
import { GroupProps, useThree } from '@react-three/fiber';
import { useWindowDimensions } from '@context/WindowDimensionContext';
import { toStagePoint } from '@utils/stage';
import { useGesture } from '@use-gesture/react';
import { ReactNode, useRef } from 'react';

type Spring = { tension: number; friction: number; mass: number };

type StageControlsProps = {
  enabled: boolean;
  /** Drag anywhere on the stage rather than only on the children. */
  global: boolean;
  config: Spring;
  /** Spring back to rest on release. */
  snap: Spring;
  polar: [number, number];
  azimuth: [number, number];
  children: ReactNode;
};

const REST: [number, number, number] = [0, 0, 0];

const clamp = (value: number, [min, max]: [number, number]) => Math.min(max, Math.max(min, value));

/**
 * drei's PresentationControls, reading drags in the stage's frame so a phone showing the stage
 * sideways turns the device the way the finger moves.
 */
const StageControls = ({
  enabled,
  global,
  config,
  snap,
  polar,
  azimuth,
  children,
}: StageControlsProps) => {
  const events = useThree((state) => state.events);
  const gl = useThree((state) => state.gl);
  const size = useThree((state) => state.size);
  const { stageRotated } = useWindowDimensions();
  const rotated = useRef(stageRotated);
  rotated.current = stageRotated;

  const [spring, api] = useSpring(() => ({ rotation: REST, config }));

  const bind = useGesture(
    {
      onDrag: ({
        down,
        delta: [dx, dy],
        memo: [oldY, oldX] = spring.rotation.animation.to || REST,
      }) => {
        if (!enabled) return [dy, dx];
        const x = clamp(oldX + (dx / size.width) * Math.PI, azimuth);
        const y = clamp(oldY + (dy / size.height) * Math.PI, polar);
        api.start({ rotation: down ? [y, x, 0] : REST, config: down ? config : snap });
        return [y, x];
      },
    },
    {
      target: global ? ((events.connected as HTMLElement | undefined) ?? gl.domElement) : undefined,
      transform: ([x, y]) => toStagePoint(x, y, rotated.current),
    },
  );

  return (
    // The DOM gesture handlers and the animated tuple both work on a three group; only the types object.
    <a.group
      {...(bind?.() as unknown as GroupProps)}
      rotation={spring.rotation as unknown as typeof REST}
    >
      {children}
    </a.group>
  );
};

export default StageControls;
