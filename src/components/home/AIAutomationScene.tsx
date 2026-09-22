import React, { useRef } from 'react';
import { motion, useTransform } from 'framer-motion';
import { CheckIcon } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { ServiceIcon } from '../ui/ServiceIcon';
import { aiIntegrations, aiStages } from '../../data/scenes';
import { useSceneProgress } from '../../hooks/useSceneProgress';
import { useStep } from '../../hooks/useStep';
import { cn } from '../../utils/cn';

type StageState = 'pending' | 'active' | 'done';

/** Scroll drives one document through the AI pipeline. Green = processing, lemon = completed. */
export function AIAutomationScene() {
  const ref = useRef<HTMLElement>(null);
  const { progress, reduce } = useSceneProgress(ref);
  const count = aiStages.length;
  const step = useStep(progress, count, 0.05, 0.8);
  const linked = useStep(progress, aiIntegrations.length, 0.6, 0.94);
  const fill = useTransform(progress, [0.05, 0.8], [0, 1]);
  const packet = useTransform(progress, [0.05, 0.8], ['0%', '100%']);

  return (
    <section
      ref={ref}
      id="ai-automation"
      aria-labelledby="ai-title"
      className={cn('relative bg-soft', !reduce && 'h-[300vh]')}>
      
      <div className={cn('flex flex-col justify-center overflow-hidden', reduce ? 'py-24' : 'sticky top-0 h-[100svh] pt-16')}>
        <div className="container-page">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <SectionHeading
              className="lg:col-span-7"
              id="ai-title"
              size="md"
              label="AI automation"
              title="Turn manual work into software."
              highlight={['software.']} />
            
            <div className="lg:col-span-5 lg:pb-2">
              <p className="hidden text-[16px] leading-relaxed text-muted md:block">
                Follow one document through an AI workflow — from inbox to finished business outcome, without anyone retyping it.
              </p>
              <div className="mt-4 flex gap-6" aria-hidden="true">
                <span className="label-mono flex items-center gap-2 text-muted">
                  <span className="h-2.5 w-2.5 rounded-full bg-forest-600" /> Processing
                </span>
                <span className="label-mono flex items-center gap-2 text-muted">
                  <span className="h-2.5 w-2.5 rounded-full bg-lemon ring-1 ring-lemon-600" /> Completed
                </span>
              </div>
            </div>
          </div>

          <div className="relative mt-10 md:mt-16">
            {/* Horizontal track (tablet and up) */}
            <div
              className="absolute top-[28px] hidden md:block"
              style={{ left: `${50 / count}%`, right: `${50 / count}%` }}
              aria-hidden="true">
              
              <div className="h-px w-full bg-line" />
              <motion.div className="absolute inset-x-0 top-0 h-px origin-left bg-forest-600" style={{ scaleX: fill }} />
              <motion.div className="absolute inset-0" style={{ x: packet }}>
                <span className="absolute -left-1.5 -top-1.5 h-3 w-3 rounded-full bg-forest-500 ring-4 ring-forest-100" />
              </motion.div>
            </div>
            {/* Vertical track (mobile) */}
            <div className="absolute bottom-[22px] left-[22px] top-[22px] w-px md:hidden" aria-hidden="true">
              <div className="h-full w-px bg-line" />
              <motion.div className="absolute inset-y-0 left-0 w-px origin-top bg-forest-600" style={{ scaleY: fill }} />
              <motion.div className="absolute inset-0" style={{ y: packet }}>
                <span className="absolute -left-1.5 -top-1.5 h-3 w-3 rounded-full bg-forest-500 ring-4 ring-forest-100" />
              </motion.div>
            </div>

            <ol className="relative grid gap-3 md:grid-cols-6 md:gap-4">
              {aiStages.map((stage, i) => {
                const state: StageState = i < step ? 'done' : i === step ? 'active' : 'pending';
                return (
                  <li key={stage.id} className="flex items-center gap-4 md:flex-col md:items-center md:gap-0 md:text-center">
                    <span
                      className={cn(
                        'relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-[background-color,border-color,color] duration-200 md:h-14 md:w-14',
                        state === 'active' && 'border-forest-800 bg-forest-800 text-white',
                        state === 'done' && 'border-forest-700 bg-white text-forest-800',
                        state === 'pending' && 'border-line bg-white text-faint'
                      )}>
                      
                      <ServiceIcon name={stage.icon} className="h-5 w-5" />
                      {state === 'active' && <span className="absolute inset-0 rounded-full border border-forest-500 animate-soft-pulse" />}
                      {state === 'done' &&
                      <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-lemon ring-2 ring-soft">
                          <CheckIcon className="h-2.5 w-2.5 text-ink" strokeWidth={3} />
                        </span>
                      }
                    </span>
                    <div className="min-w-0">
                      <p className={cn('label-mono transition-colors duration-200 md:mt-4', state === 'pending' ? 'text-faint' : 'text-ink')}>
                        {stage.label}
                        <span className="sr-only"> — {state === 'done' ? 'completed' : state === 'active' ? 'processing' : 'waiting'}</span>
                      </p>
                      <p
                        className={cn(
                          'mt-1 text-[13px] leading-snug transition-colors duration-200 md:mx-auto md:mt-2 md:max-w-[170px]',
                          state === 'pending' ? 'text-faint' : 'text-muted'
                        )}>
                        
                        {stage.detail}
                      </p>
                    </div>
                  </li>);

              })}
            </ol>
          </div>

          <div className="mt-8 flex flex-col gap-3 border-t border-line pt-5 md:mt-14 md:flex-row md:items-center md:gap-6 md:pt-6">
            <p className="label-mono shrink-0 text-muted">Connected to</p>
            <ul className="flex flex-wrap gap-1.5 md:gap-2">
              {aiIntegrations.map((item, i) => {
                const on = i < linked;
                return (
                  <li
                    key={item.id}
                    className={cn(
                      'flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-1 text-[12px] font-medium transition-colors duration-200 md:px-3 md:py-1.5 md:text-[13px]',
                      on ? 'border-forest-700 bg-white text-ink' : 'border-line text-faint'
                    )}>
                    
                    <ServiceIcon name={item.icon} className={cn('h-3.5 w-3.5', on ? 'text-forest-700' : 'text-faint')} strokeWidth={2} />
                    {item.label}
                    {on && <span className="h-1.5 w-1.5 rounded-full bg-lemon-600" aria-hidden="true" />}
                  </li>);

              })}
            </ul>
          </div>
        </div>
      </div>
    </section>);

}