import { useGLTF } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { useLocation, useNavigate } from "react-router-dom";
import { Color, TextureLoader, Vector2 } from "three";
import { useColors } from "../../context/ColorsContext";
import { Button } from "./Button";
import { Knob } from "./Knob";

// ?? Preload Textures
const texturePaths = [
  "/3D/images/delit_bake_1.png",
  "/3D/images/normal_bake_1.png",
  "/3D/images/roughness_bake_1.png",
];
texturePaths.forEach((path) => useLoader.preload(TextureLoader, path));
useGLTF.preload("/3D/models/site-mixer-1.glb");

export function SiteMixer(props: JSX.IntrinsicElements["group"]) {
  const location = useLocation();
  const navigate = useNavigate();
  const { primaryHues, setPrimaryHues } = useColors();

  // ?? Load Scene Components & Textures
  const { nodes, materials } = useGLTF("/3D/models/site-mixer-1.glb") as any;
  const [bakeImage, normalMap, roughnessMap] = useLoader(
    TextureLoader,
    texturePaths
  );

  bakeImage.flipY = false;
  normalMap.flipY = false;
  roughnessMap.flipY = false;

  // ?? Extract Current Page
  const pathSegments = location.pathname.split("/").filter(Boolean);
  const page = pathSegments[0] || "";

  // ?? Helpers
  const handleClick = (label: string, path: string) => {
    if (page === label) {
      navigate("/");
    } else {
      navigate(path);
    }
  };

  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.handheld.geometry}
        material={materials.bake}
        position={[0, 0, -0.001]}
        onBeforeRender={() => {
          materials.bake.map = bakeImage;
          materials.bake.roughnessMap = roughnessMap;
          materials.bake.normalScale = new Vector2(0, 0);
          materials.bake.normalMap = normalMap;
          materials.bake.normalScale = new Vector2(0, 0);
          materials.bake.normalScale = new Vector2(-0.3, 0.3);
          materials.bake.transparent = false;
          materials.bake.metalness = 0.6;
          materials.bake.opacity = 1;
          materials.bake.depthTest = true;
          materials.bake.depthWrite = true;
          materials.bake.needsUpdate = true;
        }}
      />
      <Button
        name="AboutButton"
        position={[0.636, -0.157, 0.054]}
        on={page === "about"}
        onChange={(val) => {
          if (val) {
            handleClick("about", "/about");
          }
        }}
      >
        <group>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.button1.geometry}
            material={materials.bake}
          />
          {page === "about" && (
            <mesh
              geometry={nodes.button1_emission.geometry}
              material={materials.emission}
            />
          )}
        </group>
      </Button>
      <Button
        name="ExperienceButton"
        position={[0.759, -0.156, 0.055]}
        on={page === "experience"}
        onChange={(val) => {
          if (val) {
            handleClick("experience", "/experience");
          }
        }}
      >
        <group>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.button2.geometry}
            material={materials.bake}
          />
          {page === "experience" && (
            <mesh
              geometry={nodes.button2_emission.geometry}
              material={materials.emission}
            />
          )}
        </group>
      </Button>
      <Button
        name="ProjectsButton"
        position={[0.893, -0.158, 0.055]}
        on={page === "projects"}
        onChange={(val) => {
          if (val) {
            handleClick("projects", "/projects");
          }
        }}
      >
        <group>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.button3.geometry}
            material={materials.bake}
          />
          {page === "projects" && (
            <mesh
              geometry={nodes.button3_emission.geometry}
              material={materials.emission}
            />
          )}
        </group>
      </Button>
      <Button name="Button4" position={[0.635, -0.045, 0.049]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.button4.geometry}
          material={materials.bake}
        />
      </Button>
      <Button name="Button5" position={[0.764, -0.045, 0.049]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.button5.geometry}
          material={materials.bake}
        />
      </Button>
      <Button name="Button6" position={[0.892, -0.045, 0.049]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.button6.geometry}
          material={materials.bake}
        />
      </Button>
      <Knob
        name="Knob-L"
        position={[0.631, 0.076, 0.081]}
        rotation={primaryHues.foregroundPrimary}
        onChange={(newHue) => {
          setPrimaryHues((prev) => ({
            ...prev,
            foregroundPrimary: newHue,
          }));
        }}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.knobl.geometry}
          material={materials.bake}
        />
      </Knob>
      <Knob
        name="Knob-C"
        position={[0.766, 0.076, 0.081]}
        rotation={primaryHues.backgroundPrimary}
        onChange={(newHue) => {
          setPrimaryHues((prev) => ({
            ...prev,
            backgroundPrimary: newHue,
          }));
        }}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.knobc.geometry}
          material={materials.bake}
        />
      </Knob>
      <Knob
        name="Knob-R"
        position={[0.901, 0.076, 0.081]}
        rotation={primaryHues.accentPrimary}
        onChange={(newHue) => {
          setPrimaryHues((prev) => ({
            ...prev,
            accentPrimary: newHue,
          }));
        }}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.knobr.geometry}
          material={materials.bake}
        />
      </Knob>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.screens.geometry}
        material={materials.screen}
        position={[0, 0, -0.001]}
      />
    </group>
  );
}
