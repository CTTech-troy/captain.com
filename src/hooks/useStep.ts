import { useCallback, useSyncExternalStore } from 'react';
import type { MotionValue } from 'framer-motion';

/** Subscribe to motion values without extra effect-triggered renders. */
export function useStep(progress: MotionValue<number>, count: number, start = 0, end = 1): number {
  const snapshot = useCallback(() => {
    const t = (progress.get() - start) / (end - start);
    return Math.max(0, Math.min(count, Math.floor(t * count + 0.0001)));
  }, [progress, count, start, end]);
  const subscribe = useCallback((notify: () => void) => progress.on('change', notify), [progress]);
  return useSyncExternalStore(subscribe, snapshot, snapshot);
}
