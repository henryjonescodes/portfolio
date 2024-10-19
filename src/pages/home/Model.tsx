import { motion } from "framer-motion-3d";
import { useEffect, useState } from "react";
import { Knob } from "../../components/Knob";
import useModel from "../../hooks/useModel";
import useRaycaster from "../../hooks/useRaycaster";

export default function Model() {
  const gizmo = useModel("/models/Gizmo.glb");
  const buttons = useModel("/models/Buttons.glb");
  const colorToggle = useModel("/models/ColorToggle.glb");
  const cornerDialR = useModel("/models/CornerDialR.glb");
  const cornerDialL = useModel("/models/CornerDialL.glb");
  const dial = useModel("/models/Dial.glb");
  const knobR = useModel("/models/KnobR.glb");
  const knobL = useModel("/models/KnobL.glb");

  const [dialRot, setDialRot] = useState(0);
  const [knobRotR, setKnobRotR] = useState(0);
  const [knobRotL, setKnobRotL] = useState(0);

  const { activeObject, handlePointerMove } = useRaycaster();

  return (
    <motion.group scale={3} onPointerMove={handlePointerMove}>
      <primitive object={gizmo} />
      <primitive object={buttons} />
      <primitive object={colorToggle} />
      <primitive object={cornerDialR} />
      <primitive object={cornerDialL} />
      <Knob
        model={dial}
        rotation={dialRot}
        setRotation={setDialRot}
        activeObject={activeObject}
        name={"Dial"}
      />
      <Knob
        model={knobR}
        rotation={knobRotR}
        setRotation={setKnobRotR}
        activeObject={activeObject}
        name={"KnobR"}
        axis="x"
      />
      <Knob
        model={knobL}
        rotation={knobRotL}
        setRotation={setKnobRotL}
        activeObject={activeObject}
        name={"KnobL"}
        axis="x"
      />
    </motion.group>
  );
}
