import ExperienceEntry from '@components/ExperienceEntry';
import type { EntryData } from '@components/ExperienceEntry/types';
import { useAnimations } from '@context/AnimationContext';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import styles from './experience-entry-modal.module.scss';
import { ExperienceEntryModalContext } from './ExperienceEntryModalContext';

type ExperienceEntryModalProviderProps = {
  children: React.ReactNode;
};

export const ExperienceEntryModalProvider = ({ children }: ExperienceEntryModalProviderProps) => {
  const { TRANSITIONS } = useAnimations();
  const [selectedEntry, setSelectedEntry] = useState<EntryData | null>(null);
  const [entryRect, setEntryRect] = useState<DOMRect | null>(null);
  const [pageOpen, setPageOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [modalChildren, setModalChildren] = useState<React.ReactNode>(null);
  const [modalUrl, setModalUrl] = useState<string | undefined>(undefined);
  const [modalDateString, setModalDateString] = useState<string | undefined>(undefined);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => () => clearTimeout(closeTimer.current), []);

  useEffect(() => {
    if (!selectedEntry || isClosing) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && closeModal();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  useEffect(() => {
    setPageOpen(selectedEntry != null && !isClosing);
  }, [selectedEntry, isClosing]);

  const openModal = (
    entry: EntryData,
    entryRef: React.RefObject<HTMLDivElement>,
    children?: React.ReactNode,
    url?: string,
    dateString?: string,
  ) => {
    const entryElement = entryRef.current;
    if (!entryElement) return;
    clearTimeout(closeTimer.current);

    const rect = entryElement.getBoundingClientRect();
    setEntryRect(rect);
    setSelectedEntry(entry);
    setModalChildren(children);
    setModalUrl(url);
    setModalDateString(dateString);
    setIsClosing(false);
    setExpanded(false);
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
      setModalChildren(null);
      setModalUrl(undefined);
      setModalDateString(undefined);
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
        modalChildren,
        modalUrl,
        modalDateString,
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
            <div
              className={expanded ? styles.dialogExpanded : styles.dialog}
              role="dialog"
              aria-modal="true"
              aria-label={selectedEntry.title}
              onClick={(e) => e.stopPropagation()}
            >
              <ExperienceEntry
                key={selectedEntry.id}
                data={selectedEntry}
                pageOpen={pageOpen}
                inList={false}
                overlayStyle={overlayStyle}
                onClose={closeModal}
                expanded={expanded}
                onToggleExpand={() => setExpanded((e) => !e)}
                url={modalUrl}
                dateString={modalDateString}
              >
                {modalChildren}
              </ExperienceEntry>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </ExperienceEntryModalContext.Provider>
  );
};
