import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import LayoutModal from "@components/Modal/LayoutModal";
import { usePage } from "@components/Page";

type ModalState = {
  modalId: string | null;
  isExpanded: boolean;
  isFullscreen: boolean;
  overlayStyle: React.CSSProperties | null;
  content: React.ReactNode | null;
};

type ModalContextType = {
  modalState: ModalState;
  openModal: (
    id: string,
    content: ReactNode,
    sourceElement: HTMLElement,
    scrollParent?: HTMLElement | null
  ) => void;
  closeModal: () => void;
  toggleFullscreen: () => void;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const { pageRef } = usePage();
  const [modalState, setModalState] = useState<ModalState>({
    modalId: null,
    isExpanded: false,
    isFullscreen: false,
    overlayStyle: null,
    content: null,
  });

  const openModal = useCallback(
    (
      id: string,
      content: ReactNode,
      sourceElement: HTMLElement,
      scrollParent?: HTMLElement | null
    ) => {
      // Stage 1: Calculate position (0ms)
      const sourceRect = sourceElement.getBoundingClientRect();
      const containerRect = pageRef.current?.getBoundingClientRect();

      let overlayStyle: React.CSSProperties;

      if (containerRect) {
        // Convert viewport coordinates to container-relative coordinates
        const scrollTop = scrollParent?.scrollTop || 0;
        const scrollLeft = scrollParent?.scrollLeft || 0;

        overlayStyle = {
          top: sourceRect.top - containerRect.top + scrollTop,
          left: sourceRect.left - containerRect.left + scrollLeft,
          width: sourceRect.width,
          height: sourceRect.height,
          position: "absolute" as const,
        };
      } else {
        // Fallback: use viewport coordinates if container not available
        overlayStyle = {
          top: sourceRect.top,
          left: sourceRect.left,
          width: sourceRect.width,
          height: sourceRect.height,
          position: "absolute" as const,
        };
      }

      // Set initial state with collapsed modal
      setModalState({
        modalId: id,
        isExpanded: false,
        isFullscreen: false,
        overlayStyle,
        content,
      });

      // Stage 2: Expand after 10ms delay (critical for animation)
      setTimeout(() => {
        setModalState((prev) => ({
          ...prev,
          isExpanded: true,
        }));
      }, 10);
    },
    [pageRef]
  );

  const closeModal = useCallback(() => {
    // Collapse modal
    setModalState((prev) => ({
      ...prev,
      isExpanded: false,
    }));

    // Clear modal state after animation completes (350ms + 100ms buffer)
    setTimeout(() => {
      setModalState({
        modalId: null,
        isExpanded: false,
        isFullscreen: false,
        overlayStyle: null,
        content: null,
      });
    }, 450);
  }, []);

  const toggleFullscreen = useCallback(() => {
    setModalState((prev) => ({
      ...prev,
      isFullscreen: !prev.isFullscreen,
    }));
  }, []);

  return (
    <ModalContext.Provider value={{ modalState, openModal, closeModal, toggleFullscreen }}>
      {children}
      {modalState.modalId && modalState.overlayStyle && (
        <LayoutModal
          modalId={modalState.modalId}
          isExpanded={modalState.isExpanded}
          isFullscreen={modalState.isFullscreen}
          overlayStyle={modalState.overlayStyle}
          onDismiss={closeModal}
        >
          {modalState.content}
        </LayoutModal>
      )}
    </ModalContext.Provider>
  );
};
