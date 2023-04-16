import React from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Html, Plane } from "@react-three/drei"
import css from "./three-html.module.scss"

const styles = css as any
// function Scene() {
//   return (
//     <>
//       <ambientLight intensity={0.5} />
//       <directionalLight color="white" intensity={0.5} position={[0, 10, 0]} />
//       <Plane args={[100, 100]} rotation={[-Math.PI / 2, 0, 0]}>
//         <meshBasicMaterial attach="material" color="blue" />
//         <Html center>
//           <h1>Hello React Three Fiber!</h1>
//           <p>This is an HTML component on a 3D plane.</p>
//         </Html>
//       </Plane>j
//     </>
//   )
// }

// export default function App() {
//   return (
//     <Canvas style={{ height: '100vh', width: '100vw' }}>
//       <Scene />
//       <OrbitControls />
//     </Canvas>
//   )
// }

const ThreeHtml = () => {
  return (
    <Canvas>
      <ambientLight />
    </Canvas>
  )
}

export default ThreeHtml
