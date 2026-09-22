import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SectionHeading } from '../ui/SectionHeading';
import { techCategories } from '../../data/technologies';
import { EASE_OUT, popIn, staggerContainer } from '../../utils/motion';
import { cn } from '../../utils/cn';

/** The stack as layers. Hover, focus or tap a layer to bring it forward. */
export function TechnologySection() {
  const [active, setActive] = useState(0);

  return (
    <section id="technology" aria-labelledby="technology-title" className="scroll-mt-20 bg-white py-28 md:py-36">
      <div className="container-page">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <SectionHeading
            className="lg:col-span-7"
            id="technology-title"
            label="Technology ecosystem"
            title="Proven technology, engineered together."
            highlight={['together.']} />
          
          <p className="max-w-md text-[16px] leading-relaxed text-muted lg:col-span-5 lg:justify-self-end">
            The stack we build with every day — chosen for reliability, security and long-term maintainability, layer by layer.
          </p>
        </div>

        <ul className="mt-14 border-t border-line">
          {techCategories.map((category, i) => {
            const on = i === active;
            return (
              <li
                key={category.id}
                onMouseEnter={() => setActive(i)}
                className={cn('relative border-b border-line transition-colors duration-200', on ? 'bg-soft' : 'bg-white')}>
                
                <span
                  aria-hidden="true"
                  className={cn(
                    'absolute bottom-0 left-0 top-0 w-[3px] origin-top bg-forest-800 transition-transform duration-200 ease-out-strong',
                    on ? 'scale-y-100' : 'scale-y-0'
                  )} />
                
                <div className="grid gap-4 px-4 py-5 md:grid-cols-12 md:items-center md:gap-6 md:px-6 md:py-6">
                  <div className="md:col-span-4">
                    <button
                      type="button"
                      onClick={() => setActive(i)}
                      onFocus={() => setActive(i)}
                      aria-expanded={on}
                      aria-controls={`tech-${category.id}`}
                      className="flex w-full items-center gap-4 text-left">
                      
                      <span className={cn('font-mono text-[11px] transition-colors', on ? 'text-forest-700' : 'text-faint')}>
                        L{String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="font-display text-[22px] font-semibold tracking-[-0.02em] text-ink md:text-[26px]">{category.name}</span>
                      <span
                        aria-hidden="true"
                        className={cn('ml-auto h-2 w-2 rounded-full bg-lemon-600 transition-transform duration-200 md:ml-2', on ? 'scale-100' : 'scale-0')} />
                      
                    </button>
                    <AnimatePresence initial={false}>
                      {on &&
                      <motion.p
                        id={`tech-${category.id}`}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.22, ease: EASE_OUT }}
                        className="overflow-hidden pl-[42px] text-[14px] leading-relaxed text-muted">
                        
                          <span className="block pt-2">{category.description}</span>
                        </motion.p>
                      }
                    </AnimatePresence>
                  </div>
                  <motion.ul
                    className="flex flex-wrap gap-2 md:col-span-8"
                    variants={staggerContainer(0.035)}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.6 }}>
                    
                    {category.items.map((item) =>
                    <motion.li
                      key={item}
                      variants={popIn}
                      className={cn(
                        'rounded-full border px-3.5 py-1.5 text-[14px] font-medium transition-colors duration-200',
                        on ? 'border-forest-800 bg-forest-800 text-white' : 'border-line bg-white text-ink/80'
                      )}>
                      
                        {item}
                      </motion.li>
                    )}
                  </motion.ul>
                </div>
              </li>);

          })}
        </ul>
      </div>
    </section>);

}