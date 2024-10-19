import { Canvas } from "@react-three/fiber";
import CustomControls from "../../components/CustomControls";
import styles from "./home.module.scss";
import Model from "./Model";

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
    </Canvas>
  );
};

export default Home;
