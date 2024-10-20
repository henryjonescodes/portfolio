import { Canvas } from "@react-three/fiber";
import CustomControls from "../../components/CustomControls";
import styles from "./home.module.scss";
import Model from "./Model";
import { OrbitControls } from "@react-three/drei";
import { useParams } from "react-router-dom";

const Home = () => {
  const { page } = useParams<{ page: string }>();

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
      {/* <OrbitControls /> */}

      {/* 3D Models */}
      <Model />
    </Canvas>
  );
};

export default Home;
