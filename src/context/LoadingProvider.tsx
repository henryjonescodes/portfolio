import Loading from '@components/Loading';
import { useAnimations } from '@context/AnimationContext';
import { debugLog } from '@utils/debug';
import { useLatest } from '@hooks/useLatest';
import React, { useCallback, ReactNode, useEffect, useRef, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { useLocation, useNavigate } from 'react-router-dom';
import { LoadingContext, LoadingStates } from './LoadingContext';

// A phone that chose the 3D view keeps it for the rest of the session.
const PHONE_3D_KEY = 'phone-3d';

const readPhone3D = () => {
  try {
    return sessionStorage.getItem(PHONE_3D_KEY) === 'true';
  } catch {
    return false;
  }
};

const writePhone3D = (on: boolean) => {
  try {
    if (on) sessionStorage.setItem(PHONE_3D_KEY, 'true');
    else sessionStorage.removeItem(PHONE_3D_KEY);
  } catch {
    // Storage can be blocked; the choice then lasts only until a reload.
  }
};

interface LoadingProviderProps {
  children: ReactNode;
}

export const LoadingProvider: React.FC<LoadingProviderProps> = ({ children }) => {
  // ? Hooks & Ref
  const navigate = useNavigate();
  const location = useLocation();
  const { TIMEOUTS } = useAnimations();

  // ? Get initial lite mode value from url
  const searchParams = new URLSearchParams(location.search);
  const liteModeFlag = searchParams.get('lite') === 'true';

  // ? Timeout timer setup
  const preventTimeout = useRef(false);
  const loadingTimerMs = useRef<number>(TIMEOUTS.LITE_MODE_FALLBACK);

  const phone3D = useRef(isMobile && readPhone3D());

  // ? Setup States
  const [liteMode, setLiteModeState] = useState<boolean>(
    liteModeFlag || (isMobile && !phone3D.current),
  );
  const [progress, setProgress] = useState<number>(0);
  const [loadingState, setLoadingState] = useState<LoadingStates>(liteMode ? undefined : 'loading');
  const [firstPageLoad, setFirstPageLoad] = useState<boolean>(true);

  // Keeps ?lite in the URL in step with lite mode.
  const updateLiteModeFlag = useCallback(
    (to: boolean) => {
      const searchParams = new URLSearchParams(location.search);
      const liteModeFlag = searchParams.get('lite');

      if (to && liteModeFlag !== 'true') {
        searchParams.set('lite', 'true');
        navigate({ search: searchParams.toString() });
      } else if (!to && liteModeFlag === 'true') {
        searchParams.delete('lite');
        navigate({ search: searchParams.toString() });
      }
    },
    [location.search, navigate],
  );

  // Phones run in lite mode unless they chose 3D, so make the URL say so.
  useEffect(() => {
    if (isMobile && !phone3D.current) updateLiteModeFlag(true);
  }, [updateLiteModeFlag]);

  const setLiteMode = (to: boolean) => {
    if (isMobile) {
      phone3D.current = !to;
      writePhone3D(!to);
    }
    updateLiteModeFlag(to);
    setLiteModeState(to);
  };

  // ? Loading management functions
  const startLoading = () => {
    if (loadingState === 'complete') return;
    debugLog('LoadingContext', 'Started loading');
    loadingTimerMs.current = TIMEOUTS.USER_INITIATED_FALLBACK;
    preventTimeout.current = false;
    setLiteMode(false);
    setLoadingState('loading');
  };

  const finishLoading = () => {
    debugLog('LoadingContext', 'Completed loading');

    setLiteMode(false);
    setLoadingState('complete');
  };

  const stopLoading = () => {
    if (loadingState === undefined) return;

    debugLog('LoadingContext', 'Stopped loading');
    setLiteMode(true);
    setLoadingState(undefined);
  };

  const latestStopLoading = useLatest(stopLoading);

  // Fall back to lite mode if loading outlasts its timeout.
  useEffect(() => {
    debugLog('LoadingContext', `loadingState: ${loadingState}`);

    let loadingTimer: NodeJS.Timeout | null = null;

    // If we're loading, start a timer to cancel loading after a delay
    if (loadingState === 'loading' && !preventTimeout.current) {
      loadingTimer = setTimeout(() => {
        preventTimeout.current = true;
        latestStopLoading.current();
      }, loadingTimerMs.current); // 5 seconds
    } else {
      if (loadingTimer) {
        clearTimeout(loadingTimer);
        loadingTimer = null;
      }
    }

    return () => {
      if (loadingTimer) {
        clearTimeout(loadingTimer);
      }
    };
  }, [loadingState, latestStopLoading]);

  // ? Update loading state on progress
  useEffect(() => {
    if (progress < 100) return;
    debugLog('LoadingContext', 'Assets loaded');
    setLoadingState((state) => (state === 'complete' ? state : 'loaded'));
  }, [progress]);

  return (
    <LoadingContext.Provider
      value={{
        liteMode,
        finishLoading,
        startLoading,
        progress,
        loadingState,
        setProgress,
        firstPageLoad,
        setFirstPageLoad,
      }}
    >
      <Loading />
      {children}
    </LoadingContext.Provider>
  );
};
