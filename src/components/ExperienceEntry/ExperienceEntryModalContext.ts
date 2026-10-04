import type { EntryData } from '@components/ExperienceEntry/types';
import React, { createContext, useContext } from 'react';

type ModalContextType = {
  selectedEntry: EntryData | null;
  pageOpen: boolean;
  overlayStyle: React.CSSProperties;
  modalChildren: React.ReactNode;
  modalUrl?: string;
  modalDateString?: string;
  openModal: (
    entry: EntryData,
    entryRef: React.RefObject<HTMLDivElement>,
    children?: React.ReactNode,
    url?: string,
    dateString?: string,
  ) => void;
  closeModal: () => void;
};

export const ExperienceEntryModalContext = createContext<ModalContextType | undefined>(undefined);

export const useExperienceEntryModal = () => {
  const context = useContext(ExperienceEntryModalContext);
  if (!context) {
    throw new Error('useExperienceEntryModal must be used within ExperienceEntryModalProvider');
  }
  return context;
};
