import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import LayoutModal from "@components/Modal/LayoutModal";

type ModalState = {
  modalId: string | null;
  isExpanded: boolean;
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
  const [modalState, setModalState] = useState<ModalState>({
    modalId: null,
    isExpanded: false,
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
      const rect = sourceElement.getBoundingClientRect();

      let overlayStyle: React.CSSProperties;

      if (scrollParent) {
        const parentRect = scrollParent.getBoundingClientRect();
        overlayStyle = {
          top: rect.top - parentRect.top + scrollParent.scrollTop,
          left: rect.left - parentRect.left + scrollParent.scrollLeft,
          width: rect.width,
          height: rect.height,
          position: "absolute" as const,
        };
      } else {
        overlayStyle = {
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height,
          position: "fixed" as const,
        };
      }

      // Set initial state with collapsed modal
      setModalState({
        modalId: id,
        isExpanded: false,
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
    []
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
        overlayStyle: null,
        content: null,
      });
    }, 450);
  }, []);

  return (
    <ModalContext.Provider value={{ modalState, openModal, closeModal }}>
      {children}
      {modalState.modalId && modalState.overlayStyle && (
        <LayoutModal
          modalId={modalState.modalId}
          isExpanded={modalState.isExpanded}
          overlayStyle={modalState.overlayStyle}
          onDismiss={closeModal}
        >
          {modalState.content}
        </LayoutModal>
      )}
    </ModalContext.Provider>
  );
};
