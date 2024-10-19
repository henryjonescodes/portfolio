import { ThreeEvent } from "@react-three/fiber";
import { useState } from "react";
import { Intersection, Object3D } from "three";

// Helper function to find named parent in object hierarchy
function getNamedParent(object: Object3D): Object3D | null {
  while (object) {
    if (object.name && object.name !== "") {
      return object;
    }
    object = object.parent as Object3D;
  }
  return null;
}

// useRaycaster Hook to handle raycasting logic
const useRaycaster = () => {
  const [activeObject, setActiveObject] = useState<string | null>(null);

  const handlePointerMove = (event: ThreeEvent<PointerEvent>) => {
    const intersections: Intersection<Object3D>[] = event.intersections;
    if (intersections.length > 0) {
      const intersectedObject = intersections[0].object;
      const namedParent = getNamedParent(intersectedObject);
      if (namedParent && namedParent.name) {
        setActiveObject(namedParent.name);
      } else {
        setActiveObject(null);
      }
    } else {
      setActiveObject(null);
    }
  };

  return { activeObject, handlePointerMove };
};

export default useRaycaster;
