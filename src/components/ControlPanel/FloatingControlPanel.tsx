import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

import { useAnimations } from '@context/AnimationContext';
import { useControlPanel } from '@context/ControlPanelContext';
import { trapFocus } from '@utils/focus';
import ControlPanel from './index';
import styles from './floating.module.scss';

/**
 * The panel as a small modal window for full screen and lite mode. Focus moves in on open,
 * stays inside, and returns to whatever opened it; Escape inside it closes it.
 */
const FloatingControlPanel = () => {
  const { open, setOpen } = useControlPanel();
  const { TRANSITIONS } = useAnimations();
  const dialog = useRef<HTMLDivElement>(null);
  const opener = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    opener.current = document.activeElement as HTMLElement | null;
    const tab = dialog.current?.querySelector<HTMLElement>('[role="tab"][tabindex="0"]');
    (tab ?? dialog.current)?.focus();
    return () => {
      // The opener is gone when the panel closes because full screen ended.
      if (opener.current?.isConnected) opener.current.focus();
    };
  }, [open, setOpen]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={dialog}
          className={styles.floating}
          role="dialog"
          aria-modal="true"
          aria-label="Control panel"
          tabIndex={-1}
          // Only while focus is inside, so Escape in another open window closes just that one.
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              e.stopPropagation();
              setOpen(false);
            } else trapFocus(e);
          }}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0, transition: TRANSITIONS.MODAL.CONTENT_ANIMATE }}
          exit={{ opacity: 0, y: -8, transition: TRANSITIONS.MODAL.CONTENT_ANIMATE }}
        >
          <ControlPanel onClose={() => setOpen(false)} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingControlPanel;
