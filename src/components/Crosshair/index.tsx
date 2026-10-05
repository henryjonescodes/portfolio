import cn from 'classnames';
import { motion } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
import styles from './crosshair.module.scss';
import { useFinePointer, usePointer } from './usePointer';

const INTERACTIVE =
  'a, button, [role="button"], [role="link"], [role="tab"], input, select, textarea';

/**
 * Dashed guide lines that run from the pointer to every edge. Mount it between a page's
 * background and its content so the lines sit behind the content.
 */
export const CrosshairGuides = () => {
  const fine = useFinePointer();
  const { x, y, inside } = usePointer();
  if (!fine) return null;
  return (
    <div className={cn(styles.guides, { [styles.hidden]: !inside })} aria-hidden>
      <motion.div className={styles.horizontal} style={{ y }} />
      <motion.div className={styles.vertical} style={{ x }} />
    </div>
  );
};

/**
 * The pointer itself: a small crosshair on top of everything, inverted against what is under
 * it, that opens up over anything clickable. Replaces the system cursor on fine pointers.
 */
export const CrosshairMark = () => {
  const fine = useFinePointer();
  const [over, setOver] = useState(false);
  const overRef = useRef(false);
  const onMove = useCallback((e: PointerEvent) => {
    const next = !!(e.target as Element | null)?.closest?.(INTERACTIVE);
    if (next === overRef.current) return;
    overRef.current = next;
    setOver(next);
  }, []);
  const { x, y, inside } = usePointer(onMove);

  // The system cursor hides only while the crosshair is tracking the pointer, so a page loaded
  // under a still mouse keeps a visible cursor until it moves.
  useEffect(() => {
    if (!fine || !inside) return;
    document.documentElement.classList.add(styles.noCursor);
    return () => document.documentElement.classList.remove(styles.noCursor);
  }, [fine, inside]);

  if (!fine) return null;
  return (
    <motion.div
      className={cn(styles.mark, { [styles.hidden]: !inside, [styles.over]: over })}
      style={{ x, y }}
      aria-hidden
    >
      <span className={styles.arm} />
      <span className={styles.arm} />
      <span className={styles.arm} />
      <span className={styles.arm} />
    </motion.div>
  );
};
