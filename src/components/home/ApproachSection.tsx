import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CaptainSymbol } from '../brand/CaptainSymbol';
import { SectionHeading } from '../ui/SectionHeading';
import { ServiceIcon } from '../ui/ServiceIcon';
import { principles } from '../../data/process';
import { EASE_OUT } from '../../utils/motion';
import { cn } from '../../utils/cn';

const SIZE = 400;
const C = SIZE / 2;
const R = 150;

function arcPath(startDeg: number, endDeg: number): string {
  const toXY = (deg: number) => {
    const rad = deg * Math.PI / 180;
    return [C + R * Math.cos(rad), C + R * Math.sin(rad)];
  };
  const [x1, y1] = toXY(startDeg);
  const [x2, y2] = toXY(endDeg);
  return `M ${x1} ${y1} A ${R} ${R} 0 0 1 ${x2} ${y2}`;
}

/** Button placement around the wheel (percent of container), one per quadrant. */
const LABEL_POSITIONS = [
{ left: '86%', top: '14%' },
{ left: '86%', top: '86%' },
{ left: '14%', top: '86%' },
{ left: '14%', top: '14%' }];


export function ApproachSection() {
  const [selected, setSelected] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);
  const principle = principles[selected];

  const selector = (i: number, extra?: string) => {
    const p = principles[i];
    const active = i === selected;
    return (
      <button
        key={p.id}
        type="button"
        aria-pressed={active}
        onClick={() => setSelected(i)}
        onMouseEnter={() => setHovered(i)}
        onMouseLeave={() => setHovered(null)}
        onFocus={() => setHovered(i)}
        onBlur={() => setHovered(null)}
        className={cn(
          'flex items-center gap-2 whitespace-nowrap rounded-full border py-1.5 pl-1.5 pr-4 text-[13px] font-semibold uppercase tracking-[0.08em] transition-colors duration-200',
          active ? 'border-forest-800 bg-forest-800 text-white' : 'border-line bg-white text-ink hover:border-lemon-600',
          extra
        )}>
        
        <span className={cn('flex h-7 w-7 items-center justify-center rounded-full', active ? 'bg-white/10 text-lemon' : 'bg-forest-50 text-forest-700')}>
          <ServiceIcon name={p.icon} className="h-4 w-4" strokeWidth={2} />
        </span>
        {p.title}
      </button>);

  };

  return (
    <section aria-labelledby="approach-title" className="bg-white py-28 md:py-36">
      <div className="container-page grid items-center gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeading
            id="approach-title"
            label="The Captain approach"
            title="Technology built for real impact."
            highlight={['impact.']}
            support="We combine software engineering, artificial intelligence, cybersecurity and digital infrastructure to solve complex business problems." />
          
          <div className="mt-10 min-h-[220px] border-t border-line pt-8" aria-live="polite">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={principle.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.22, ease: EASE_OUT }}>
                
                <h3 className="display-heading text-3xl text-forest-800">{principle.title}</h3>
                <p className="mt-3 text-[16px] leading-relaxed text-muted">{principle.body}</p>
                <ul className="mt-5 space-y-2">
                  {principle.points.map((point) =>
                  <li key={point} className="flex items-center gap-3 text-[15px] text-ink">
                      <span className="h-1.5 w-1.5 rounded-full bg-lemon-600" aria-hidden="true" />
                      {point}
                    </li>
                  )}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="relative mx-auto aspect-square w-full max-w-[520px]">
            <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="absolute inset-0 h-full w-full" aria-hidden="true">
              <circle cx={C} cy={C} r={R - 44} fill="none" stroke="#E3E7E1" strokeDasharray="2 6" />
              {principles.map((p, i) => {
                const start = -90 + i * 90 + 5;
                const end = -90 + (i + 1) * 90 - 5;
                const active = i === selected;
                const hover = hovered === i && !active;
                return (
                  <g key={p.id}>
                    <path d={arcPath(start, end)} fill="none" stroke={hover ? '#E6F04A' : '#EFF8F2'} strokeWidth={26} className="transition-[stroke] duration-200" />
                    {active &&
                    <motion.path
                      key={`active-${p.id}`}
                      d={arcPath(start, end)}
                      fill="none"
                      stroke="#0E4A32"
                      strokeWidth={26}
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.3, ease: EASE_OUT }} />

                    }
                  </g>);

              })}
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <CaptainSymbol size={64} className="text-forest-800" />
              <AnimatePresence mode="wait" initial={false}>
                <motion.p
                  key={principle.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="label-mono mt-4 text-forest-700">
                  
                  {principle.title}
                </motion.p>
              </AnimatePresence>
            </div>

            {principles.map((_, i) =>
            <div
              key={principles[i].id}
              className="absolute hidden -translate-x-1/2 -translate-y-1/2 md:block"
              style={LABEL_POSITIONS[i]}>
              
                {selector(i)}
              </div>
            )}
          </div>
          <div className="mt-6 grid grid-cols-2 gap-2 md:hidden">{principles.map((_, i) => selector(i, 'justify-start'))}</div>
        </div>
      </div>
    </section>);

}