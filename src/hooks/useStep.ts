import { useCallback, useEffect, useState } from 'react';
import { MotionValue, useMotionValueEvent } from 'framer-motion';

/**
 * Converts a continuous progress value into a discrete step (0…count).
 * Re-renders only when the step changes, keeping scroll work minimal.
 */
export function useStep(progress: MotionValue<number>, count: number, start = 0, end = 1): number {
  const compute = useCallback(
    (value: number) => {
      const t = (value - start) / (end - start);
      return Math.max(0, Math.min(count, Math.floor(t * count + 0.0001)));
    },
    [count, start, end]
  );

  const [step, setStep] = useState(() => compute(progress.get()));

  useMotionValueEvent(progress, 'change', (value) => setStep(compute(value)));

  useEffect(() => {
    setStep(compute(progress.get()));
  }, [progress, compute]);

  return step;
}