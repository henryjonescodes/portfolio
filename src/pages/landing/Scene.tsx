import CustomControls from '@components/3D/CustomControls';
import LoadingHelper from '@components/Loading/LoadingHelper';
import { useSettings } from '@context/SettingsContext';
import { useWindowDimensions } from '@context/WindowDimensionContext';
import { useZoom } from '@context/ZoomContext';
import { OrbitControls } from '@react-three/drei';
import { Canvas, ComputeFunction, createPointerEvents } from '@react-three/fiber';
import { toStagePoint } from '@utils/stage';
import { useContextBridge } from 'its-fine';
import { lazy, Suspense, useCallback, useRef } from 'react';
import styles from './landing.module.scss';
import cn from 'classnames';
import { isMobile } from 'react-device-detect';
import Close from '@assets/svg/icons/close-01.svg?react';
import { AnimatePresence, motion } from 'framer-motion';

const Gizmo = lazy(() => import('./Gizmo'));

const closeButtonVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { delay: 1.5, duration: 2 } },
  exit: { opacity: 0, duration: 1 },
};

// Component that bridges React contexts into the Canvas (must be inside Canvas)
function CanvasContent({ useOrbitControls }: { useOrbitControls: boolean }) {
  const ContextBridge = useContextBridge();

  return (
    <ContextBridge>
      <LoadingHelper />
      {!useOrbitControls && <CustomControls />}
      {useOrbitControls && <OrbitControls />}
      <Suspense fallback={null}>
        <Gizmo renderOrder={10} />
      </Suspense>
    </ContextBridge>
  );
}

export default function Scene() {
  const { useOrbitControls } = useSettings();
  const { zoomLevel, toggleFullscreenZoomPosition } = useZoom();
  const { zoomPositions, stageRotated } = useWindowDimensions();
  const rotated = useRef(stageRotated);
  rotated.current = stageRotated;

  // R3F reads pointers from offsetX/offsetY; on a turned stage they come from the client point
  // mapped into the stage's frame instead.
  const events = useCallback((store: Parameters<typeof createPointerEvents>[0]) => {
    const manager = createPointerEvents(store);
    const compute: ComputeFunction = (event, state, previous) => {
      if (!rotated.current) return manager.compute?.(event, state, previous);
      const source = state.events.connected as HTMLElement | undefined;
      const [x, y] = toStagePoint(
        event.clientX,
        event.clientY,
        true,
        source?.getBoundingClientRect(),
      );
      state.pointer.set((x / state.size.width) * 2 - 1, -(y / state.size.height) * 2 + 1);
      state.raycaster.setFromCamera(state.pointer, state.camera);
    };
    return { ...manager, compute };
  }, []);

  return (
    <>
      {zoomLevel !== 'fullscreen' && isMobile && (
        <AnimatePresence mode="wait">
          <motion.div
            className={styles.close}
            onClick={() => {
              toggleFullscreenZoomPosition();
            }}
            variants={closeButtonVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <Close />
          </motion.div>
        </AnimatePresence>
      )}
      <Canvas
        className={cn(styles.canvas, {
          [styles.mobile]: isMobile,
        })}
        shadows
        events={events}
        // Layout size, not the bounding box, which a turned stage reports sideways.
        resize={{ offsetSize: true }}
        camera={{
          position: zoomLevel === 'wide' ? zoomPositions.wide : zoomPositions.handheld,
        }}
      >
        <CanvasContent useOrbitControls={useOrbitControls} />
      </Canvas>
    </>
  );
}
