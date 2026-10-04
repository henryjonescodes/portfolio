import React, { ReactNode, useCallback, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SettingsContext } from './SettingsContext';

// * * * * * * * * * * SettingsProvider * * * * * * * * * * //

type SettingsProviderProps = {
  children: ReactNode;
};

// Provider component
export const SettingsProvider: React.FC<SettingsProviderProps> = ({ children }) => {
  // ? Get Page via React Router
  const navigate = useNavigate();
  const location = useLocation();

  // ? Parse query parameters
  const isDebugMode = useMemo(() => {
    const searchParams = new URLSearchParams(location.search);
    return searchParams.get('debug') === 'true';
  }, [location.search]);

  const [animationDisabled, setAnimationDisabledState] = useState(false);
  const [useOrbitControls, setUseOrbitControls] = useState(false);
  const [globalRotation, setGlobalRotation] = useState(false);
  // A user's explicit choice to disable animation wins over automatic re-enables.
  const userLocked = useRef(false);

  const setAnimationDisabled = useCallback((value: boolean, userInitiated = false) => {
    if (userInitiated) userLocked.current = value;
    if (value || userInitiated || !userLocked.current) setAnimationDisabledState(value);
  }, []);

  const toggleDebugMode = useCallback(() => {
    const searchParams = new URLSearchParams(location.search);
    if (isDebugMode) searchParams.delete('debug');
    else searchParams.set('debug', 'true');
    navigate({ search: searchParams.toString() });
  }, [isDebugMode, location.search, navigate]);

  const contextValue = useMemo(
    () => ({
      toggleDebugMode,
      isDebugMode,
      animationDisabled,
      setAnimationDisabled,
      useOrbitControls: isDebugMode && useOrbitControls,
      setUseOrbitControls,
      globalRotation: isDebugMode && globalRotation,
      setGlobalRotation,
    }),
    [
      toggleDebugMode,
      isDebugMode,
      animationDisabled,
      setAnimationDisabled,
      useOrbitControls,
      globalRotation,
    ],
  );

  return <SettingsContext.Provider value={contextValue}>{children}</SettingsContext.Provider>;
};
