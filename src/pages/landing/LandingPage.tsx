import GradientBackground from '@components/GradientBackground';
import Page from '@components/Page';
import { useLoading } from '@context/LoadingContext';
import { useZoom } from '@context/ZoomContext';
import { AnimatePresence } from 'framer-motion';
import { lazy, Suspense } from 'react';
import styles from './landing.module.scss';

// three.js and React Three Fiber load only when the 3D scene is wanted, never in lite mode.
const Scene = lazy(() => import('./Scene'));

const LandingPage = () => {
  const { zoomLevel } = useZoom();
  const { loadingState } = useLoading();

  return (
    <div className={styles.landing}>
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
