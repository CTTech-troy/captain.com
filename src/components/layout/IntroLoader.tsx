import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CaptainSymbol } from '../brand/CaptainSymbol';
import { useIntro } from '../../contexts/IntroContext';
import { EASE_IN_OUT, EASE_OUT } from '../../utils/motion';

const SESSION_KEY = 'captain-intro-seen';

function shouldSkip(): boolean {
  if (typeof window === 'undefined') return true;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return true;
  try {
    return window.sessionStorage.getItem(SESSION_KEY) === '1';
  } catch {
    return false;
  }
}

/** Short brand intro: the symbol draws, turns, then expands into the page. */
export function IntroLoader() {
  const { complete } = useIntro();
  const [phase, setPhase] = useState<'draw' | 'exit' | 'gone'>(() => shouldSkip() ? 'gone' : 'draw');

  useEffect(() => {
    if (phase === 'gone') {
      complete();
      return;
    }
    const exitTimer = window.setTimeout(() => setPhase('exit'), 820);
    const completeTimer = window.setTimeout(complete, 900);
    const goneTimer = window.setTimeout(() => {
      setPhase('gone');
      try {
        window.sessionStorage.setItem(SESSION_KEY, '1');
      } catch {

        /* storage unavailable — intro simply replays */}
    }, 1180);
    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(completeTimer);
      window.clearTimeout(goneTimer);
    };
    // Runs once on mount by design.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (phase === 'gone') return null;
  const exiting = phase === 'exit';

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[90] flex items-center justify-center bg-white"
      animate={{ opacity: exiting ? 0 : 1 }}
      transition={{ duration: 0.3, ease: EASE_OUT, delay: exiting ? 0.06 : 0 }}>
      
      <motion.div
        className="text-forest-800"
        initial={{ rotate: -90, opacity: 0, scale: 0.96 }}
        animate={exiting ? { rotate: 0, opacity: 0, scale: 9 } : { rotate: 0, opacity: 1, scale: 1 }}
        transition={
        exiting ?
        { duration: 0.3, ease: EASE_IN_OUT } :
        {
          opacity: { duration: 0.2, ease: EASE_OUT },
          scale: { duration: 0.25, ease: EASE_OUT },
          rotate: { duration: 0.3, delay: 0.38, ease: EASE_OUT }
        }
        }>
        
        <CaptainSymbol size={76} draw />
      </motion.div>
    </motion.div>);

}