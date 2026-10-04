import { createContext } from 'react';

type InteractionContextType = {
  activeObject: string | null;
  setActiveObject: (objectName: string | null) => void;
};

export const InteractionContext = createContext<InteractionContextType>({
  activeObject: null,
  setActiveObject: () => {},
});
