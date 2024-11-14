// ZoomContext.tsx
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useLocation } from "react-router-dom";
import { useLoading } from "./LoadingContext";
import { useSettings } from "./SettingsContext";

export type handheldZoomType = "handheld" | "info" | "wide";
export type zoomLevelType = "fullscreen" | handheldZoomType;

interface ZoomContextType {
  zoomLevel: zoomLevelType;
  setZoomLevel: React.Dispatch<React.SetStateAction<zoomLevelType>>;
  handHeldZoomLevel: React.MutableRefObject<handheldZoomType>;
  toggleFullscreenZoomPosition: () => void;
  toggleInfoModeZoomPosition: () => void;
}

const ZoomContext = createContext<ZoomContextType | undefined>(undefined);

interface ZoomProviderProps {
  children: ReactNode;
}

export const ZoomProvider: React.FC<ZoomProviderProps> = ({ children }) => {
  const { liteMode, startLoading } = useLoading();
  const { setAnimationDisabled, isDebugMode } = useSettings();
  const location = useLocation();

  const [zoomLevel, setZoomLevel] = useState<zoomLevelType>(
    liteMode ? "fullscreen" : "wide"
  );
  const handHeldZoomLevel = useRef<handheldZoomType>("wide");

  const pathSegments = location.pathname.split("/").filter(Boolean);
  const page = pathSegments[0];

  // ? Update zoomLevel when liteMode changes
  useEffect(() => {
    if (liteMode) {
      setZoomLevel("fullscreen");
    }
  }, [liteMode]);

  // ? Update zoomLevel based on page changes
  useEffect(() => {
    if (page) {
      if (zoomLevel !== "fullscreen") {
        setZoomLevel("handheld");
      }
      handHeldZoomLevel.current = "handheld";
    } else {
      if (zoomLevel !== "fullscreen") {
        setZoomLevel("wide");
      }
      handHeldZoomLevel.current = "wide";
    }
  }, [page]);

  const toggleInfoModeZoomPosition = () => {
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

  const toggleFullscreenZoomPosition = () => {
    setAnimationDisabled(true, false);

    if (zoomLevel !== "fullscreen") {
      setZoomLevel("fullscreen");
    } else {
      startLoading();
      setZoomLevel(handHeldZoomLevel.current);
    }

    setTimeout(() => {
      setAnimationDisabled(false, false);
    }, 500);
  };

  useEffect(() => {
    if (!isDebugMode) return;
    console.log(
      `[ZoomContext]: Zoom level updated: ${zoomLevel} ref: ${handHeldZoomLevel.current}`
    );
  }, [zoomLevel]);

  return (
    <ZoomContext.Provider
      value={{
        zoomLevel,
        setZoomLevel,
        handHeldZoomLevel,
        toggleFullscreenZoomPosition,
        toggleInfoModeZoomPosition,
      }}
    >
      {children}
    </ZoomContext.Provider>
  );
};

export const useZoom = (): ZoomContextType => {
  const context = useContext(ZoomContext);
  if (!context) {
    throw new Error("useZoom must be used within a ZoomProvider");
  }
  return context;
};
