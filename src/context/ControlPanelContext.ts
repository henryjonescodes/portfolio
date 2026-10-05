import { createContext, useContext } from 'react';

export type ControlPanelPage = 'colour' | 'type' | 'fx';

type ControlPanelContextType = {
  page: ControlPanelPage;
  setPage: (page: ControlPanelPage) => void;
  /** Whether the floating 2D panel is open; the 3D screen is driven by the zoom level. */
  open: boolean;
  setOpen: (open: boolean) => void;
};

export const ControlPanelContext = createContext<ControlPanelContextType>({
  page: 'colour',
  setPage: () => {},
  open: false,
  setOpen: () => {},
});

export const useControlPanel = () => useContext(ControlPanelContext);
