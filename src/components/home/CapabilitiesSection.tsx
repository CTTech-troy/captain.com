import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SectionHeading } from '../ui/SectionHeading';
import { ServiceCard } from './ServiceCard';
import { capabilities, pillars } from '../../data/capabilities';
import { cn } from '../../utils/cn';
import type { PillarId } from '../../types/content';

type Filter = PillarId | 'all';

export function CapabilitiesSection() {
  const [filter, setFilter] = useState<Filter>('all');
  const visible = filter === 'all' ? capabilities : capabilities.filter((c) => c.pillar === filter);
  const filters: {id: Filter;label: string;}[] = [{ id: 'all', label: 'All' }, ...pillars.map((p) => ({ id: p.id, label: p.label }))];

  return (
    <section id="capabilities" aria-labelledby="capabilities-title" className="scroll-mt-20 bg-white pb-28 pt-8 md:pb-36">
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <SectionHeading
            className="lg:col-span-7"
            id="capabilities-title"
            label="Our capabilities"
            title="End-to-end technology for a smarter future."
            highlight={['end-to-end']}
            support="From product development to long-term operation, we build secure, scalable and intelligent technology systems." />
          
          <div className="lg:col-span-5 lg:justify-self-end">
            <p className="label-mono mb-3 text-muted" id="capability-filter-label">
              Filter by discipline
            </p>
            <div role="group" aria-labelledby="capability-filter-label" className="flex flex-wrap gap-2">
              {filters.map((f) => {
                const active = filter === f.id;
                return (
                  <button
                    key={f.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setFilter(f.id)}
                    className={cn(
                      'relative h-9 whitespace-nowrap rounded-full border px-4 text-[13px] font-medium transition-colors duration-200',
                      active ? 'border-forest-800 text-white' : 'border-line bg-white text-ink/75 hover:border-forest-600 hover:text-ink'
                    )}>
                    
                    {active &&
                    <motion.span
                      layoutId="capability-filter"
                      className="absolute inset-0 rounded-full bg-forest-800"
                      transition={{ type: 'spring', stiffness: 500, damping: 40 }} />

                    }
                    <span className="relative">{f.label}</span>
                  </button>);

              })}
            </div>
          </div>
        </div>

        <motion.ul layout className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <AnimatePresence>
            {visible.map((capability, i) =>
            <ServiceCard key={capability.id} capability={capability} index={i} />
            )}
          </AnimatePresence>
        </motion.ul>
      </div>
    </section>);

}