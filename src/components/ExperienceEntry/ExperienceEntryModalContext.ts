import type { EntryData } from '@components/ExperienceEntry/types';
import React, { createContext, useContext } from 'react';

type ModalContextType = {
  selectedEntry: EntryData | null;
  pageOpen: boolean;
  /** Opens an entry from its list item; the modal grows out of it. */
  openModal: (entry: EntryData, entryRef: React.RefObject<HTMLDivElement>) => void;
  closeModal: () => void;
  /** The effort shown in the open entry; null shows its overview. */
  effortId: string | null;
  setEffortId: (effortId: string | null) => void;
  /** Opens any entry on one of its efforts, from a mention anywhere. */
  openEffort: (entryId: string, effortId: string) => void;
};

export const ExperienceEntryModalContext = createContext<ModalContextType | undefined>(undefined);

export const useExperienceEntryModal = () => {
  const context = useContext(ExperienceEntryModalContext);
  if (!context) {
    throw new Error('useExperienceEntryModal must be used within ExperienceEntryModalProvider');
  }
  return context;
};
