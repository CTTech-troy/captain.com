import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion';
import { CheckIcon, MailIcon } from 'lucide-react';
import { ServiceIcon } from '../ui/ServiceIcon';
import { EASE_OUT } from '../../utils/motion';
import { cn } from '../../utils/cn';

const STEPS = ['Read document', 'Extract fields', 'Match purchase order', 'Post to finance'];

/** Fictional AI automation interface, rendered on the hero phone. Loops while visible. */
export function HeroPhoneScreen({ ready }: {ready: boolean;}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const reduce = useReducedMotion();
  const [step, setStep] = useState(reduce ? STEPS.length : 0);

  useEffect(() => {
    if (reduce || !ready || !inView) return;
    const timer = window.setInterval(() => {
      setStep((current) => current >= STEPS.length + 1 ? 0 : current + 1);
    }, 1100);
    return () => window.clearInterval(timer);
  }, [reduce, ready, inView]);

  const complete = step >= STEPS.length;

  return (
    <div ref={ref} className="flex h-full flex-col bg-soft px-[8%] pb-[8%] pt-[14%] text-[7px] text-ink sm:text-[8px]">
      <div className="flex items-center gap-1.5">
        <span className="flex h-[2.4em] w-[2.4em] items-center justify-center rounded-full bg-forest-800 text-lemon">
          <ServiceIcon name="bot" className="h-[1.3em] w-[1.3em]" strokeWidth={2} />
        </span>
        <div className="leading-tight">
          <p className="font-display text-[1.25em] font-semibold">Captain AI</p>
          <p className="flex items-center gap-1 text-muted">
            <span className="h-[0.5em] w-[0.5em] rounded-full bg-forest-500" /> Agent active
          </p>
        </div>
      </div>

      <div className="mt-[10%] rounded-lg border border-line bg-white p-[7%]">
        <p className="flex items-center gap-1 font-mono uppercase tracking-[0.12em] text-faint">
          <MailIcon className="h-[1.1em] w-[1.1em]" /> New request
        </p>
        <p className="mt-1 font-medium leading-snug">Supplier invoice received</p>
      </div>

      <ol className="mt-[8%] space-y-[6%]">
        {STEPS.map((label, i) => {
          const done = i < step;
          const active = i === step;
          return (
            <li key={label} className="flex items-center gap-1.5">
              <span
                className={cn(
                  'flex h-[1.8em] w-[1.8em] shrink-0 items-center justify-center rounded-full border transition-colors duration-200',
                  done && 'border-lemon-600 bg-lemon text-ink',
                  active && 'border-forest-800 bg-forest-800',
                  !done && !active && 'border-line bg-white'
                )}>
                
                {done && <CheckIcon className="h-[1.1em] w-[1.1em]" strokeWidth={3} />}
                {active && <span className="h-[0.5em] w-[0.5em] rounded-full bg-white" />}
              </span>
              <span className={cn('transition-colors duration-200', done || active ? 'text-ink' : 'text-faint')}>{label}</span>
            </li>);

        })}
      </ol>

      <div className="mt-auto h-[2.8em]">
        <AnimatePresence>
          {complete &&
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: EASE_OUT }}
            className="flex h-full items-center justify-center gap-1 rounded-full bg-forest-800 font-medium text-white">
            
              <CheckIcon className="h-[1.1em] w-[1.1em] text-lemon" strokeWidth={3} />
              Automation complete
            </motion.div>
          }
        </AnimatePresence>
      </div>
    </div>);

}