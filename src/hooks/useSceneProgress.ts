import type { RefObject } from 'react';
import { useMotionValue, useReducedMotion, useScroll } from 'framer-motion';
import type { MotionValue } from 'framer-motion';

type ScrollOptions = NonNullable<Parameters<typeof useScroll>[0]>;

type SceneRef = RefObject<HTMLElement | null>;

/**
 * Scroll progress (0 → 1) for a scene. When the user prefers reduced motion,
 * returns a static value of 1 so every scene renders its final, complete state.
 */
export function useSceneProgress(
target: SceneRef,
offset: ScrollOptions['offset'] = ['start start', 'end end'])
: {progress: MotionValue<number>;reduce: boolean;} {
  const reduce = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({ target, offset });
  const complete = useMotionValue(1);
  return { progress: reduce ? complete : scrollYProgress, reduce };
}