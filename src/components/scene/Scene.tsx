import Loading from "./loading/Loading";
import Styles from "./scene.module.scss";
import { Scroll, ScrollControls, useProgress } from "@react-three/drei";
import { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { CamTarget } from "../../types/cam-target";
import { Box } from "./geometry/MeshGenerator";

const Scene = () => {
  const { active, progress, errors, item, loaded, total } = useProgress();

  const [camTarget, setCamTarget] = useState<CamTarget>({
    x: 1,
    y: 1,
    z: 1,
    target_x: 0,
    target_y: 0,
    target_z: 0,
  });

  return (
    <Suspense
      fallback={
        <Loading
          title={"Henry Jones"}
          subTitle={"Loading Three.js Homepage"}
          src={"/images/avatar.gif"}
          progress={progress}
          item={item}
        />
      }
    >
      <div className={Styles.scene}>
        <Canvas
          dpr={[1, 2]}
          camera={{
            fov: 45,
            position: [camTarget.x, camTarget.y, camTarget.z],
          }}
        >
          <ScrollControls pages={2} distance={1} damping={4}>
            <Scroll>
              <ambientLight />
              <pointLight position={[10, 10, 10]} />
              <Box position={[-1.2, 0, 0]} />
              <Box position={[1.2, 0, 0]} />
            </Scroll>
          </ScrollControls>
        </Canvas>
      </div>
    </Suspense>
  );
};

export default Scene;
