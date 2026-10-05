import { useMotionValue } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const FINE = '(hover: hover) and (pointer: fine)';

/** Whether the device has a mouse or trackpad; touch screens keep their own behaviour. */
export function useFinePointer() {
  const [fine, setFine] = useState(() => window.matchMedia(FINE).matches);
  useEffect(() => {
    const query = window.matchMedia(FINE);
    const onChange = () => setFine(query.matches);
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);
  return fine;
}

/** The pointer's viewport position as motion values, and whether it is over the window. */
export function usePointer(onMove?: (e: PointerEvent) => void) {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const [inside, setInside] = useState(false);
  const insideRef = useRef(false);
  useEffect(() => {
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!insideRef.current) {
        insideRef.current = true;
        setInside(true);
      }
      onMove?.(e);
    };
    const leave = (e: MouseEvent) => {
      if (e.relatedTarget) return;
      insideRef.current = false;
      setInside(false);
    };
    // Chrome's raw updates arrive before the frame's coalesced pointermove, so the mark lags less.
    const event = 'onpointerrawupdate' in window ? 'pointerrawupdate' : 'pointermove';
    window.addEventListener(event, move as EventListener);
    document.addEventListener('mouseout', leave);
    return () => {
      window.removeEventListener(event, move as EventListener);
      document.removeEventListener('mouseout', leave);
    };
  }, [x, y, onMove]);
  return { x, y, inside };
}
