import { useGLTF } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import { EXRLoader } from "three/examples/jsm/loaders/EXRLoader.js";

export function SiteMixer(props) {
  const { nodes, materials } = useGLTF("/3D/models/site-mixer-withmats.glb");
  const colorTexture = useLoader(EXRLoader, "/3D/images/color.exr");
  const roughnessTexture = useLoader(
    TextureLoader,
    "/3D/images/roughness-4k.jpg"
  );
  colorTexture.flipY = true;
  roughnessTexture.flipY = true;

  return (
    <group {...props} dispose={null}>
      <group position={[0, 0, -0.001]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube037.geometry}
          material={materials.Material}
          onBeforeRender={() => {
            materials.Material.map = colorTexture;
            materials.Material.roughnessMap = roughnessTexture;
            materials.Material.needsUpdate = true;
          }}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube037_1.geometry}
          material={materials.Screen}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/3D/models/site-mixer-withmats.glb");
