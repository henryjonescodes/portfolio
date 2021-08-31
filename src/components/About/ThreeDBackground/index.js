import { OrbitControls } from "@react-three/drei";
import React from "react";
import { Canvas } from "@react-three/fiber";
import { Box } from "@react-three/drei";
// import Buildings from "./Buildings.js"

export default function ThreeDBackground() {
    return (
        <Canvas>
                <OrbitControls/>
                <directionalLight intensity={0.5} />
                <ambientLight intensity={0.2}/>
                <Box>
                     <meshLambertMaterial attach="material" color="white" />
                </Box>    
                {/* <Buildings/> */}
        </Canvas>
    );
  }
  