import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  SetStateAction,
  Dispatch,
} from "react";

// TODO: Use animation disabled setting to smoothly switch between fullscreen and handheld modes

// Define the shape of the context's data
type SettingsContextType = {
  animationDisabled: boolean;
  setAnimationDisabled: Dispatch<SetStateAction<boolean>>;
  fullScreen: boolean;
  setFullScreen: Dispatch<SetStateAction<boolean>>;
};

// Default context value with animations enabled
const defaultSettings: SettingsContextType = {
  animationDisabled: false,
  setAnimationDisabled: () => {}, // Placeholder function; will be overwritten in provider
  fullScreen: true,
  setFullScreen: () => {}, // Placeholder function; will be overwritten in provider
};

// Create the context with the default value
const SettingsContext = createContext<SettingsContextType>(defaultSettings);

// * * * * * * * * * * SettingsProvider * * * * * * * * * * //
type SettingsProviderProps = {
  children: ReactNode;
};

// Provider component
export const SettingsProvider: React.FC<SettingsProviderProps> = ({
  children,
}) => {
  const [fullScreen, setFullScreen] = useState(defaultSettings.fullScreen);
  const [animationDisabled, setAnimationDisabled] = useState(
    defaultSettings.animationDisabled
  );

  return (
    <SettingsContext.Provider
      value={{
        animationDisabled,
        setAnimationDisabled,
        fullScreen,
        setFullScreen,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

// * * * * * * * * * * useSettings Hook * * * * * * * * * * //

// Custom hook for quick access to the context
export const useSettings = (): SettingsContextType => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
};
