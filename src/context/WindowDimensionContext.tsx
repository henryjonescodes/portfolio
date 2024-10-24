import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";

// Define the context type
interface WindowDimensionContextProps {
  width: number;
  height: number;
}

// Create the context with default values
const WindowDimensionContext = createContext<
  WindowDimensionContextProps | undefined
>(undefined);

// Define a provider component
export const WindowDimensionProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [screenSize, setScreenSize] = useState<WindowDimensionContextProps>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <WindowDimensionContext.Provider value={screenSize}>
      {children}
    </WindowDimensionContext.Provider>
  );
};

// Custom hook to use the screen size context
export const useWindowDimensions = (): WindowDimensionContextProps => {
  const context = useContext(WindowDimensionContext);
  if (!context) {
    return { width: 475, height: 308 };
  }
  return context;
};
