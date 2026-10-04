import {
  screenSize,
  ScreenWidthKey,
  ScreenWidthZoomPositions,
  ZoomLevel,
} from '@styles/layout.constants.ts';
import { createContext, useContext } from 'react';

// Define the context type
export type ScreenSizeType = {
  width: number;
  height: number;
};
type WindowDimensionContextProps = {
  screenWidthKey: ScreenWidthKey;
  zoomPositions: ZoomLevel;
} & ScreenSizeType;

// Create the context with default values
export const WindowDimensionContext = createContext<WindowDimensionContextProps | undefined>(
  undefined,
);

// Custom hook to use the screen size context
export const useWindowDimensions = (): WindowDimensionContextProps => {
  const context = useContext(WindowDimensionContext);
  // TODO: kill the defaults
  if (!context) {
    return {
      width: screenSize.width,
      height: screenSize.height,
      screenWidthKey: 'default',
      zoomPositions: ScreenWidthZoomPositions.default,
    };
  }
  return context;
};
