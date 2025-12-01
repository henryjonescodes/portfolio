import { motion, LayoutGroup } from "framer-motion";
import React, { ReactNode, useEffect } from "react";
import styles from "./modal.module.scss";
import cn from "classnames";

type LayoutModalProps = {
  modalId: string;
  isExpanded: boolean;
  isFullscreen: boolean;
  overlayStyle: React.CSSProperties;
  onDismiss: () => void;
  children: ReactNode;
};

const LayoutModal = ({
  modalId,
  isExpanded,
  isFullscreen,
  overlayStyle,
  onDismiss,
  children,
}: LayoutModalProps) => {
  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isExpanded) {
        onDismiss();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isExpanded, onDismiss]);

  // Disable body scroll when modal is expanded
  useEffect(() => {
    if (isExpanded) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isExpanded]);

  // Handle click outside to dismiss
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && isExpanded) {
      onDismiss();
    }
  };

  return (
    <LayoutGroup id={modalId}>
      <motion.div
        className={cn(styles.modalOverlay, {
          [styles.modalOverlayExpanded]: isExpanded,
        })}
        style={!isExpanded ? overlayStyle : undefined}
        onClick={isExpanded ? handleBackdropClick : undefined}
      >
        <motion.div
          layout
          layoutId={modalId}
          className={cn(styles.modal, {
            [styles.modalCollapsed]: !isExpanded,
            [styles.modalExpanded]: isExpanded && !isFullscreen,
            [styles.modalFullscreen]: isExpanded && isFullscreen,
          })}
          // transition={{
          //   duration: 2.35,
          //   ease: [0.4, 0, 0.2, 1],
          // }}
          role="dialog"
          aria-modal={isExpanded}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </motion.div>
      </motion.div>
    </LayoutGroup>
  );
};

export default LayoutModal;
