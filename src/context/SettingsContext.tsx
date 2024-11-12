import { Leva } from "leva";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { isMobile } from "react-device-detect";

type SettingsContextType = {
  // ? Animation
  animationDisabled: boolean;
  setAnimationDisabled: (value: boolean, userInitiated?: boolean) => void;

  // ? Zoom Level
  zoomLevel: zoomLevelType;
  setZoomLevel: React.Dispatch<React.SetStateAction<zoomLevelType>>;
  toggleFullScreen: () => void;
  toggleInfoMode: () => void;

  // ? Lite mode
  liteMode: boolean | undefined;

  // ? Debug mode
  isDebugMode: boolean;
  toggleDebugMode: () => void;

  // ? Loading
  loadingState: LoadingStates;
  setLoadingState: React.Dispatch<React.SetStateAction<LoadingStates>>;
};

const defaultSettings: SettingsContextType = {
  // ? Animation
  animationDisabled: false,
  setAnimationDisabled: () => {},

  // ? Zoom Level
  zoomLevel: "fullscreen",
  setZoomLevel: () => {},
  toggleInfoMode: () => {},
  toggleFullScreen: () => {},

  // ? Lite mode
  liteMode: undefined,

  // ? Debug mode
  isDebugMode: false,
  toggleDebugMode: () => {},

  // ? Loading
  loadingState: "loading",
  setLoadingState: () => {},
};

const SettingsContext = createContext<SettingsContextType>(defaultSettings);

// * * * * * * * * * * SettingsProvider * * * * * * * * * * //

type SettingsProviderProps = {
  children: ReactNode;
};
type LoadingStates = undefined | "loading" | "loaded" | "complete";

type handheldZoomType = "handheld" | "info" | "wide";
type zoomLevelType = "fullscreen" | handheldZoomType;

// Provider component
export const SettingsProvider: React.FC<SettingsProviderProps> = ({
  children,
}) => {
  // ? Get Page via React Router
  const navigate = useNavigate();
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);
  const page = pathSegments[0];

  // ? Parse query parameters
  const searchParams = new URLSearchParams(location.search);

  const isDebugMode = searchParams.get("debug") === "true";
  const isLiteModeParam = searchParams.get("lite") === "true";

  // ? Setup States
  const [liteMode, setLiteMode] = useState(isLiteModeParam || isMobile);
  const [loadingState, setLoadingState] = useState<LoadingStates>(
    liteMode ? undefined : "loading"
  );
  const [zoomLevel, setZoomLevel] = useState<zoomLevelType>(
    liteMode ? "fullscreen" : "wide"
  );
  const [lockAnimationReEnable, setLockAnimationReEnable] = useState(false);
  const [animationDisabled, setAnimationDisabledInternal] = useState(
    defaultSettings.animationDisabled
  );

  // ? Setup References
  const handHeldZoomLevel = useRef<handheldZoomType>("wide");

  // ? Set lite mode param on initial mobile load
  useEffect(() => {
    if (isMobile) {
      searchParams.set("lite", "true");
      navigate({ search: searchParams.toString() });
    }
  }, []);

  // ? Update prevZoomMode when page updates
  useEffect(() => {
    if (!!page) {
      // Only update actual zoom when not fullscreen
      if (zoomLevel !== "fullscreen") {
        setZoomLevel("handheld");
      }
      handHeldZoomLevel.current = "handheld";
    } else {
      // Only update actual zoom when not fullscreen
      if (zoomLevel !== "fullscreen") {
        setZoomLevel("wide");
      }
      handHeldZoomLevel.current = "wide";
    }
  }, [page]);

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

  // ? Handles toggling to and from fullscreen with a special case for litemode
  const toggleFullScreen = () => {
    setAnimationDisabled(true, false);

    if (zoomLevel !== "fullscreen") {
      setZoomLevel("fullscreen");
    } else {
      if (liteMode) {
        const searchParams = new URLSearchParams(location.search);
        searchParams.delete("lite");
        setLoadingState("loading");
        navigate({ search: searchParams.toString() });
        setLiteMode(false);
      }
      setZoomLevel(handHeldZoomLevel.current);
    }

    setTimeout(() => {
      setAnimationDisabled(false, false);
    }, 500);
  };

  const toggleInfoMode = () => {
    if (zoomLevel === "fullscreen") {
      return;
    }

    if (zoomLevel === "info") {
      setZoomLevel(handHeldZoomLevel.current);
    } else {
      handHeldZoomLevel.current = zoomLevel;
      setZoomLevel("info");
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

  useEffect(() => {
    if (!isDebugMode) return;
    console.log(
      `[SettingsContext]: Zoom level updated: ${zoomLevel} ref: ${handHeldZoomLevel.current}`
    );
  }, [zoomLevel]);

  useEffect(() => {
    if (!isDebugMode) return;
    console.log(`[SettingsContext]: loadingState updated: ${loadingState}`);
  }, [loadingState]);

  return (
    <SettingsContext.Provider
      value={{
        loadingState,
        setLoadingState,
        liteMode,
        toggleDebugMode,
        isDebugMode,
        animationDisabled,
        setAnimationDisabled,
        setZoomLevel,
        zoomLevel,
        toggleFullScreen,
        toggleInfoMode,
      }}
    >
      <Leva collapsed hidden={!isDebugMode} />
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
