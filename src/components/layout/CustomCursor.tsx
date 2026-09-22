import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { EASE_OUT } from '../../utils/motion';

type CursorMode = 'default' | 'hover' | 'open' | 'view' | 'drag' | 'text';

const INTERACTIVE = 'a, button, [role="button"], [role="tab"], label, summary, select';
const LABELS: Partial<Record<CursorMode, string>> = { open: 'Open', view: 'View', drag: 'Drag' };
const SCALE: Record<CursorMode, number> = { default: 0.14, hover: 0.55, open: 1, view: 1, drag: 1, text: 0 };

/** Desktop-only brand cursor. Disabled on touch devices and for reduced motion. */
export function CustomCursor() {
  const finePointer = useMediaQuery('(hover: hover) and (pointer: fine)');
  const reduce = useReducedMotion();
  const enabled = finePointer && !reduce;

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 700, damping: 45, mass: 0.35 });
  const springY = useSpring(y, { stiffness: 700, damping: 45, mass: 0.35 });
  const [mode, setMode] = useState<CursorMode>('default');
  const [visible, setVisible] = useState(false);
  const modeRef = useRef<CursorMode>('default');

  useEffect(() => {
    if (!enabled) return;
    const root = document.documentElement;
    root.classList.add('has-custom-cursor');

    const onMove = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      setVisible(true);
      const target = event.target as Element | null;
      let next: CursorMode = 'default';
      if (target?.closest('input, textarea, [contenteditable="true"]')) {
        next = 'text';
      } else {
        const tagged = target?.closest('[data-cursor]');
        const value = tagged?.getAttribute('data-cursor');
        if (value === 'open' || value === 'view' || value === 'drag') next = value;else
        if (target?.closest(INTERACTIVE)) next = 'hover';
      }
      if (next !== modeRef.current) {
        modeRef.current = next;
        setMode(next);
      }
    };
    const onLeave = () => setVisible(false);

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);
    return () => {
      root.classList.remove('has-custom-cursor');
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;
  const label = LABELS[mode];

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[95]"
      style={{ x: springX, y: springY }}>
      
      <motion.div
        className="-ml-9 -mt-9 flex h-[72px] w-[72px] items-center justify-center rounded-full"
        animate={{
          scale: visible ? SCALE[mode] : 0,
          backgroundColor: mode === 'hover' ? 'rgba(14,74,50,0.08)' : 'rgba(14,74,50,1)',
          borderColor: mode === 'hover' ? 'rgba(14,74,50,0.9)' : 'rgba(14,74,50,0)'
        }}
        style={{ borderWidth: 1.5, borderStyle: 'solid' }}
        transition={{ duration: 0.18, ease: EASE_OUT }}>
        
        <motion.span
          className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-lemon"
          animate={{ opacity: label ? 1 : 0 }}
          transition={{ duration: 0.12 }}>
          
          {label ?? ''}
        </motion.span>
      </motion.div>
    </motion.div>);

}