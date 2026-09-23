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

const DESKTOP = { w: 1200, h: 680, rx: 440, ry: 255 };
const MOBILE = { w: 600, h: 900, rx: 210, ry: 340 };
// Stagger the compact orbit so full labels have their own space, even at 320px.
const MOBILE_POSITIONS = [
  { x: 300, y: 90 }, { x: 500, y: 210 }, { x: 500, y: 420 },
  { x: 500, y: 650 }, { x: 400, y: 810 }, { x: 180, y: 810 },
  { x: 100, y: 650 }, { x: 100, y: 420 }, { x: 100, y: 210 }
];
/** Where each disconnected tool drifts before it is connected (px). */
const SCATTER: [number, number][] = [
[-36, -16], [30, -24], [42, 10], [18, 32], [-24, 36], [-40, 14], [-28, -28], [34, -12], [10, 28]];


/** Nine business systems connect, one by one, to a central Captain platform. */
export function BusinessOSScene() {
  const ref = useRef<HTMLElement>(null);
  const { progress, reduce } = useSceneProgress(ref);
  const isDesktop = useMediaQuery('(min-width: 1024px)');
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
      if (!isDesktop) return MOBILE_POSITIONS[i];
      const angle = (-90 + i * (360 / total)) * Math.PI / 180;
      return { x: cx + layout.rx * Math.cos(angle), y: cy + layout.ry * Math.sin(angle) };
    }),
    [cx, cy, layout.rx, layout.ry, total, isDesktop]
  );

  const current = businessPhases[phase];

  return (
    <section ref={ref} id="business-systems" aria-labelledby="bos-title" className={cn('relative bg-mist', !reduce && 'h-[340svh]')}>
      <div className={cn(reduce ? 'py-24' : 'scene-panel')}>
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
            data-business-diagram
            className="relative mx-auto mt-6 w-full lg:mt-8"
            style={{
              aspectRatio: `${layout.w} / ${layout.h}`,
              maxWidth: isDesktop ? '1080px' : '480px'
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

            <div data-business-hub className="absolute left-1/2 top-1/2 w-[28%] -translate-x-1/2 -translate-y-1/2 lg:w-[22%]">
              <motion.div style={{ scale: hubScale }} className="relative flex flex-col items-center text-center">
                <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-forest-800 text-white shadow-[0_24px_60px_-20px_rgba(14,74,50,0.55)] sm:h-20 sm:w-20 lg:h-28 lg:w-28">
                  <CaptainSymbol size={isDesktop ? 50 : 34} className="text-white" />
                  <span className="absolute -inset-1.5 rounded-full border border-forest-800/20 lg:-inset-3" />
                </div>
                <div className="absolute inset-x-0 top-full mt-3">
                  <p className="rounded bg-mist px-1 font-display text-[13px] font-semibold leading-tight tracking-[-0.01em] text-ink sm:text-base lg:text-lg">Captain Platform</p>
                  <p className="mt-1 rounded bg-mist px-1 font-mono text-[9px] uppercase tracking-[0.04em] text-muted sm:text-[10px] lg:text-[11px]">
                    {connected}/{total} connected
                  </p>
                </div>
              </motion.div>
            </div>

            {businessModules.map((module, i) => {
              const on = i < connected;
              const [sx, sy] = SCATTER[i];
              return (
                <div
                  key={module.id}
                  data-business-node={module.id}
                  className="absolute w-[28%] -translate-x-1/2 -translate-y-1/2 lg:w-[18%]"
                  style={{ left: `${positions[i].x / layout.w * 100}%`, top: `${positions[i].y / layout.h * 100}%` }}>
                  
                  <motion.div
                    initial={false}
                    animate={on ? { x: 0, y: 0, opacity: 1 } : { x: sx * (isDesktop ? 0.5 : 0.1), y: sy * (isDesktop ? 0.5 : 0.1), opacity: 0.8 }}
                    transition={{ duration: 0.3, ease: EASE_OUT }}
                    className={cn(
                      'flex w-full flex-col items-center gap-1.5 rounded-xl border bg-mist px-1 py-2 lg:flex-row lg:gap-2 lg:rounded-full lg:bg-white lg:py-1.5 lg:pl-1.5 lg:pr-3',
                      on ? 'border-forest-600 shadow-[0_10px_30px_-16px_rgba(14,74,50,0.45)]' : 'border-dashed border-faint/60'
                    )}>
                    
                    <span
                      className={cn(
                        'relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors duration-200',
                        on ? 'bg-forest-800 text-white' : 'border border-dashed border-faint/60 bg-white text-faint lg:border-0 lg:bg-mist'
                      )}>
                      
                      <ServiceIcon name={module.icon} className="h-4 w-4" strokeWidth={2} />
                      {on && <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-lemon" />}
                    </span>
                    <span
                      className={cn(
                        'min-w-0 max-w-full break-words text-center font-mono text-[10px] font-medium uppercase leading-snug tracking-[0.02em] sm:text-[11px] lg:text-left',
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
