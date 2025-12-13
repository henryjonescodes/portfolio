import React, { createContext, useContext, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ExperienceEntry from "@components/ExperienceEntry";
import { ANIMATION_DURATIONS } from "@config/animations";
import type { EntryData } from "@components/ExperienceEntry/types";
import styles from "./experience-entry-modal.module.scss";

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
    dateString?: string
  ) => void;
  closeModal: () => void;
};

const ExperienceEntryModalContext = createContext<ModalContextType | undefined>(
  undefined
);

export const useExperienceEntryModal = () => {
  const context = useContext(ExperienceEntryModalContext);
  if (!context) {
    throw new Error("useModal must be used within ModalProvider");
  }
  return context;
};

type ExperienceEntryModalProviderProps = {
  children: React.ReactNode;
};

export const ExperienceEntryModalProvider = ({
  children,
}: ExperienceEntryModalProviderProps) => {
  const [selectedEntry, setSelectedEntry] = useState<EntryData | null>(null);
  const [entryRect, setEntryRect] = useState<DOMRect | null>(null);
  const [pageOpen, setPageOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [modalChildren, setModalChildren] = useState<React.ReactNode>(null);
  const [modalUrl, setModalUrl] = useState<string | undefined>(undefined);
  const [modalDateString, setModalDateString] = useState<string | undefined>(
    undefined
  );

  // Delay pageOpen to trigger layout animations
  useEffect(() => {
    if (selectedEntry && !isClosing) {
      setPageOpen(false);
      const timer = setTimeout(() => {
        setPageOpen(true);
      }, ANIMATION_DURATIONS.MODAL_LAYOUT_DELAY * 1000);
      return () => clearTimeout(timer);
    } else {
      setPageOpen(false);
    }
  }, [selectedEntry, isClosing]);

  const openModal = (
    entry: EntryData,
    entryRef: React.RefObject<HTMLDivElement>,
    children?: React.ReactNode,
    url?: string,
    dateString?: string
  ) => {
    const entryElement = entryRef.current;
    if (!entryElement) return;

    const rect = entryElement.getBoundingClientRect();
    setEntryRect(rect);
    setSelectedEntry(entry);
    setModalChildren(children);
    setModalUrl(url);
    setModalDateString(dateString);
    setIsClosing(false);
  };

  const closeModal = () => {
    setIsClosing(true);
    setPageOpen(false);

    // Wait for layout animation to reverse + exit animation
    const totalDuration =
      (ANIMATION_DURATIONS.MODAL_LAYOUT_DELAY +
        ANIMATION_DURATIONS.MODAL_CONTAINER) *
      1000;
    setTimeout(() => {
      setSelectedEntry(null);
      setEntryRect(null);
      setModalChildren(null);
      setModalUrl(undefined);
      setModalDateString(undefined);
      setIsClosing(false);
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
            className={styles.overlay}
            onClick={closeModal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: ANIMATION_DURATIONS.MODAL_CONTAINER }}
          >
            <div onClick={(e) => e.stopPropagation()}>
              <ExperienceEntry
                key={selectedEntry.id}
                data={selectedEntry}
                pageOpen={pageOpen}
                inList={false}
                overlayStyle={overlayStyle}
                onClose={closeModal}
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
