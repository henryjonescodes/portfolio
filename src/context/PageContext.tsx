import { createContext, ReactNode, useContext } from "react";

interface PageContextType {
  embedded?: boolean;
}

const PageContext = createContext<PageContextType | undefined>(undefined);

export const PageProvider = ({
  children,
  embedded,
}: {
  children: ReactNode;
  embedded?: boolean;
}) => {
  return (
    <PageContext.Provider value={{ embedded }}>{children}</PageContext.Provider>
  );
};

export const usePage = () => {
  const context = useContext(PageContext);
  if (context === undefined) {
    throw new Error("usePage must be used within an PageProvider");
  }
  return context;
};
