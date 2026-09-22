import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDownIcon } from 'lucide-react';
import { ServiceIcon } from '../ui/ServiceIcon';
import { ecosystemNodes } from '../../data/scenes';
import { EASE_OUT } from '../../utils/motion';
import { cn } from '../../utils/cn';

/** DATA → APPLICATIONS → AI → SECURITY → INFRASTRUCTURE → BUSINESS, connected in sequence. */
export function EcosystemStrip({ ready }: {ready: boolean;}) {
  const count = ecosystemNodes.length;

  return (
    <div className="container-page relative pb-12 pt-10 md:pb-16 md:pt-14">
      <div className="flex items-center justify-between border-t border-line pt-5">
        <p className="label-mono text-muted">The Captain ecosystem</p>
        <p className="label-mono hidden items-center gap-2 text-muted sm:flex">
          Scroll to explore <ArrowDownIcon className="h-3.5 w-3.5" aria-hidden="true" />
        </p>
      </div>

      <div className="relative mt-8">
        {ecosystemNodes.slice(0, -1).map((node, i) =>
        <motion.span
          key={`segment-${node.id}`}
          aria-hidden="true"
          className="absolute top-[18px] hidden h-px origin-left bg-forest-600 md:block"
          style={{ left: `${(i + 0.5) / count * 100}%`, width: `${100 / count}%` }}
          initial={{ scaleX: 0 }}
          animate={ready ? { scaleX: 1 } : {}}
          transition={{ duration: 0.25, delay: 0.8 + i * 0.12, ease: EASE_OUT }} />

        )}

        <ol className="relative grid grid-cols-3 gap-y-8 md:grid-cols-6" aria-label="Technology ecosystem">
        {ecosystemNodes.map((node, i) => {
            const last = i === count - 1;
            return (
              <li key={node.id} className="relative flex flex-col items-center gap-3 text-center">
              <motion.span
                  className={cn(
                    'relative z-10 flex h-9 w-9 items-center justify-center rounded-full border',
                    last ? 'border-forest-800 bg-forest-800 text-white' : 'border-forest-200 bg-white text-forest-800'
                  )}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={ready ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.22, delay: 0.7 + i * 0.12, ease: EASE_OUT }}>
                  
                <ServiceIcon name={node.icon} className="h-4 w-4" strokeWidth={2} />
                {last && <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-lemon" />}
              </motion.span>
              <motion.span
                  className="label-mono text-ink"
                  initial={{ opacity: 0 }}
                  animate={ready ? { opacity: 1 } : {}}
                  transition={{ duration: 0.22, delay: 0.76 + i * 0.12 }}>
                  
                {node.label}
              </motion.span>
            </li>);

          })}
        </ol>
      </div>
    </div>);

}