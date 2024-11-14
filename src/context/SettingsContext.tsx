import { folder, Leva, useControls } from "leva";
import React, { createContext, ReactNode, useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

type SettingsContextType = {
  // ? Animation
  animationDisabled: boolean;
  setAnimationDisabled: (value: boolean, userInitiated?: boolean) => void;

  // ? Debug mode
  isDebugMode: boolean;
  toggleDebugMode: () => void;

  // ? 3D Controls
  useOrbitControls: boolean;
};

const defaultSettings: SettingsContextType = {
  // ? Animation
  animationDisabled: false,
  setAnimationDisabled: () => {},

  // ? Debug mode
  isDebugMode: false,
  toggleDebugMode: () => {},

  // ? 3D Controls
  useOrbitControls: false,
};

const SettingsContext = createContext<SettingsContextType>(defaultSettings);

// * * * * * * * * * * SettingsProvider * * * * * * * * * * //

type SettingsProviderProps = {
  children: ReactNode;
};

// Provider component
export const SettingsProvider: React.FC<SettingsProviderProps> = ({
  children,
}) => {
  // ? Get Page via React Router
  const navigate = useNavigate();
  const location = useLocation();

  // ? Parse query parameters
  const searchParams = new URLSearchParams(location.search);
  const isDebugMode = searchParams.get("debug") === "true";

  // ? Setup States
  const [lockAnimationReEnable, setLockAnimationReEnable] = useState(false);
  const [animationDisabled, setAnimationDisabledInternal] = useState(
    defaultSettings.animationDisabled
  );

  // ? Leva Controls
  const { useOrbitControls } = useControls({
    Controls: folder(
      {
        useOrbitControls: false,
      },
      { collapsed: true }
    ),
  });

  // ?? Manages animation disabled setting/state changes
  const setAnimationDisabled = (value: boolean, userInitiated?: boolean) => {
    if (value === true) {
      if (userInitiated) {
        setLockAnimationReEnable(true);
      }
      setAnimationDisabledInternal(true);
    } else {
      if (userInitiated) {
        setLockAnimationReEnable(false);
        setAnimationDisabledInternal(false);
      } else if (!lockAnimationReEnable) {
        setAnimationDisabledInternal(false);
      }
    }
  };

  const toggleDebugMode = () => {
    const searchParams = new URLSearchParams(location.search);
    if (isDebugMode) {
      searchParams.delete("debug");
    } else {
      searchParams.set("debug", "true");
    }
    navigate({ search: searchParams.toString() });
  };

  return (
    <SettingsContext.Provider
      value={{
        useOrbitControls,
        toggleDebugMode,
        isDebugMode,
        animationDisabled,
        setAnimationDisabled,
      }}
    >
      <Leva collapsed hidden={!isDebugMode} oneLineLabels={true} />
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
