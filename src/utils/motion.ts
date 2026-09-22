import type { Variants } from 'framer-motion';

/** Strong ease-out for anything entering or exiting. */
export const EASE_OUT: [number, number, number, number] = [0.23, 1, 0.32, 1];
/** Strong ease-in-out for movement across the screen. */
export const EASE_IN_OUT: [number, number, number, number] = [0.77, 0, 0.175, 1];

export const DURATION = {
  press: 0.14,
  fast: 0.2,
  base: 0.28,
  max: 0.3
} as const;

export const maskUp: Variants = {
  hidden: { y: '110%' },
  visible: { y: '0%', transition: { duration: DURATION.max, ease: EASE_OUT } }
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: DURATION.base, ease: EASE_OUT } }
};

export const blurIn: Variants = {
  hidden: { opacity: 0, filter: 'blur(8px)' },
  visible: { opacity: 1, filter: 'blur(0px)', transition: { duration: DURATION.max, ease: EASE_OUT } }
};

export const popIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: { duration: DURATION.fast, ease: EASE_OUT } }
};

export function staggerContainer(stagger = 0.05, delay = 0): Variants {
  return {
    hidden: {},
    visible: { transition: { staggerChildren: stagger, delayChildren: delay } }
  };
}