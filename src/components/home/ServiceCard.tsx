import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { ArrowRightIcon } from 'lucide-react';
import { ServiceIcon } from '../ui/ServiceIcon';
import { EASE_OUT } from '../../utils/motion';
import { cn } from '../../utils/cn';
import type { Capability } from '../../types/content';

interface ServiceCardProps {
  capability: Capability;
  index: number;
}

/**
 * Entry sequence: icon draws → border appears → heading reveals →
 * description follows → CTA last.
 */
export function ServiceCard({ capability, index }: ServiceCardProps) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const delay = index % 4 * 0.06;
  const preview = capability.items.slice(0, 4);
  const extra = capability.items.length - preview.length;

  const step = (offset: number) => ({
    initial: { opacity: 0, y: 8 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.26, delay: delay + offset, ease: EASE_OUT }
  });

  return (
    <motion.li
      ref={ref}
      layout
      exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.18 } }}
      transition={{ layout: { duration: 0.3, ease: EASE_OUT } }}
      className={cn('h-full', inView && 'is-drawn')}>
      
      <Link
        to={`/services/${capability.slug}`}
        data-cursor="open"
        className="group relative flex h-full min-h-[340px] flex-col rounded-2xl bg-white p-6 transition-[background-color,transform] duration-200 ease-out-strong hover:-translate-y-1 hover:bg-forest-50/70 md:p-7">
        
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-2xl border border-line transition-colors duration-200 group-hover:border-forest-600"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.25, delay: delay + 0.08 }} />
        
        <span
          aria-hidden="true"
          className="absolute right-6 top-7 h-2 w-2 scale-0 rounded-full bg-lemon-600 transition-transform duration-200 ease-out-strong group-hover:scale-100" />
        

        <div className="flex items-center justify-between pr-6">
          <span className="draw-icon flex h-11 w-11 items-center justify-center rounded-xl bg-forest-50 text-forest-800 transition-[background-color,color,transform] duration-200 ease-out-strong group-hover:-rotate-6 group-hover:bg-forest-800 group-hover:text-lemon">
            <ServiceIcon name={capability.icon} className="h-5 w-5" />
          </span>
          <span className="font-mono text-[11px] text-faint">{capability.number}</span>
        </div>

        <h3 className="mt-8 overflow-hidden">
          <motion.span
            className="block font-display text-[22px] font-semibold leading-tight tracking-[-0.02em] text-ink"
            initial={{ y: '110%' }}
            animate={inView ? { y: '0%' } : {}}
            transition={{ duration: 0.3, delay: delay + 0.14, ease: EASE_OUT }}>
            
            {capability.title}
          </motion.span>
        </h3>
        <motion.p {...step(0.22)} className="mt-3 text-[15px] leading-relaxed text-muted">
          {capability.summary}
        </motion.p>
        <motion.ul {...step(0.28)} className="mt-5 flex flex-wrap gap-1.5" aria-label={`${capability.title} includes`}>
          {preview.map((item) =>
          <li key={item} className="rounded-full bg-mist px-2.5 py-1 text-[12px] text-ink/75 transition-colors duration-200 group-hover:bg-white">
              {item}
            </li>
          )}
          {extra > 0 && <li className="px-1 py-1 text-[12px] text-muted">+{extra} more</li>}
        </motion.ul>
        <motion.span {...step(0.36)} className="mt-auto flex items-center gap-2 pt-8 text-[14px] font-medium text-forest-800">
          Explore
          <ArrowRightIcon className="h-4 w-4 transition-transform duration-200 ease-out-strong group-hover:translate-x-1" aria-hidden="true" />
        </motion.span>
      </Link>
    </motion.li>);

}