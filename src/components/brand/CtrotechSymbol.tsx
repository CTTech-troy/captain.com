import React from 'react';
import { motion } from 'framer-motion';
import { EASE_OUT } from '../../utils/motion';

interface CtrotechSymbolProps {
  size?: number | string;
  className?: string;
  /** Draw the ring on mount (used by the loader and transitions). */
  draw?: boolean;
  strokeWidth?: number;
  accentClassName?: string;
  showAccent?: boolean;
  title?: string;
}

/**
 * The Ctrotech.com symbol: a geometric "C" ring with a lemon heading point in
 * its opening. The ring uses currentColor so it adapts to any surface.
 */
export function CtrotechSymbol({
  size = 32,
  className,
  draw = false,
  strokeWidth = 7,
  accentClassName = 'fill-lemon',
  showAccent = true,
  title
}: CtrotechSymbolProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      width={size}
      height={size}
      className={className}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}>
      
      {title && <title>{title}</title>}
      <motion.path
        d="M35.3 12.7A16 16 0 1 0 35.3 35.3"
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="butt"
        initial={draw ? { pathLength: 0 } : false}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.3, ease: EASE_OUT }} />
      
      {showAccent &&
      <motion.circle
        cx="39"
        cy="24"
        r="3.8"
        className={accentClassName}
        style={{ transformOrigin: '39px 24px' }}
        initial={draw ? { scale: 0.6, opacity: 0 } : false}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2, delay: draw ? 0.28 : 0, ease: EASE_OUT }} />

      }
    </svg>);

}