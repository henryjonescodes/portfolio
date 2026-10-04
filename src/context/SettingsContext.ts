import { createContext, useContext } from 'react';

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

export const SettingsContext = createContext<SettingsContextType>(defaultSettings);

// * * * * * * * * * * useSettings Hook * * * * * * * * * * //

// Custom hook for quick access to the context
export const useSettings = (): SettingsContextType => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
