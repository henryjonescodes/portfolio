import { ReactNode, useMemo, useState } from 'react';
import { ControlPanelContext, type ControlPanelPage } from './ControlPanelContext';

export const ControlPanelProvider = ({ children }: { children: ReactNode }) => {
  const [page, setPage] = useState<ControlPanelPage>('colour');
  const [open, setOpen] = useState(false);
  const value = useMemo(() => ({ page, setPage, open, setOpen }), [page, open]);
  return <ControlPanelContext.Provider value={value}>{children}</ControlPanelContext.Provider>;
};
