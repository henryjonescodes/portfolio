// Scene.tsx
import CustomControls from "@components/3D/CustomControls";
import LoadingHelper from "@components/Loading/LoadingHelper";
import { useSettings } from "@context/SettingsContext";
import { useWindowDimensions } from "@context/WindowDimensionContext";
import { useZoom } from "@context/ZoomContext";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useContextBridge } from "its-fine";
import { lazy, Suspense } from "react";
import styles from "./landing.module.scss";
import cn from "classnames";
import { isMobile } from "react-device-detect";
import Close from "@assets/svg/icons/close-01.svg?react";
import { AnimatePresence, motion } from "framer-motion";

const Gizmo = lazy(() => import("./Gizmo"));

const closeButtonVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { delay: 1.5, duration: 2 } },
  exit: { opacity: 0, duration: 1 },
};

export default function Scene() {
  const { useOrbitControls } = useSettings();
  const { zoomLevel, toggleFullscreenZoomPosition } = useZoom();
  const { zoomPositions } = useWindowDimensions();
  const ContextBridge = useContextBridge();

  return (
    <>
      {zoomLevel !== "fullscreen" && isMobile && (
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
        camera={{
          position:
            zoomLevel === "wide"
              ? zoomPositions.wide.toArray()
              : zoomPositions.handheld.toArray(),
        }}
      >
        <ContextBridge>
          <LoadingHelper />
          {!useOrbitControls && <CustomControls />}
          {useOrbitControls && <OrbitControls />}
          <Suspense fallback={null}>
            <Gizmo renderOrder={10} />
          </Suspense>
        </ContextBridge>
      </Canvas>
    </>
  );
}
