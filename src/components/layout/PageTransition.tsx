import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { CaptainSymbol } from '../brand/CaptainSymbol';
import { EASE_IN_OUT, EASE_OUT } from '../../utils/motion';

const BARS = [
{ top: '28%', width: '46vw', className: 'h-2 bg-forest-800' },
{ top: '50%', width: '30vw', className: 'h-[3px] bg-forest-500' },
{ top: '66%', width: '38vw', className: 'h-2 bg-forest-800' }];


/**
 * Route change: a white layer covers the new page, green geometry sweeps
 * across, then the page is revealed through a closing mask.
 */
export function PageTransition() {
  const { pathname } = useLocation();
  const reduce = useReducedMotion();
  const first = useRef(true);
  const [key, setKey] = useState(0);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    setKey((k) => k + 1);
  }, [pathname]);

  if (reduce) return null;

  return (
    <AnimatePresence>
      {key > 0 &&
      <motion.div key={key} aria-hidden="true" className="pointer-events-none fixed inset-0 z-[70] overflow-hidden">
          <motion.div
          className="absolute inset-0 bg-white"
          initial={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          animate={{ clipPath: 'inset(0% 0% 100% 0%)' }}
          transition={{ duration: 0.3, delay: 0.3, ease: EASE_IN_OUT }} />
        
          {BARS.map((bar, i) =>
        <motion.span
          key={bar.top}
          className={`absolute left-0 rounded-full ${bar.className}`}
          style={{ top: bar.top, width: bar.width }}
          initial={{ x: '-50vw' }}
          animate={{ x: '110vw' }}
          transition={{ duration: 0.3, delay: i * 0.05, ease: EASE_IN_OUT }} />

        )}
          <motion.span
          className="absolute left-1/2 top-1/2 -ml-5 -mt-5 text-forest-800"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: [0, 1, 0], scale: [0.96, 1, 1.1] }}
          transition={{ duration: 0.3, delay: 0.08, ease: EASE_OUT }}>
          
            <CaptainSymbol size={40} />
          </motion.span>
        </motion.div>
      }
    </AnimatePresence>);

}