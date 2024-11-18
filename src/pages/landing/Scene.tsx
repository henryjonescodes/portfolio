// Scene.tsx
import CustomControls from "@components/3D/CustomControls";
import LoadingHelper from "@components/Loading/LoadingHelper";
import { InteractionProvider } from "@context/InteractionContext";
import { useSettings } from "@context/SettingsContext";
import { useWindowDimensions } from "@context/WindowDimensionContext";
import { useZoom } from "@context/ZoomContext";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { lazy, Suspense } from "react";
import styles from "./landing.module.scss";
import cn from "classnames";
import { isMobile } from "react-device-detect";

const Gizmo = lazy(() => import("./Gizmo"));

export default function Scene() {
  const { useOrbitControls } = useSettings();
  const { zoomLevel } = useZoom();
  const { zoomPositions } = useWindowDimensions();

  return (
    <InteractionProvider>
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
        <LoadingHelper />
        {!useOrbitControls && <CustomControls />}
        {useOrbitControls && <OrbitControls />}
        <Suspense fallback={null}>
          <Gizmo renderOrder={10} />
        </Suspense>
      </Canvas>
    </InteractionProvider>
  );
}
