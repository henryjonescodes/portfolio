import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';

import { useAnimations } from '@context/AnimationContext';
import { useControlPanel } from '@context/ControlPanelContext';
import ControlPanel from './index';
import styles from './floating.module.scss';

/** The panel as a small window for full screen and lite mode; closes on Escape. */
const FloatingControlPanel = () => {
  const { open, setOpen } = useControlPanel();
  const { TRANSITIONS } = useAnimations();

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, setOpen]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className={styles.floating}
          role="dialog"
          aria-label="Control panel"
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
