import React, { useRef } from 'react';
import { motion, useTransform } from 'framer-motion';
import { CtrotechSymbol } from '../brand/CtrotechSymbol';
import { ButtonLink } from '../ui/ButtonLink';
import { MaskText } from '../ui/MaskText';
import { useSceneProgress } from '../../hooks/useSceneProgress';

interface ProjectCTAProps {
  title?: string;
  support?: string;
}

/** Closing scene: a green field expands from a point into the project call to action. */
export function ProjectCTA({
  title = 'Let’s build what your business depends on.',
  support = 'Tell us what you’re trying to solve. We’ll help define the technology required to build it.'
}: ProjectCTAProps) {
  const ref = useRef<HTMLElement>(null);
  const { progress } = useSceneProgress(ref, ['start end', 'start 20%']);
  const clipPath = useTransform(progress, [0, 1], ['circle(6% at 50% 70%)', 'circle(150% at 50% 70%)']);
  const symbolRotate = useTransform(progress, [0, 1], [-90, 0]);

  return (
    <section ref={ref} aria-labelledby="cta-title" className="bg-white px-3 pb-3 sm:px-4 sm:pb-4">
      <motion.div style={{ clipPath }} className="relative overflow-hidden rounded-[28px] bg-forest-800 text-white">
        <motion.div style={{ rotate: symbolRotate }} className="pointer-events-none absolute -right-28 -top-28 text-forest-700" aria-hidden="true">
          <CtrotechSymbol size={520} strokeWidth={4} accentClassName="fill-lemon/80" />
        </motion.div>
        <div className="container-page relative grid gap-12 py-24 md:py-36 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="label-mono flex items-center gap-2 text-lemon">
              <CtrotechSymbol size={14} className="text-white" />
              Start a project
            </p>
            <MaskText
              as="h2"
              id="cta-title"
              text={title}
              className="display-heading mt-6 text-[clamp(2.5rem,6vw,6rem)] leading-[0.92] text-white" />
            
          </div>
          <div className="lg:col-span-4">
            <p className="text-[17px] leading-relaxed text-white/80">{support}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink to="/contact" variant="lemon">
                Start a project
              </ButtonLink>
              <ButtonLink to="/services" variant="inverse">
                Explore services
              </ButtonLink>
            </div>
          </div>
        </div>
      </motion.div>
    </section>);

}