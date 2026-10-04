import { createContext, useContext } from 'react';

interface PageContextType {
  embedded?: boolean;
}

export const PageContext = createContext<PageContextType | undefined>(undefined);

export const usePage = () => {
  const context = useContext(PageContext);
  if (context === undefined) {
    throw new Error('usePage must be used within an PageProvider');
  }
  return context;
};
