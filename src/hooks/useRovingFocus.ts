import { useRef, type KeyboardEvent } from 'react';

const STEPS: Record<string, number> = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };

/**
 * Arrow keys move selection and focus along a row of tabs or radios, wrapping at the ends.
 * Give each item `itemRef(i)` and `onKeyDown(e, i)`, and tabIndex 0 only on the selected one.
 */
export function useRovingFocus(count: number, onSelect: (index: number) => void) {
  const refs = useRef<(HTMLElement | null)[]>([]);

  const itemRef = (index: number) => (el: HTMLElement | null) => {
    refs.current[index] = el;
  };

  const onKeyDown = (e: KeyboardEvent, index: number) => {
    const step = STEPS[e.key];
    if (!step) return;
    e.preventDefault();
    const next = (index + step + count) % count;
    onSelect(next);
    refs.current[next]?.focus();
  };

  return { itemRef, onKeyDown };
}
