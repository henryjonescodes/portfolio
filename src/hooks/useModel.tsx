import { useGLTF } from "@react-three/drei";
import { Group } from "three";

const useModel = (url: string): Group => {
  const { scene } = useGLTF(url);
  return scene;
};

export default useModel;
