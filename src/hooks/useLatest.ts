import { useRef } from 'react';

/**
 * A ref that always holds the latest value. Lets an effect that should fire only on
 * one change read current props and callbacks without re-running when they change.
 */
export function useLatest<T>(value: T) {
  const ref = useRef(value);
  ref.current = value;
  return ref;
}
