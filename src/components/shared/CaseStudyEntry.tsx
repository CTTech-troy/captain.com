import React, { Fragment, useRef } from 'react';
import { motion, useTransform } from 'framer-motion';
import { useSceneProgress } from '../../hooks/useSceneProgress';
import { EASE_OUT, popIn, staggerContainer } from '../../utils/motion';
import { cn } from '../../utils/cn';
import type { CaseStudy } from '../../types/content';

interface CaseStudyEntryProps {
  study: CaseStudy;
  index: number;
  headingLevel?: 'h3' | 'h4';
}

/** Editorial case study with a subtle image zoom. */
export function CaseStudyEntry({ study, index, headingLevel = 'h3' }: CaseStudyEntryProps) {
  const ref = useRef<HTMLElement>(null);
  const { progress } = useSceneProgress(ref, ['start end', 'center center']);
  const reversed = index % 2 === 1;
  const imageScale = useTransform(progress, [0, 1], [1.03, 1]);
  const Heading = headingLevel;

  const rows: [string, string][] = [
  ['Client', study.client],
  ['Industry', study.industry],
  ['Solution', study.solution],
  ['Security', study.security],
  ['Results', study.results]];


  return (
    <article ref={ref} aria-labelledby={`${study.id}-title`} className="grid items-start gap-10 overflow-x-clip lg:grid-cols-12 lg:gap-14">
      <div className={cn('lg:col-span-7', reversed && 'lg:order-2')}>
        <motion.div className="relative overflow-hidden rounded-[20px] bg-mist" data-cursor="view">
          <motion.div style={{ scale: imageScale }} className="aspect-[3/2] w-full">
            <img
              src={study.image}
              srcSet={study.imageSrcSet}
              sizes="(min-width: 1024px) 56vw, 94vw"
              alt={study.imageAlt}
              loading="lazy"
              decoding="async"
              width={study.imageWidth}
              height={study.imageHeight}
              className="h-full w-full object-contain bg-white transition-transform duration-300 ease-out-strong hover:scale-[1.03]" />
            
          </motion.div>
          {study.isPlaceholder &&
          <span className="label-mono absolute left-4 top-4 rounded-full bg-lemon px-3 py-1.5 text-ink">Placeholder · Format preview</span>
          }
        </motion.div>

        <div className="mt-5">
          <p className="label-mono text-muted">Architecture</p>
          <motion.ol
            className="no-scrollbar mt-3 flex items-center overflow-x-auto"
            variants={staggerContainer(0.08)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.8 }}>
            
            {study.architecture.map((node, i) =>
            <Fragment key={node}>
                <motion.li
                variants={popIn}
                className={cn(
                  'shrink-0 whitespace-nowrap rounded-lg border px-3 py-2 font-mono text-[10px] font-medium uppercase tracking-[0.12em]',
                  i === study.architecture.length - 1 ? 'border-forest-800 bg-forest-800 text-white' : 'border-line bg-white text-ink'
                )}>
                
                  {node}
                </motion.li>
                {i < study.architecture.length - 1 &&
              <motion.li
                aria-hidden="true"
                variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1, transition: { duration: 0.22, ease: EASE_OUT } } }}
                className="h-px min-w-[16px] flex-1 origin-left bg-forest-600" />

              }
              </Fragment>
            )}
          </motion.ol>
        </div>
      </div>

      <motion.div className={cn('lg:col-span-5', reversed && 'lg:order-1')}>
        <p className="label-mono text-forest-700">{study.industry}</p>
        <Heading id={`${study.id}-title`} className="mt-3 font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-ink">
          {study.title}
          {study.isPlaceholder && <span className="sr-only"> (placeholder case study)</span>}
        </Heading>
        <dl className="mt-8 divide-y divide-line border-y border-line">
          {rows.map(([term, value]) =>
          <Row key={term} term={term} value={value} muted={study.isPlaceholder} />
          )}
        </dl>
      </motion.div>
    </article>);

}

function Row({ term, value, muted }: {term: string;value: string;muted: boolean;}) {
  return (
    <div className="grid grid-cols-[96px_1fr] gap-4 py-3.5 sm:grid-cols-[110px_1fr]">
      <dt className="label-mono pt-1 text-muted">{term}</dt>
      <dd className={cn('text-[14.5px] leading-relaxed', muted ? 'italic text-muted' : 'text-ink/85')}>{value}</dd>
    </div>);

}
