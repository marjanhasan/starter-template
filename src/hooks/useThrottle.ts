import { useRef, useCallback } from "react";

// Better: Use unknown for args/return if you want maximum flexibility
//         or replace unknown with a more specific type if you know the shape
export function useThrottle<T extends (...args: unknown[]) => unknown>(
  func: T,
  delay: number,
): T {
  const lastRun = useRef<number>(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  return useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now();

      if (now - lastRun.current >= delay) {
        func(...args);
        lastRun.current = now;

        if (timeoutRef.current !== null) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }
      } else {
        if (timeoutRef.current !== null) {
          clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(
          () => {
            func(...args);
            lastRun.current = Date.now();
            timeoutRef.current = null;
          },
          delay - (now - lastRun.current),
        );
      }
    },
    [func, delay],
  ) as T;
}
