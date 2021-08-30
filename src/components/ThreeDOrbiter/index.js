import React, { useRef, useState } from 'react'
import { useFrame } from 'react-three-fiber'
import { softShadows, MeshWobbleMaterial} from '@react-three/drei';
import { useSpring, a } from "@react-spring/three";

softShadows();

const ThreeDOrbiter = ( {position, color, speed, args}) => {
    const mesh = useRef();
    useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01));

    const [expand, setExpand] = useState(false);

    const props = useSpring({
        scale: expand ? [1.4, 1.4, 1.4] : [1, 1, 1],
    });

    // document.addEventListener('mousemove', onDocumentMouseMove)

    // let mouseX = 0
    // let mouseY = 0
    // let targetX = 0
    // let targetY = 0

    // const windowX = window.innerWidth / 2
    // const windowY = window.innerWidth / 2

    // function onDocumentMouseMove(event) {
    //     mouseX = (event.clientX - windowX)
    //     mouseY = (event.clientY - windowY)
    // }

    // useFrame(() => (mesh.current.rotation.x += .5 * (targetY - mesh.current.rotation.x)));
    // useFrame(() => (mesh.current.rotation.y += .5 * (targetX - mesh.current.rotation.y)));

    return (
        <a.mesh
            position={position}
            ref={mesh}
            onClick={() => setExpand(!expand)}
            scale={props.scale}
            castShadow
        >
            <boxBufferGeometry attach='geometry' args={args} />
            <MeshWobbleMaterial
                color={color}
                speed={speed}
                attach='material'
                factor={0.6}
            />
        </a.mesh>   
    )
}

export default ThreeDOrbiter