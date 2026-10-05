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
  /** True while an upright phone shows the 3D stage turned to landscape; width and height are the stage's. */
  stageRotated: boolean;
  /** Whether the 3D stage is showing on a phone, which turns it to landscape when upright. */
  setPhoneStage: (showing: boolean) => void;
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
      stageRotated: false,
      setPhoneStage: () => {},
    };
  }
  return context;
};
