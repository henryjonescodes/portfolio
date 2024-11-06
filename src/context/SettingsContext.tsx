import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  SetStateAction,
  Dispatch,
  useRef,
  useEffect,
} from "react";
import { useLocation } from "react-router-dom";

// TODO: Use animation disabled setting to smoothly switch between fullscreen and handheld modes

// Define the shape of the context's data
type SettingsContextType = {
  animationDisabled: boolean;
  setAnimationDisabled: Dispatch<SetStateAction<boolean>>;
  setZoomLevel: (toMode: zoomLevelType) => void;
  zoomLevel: zoomLevelType;
  toggleFullScreen: () => void;
};

// Default context value with animations enabled
const defaultSettings: SettingsContextType = {
  animationDisabled: false,
  setAnimationDisabled: () => {}, // Placeholder function; will be overwritten in provider
  setZoomLevel: (toMode: zoomLevelType) => {},
  zoomLevel: "wide",
  toggleFullScreen: () => {},
};

// Create the context with the default value
const SettingsContext = createContext<SettingsContextType>(defaultSettings);

// * * * * * * * * * * SettingsProvider * * * * * * * * * * //
type SettingsProviderProps = {
  children: ReactNode;
};

type handheldZoomType = "handheld" | "info" | "wide";
type zoomLevelType = "fullscreen" | handheldZoomType;

// Provider component
export const SettingsProvider: React.FC<SettingsProviderProps> = ({
  children,
}) => {
  // ? Get Page via React Router
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);
  const page = pathSegments[0];

  // ? Setup States
  const [zoomLevel, setZoomLevel] = useState<zoomLevelType>("wide");
  const [animationDisabled, setAnimationDisabled] = useState(
    defaultSettings.animationDisabled
  );

  // ? Setup References
  const handHeldZoomMode = useRef<handheldZoomType>("wide");

  // ? Update prevZoomMode when page updates
  useEffect(() => {
    if (!!page) {
      // Only update actual zoom when not fullscreen
      if (zoomLevel !== "fullscreen") {
        setZoomLevel("handheld");
      }
      handHeldZoomMode.current = "handheld";
    } else {
      // Only update actual zoom when not fullscreen
      if (zoomLevel !== "fullscreen") {
        setZoomLevel("wide");
      }
      handHeldZoomMode.current = "wide";
    }
  }, [page]);

  const toggleFullScreen = () => {
    if (zoomLevel !== "fullscreen") {
      setZoomLevel("fullscreen");
    } else {
      setZoomLevel(handHeldZoomMode.current);
    }
    console.log(`Toggling Fullscreen`);
  };

  useEffect(() => {
    console.log(
      `Updated zoom level: ${zoomLevel} ref: ${handHeldZoomMode.current}`
    );
  }, [zoomLevel, handHeldZoomMode.current]);

  return (
    <SettingsContext.Provider
      value={{
        animationDisabled,
        setAnimationDisabled,
        setZoomLevel,
        zoomLevel,
        toggleFullScreen,
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
