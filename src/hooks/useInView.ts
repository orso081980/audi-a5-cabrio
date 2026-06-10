import { useEffect, useRef, useState } from 'react';

/**
 * Returns a [ref, isVisible] tuple.
 * The element becomes "visible" once it enters the viewport and stays that way.
 */
export function useInView<T extends HTMLElement>(options?: IntersectionObserverInit): [React.RefObject<T | null>, boolean] {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.12, ...options });

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, visible];
}
