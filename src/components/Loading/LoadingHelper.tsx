import { useProgress } from '@react-three/drei';
import { useEffect } from 'react';
import { useLoading } from '@context/LoadingContext';

const LoadingHelper = () => {
  const { progress } = useProgress();
  const { setProgress } = useLoading();

  useEffect(() => {
    // ?? Update Loading Context Progress State
    setProgress(progress);
  }, [progress, setProgress]);

  return null;
};

export default LoadingHelper;
