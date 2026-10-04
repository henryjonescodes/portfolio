import { createContext } from 'react';
import { locationData, LocationPinKeys } from './map-viewer.contents';

interface MapContextProps {
  currentKey: LocationPinKeys | null;
  setCurrentKey: (key: LocationPinKeys | null, isUserAction?: boolean) => void;
  previousKey: LocationPinKeys | null;
  locationData: typeof locationData;
}

const defaultMapContext: MapContextProps = {
  currentKey: null,
  setCurrentKey: () => {},
  previousKey: null,
  locationData: locationData,
};

export const MapContext = createContext<MapContextProps>(defaultMapContext);
