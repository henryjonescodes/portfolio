import { useAnimations } from '@context/AnimationContext';
import { debugLog } from '@utils/debug';
import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useLoading } from './LoadingContext';
import { useSettings } from './SettingsContext';
import { handheldZoomType, ZoomContext, zoomLevelType } from './ZoomContext';

const VIEW_PARAM = 'view';

interface ZoomProviderProps {
  children: ReactNode;
}

export const ZoomProvider: React.FC<ZoomProviderProps> = ({ children }) => {
  const { liteMode, startLoading } = useLoading();
  const { setAnimationDisabled } = useSettings();
  const { TIMEOUTS } = useAnimations();
  const reEnableTimer = useRef<ReturnType<typeof setTimeout>>();
  useEffect(() => () => clearTimeout(reEnableTimer.current), []);
  const location = useLocation();

  // ?view=full keeps the full-screen page across a refresh or a shared link.
  const [zoomLevel, setZoomLevel] = useState<zoomLevelType>(() =>
    liteMode || new URLSearchParams(window.location.search).get(VIEW_PARAM) === 'full'
      ? 'fullscreen'
      : 'wide',
  );
  const handHeldZoomLevel = useRef<handheldZoomType>('wide');

  const pathSegments = location.pathname.split('/').filter(Boolean);
  const page = pathSegments[0];

  // ? Update zoomLevel when liteMode changes
  useEffect(() => {
    if (liteMode) {
      setZoomLevel('fullscreen');
    }
  }, [liteMode]);

  // ? Update zoomLevel based on page changes
  useEffect(() => {
    const target = page ? 'handheld' : 'wide';
    setZoomLevel((current) => (current === 'fullscreen' ? current : target));
    handHeldZoomLevel.current = target;
  }, [page]);

  const toggleInfoModeZoomPosition = () => {
    if (zoomLevel === 'fullscreen') {
      return;
    }

    if (zoomLevel === 'info') {
      setZoomLevel(handHeldZoomLevel.current);
    } else {
      handHeldZoomLevel.current = zoomLevel;
      setZoomLevel('info');
    }
  };

  const toggleFullscreenZoomPosition = () => {
    setAnimationDisabled(true, false);

    if (zoomLevel !== 'fullscreen') {
      setZoomLevel('fullscreen');
    } else {
      startLoading();
      setZoomLevel(handHeldZoomLevel.current);
    }

    clearTimeout(reEnableTimer.current);
    reEnableTimer.current = setTimeout(
      () => setAnimationDisabled(false, false),
      TIMEOUTS.ZOOM_ANIMATION_LOCK,
    );
  };

  // Mirrors the full-screen view into the address bar (replaced in place, like the modal's
  // state); lite mode needs no flag, since it is full screen anyway.
  useEffect(() => {
    const url = new URL(window.location.href);
    if (zoomLevel === 'fullscreen' && !liteMode) url.searchParams.set(VIEW_PARAM, 'full');
    else url.searchParams.delete(VIEW_PARAM);
    if (url.href !== window.location.href)
      window.history.replaceState(window.history.state, '', url);
  }, [zoomLevel, liteMode, page]);

  useEffect(() => {
    debugLog('ZoomContext', `zoom level ${zoomLevel}, handheld ref ${handHeldZoomLevel.current}`);
  }, [zoomLevel]);

  return (
    <ZoomContext.Provider
      value={{
        zoomLevel,
        setZoomLevel,
        handHeldZoomLevel,
        toggleFullscreenZoomPosition,
        toggleInfoModeZoomPosition,
      }}
    >
      {children}
    </ZoomContext.Provider>
  );
};
