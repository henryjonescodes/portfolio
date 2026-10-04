import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ExperienceEntry from '@components/ExperienceEntry';
import { useAnimations } from '@context/AnimationContext';
import type { EntryData } from '@components/ExperienceEntry/types';
import styles from './experience-entry-modal.module.scss';

type ModalContextType = {
  selectedEntry: EntryData | null;
  pageOpen: boolean;
  overlayStyle: React.CSSProperties;
  openModal: (entry: EntryData, entryRef: React.RefObject<HTMLDivElement>) => void;
  closeModal: () => void;
};

const ExperienceEntryModalContext = createContext<ModalContextType | undefined>(undefined);

export const useExperienceEntryModal = () => {
  const context = useContext(ExperienceEntryModalContext);
  if (!context) {
    throw new Error('useExperienceEntryModal must be used within ExperienceEntryModalProvider');
  }
  return context;
};

type ExperienceEntryModalProviderProps = {
  children: React.ReactNode;
};

export const ExperienceEntryModalProvider = ({ children }: ExperienceEntryModalProviderProps) => {
  const { TRANSITIONS } = useAnimations();
  const [selectedEntry, setSelectedEntry] = useState<EntryData | null>(null);
  const [entryRect, setEntryRect] = useState<DOMRect | null>(null);
  const [pageOpen, setPageOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => () => clearTimeout(closeTimer.current), []);

  useEffect(() => {
    setPageOpen(selectedEntry != null && !isClosing);
  }, [selectedEntry, isClosing]);

  const openModal = (entry: EntryData, entryRef: React.RefObject<HTMLDivElement>) => {
    const entryElement = entryRef.current;
    if (!entryElement) return;
    clearTimeout(closeTimer.current);

    const rect = entryElement.getBoundingClientRect();
    setEntryRect(rect);
    setSelectedEntry(entry);
    setIsClosing(false);
  };

  const closeModal = () => {
    setIsClosing(true);
    setPageOpen(false);

    // Unmount once the layout morph back to the list has finished. isClosing stays
    // true so the fading overlay never blocks clicks while its children finish exiting.
    const totalDuration = (TRANSITIONS.MODAL.CONTAINER_ANIMATE.duration || 0) * 1000;
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => {
      setSelectedEntry(null);
      setEntryRect(null);
    }, totalDuration);
  };

  const overlayStyle = entryRect
    ? {
        width: entryRect.width,
        height: entryRect.height,
      }
    : {};

  return (
    <ExperienceEntryModalContext.Provider
      value={{
        selectedEntry,
        openModal,
        closeModal,
        pageOpen,
        overlayStyle,
      }}
    >
      {children}

      {/* Modal overlay rendered as sibling to page content */}
      <AnimatePresence>
        {selectedEntry && (
          <motion.div
            key="modal-overlay"
            data-testid="modal-overlay"
            className={styles.overlay}
            style={{ pointerEvents: isClosing ? 'none' : 'auto' }}
            onClick={closeModal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={TRANSITIONS.MODAL.CONTAINER_ANIMATE}
          >
            <div onClick={(e) => e.stopPropagation()}>
              <ExperienceEntry
                key={selectedEntry.id}
                data={selectedEntry}
                pageOpen={pageOpen}
                inList={false}
                overlayStyle={overlayStyle}
                onClose={closeModal}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </ExperienceEntryModalContext.Provider>
  );
};
