import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

type SettingsContextType = {
  // ? Animation
  animationDisabled: boolean;
  setAnimationDisabled: (value: boolean, userInitiated?: boolean) => void;

  // ? Debug mode
  isDebugMode: boolean;
  toggleDebugMode: () => void;

  // Set by the debug panel
  useOrbitControls: boolean;
  setUseOrbitControls: (value: boolean) => void;
  globalRotation: boolean;
  setGlobalRotation: (value: boolean) => void;
};

const defaultSettings: SettingsContextType = {
  // ? Animation
  animationDisabled: false,
  setAnimationDisabled: () => {},

  // ? Debug mode
  isDebugMode: false,
  toggleDebugMode: () => {},
  useOrbitControls: false,
  setUseOrbitControls: () => {},
  globalRotation: false,
  setGlobalRotation: () => {},
};

const SettingsContext = createContext<SettingsContextType>(defaultSettings);

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

// * * * * * * * * * * useSettings Hook * * * * * * * * * * //

// Custom hook for quick access to the context
export const useSettings = (): SettingsContextType => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
