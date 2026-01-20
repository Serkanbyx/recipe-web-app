import { useEffect, useRef, useState, useCallback } from 'react';

interface UseIntersectionObserverOptions {
  threshold?: number | number[];
  root?: Element | null;
  rootMargin?: string;
  freezeOnceVisible?: boolean;
}

interface UseIntersectionObserverReturn {
  ref: React.RefObject<HTMLDivElement>;
  isIntersecting: boolean;
  entry: IntersectionObserverEntry | null;
}

/**
 * Custom hook for detecting when an element enters the viewport
 * Useful for infinite scroll, lazy loading, and animations
 * @param options - IntersectionObserver options
 * @returns Object with ref, isIntersecting state, and entry
 */
export function useIntersectionObserver({
  threshold = 0,
  root = null,
  rootMargin = '0px',
  freezeOnceVisible = false,
}: UseIntersectionObserverOptions = {}): UseIntersectionObserverReturn {
  const ref = useRef<HTMLDivElement>(null);
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const frozen = useRef(false);

  const updateEntry = useCallback(
    ([newEntry]: IntersectionObserverEntry[]): void => {
      if (frozen.current) return;

      setEntry(newEntry);
      setIsIntersecting(newEntry.isIntersecting);

      if (freezeOnceVisible && newEntry.isIntersecting) {
        frozen.current = true;
      }
    },
    [freezeOnceVisible]
  );

  useEffect(() => {
    const node = ref.current;
    const hasIOSupport = !!window.IntersectionObserver;

    if (!hasIOSupport || !node) return;

    const observer = new IntersectionObserver(updateEntry, {
      threshold,
      root,
      rootMargin,
    });

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [threshold, root, rootMargin, updateEntry]);

  return { ref, isIntersecting, entry };
}
