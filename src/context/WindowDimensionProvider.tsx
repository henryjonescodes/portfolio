import {
  ScreenWidthKey,
  ScreenWidthZoomPositions,
  screenWidths,
} from '@styles/layout.constants.ts';
import { debugLog } from '@utils/debug';
import React, { ReactNode, useEffect, useMemo, useState } from 'react';
import { ScreenSizeType, WindowDimensionContext } from './WindowDimensionContext';

// Define a provider component
export const WindowDimensionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [viewport, setViewport] = useState<ScreenSizeType>({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [phoneStage, setPhoneStage] = useState(false);

  // An upright phone turns the 3D stage sideways, so everything inside it sees landscape.
  const stageRotated = phoneStage && viewport.height > viewport.width;
  const screenSize = useMemo<ScreenSizeType>(
    () => (stageRotated ? { width: viewport.height, height: viewport.width } : viewport),
    [stageRotated, viewport],
  );

  const screenWidthKey: ScreenWidthKey = useMemo(() => {
    if (screenSize.width > 3000) {
      return 'extraLarge';
    }
    if (screenSize.width > screenWidths.large) {
      return 'large';
    }
    if (screenSize.width > screenWidths.default) {
      return 'default';
    }
    if (screenSize.width > screenWidths.compact) {
      return 'compact';
    }
    if (screenSize.width > screenWidths.medium) {
      return 'medium';
    }
    if (screenSize.width > screenWidths.small) {
      return 'small';
    }
    if (screenSize.width > screenWidths.mobile) {
      return 'mobile';
    }
    return 'tiny';
  }, [screenSize.width]);

  const zoomPositions = useMemo(() => {
    const getZoomPositions = (key: ScreenWidthKey) => {
      debugLog('WindowDimensionContext', `zoom positions for ${key}`);
      switch (key) {
        case 'extraLarge':
          return ScreenWidthZoomPositions.extraLarge;
        case 'large':
          return ScreenWidthZoomPositions.large;
        case 'default':
          return ScreenWidthZoomPositions.default;
        case 'compact':
          return ScreenWidthZoomPositions.compact;
        case 'medium':
          return ScreenWidthZoomPositions.medium;
        case 'small':
          return ScreenWidthZoomPositions.small;
        case 'mobile':
          return ScreenWidthZoomPositions.mobile;
        default:
          return ScreenWidthZoomPositions.tiny;
      }
    };

    return getZoomPositions(screenWidthKey);
  }, [screenWidthKey]);

  useEffect(() => {
    const handleResize = () => {
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <WindowDimensionContext.Provider
      value={{ ...screenSize, screenWidthKey, zoomPositions, stageRotated, setPhoneStage }}
    >
      {children}
    </WindowDimensionContext.Provider>
  );
};
