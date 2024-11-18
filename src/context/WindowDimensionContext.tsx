import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
  useMemo,
} from "react";
import {
  screenSize,
  screenWidths,
  ScreenWidthKey,
  ScreenWidthZoomPositions,
  ZoomLevel,
} from "@styles/layout.constants.ts";
import { useSettings } from "./SettingsContext";

// Define the context type
type ScreenSizeType = {
  width: number;
  height: number;
};
type WindowDimensionContextProps = {
  screenWidthKey: ScreenWidthKey;
  zoomPositions: ZoomLevel;
} & ScreenSizeType;

// Create the context with default values
const WindowDimensionContext = createContext<
  WindowDimensionContextProps | undefined
>(undefined);

// Define a provider component
export const WindowDimensionProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { isDebugMode } = useSettings();
  const [screenSize, setScreenSize] = useState<ScreenSizeType>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const screenWidthKey: ScreenWidthKey = useMemo(() => {
    if (screenSize.width > 3000) {
      return "extraLarge";
    }
    if (screenSize.width > screenWidths.large) {
      return "large";
    }
    if (screenSize.width > screenWidths.default) {
      return "default";
    }
    if (screenSize.width > screenWidths.compact) {
      return "compact";
    }
    if (screenSize.width > screenWidths.medium) {
      return "medium";
    }
    if (screenSize.width > screenWidths.small) {
      return "small";
    }
    if (screenSize.width > screenWidths.mobile) {
      return "mobile";
    }
    return "tiny";
  }, [screenSize.width]);

  const zoomPositions = useMemo(() => {
    const getZoomPositions = (key: ScreenWidthKey) => {
      if (isDebugMode) {
        console.log(
          `[WindowDimensionContext]: Zoom level updated on key change: ${key}`
        );
      }
      switch (key) {
        case "extraLarge":
          return ScreenWidthZoomPositions.extraLarge;
        case "large":
          return ScreenWidthZoomPositions.large;
        case "default":
          return ScreenWidthZoomPositions.default;
        case "compact":
          return ScreenWidthZoomPositions.compact;
        case "medium":
          return ScreenWidthZoomPositions.medium;
        case "small":
          return ScreenWidthZoomPositions.small;
        case "mobile":
          return ScreenWidthZoomPositions.mobile;
        default:
          return ScreenWidthZoomPositions.tiny;
      }
    };

    return getZoomPositions(screenWidthKey);
  }, [screenWidthKey]);

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <WindowDimensionContext.Provider
      value={{ ...screenSize, screenWidthKey, zoomPositions }}
    >
      {children}
    </WindowDimensionContext.Provider>
  );
};

// Custom hook to use the screen size context
export const useWindowDimensions = (): WindowDimensionContextProps => {
  const context = useContext(WindowDimensionContext);
  // TODO: kill the defaults
  if (!context) {
    return {
      width: screenSize.height,
      height: screenSize.width,
      screenWidthKey: "default",
      zoomPositions: ScreenWidthZoomPositions.default,
    };
  }
  return context;
};
