import React, { createContext, useContext } from 'react';

export type handheldZoomType = 'handheld' | 'info' | 'wide';
export type zoomLevelType = 'fullscreen' | handheldZoomType;

interface ZoomContextType {
  zoomLevel: zoomLevelType;
  setZoomLevel: React.Dispatch<React.SetStateAction<zoomLevelType>>;
  handHeldZoomLevel: React.MutableRefObject<handheldZoomType>;
  toggleFullscreenZoomPosition: () => void;
  toggleInfoModeZoomPosition: () => void;
}

export const ZoomContext = createContext<ZoomContextType | undefined>(undefined);

export const useZoom = (): ZoomContextType => {
  const context = useContext(ZoomContext);
  if (!context) {
    throw new Error('useZoom must be used within a ZoomProvider');
  }
  return context;
};
