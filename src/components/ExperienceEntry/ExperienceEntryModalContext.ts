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
  /**
   * Opens any entry by id, optionally on one of its efforts. Given the element that was
   * clicked, the window grows out of it and shrinks back into it.
   */
  openEntry: (entryId: string, effortId?: string | null, source?: HTMLElement) => void;
  /** The element the open window grew from, which stays hidden while it is open. */
  source: HTMLElement | null;
};

export const ExperienceEntryModalContext = createContext<ModalContextType | undefined>(undefined);

export const useExperienceEntryModal = () => {
  const context = useContext(ExperienceEntryModalContext);
  if (!context) {
    throw new Error('useExperienceEntryModal must be used within ExperienceEntryModalProvider');
  }
  return context;
};
