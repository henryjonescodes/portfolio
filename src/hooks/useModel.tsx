import { useGLTF } from "@react-three/drei";
import { Group, Object3D } from "three";

type GLTFResult = { scene: Object3D };

const useModel = (url: string): Group => {
  const { scene } = useGLTF(url);
  return scene;
};

export default useModel;
