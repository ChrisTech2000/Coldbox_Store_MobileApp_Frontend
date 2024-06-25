import { useEffect, useLayoutEffect, useRef } from 'react';

export const useInterval = (callback: () => void, delay?: number) => {
  const savedCallback = useRef(callback);

  useLayoutEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!delay && delay !== 0) return;
    const id = setInterval(() => {
      try {
        if (typeof savedCallback.current == 'function') {
          savedCallback.current();
        }
      } catch {
        // silent error
      }
    }, delay);
    return () => clearInterval(id);
  }, [delay]);
};
