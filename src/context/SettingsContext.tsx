import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the shape of the context's data
type SettingsContextType = {
  animationDisabled: boolean;
  setAnimationDisabled: (value: boolean) => void;
};

// Default context value with animations enabled
const defaultSettings: SettingsContextType = {
  animationDisabled: false,
  setAnimationDisabled: () => {}, // Placeholder function; will be overwritten in provider
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
  // State to hold the animationDisabled setting
  const [animationDisabled, setAnimationDisabled] = useState(
    defaultSettings.animationDisabled
  );

  return (
    <SettingsContext.Provider
      value={{ animationDisabled, setAnimationDisabled }}
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
