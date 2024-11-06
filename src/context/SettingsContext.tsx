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
  fullScreen: boolean;
  setFullScreen: Dispatch<SetStateAction<boolean>>;
  setZoomLevel: (toMode: zoomLevelType) => void;
  zoomLevel: zoomLevelType;
};

// Default context value with animations enabled
const defaultSettings: SettingsContextType = {
  animationDisabled: false,
  setAnimationDisabled: () => {}, // Placeholder function; will be overwritten in provider
  fullScreen: false,
  setFullScreen: () => {}, // Placeholder function; will be overwritten in provider
  setZoomLevel: (toMode: zoomLevelType) => {},
  zoomLevel: "wide",
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
  const [fullScreen, setFullScreen] = useState(defaultSettings.fullScreen);
  const [animationDisabled, setAnimationDisabled] = useState(
    defaultSettings.animationDisabled
  );

  // ? Setup References
  const prevZoomMode = useRef<zoomLevelType>("wide");

  // // ? Update prevZoomMode when page updates
  // useEffect(() => {
  //   if (!!page) {
  //     prevZoomMode.current = "handheld";
  //   } else {
  //     prevZoomMode.current = "wide";
  //   }
  //   console.log(`Updated prevZoomMode on page change: ${prevZoomMode.current}`);
  // }, [page]);

  // // ? Swap between handheld zoom modes
  // const setZoomLevel = (toLevel: handheldZoomType) => {
  //   prevZoomMode.current = zoomMode;
  //   setZoomMode(toLevel);

  //   console.log(`Updated zoomMode on zoom level change: ${zoomMode}`);
  //   console.log(
  //     `Updated prevZoomMode on zoom level change: ${prevZoomMode.current}`
  //   );
  // };

  // // ? Swap between Full Screen and Handheld modes
  // const toggleFullScreen = () => {
  //   if (zoomMode === "fullscreen") {
  //     setZoomMode(prevZoomMode.current);

  //     if(prevZoomMode.current === "wide"){
  //       prevZoomMode.current =
  //     }
  //   }
  // };

  return (
    <SettingsContext.Provider
      value={{
        animationDisabled,
        setAnimationDisabled,
        fullScreen,
        setFullScreen,
        setZoomLevel,
        zoomLevel,
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

// const setInfoMode = () => {
//   if (zoomMode === "fullscreen") {
//     return;
//   }
//   prevZoomMode.current = zoomMode;
//   setZoomMode("info");
// };

// const leaveInfoMode = () => {
//   setZoomMode(prevZoomMode.current);
//   prevZoomMode.current = "wide";
// };
// const setWideMode = () => {
//   prevZoomMode.current = "handheld";
//   setZoomMode("wide");
// };
