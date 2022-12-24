import { Scroll, ScrollControls, useProgress } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { Suspense, useState } from "react"
import { CamTarget } from "types/cam-target"
import { Box } from "./geometry/MeshGenerator"
import Loading from "./loading/Loading"

import css from "./scene.module.scss"
const styles = css as any

const Scene = () => {
  const { progress, item } = useProgress()

  const [camTarget, setCamTarget] = useState<CamTarget>({
    x: 3,
    y: 3,
    z: 3,
    target_x: 0,
    target_y: 0,
    target_z: 0,
  })

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
      <div className={styles.scene}>
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
  )
}

export default Scene
