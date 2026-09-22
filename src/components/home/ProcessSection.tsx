import React, { useRef } from 'react';
import { motion, useTransform } from 'framer-motion';
import { SectionHeading } from '../ui/SectionHeading';
import { ServiceIcon } from '../ui/ServiceIcon';
import { processStages } from '../../data/process';
import { useSceneProgress } from '../../hooks/useSceneProgress';
import { useStep } from '../../hooks/useStep';
import { cn } from '../../utils/cn';

export function ProcessSection() {
  const listRef = useRef<HTMLOListElement>(null);
  const { progress } = useSceneProgress(listRef, ['start 70%', 'end 55%']);
  const step = useStep(progress, processStages.length);
  const fill = useTransform(progress, [0, 1], [0, 1]);

  return (
    <section id="process" aria-labelledby="process-title" className="bg-soft py-28 md:py-36">
      <div className="container-page grid gap-14 lg:grid-cols-12">
        <div className="self-start lg:sticky lg:top-28 lg:col-span-5">
          <SectionHeading
            id="process-title"
            label="Process"
            title="Seven stages. One accountable team."
            highlight={['accountable']}
            support="Every engagement follows the same disciplined path — from understanding the business to operating the software in production." />
          
        </div>

        <div className="relative lg:col-span-6 lg:col-start-7">
          <span className="absolute bottom-6 left-[21px] top-6 w-px bg-line" aria-hidden="true" />
          <motion.span className="absolute bottom-6 left-[21px] top-6 w-px origin-top bg-forest-600" style={{ scaleY: fill }} aria-hidden="true" />
        <ol ref={listRef} className="relative">
          {processStages.map((stage, i) => {
              const state = i < step ? 'done' : i === step ? 'active' : 'pending';
              return (
                <li key={stage.id} className="relative flex gap-6 pb-12 last:pb-0 md:gap-8 md:pb-16" aria-current={state === 'active' ? 'step' : undefined}>
                <span
                    className={cn(
                      'relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-[background-color,border-color,color] duration-200',
                      state === 'active' && 'border-forest-800 bg-forest-800 text-white',
                      state === 'done' && 'border-forest-700 bg-white text-forest-800',
                      state === 'pending' && 'border-line bg-white text-faint'
                    )}>
                    
                  <ServiceIcon name={stage.icon} className="h-5 w-5" />
                  {state === 'done' && <span className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full border-2 border-soft bg-lemon" aria-hidden="true" />}
                </span>
                <div className="pt-1">
                  <p className={cn('font-mono text-[12px] transition-colors duration-200', state === 'pending' ? 'text-faint' : 'text-forest-700')}>{stage.number}</p>
                  <h3
                      className={cn(
                        'display-heading mt-1 text-[clamp(1.75rem,3.2vw,2.75rem)] leading-none transition-colors duration-200',
                        state === 'pending' ? 'text-ink/30' : 'text-ink'
                      )}>
                      
                    {stage.title}
                  </h3>
                  <p className={cn('mt-3 text-[16px] leading-relaxed transition-colors duration-200', state === 'pending' ? 'text-faint' : 'text-muted')}>
                    {stage.body}
                  </p>
                </div>
              </li>);

            })}
        </ol>
        </div>
      </div>
    </section>);

}