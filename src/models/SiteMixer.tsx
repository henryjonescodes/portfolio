import { useGLTF } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import { EXRLoader } from "three/examples/jsm/loaders/EXRLoader.js";

export function SiteMixer(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF(
    "/3D/models/site-mixer-withmats.glb"
  ) as any;
  const colorTexture = useLoader(EXRLoader, "/3D/images/color.exr");
  const roughnessTexture = useLoader(
    TextureLoader,
    "/3D/images/roughness-4k.jpg"
  );
  colorTexture.flipY = true;
  roughnessTexture.flipY = true;

  return (
    <group {...props} position={[0, 0, 0]}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube037.geometry}
        material={materials.Material}
        onBeforeRender={() => {
          materials.Material.map = colorTexture;
          materials.Material.roughnessMap = roughnessTexture;
          materials.Material.transparent = false;
          materials.Material.opacity = 1;
          materials.Material.depthTest = true;
          materials.Material.depthWrite = true;
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
  );
}

useGLTF.preload("/3D/models/site-mixer-withmats.glb");
