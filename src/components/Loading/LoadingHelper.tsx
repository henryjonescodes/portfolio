import { useProgress } from "@react-three/drei";
import { useEffect } from "react";
import { useSettings } from "../../context/SettingsContext";

const LoadingHelper = () => {
  const { progress } = useProgress();
  const { loadingState, setLoadingState } = useSettings();

  useEffect(() => {
    if (progress >= 100) {
      if (loadingState !== "complete") {
        setLoadingState("loaded");
      }
    }
  }, [progress]);

  return null;
};

export default LoadingHelper;
