import { useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import CustomControls from "../../components/CustomControls";
import styles from "./home.module.scss"; // Import your Sass module

function Model() {
  const { scene } = useGLTF("/models/Console.glb");
  return <primitive object={scene} scale={2} />;
}

const Home = () => {
  return (
    <Canvas className={styles.canvas} camera={{ position: [0, 0, 5] }}>
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 5, 2]} />

      {/* Custom Controls */}
      <CustomControls
        maxPolarAngle={Math.PI / 6}
        maxAzimuthAngle={Math.PI / 6}
      />

      {/* 3D Models */}
      <Model />
      {/* Add other models or objects here */}
    </Canvas>
  );
};

export default Home;
