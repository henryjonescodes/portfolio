import { ReactNode } from 'react';
import { PageContext } from './PageContext';

export const PageProvider = ({
  children,
  embedded,
}: {
  children: ReactNode;
  embedded?: boolean;
}) => {
  return <PageContext.Provider value={{ embedded }}>{children}</PageContext.Provider>;
};
