import { useEffect, useRef, type DependencyList } from 'react';
import { useLatest } from './useLatest';

/** Runs `effect` once `deps` have stopped changing for `delay` ms. */
function useDebounceEffect(effect: () => void, deps: DependencyList, delay: number) {
  const handler = useRef<ReturnType<typeof setTimeout>>();
  const latestEffect = useLatest(effect);

  useEffect(() => {
    handler.current = setTimeout(() => latestEffect.current(), delay);
    return () => clearTimeout(handler.current);
    // The caller's deps decide when to re-arm; eslint checks them at the call site
    // through additionalHooks.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, delay]);
}

export default useDebounceEffect;
