import React, { useRef, useState } from 'react';
import { AnimatePresence, motion, MotionValue, useMotionValueEvent, useTransform } from 'framer-motion';
import { ActivityIcon, CheckIcon, ScanSearchIcon, ShieldCheckIcon, ShieldOffIcon } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { ServiceIcon } from '../ui/ServiceIcon';
import { securityLayers, securityStates } from '../../data/scenes';
import { useSceneProgress } from '../../hooks/useSceneProgress';
import { EASE_OUT } from '../../utils/motion';
import { cn } from '../../utils/cn';

/** Progress thresholds at which a layer becomes Tested, Secured, Monitored. */
const THRESHOLDS = [0.14, 0.4, 0.66];
const LAYER_OFFSET = 0.035;
const RINGS = [
{ label: 'Tested', className: 'border-dashed border-forest-200' },
{ label: 'Secured', className: 'border-forest-200' },
{ label: 'Monitored', className: 'border-forest-600' }];


export function SecurityScene() {
  const ref = useRef<HTMLElement>(null);
  const { progress, reduce } = useSceneProgress(ref);
  const [tick, setTick] = useState(() => Math.round(progress.get() * 100));

  useMotionValueEvent(progress, 'change', (value) => {
    const next = Math.round(value * 100);
    setTick((prev) => prev === next ? prev : next);
  });

  const p = tick / 100;
  const layerState = (i: number) => THRESHOLDS.filter((t) => p >= t + i * LAYER_OFFSET).length;
  const globalState = layerState(0);

  // The most recent control activation is highlighted in lemon as the "live" event.
  let eventLayer = -1;
  let latest = -1;
  THRESHOLDS.forEach((t) => {
    securityLayers.forEach((_, i) => {
      const at = t + i * LAYER_OFFSET;
      if (p >= at && at > latest && p - at < 0.06) {
        latest = at;
        eventLayer = i;
      }
    });
  });

  return (
    <section ref={ref} id="security" aria-labelledby="security-title" className={cn('relative bg-white', !reduce && 'h-[320svh]')}>
      <div className={cn(reduce ? 'py-24' : 'scene-panel')}>
        <div className="container-page grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <SectionHeading
              id="security-title"
              size="md"
              label="Cybersecurity"
              title="Build secure. Stay secure."
              highlight={['secure.']} />
            
            <ol className="mt-8 hidden space-y-1 lg:block" aria-label="Security states">
              {securityStates.map((state, i) => {
                const status = i < globalState ? 'done' : i === globalState ? 'active' : 'pending';
                return (
                  <li key={state.id} className="flex gap-4 py-2" aria-current={status === 'active' ? 'step' : undefined}>
                    <span
                      className={cn(
                        'mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-colors duration-200',
                        status === 'done' && 'border-forest-800 bg-forest-800 text-white',
                        status === 'active' && 'border-forest-800 bg-white',
                        status === 'pending' && 'border-line bg-white'
                      )}>
                      
                      {status === 'done' && <CheckIcon className="h-3.5 w-3.5" strokeWidth={3} aria-hidden="true" />}
                      {status === 'active' && <span className="h-2 w-2 rounded-full bg-forest-600" />}
                    </span>
                    <div>
                      <p className={cn('label-mono transition-colors duration-200', status === 'pending' ? 'text-faint' : 'text-ink')}>{state.label}</p>
                      <p className={cn('mt-1 text-[14px] leading-relaxed transition-colors duration-200', status === 'pending' ? 'text-faint' : 'text-muted')}>
                        {state.body}
                      </p>
                    </div>
                  </li>);

              })}
            </ol>

            <div className="mt-6 flex items-start gap-3 rounded-xl border border-line bg-soft p-4" aria-live="polite">
              <span className="relative mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-lemon-600">
                <span className="absolute inset-0 rounded-full bg-lemon-600 animate-soft-pulse" />
              </span>
              <div className="min-w-0">
                <p className="label-mono text-muted">
                  <span className="lg:hidden">{securityStates[globalState].label} · </span>Latest event
                </p>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.p
                    key={globalState}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2, ease: EASE_OUT }}
                    className="mt-1 text-[14px] font-medium text-ink">
                    
                    {securityStates[globalState].event}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="relative mx-auto max-w-[620px] p-[30px] sm:p-[46px] md:p-[58px]">
              {RINGS.map((ring, k) =>
              <SecurityRing key={ring.label} index={k} label={ring.label} className={ring.className} progress={progress} />
              )}
              <div className="relative">
              <span className="absolute bottom-4 left-1/2 top-4 w-px bg-line" aria-hidden="true" />
              <ol className="relative space-y-2" aria-label="System layers">
                {securityLayers.map((layer, i) =>
                  <li
                    key={layer.id}
                    className="relative flex flex-wrap items-center justify-between gap-2 rounded-xl border border-line bg-white px-3 py-2.5 md:gap-3 md:px-4 md:py-3">
                    
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-forest-50 text-forest-800">
                        <ServiceIcon name={layer.icon} className="h-4 w-4" strokeWidth={2} />
                      </span>
                      <div className="min-w-0">
                        <p className="text-[14px] font-medium text-ink">{layer.label}</p>
                        <p className="hidden truncate text-[12px] text-muted sm:block">{layer.control}</p>
                      </div>
                    </div>
                    <StateBadge state={layerState(i)} highlighted={eventLayer === i} />
                  </li>
                  )}
              </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>);

}

interface SecurityRingProps {
  index: number;
  label: string;
  className: string;
  progress: MotionValue<number>;
}

function SecurityRing({ index, label, className, progress }: SecurityRingProps) {
  const start = THRESHOLDS[index];
  const opacity = useTransform(progress, [start, start + 0.1], [0, 1]);
  const scale = useTransform(progress, [start, start + 0.1], [0.97, 1]);
  const inset = (2 - index) * 14;
  return (
    <motion.div
      aria-hidden="true"
      style={{ opacity, scale, inset: `${inset}px` }}
      className={cn('absolute rounded-[28px] border-[1.5px]', className)}>
      
      <span className="absolute -top-2 left-6 bg-white px-1.5 font-mono text-[9px] font-medium uppercase tracking-[0.14em] text-forest-700">
        {label}
      </span>
    </motion.div>);

}

function StateBadge({ state, highlighted }: {state: number;highlighted: boolean;}) {
  const config = [
  { label: 'Unprotected', Icon: ShieldOffIcon, className: 'border-dashed border-faint/60 bg-white text-muted' },
  { label: 'Tested', Icon: ScanSearchIcon, className: 'border-forest-600 bg-white text-forest-700' },
  { label: 'Secured', Icon: ShieldCheckIcon, className: 'border-forest-800 bg-forest-800 text-white' },
  { label: 'Monitored', Icon: ActivityIcon, className: 'border-forest-800 bg-forest-800 text-white' }][
  state];
  const { Icon } = config;
  return (
    <span
      className={cn(
        'flex min-w-[112px] items-center justify-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.1em] transition-colors duration-200 sm:min-w-[124px]',
        highlighted ? 'border-lemon-600 bg-lemon text-ink' : config.className
      )}>
      
      <Icon className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
      {config.label}
      {state === 3 && !highlighted && <span className="h-1.5 w-1.5 rounded-full bg-lemon" aria-hidden="true" />}
    </span>);

}
