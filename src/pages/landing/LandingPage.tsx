import GradientBackground from '@components/GradientBackground';
import Page from '@components/Page';
import { useLoading } from '@context/LoadingContext';
import { useWindowDimensions } from '@context/WindowDimensionContext';
import { useZoom } from '@context/ZoomContext';
import { debugLog } from '@utils/debug';
import { tryLockLandscape } from '@utils/stage';
import cn from 'classnames';
import { AnimatePresence } from 'framer-motion';
import { lazy, Suspense, useEffect } from 'react';
import { isMobile } from 'react-device-detect';
import styles from './landing.module.scss';

// three.js and React Three Fiber load only when the 3D scene is wanted, never in lite mode.
const Scene = lazy(() => import('./Scene'));

const LandingPage = () => {
  const { zoomLevel } = useZoom();
  const { loadingState } = useLoading();
  const { stageRotated, setPhoneStage } = useWindowDimensions();

  const phoneStage = isMobile && loadingState !== undefined && zoomLevel !== 'fullscreen';

  // Phones show the device in landscape: locked where the browser allows, turned by CSS otherwise.
  useEffect(() => {
    setPhoneStage(phoneStage);
    if (phoneStage)
      tryLockLandscape().then((locked) => debugLog('LandingPage', `landscape lock: ${locked}`));
    return () => setPhoneStage(false);
  }, [phoneStage, setPhoneStage]);

  return (
    <div className={cn(styles.landing, { [styles.rotated]: stageRotated })}>
      <AnimatePresence>
        {(loadingState === undefined || zoomLevel === 'fullscreen') && <Page />}
      </AnimatePresence>
      {loadingState !== undefined && (
        <>
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
          <GradientBackground />
        </>
      )}
    </div>
  );
};

export default LandingPage;
