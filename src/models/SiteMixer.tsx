import { useGLTF } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import { EXRLoader } from "three/examples/jsm/loaders/EXRLoader.js";

export function SiteMixer(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF("/3D/models/site-mixer-sep.glb") as any;
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
          geometry={nodes.Cube038.geometry}
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
        {/* <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube038_1.geometry}
          material={materials.Screen}
        /> */}
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Knob-R"].geometry}
        material={materials.Material}
        position={[0.901, 0.076, 0.081]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Knob-C"].geometry}
        material={materials.Material}
        position={[0.766, 0.076, 0.081]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Knob-L"].geometry}
        material={materials.Material}
        position={[0.631, 0.076, 0.081]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Button-4"].geometry}
        material={materials.Material}
        position={[0.635, -0.045, 0.05]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Button-5"].geometry}
        material={materials.Material}
        position={[0.764, -0.045, 0.05]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Button-6"].geometry}
        material={materials.Material}
        position={[0.892, -0.045, 0.05]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Button-1"].geometry}
        material={materials.Material}
        position={[0.636, -0.158, 0.056]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Button-2"].geometry}
        material={materials.Material}
        position={[0.759, -0.156, 0.056]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Button-3"].geometry}
        material={materials.Material}
        position={[0.893, -0.157, 0.055]}
      />
    </group>
  );
}

useGLTF.preload("/3D/models/site-mixer-sep.glb");
