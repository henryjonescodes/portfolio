import { ReactNode, useEffect, useMemo, useState } from 'react';
import { ControlPanelContext, type ControlPanelPage } from './ControlPanelContext';
import { useZoom } from './ZoomContext';

export const ControlPanelProvider = ({ children }: { children: ReactNode }) => {
  const [page, setPage] = useState<ControlPanelPage>('colour');
  const [open, setOpen] = useState(false);
  const { zoomLevel } = useZoom();

  // The floating panel belongs to full screen, so leaving full screen closes it.
  useEffect(() => {
    if (zoomLevel !== 'fullscreen') setOpen(false);
  }, [zoomLevel]);

  const value = useMemo(() => ({ page, setPage, open, setOpen }), [page, open]);
  return <ControlPanelContext.Provider value={value}>{children}</ControlPanelContext.Provider>;
};
