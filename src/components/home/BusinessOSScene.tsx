import React, { useMemo, useRef } from 'react';
import { AnimatePresence, motion, useTransform } from 'framer-motion';
import { CaptainSymbol } from '../brand/CaptainSymbol';
import { SectionHeading } from '../ui/SectionHeading';
import { ServiceIcon } from '../ui/ServiceIcon';
import { businessModules, businessPhases } from '../../data/scenes';
import { useSceneProgress } from '../../hooks/useSceneProgress';
import { useStep } from '../../hooks/useStep';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { EASE_OUT } from '../../utils/motion';
import { cn } from '../../utils/cn';

const DESKTOP = { w: 1000, h: 560, rx: 400, ry: 215 };
const MOBILE = { w: 600, h: 780, rx: 215, ry: 305 };
/** Where each disconnected tool drifts before it is connected (px). */
const SCATTER: [number, number][] = [
[-36, -16], [30, -24], [42, 10], [18, 32], [-24, 36], [-40, 14], [-28, -28], [34, -12], [10, 28]];


/** Nine business systems connect, one by one, to a central Captain platform. */
export function BusinessOSScene() {
  const ref = useRef<HTMLElement>(null);
  const { progress, reduce } = useSceneProgress(ref);
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const layout = isDesktop ? DESKTOP : MOBILE;
  const total = businessModules.length;
  const connected = useStep(progress, total, 0.12, 0.78);
  const phase = connected === 0 ? 0 : connected < total ? 1 : 2;
  const hubScale = useTransform(progress, [0, 0.8], [0.88, 1]);
  const cx = layout.w / 2;
  const cy = layout.h / 2;

  const positions = useMemo(
    () =>
    businessModules.map((_, i) => {
      const angle = (-90 + i * (360 / total)) * Math.PI / 180;
      return { x: cx + layout.rx * Math.cos(angle), y: cy + layout.ry * Math.sin(angle) };
    }),
    [cx, cy, layout.rx, layout.ry, total]
  );

  const current = businessPhases[phase];

  return (
    <section ref={ref} id="business-systems" aria-labelledby="bos-title" className={cn('relative bg-mist', !reduce && 'h-[340vh]')}>
      <div className={cn('flex flex-col justify-center overflow-hidden', reduce ? 'py-24' : 'sticky top-0 h-[100svh] pt-16')}>
        <div className="container-page">
          <div className="grid gap-5 lg:grid-cols-12 lg:items-end">
            <SectionHeading
              className="lg:col-span-7"
              id="bos-title"
              size="md"
              label="Business operating systems"
              title="Software for how your business works."
              highlight={['business']} />
            
            <div className="min-h-[88px] lg:col-span-5 lg:pb-1" aria-live="polite">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={phase}
                  initial={{ opacity: 0, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25, ease: EASE_OUT }}>
                  
                  <p className="label-mono flex items-center gap-2 text-forest-700">
                    <span className={cn('h-2 w-2 rounded-full', phase === 2 ? 'bg-lemon-600' : 'bg-forest-600')} />
                    {current.label}
                  </p>
                  <p className="mt-2 font-display text-[20px] font-semibold tracking-[-0.02em] text-ink md:text-[22px]">{current.title}</p>
                  <p className="mt-1.5 hidden text-[15px] leading-relaxed text-muted sm:block">{current.body}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div
            className="relative mx-auto mt-6 w-full md:mt-8"
            style={{
              aspectRatio: `${layout.w} / ${layout.h}`,
              maxWidth: isDesktop ? 'min(1080px, calc((100svh - 330px) * 1.785))' : 'min(100%, calc((100svh - 300px) * 0.77))'
            }}>
            
            <svg viewBox={`0 0 ${layout.w} ${layout.h}`} className="absolute inset-0 h-full w-full" aria-hidden="true">
              <motion.ellipse
                cx={cx}
                cy={cy}
                rx={layout.rx}
                ry={layout.ry}
                fill="none"
                stroke="#CAD52B"
                strokeWidth={1.5}
                initial={false}
                animate={{ pathLength: phase === 2 ? 1 : 0, opacity: phase === 2 ? 1 : 0 }}
                transition={{ duration: 0.3, ease: EASE_OUT }} />
              
              {positions.map((pos, i) => {
                const on = i < connected;
                const d = `M${cx} ${cy} L${pos.x} ${pos.y}`;
                return (
                  <g key={businessModules[i].id}>
                    <motion.path
                      d={d}
                      fill="none"
                      stroke="#16734D"
                      strokeWidth={1.5}
                      initial={false}
                      animate={{ pathLength: on ? 1 : 0, opacity: on ? 1 : 0 }}
                      transition={{ duration: 0.3, ease: EASE_OUT }} />
                    
                    {on && !reduce &&
                    <>
                        <circle r="4" className="fill-forest-500">
                          <animateMotion dur="2.2s" repeatCount="indefinite" path={d} begin={`${i * 0.18}s`} />
                        </circle>
                        <circle r="3.5" className="fill-lemon-600">
                          <animateMotion dur="2.2s" repeatCount="indefinite" path={d} keyPoints="1;0" keyTimes="0;1" calcMode="linear" begin={`${1.1 + i * 0.18}s`} />
                        </circle>
                      </>
                    }
                  </g>);

              })}
            </svg>

            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <motion.div style={{ scale: hubScale }} className="flex flex-col items-center">
                <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-forest-800 text-white shadow-[0_24px_60px_-20px_rgba(14,74,50,0.55)] md:h-32 md:w-32">
                  <CaptainSymbol size={isDesktop ? 50 : 34} className="text-white" />
                  <span className="absolute -inset-2 rounded-full border border-forest-800/20 md:-inset-3" />
                </div>
                <p className="mt-3 font-display text-[15px] font-semibold tracking-[-0.01em] text-ink md:text-lg">Captain Platform</p>
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted md:text-[11px]">
                  {connected}/{total} connected
                </p>
              </motion.div>
            </div>

            {businessModules.map((module, i) => {
              const on = i < connected;
              const [sx, sy] = SCATTER[i];
              return (
                <div
                  key={module.id}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${positions[i].x / layout.w * 100}%`, top: `${positions[i].y / layout.h * 100}%` }}>
                  
                  <motion.div
                    initial={false}
                    animate={on ? { x: 0, y: 0, opacity: 1 } : { x: sx, y: sy, opacity: 0.8 }}
                    transition={{ duration: 0.3, ease: EASE_OUT }}
                    className={cn(
                      'flex flex-col items-center gap-1.5 md:flex-row md:gap-2 md:rounded-full md:border md:bg-white md:py-1.5 md:pl-1.5 md:pr-4',
                      on ? 'md:border-forest-600 md:shadow-[0_10px_30px_-16px_rgba(14,74,50,0.45)]' : 'md:border-dashed md:border-faint/60'
                    )}>
                    
                    <span
                      className={cn(
                        'relative flex h-9 w-9 items-center justify-center rounded-full transition-colors duration-200 md:h-8 md:w-8',
                        on ? 'bg-forest-800 text-white' : 'border border-dashed border-faint/60 bg-white text-faint md:border-0 md:bg-mist'
                      )}>
                      
                      <ServiceIcon name={module.icon} className="h-4 w-4" strokeWidth={2} />
                      {on && <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-lemon" />}
                    </span>
                    <span
                      className={cn(
                        'whitespace-nowrap font-mono text-[10px] font-medium uppercase tracking-[0.12em] md:text-[11px]',
                        on ? 'text-ink' : 'text-muted'
                      )}>
                      
                      {module.label}
                    </span>
                  </motion.div>
                </div>);

            })}
          </div>
        </div>
      </div>
    </section>);

}