import { useEffect, useRef } from "react";

function useDebounceEffect(effect: () => void, deps: React.DependencyList, delay: number) {
  const handler = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (handler.current) clearTimeout(handler.current);

    handler.current = setTimeout(() => {
      effect();
    }, delay);

    // Cleanup timeout if dependencies change or component unmounts
    return () => {
      if (handler.current) clearTimeout(handler.current);
    };
  }, [...deps, delay]);
}

export default useDebounceEffect;
