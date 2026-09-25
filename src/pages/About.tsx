import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useTransform } from 'framer-motion';
import { ArrowRightIcon } from 'lucide-react';
import { Seo } from '../components/layout/Seo';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { MaskText } from '../components/ui/MaskText';
import { ProjectCTA } from '../components/shared/ProjectCTA';
import { CtrotechSymbol } from '../components/brand/CtrotechSymbol';
import { aboutChapters } from '../data/about';
import { teamMembers } from '../data/team';
import { useActiveSection } from '../hooks/useActiveSection';
import { useSceneProgress } from '../hooks/useSceneProgress';
import { fadeUp } from '../utils/motion';
import { cn } from '../utils/cn';

const CRUMBS = [
{ name: 'Home', path: '/' },
{ name: 'About', path: '/about' }];

import images from '../generated/images.json';

export function About() {
  const imageRef = useRef<HTMLDivElement>(null);
  const { progress } = useSceneProgress(imageRef, ['start end', 'center center']);
  const clipPath = useTransform(progress, [0, 1], ['inset(8% 12% 8% 12% round 28px)', 'inset(0% 0% 0% 0% round 28px)']);
  const imageScale = useTransform(progress, [0, 1], [1.12, 1]);
  const chapterIds = [...aboutChapters.map((c) => c.id), 'careers'];
  const active = useActiveSection(chapterIds, true);

  return (
    <>
      <Seo path="/about" />
      

      <section className="bg-white pb-16 pt-28 md:pt-36">
        <div className="container-page">
          <Breadcrumbs items={CRUMBS} />
          <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <p className="label-mono flex items-center gap-2 text-forest-700">
                <CtrotechSymbol size={14} className="text-forest-700" />
                About Ctrotech.com
              </p>
              <MaskText
                as="h1"
                text="We build the software businesses depend on."
                highlight={['software']}
                className="display-heading mt-6 text-[clamp(2.75rem,6vw,6rem)] leading-[0.92] text-ink" />
              
            </div>
            <motion.p variants={fadeUp} initial="hidden" animate="visible" className="text-[17px] leading-relaxed text-muted lg:col-span-4">
              An international software engineering and technology company — combining engineering, artificial intelligence,
              cybersecurity and infrastructure to solve complex business problems.
            </motion.p>
          </div>
        </div>

        <div ref={imageRef} className="container-page mt-16">
          <motion.figure style={{ clipPath }} className="relative overflow-hidden rounded-[28px] bg-mist">
            <motion.img
              src={images.about.src}
              srcSet={images.about.srcSet}
              sizes="(min-width: 1440px) 1344px, 94vw"
              fetchPriority="high"
              alt={images.about.alt}
              style={{ scale: imageScale }}
              loading="eager"
              decoding="async"
              width={images.about.width}
              height={images.about.height}
              className="aspect-[16/9] w-full object-cover md:aspect-[21/9]" />
            
            <figcaption className="label-mono absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1.5 text-muted">Illustrative image</figcaption>
          </motion.figure>
        </div>
      </section>

      <section className="bg-white pb-28 md:pb-36" aria-label="The Ctrotech.com story">
        <div className="container-page grid gap-12 lg:grid-cols-12">
          <nav aria-label="About chapters" className="hidden self-start lg:sticky lg:top-28 lg:col-span-3 lg:block">
            <ol className="border-l border-line">
              {[...aboutChapters.map((c) => ({ id: c.id, label: c.label })), { id: 'careers', label: 'Team & careers' }].map((chapter) => {
                const on = active === chapter.id;
                return (
                  <li key={chapter.id}>
                    <a
                      href={`#${chapter.id}`}
                      aria-current={on ? 'location' : undefined}
                      className={cn(
                        'relative -ml-px block border-l py-2 pl-5 text-[14px] transition-colors duration-200',
                        on ? 'border-forest-800 font-medium text-ink' : 'border-transparent text-muted hover:text-ink'
                      )}>
                      
                      {chapter.label}
                    </a>
                  </li>);

              })}
            </ol>
          </nav>

          <div className="lg:col-span-8 lg:col-start-5">
            {aboutChapters.map((chapter) =>
            <section key={chapter.id} id={chapter.id} aria-labelledby={`${chapter.id}-title`} className="scroll-mt-28 border-t border-line py-14 md:py-20">
                <p className="label-mono text-forest-700">{chapter.label}</p>
                <MaskText
                as="h2"
                id={`${chapter.id}-title`}
                text={chapter.title}
                className="mt-4 font-display text-[clamp(1.875rem,3.4vw,3rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-ink" />
              
                <div className="mt-6 space-y-4">
                  {chapter.body.map((paragraph) =>
                <p key={paragraph} className="max-w-2xl text-[17px] leading-relaxed text-muted">
                      {paragraph}
                    </p>
                )}
                </div>
                {chapter.points &&
              <ul className="mt-8 flex flex-wrap gap-2">
                    {chapter.points.map((point) =>
                <li key={point} className="flex items-center gap-2 rounded-full bg-forest-50 px-3.5 py-1.5 text-[14px] font-medium text-forest-800">
                        <span className="h-1.5 w-1.5 rounded-full bg-lemon-600" aria-hidden="true" />
                        {point}
                      </li>
                )}
                  </ul>
              }
              </section>
            )}

            <section id="careers" aria-labelledby="careers-title" className="scroll-mt-28 border-t border-line py-14 md:py-20">
              <p className="label-mono text-forest-700">Team & careers</p>
              <h2 id="careers-title" className="mt-4 font-display text-[clamp(1.875rem,3.4vw,3rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-ink">
                The people behind the systems.
              </h2>
              {teamMembers.length === 0 ?
              <div className="mt-8 rounded-2xl border border-dashed border-forest-200 bg-soft p-6 md:p-8">
                  <p className="text-[16px] leading-relaxed text-muted">
                    Team profiles and open roles will be published here. If you want to build with us, introduce yourself — we read every message.
                  </p>
                  <Link to="/contact" className="group mt-5 inline-flex items-center gap-2 text-[15px] font-medium text-forest-800">
                    <span className="link-underline">Get in touch</span>
                    <ArrowRightIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
                  </Link>
                </div> :

              <ul className="mt-8 grid gap-6 sm:grid-cols-2">
                  {teamMembers.map((member) =>
                <li key={member.id}>
                      <img src={member.image} alt={member.name} loading="lazy" width={800} height={1000} className="aspect-[4/5] w-full rounded-2xl object-cover" />
                      <p className="mt-4 font-display text-lg font-semibold text-ink">{member.name}</p>
                      <p className="text-[14px] text-muted">{member.role}</p>
                    </li>
                )}
                </ul>
              }
            </section>
          </div>
        </div>
      </section>

      <ProjectCTA />
    </>);

}