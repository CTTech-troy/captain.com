import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { CheckIcon } from 'lucide-react';
import { CaptainSymbol } from '../brand/CaptainSymbol';
import { SectionHeading } from '../ui/SectionHeading';
import { ServiceIcon } from '../ui/ServiceIcon';
import { managedLoop, managedServices } from '../../data/process';
import { EASE_IN_OUT } from '../../utils/motion';
import { cn } from '../../utils/cn';

export function ManagedSection() {
  const loopRef = useRef<HTMLDivElement>(null);
  const inView = useInView(loopRef, { amount: 0.4 });
  const reduce = useReducedMotion();
  const [tick, setTick] = useState(0);
  const count = managedLoop.length;
  const active = tick % count;

  useEffect(() => {
    if (!inView || reduce) return;
    const timer = window.setInterval(() => setTick((t) => t + 1), 1400);
    return () => window.clearInterval(timer);
  }, [inView, reduce]);

  return (
    <section aria-labelledby="managed-title" className="bg-soft py-28 md:py-36">
      <div className="container-page grid items-center gap-16 lg:grid-cols-12">
        <div ref={loopRef} className="relative mx-auto aspect-square w-full max-w-[460px] lg:col-span-6">
          <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full" aria-hidden="true">
            <circle cx="200" cy="200" r="150" fill="none" stroke="#E3E7E1" strokeWidth="1.5" />
            <circle cx="200" cy="200" r="150" fill="none" stroke="#BFE3CD" strokeWidth="1.5" className="flow-line" />
          </svg>

          <motion.div
            className="absolute inset-[12.5%]"
            animate={{ rotate: tick * (360 / count) }}
            transition={{ duration: 0.3, ease: EASE_IN_OUT }}
            aria-hidden="true">
            
            <span className="absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-lemon ring-4 ring-soft" />
          </motion.div>

          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <CaptainSymbol size={48} className="text-forest-800" />
            <p className="label-mono mt-3 text-muted">Continuous operation</p>
          </div>

          <ol aria-label="Operating cycle">
            {managedLoop.map((node, i) => {
              const angle = (-90 + i * (360 / count)) * Math.PI / 180;
              const on = i === active;
              return (
                <li
                  key={node.id}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${50 + 37.5 * Math.cos(angle)}%`, top: `${50 + 37.5 * Math.sin(angle)}%` }}>
                  
                  <span
                    className={cn(
                      'flex items-center gap-2 whitespace-nowrap rounded-full border py-1.5 pl-1.5 pr-3.5 font-mono text-[11px] font-medium uppercase tracking-[0.12em] transition-colors duration-200',
                      on ? 'border-forest-800 bg-forest-800 text-white' : 'border-line bg-white text-ink'
                    )}>
                    
                    <span className={cn('flex h-6 w-6 items-center justify-center rounded-full', on ? 'bg-white/10 text-lemon' : 'bg-forest-50 text-forest-700')}>
                      <ServiceIcon name={node.icon} className="h-3.5 w-3.5" strokeWidth={2} />
                    </span>
                    {node.label}
                  </span>
                </li>);

            })}
          </ol>
        </div>

        <div className="lg:col-span-6">
          <SectionHeading
            id="managed-title"
            label="Managed technology"
            title="We don't disappear after deployment."
            highlight={["don't"]}
            support="Software needs maintenance, monitoring, security and continuous improvement. Captain.com provides ongoing technology support after launch." />
          
          <ul className="mt-10 grid border-t border-line sm:grid-cols-2 sm:gap-x-10">
            {managedServices.map((service) =>
            <li key={service} className="flex items-center gap-3 border-b border-line py-3.5 text-[15px] text-ink">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-forest-800 text-lemon">
                  <CheckIcon className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
                </span>
                {service}
              </li>
            )}
          </ul>
        </div>
      </div>
    </section>);

}