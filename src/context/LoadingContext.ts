import React, { createContext, useContext } from 'react';

export type LoadingStates = undefined | 'loading' | 'loaded' | 'complete';

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

export const LoadingContext = createContext<LoadingContextType>(defaultLoading);

export const useLoading = (): LoadingContextType => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};
