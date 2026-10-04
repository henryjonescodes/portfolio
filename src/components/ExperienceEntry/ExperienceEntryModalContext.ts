import type { EntryData } from '@components/ExperienceEntry/types';
import React, { createContext, useContext } from 'react';

export type Point = { x: number; y: number };

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
   * Opens any entry by id, optionally on one of its efforts, from a link anywhere. With an
   * origin (viewport point, usually the link's centre) the window zooms out of it.
   */
  openEntry: (entryId: string, effortId?: string | null, origin?: Point) => void;
};

export const ExperienceEntryModalContext = createContext<ModalContextType | undefined>(undefined);

export const useExperienceEntryModal = () => {
  const context = useContext(ExperienceEntryModalContext);
  if (!context) {
    throw new Error('useExperienceEntryModal must be used within ExperienceEntryModalProvider');
  }
  return context;
};
