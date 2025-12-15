import Loading from "@components/Loading";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { isMobile } from "react-device-detect";
import { useLocation, useNavigate } from "react-router-dom";
import { LOADING_TIMEOUTS } from "@config/new-animations";

export type LoadingStates = undefined | "loading" | "loaded" | "complete";

interface LoadingContextType {
  liteMode: boolean;
  progress: number;
  startLoading: () => void;
  finishLoading: () => void;
  loadingState: LoadingStates;
  setProgress: (value: number) => void;
  firstPageLoad: boolean;
  setFirstPageLoad: React.Dispatch<React.SetStateAction<boolean>>;
}

const defaultLoading: LoadingContextType = {
  liteMode: false,
  progress: 0,
  startLoading: () => {},
  finishLoading: () => {},
  loadingState: undefined,
  setProgress: () => {},
  firstPageLoad: true,
  setFirstPageLoad: () => {},
};

const LoadingContext = createContext<LoadingContextType>(defaultLoading);

interface LoadingProviderProps {
  children: ReactNode;
}

const LOADING_TIMEOUT_MS: number = LOADING_TIMEOUTS.AUTO_TIMEOUT_MS;
const LOADING_TIMEOUT_USER_INITIATED_MS: number = LOADING_TIMEOUTS.USER_INITIATED_TIMEOUT_MS;
export const LoadingProvider: React.FC<LoadingProviderProps> = ({
  children,
}) => {
  // ? Hooks & Ref
  const navigate = useNavigate();
  const location = useLocation();

  // ? Get initial lite mode value from url
  const searchParams = new URLSearchParams(location.search);
  const liteModeFlag = searchParams.get("lite") === "true";

  // ? Timeout timer setup
  const preventTimeout = useRef(false);
  const loadingTimerMs = useRef<number>(LOADING_TIMEOUT_MS);

  // ? Setup States
  const [liteMode, setLiteModeState] = useState<boolean>(
    liteModeFlag || isMobile
  );
  const [progress, setProgress] = useState<number>(0);
  const [loadingState, setLoadingState] = useState<LoadingStates>(
    liteMode ? undefined : "loading"
  );
  const [firstPageLoad, setFirstPageLoad] = useState<boolean>(true);

  // ? Add lite mode query param if lite mode started due to mobile device
  useEffect(() => {
    if (isMobile) {
      updateLiteModeFlag(true);
    }
  }, []);

  // ? Lite Mode Updating
  const setLiteMode = (to: boolean) => {
    updateLiteModeFlag(to);
    setLiteModeState(to);
  };

  // ? Internal
  const updateLiteModeFlag = (to: boolean) => {
    const searchParams = new URLSearchParams(location.search);
    const liteModeFlag = searchParams.get("lite");

    if (to && liteModeFlag !== "true") {
      searchParams.set("lite", "true");
      navigate({ search: searchParams.toString() });
    } else if (!to && liteModeFlag === "true") {
      searchParams.delete("lite");
      navigate({ search: searchParams.toString() });
    }
  };

  // ? Loading management functions
  const startLoading = () => {
    if (loadingState === "complete") return;
    console.log("[LoadingContext]: Started loading");
    loadingTimerMs.current = LOADING_TIMEOUT_USER_INITIATED_MS;
    preventTimeout.current = false;
    setLiteMode(false);
    setLoadingState("loading");
  };

  const finishLoading = () => {
    console.log("[LoadingContext]: Completed loading");

    setLiteMode(false);
    setLoadingState("complete");
  };

  const stopLoading = () => {
    if (loadingState === undefined) return;

    console.log("[LoadingContext]: Stopped loading");
    setLiteMode(true);
    setLoadingState(undefined);
  };

  // ? Handle loading timeout logic
  useEffect(() => {
    console.log(`[LoadingContext]: loadingState updated: ${loadingState}`);

    let loadingTimer: NodeJS.Timeout | null = null;

    // If we're loading, start a timer to cancel loading after a delay
    if (loadingState === "loading" && !preventTimeout.current) {
      loadingTimer = setTimeout(() => {
        preventTimeout.current = true;
        stopLoading();
      }, loadingTimerMs.current); // 5 seconds
    } else {
      if (loadingTimer) {
        clearTimeout(loadingTimer);
        loadingTimer = null;
      }
    }

    return () => {
      if (loadingTimer) {
        clearTimeout(loadingTimer);
      }
    };
  }, [loadingState]);

  // ? Update loading state on progress
  useEffect(() => {
    if (progress >= 100) {
      if (loadingState !== "complete") {
        console.log("[LoadingContext]: Finished loading");
        setLoadingState("loaded");
      }
    }
  }, [progress]);

  return (
    <LoadingContext.Provider
      value={{
        liteMode,
        finishLoading,
        startLoading,
        progress,
        loadingState,
        setProgress,
        firstPageLoad,
        setFirstPageLoad,
      }}
    >
      <Loading />
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = (): LoadingContextType => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};
