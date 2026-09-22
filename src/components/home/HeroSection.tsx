import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { CheckIcon, PlayIcon } from 'lucide-react';
import { ButtonLink } from '../ui/ButtonLink';
import { HeroVisual } from './HeroVisual';
import { EcosystemStrip } from './EcosystemStrip';
import { brand, heroAssurances } from '../../data/site';
import { useIntro } from '../../contexts/IntroContext';
import { EASE_OUT } from '../../utils/motion';

export function HeroSection() {
  const { done } = useIntro();
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const headY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 90]);
  const visualY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -70]);
  const visualScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 0.94]);
  const ringRotate = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 110]);

  const reveal = (delay: number) => ({
    initial: { opacity: 0, y: 14 },
    animate: done ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.28, delay, ease: EASE_OUT }
  });

  const lines = [
  <>We build</>,
  <>
      The <span className="text-forest-800">software</span>
    </>,
  <>
      Businesses depend on
      <span className="ml-[0.06em] inline-block h-[0.2em] w-[0.2em] rounded-full bg-lemon align-baseline ring-1 ring-lemon-600" aria-hidden="true" />
      <span className="sr-only">.</span>
    </>];


  return (
    <section ref={ref} id="top" aria-labelledby="hero-title" className="relative overflow-hidden bg-white pt-24 md:pt-28">
      <div className="container-page grid min-h-[calc(100svh-15rem)] items-center gap-12 lg:grid-cols-12 lg:gap-6">
        <motion.div style={{ y: headY }} className="relative z-10 lg:col-span-7">
          <motion.p {...reveal(0)} className="label-mono text-forest-700">
            {brand.secondaryMessage}
          </motion.p>
          <h1
            id="hero-title"
            className="display-heading mt-6 text-[clamp(2.75rem,6.2vw,6.5rem)] leading-[0.92] tracking-[-0.045em] text-ink">
            
            {lines.map((line, i) =>
            <span key={i} className="block overflow-hidden pb-[0.05em]">
                <motion.span
                className="block"
                initial={{ y: '110%' }}
                animate={done ? { y: '0%' } : {}}
                transition={{ duration: 0.3, delay: 0.08 + i * 0.13, ease: EASE_OUT }}>
                
                  {line}
                </motion.span>
              </span>
            )}
          </h1>
          <motion.p {...reveal(0.46)} className="mt-8 max-w-[34rem] text-[17px] leading-relaxed text-muted md:text-lg">
            {brand.heroCopy}
          </motion.p>

          <motion.div {...reveal(0.54)} className="mt-9 flex flex-row items-center gap-2 overflow-x-auto pb-1 sm:gap-3 [scrollbar-width:none]">
            <ButtonLink className="shrink-0" to="/contact">Start a project</ButtonLink>
            <ButtonLink className="shrink-0" to="/#capabilities" variant="secondary">
              Explore our services
            </ButtonLink>
            <button
              type="button"
              aria-disabled="true"
              aria-describedby="intro-film-note"
              className="group shrink-0 inline-flex items-center gap-3 rounded-full py-1 pr-2 text-left">
              
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-line bg-white transition-colors duration-200 group-hover:border-forest-800">
                <PlayIcon className="ml-0.5 h-4 w-4 fill-forest-800 text-forest-800" aria-hidden="true" />
              </span>
              <span className="leading-tight">
                <span className="block text-[14px] font-medium text-ink">Watch intro</span>
                <span id="intro-film-note" className="block font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                  Film coming soon
                </span>
              </span>
            </button>
          </motion.div>

          <motion.ul {...reveal(0.62)} className="mt-10 flex flex-wrap gap-x-7 gap-y-3">
            {heroAssurances.map((item) =>
            <li key={item} className="label-mono flex items-center gap-2 text-ink">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-forest-50 text-forest-700">
                  <CheckIcon className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
                </span>
                {item}
              </li>
            )}
          </motion.ul>
        </motion.div>

        <motion.div style={{ y: visualY, scale: visualScale }} className="relative lg:col-span-5">
          <HeroVisual ready={done} ringRotate={ringRotate} />
        </motion.div>
      </div>

      <EcosystemStrip ready={done} />
    </section>);

}