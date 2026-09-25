import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRightIcon, ArrowUpRightIcon, CheckIcon, ShieldCheckIcon, XIcon } from 'lucide-react';
import { Seo } from '../components/layout/Seo';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { MaskText } from '../components/ui/MaskText';
import { SectionHeading } from '../components/ui/SectionHeading';
import { ServiceIcon } from '../components/ui/ServiceIcon';
import { ButtonLink } from '../components/ui/ButtonLink';
import { CaseStudyEntry } from '../components/shared/CaseStudyEntry';
import { ProjectCTA } from '../components/shared/ProjectCTA';
import { NotFound } from './NotFound';
import { servicePages } from '../data/servicePages';
import { caseStudiesForService, findIndustry, findServicePage, pillarLabel } from '../utils/content';
import { EASE_OUT, fadeUp, popIn, staggerContainer } from '../utils/motion';

export function ServiceDetail() {
  const { slug } = useParams();
  const page = findServicePage(slug);
  if (!page) return <NotFound />;

  const crumbs = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
  { name: page.title, path: `/services/${page.slug}` }];

  const study = caseStudiesForService(page.slug)[0];
  const related = servicePages.filter((p) => p.pillar === page.pillar && p.slug !== page.slug).slice(0, 3);
  const relatedFallback = related.length > 0 ? related : servicePages.filter((p) => p.slug !== page.slug).slice(0, 3);

  return (
    <>
      <Seo path={`/services/${page.slug}`} />

      {/* Hero */}
      <section className="bg-white pb-20 pt-28 md:pb-28 md:pt-36">
        <div className="container-page">
          <Breadcrumbs items={crumbs} />
          <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <p className="label-mono flex items-center gap-2 text-forest-700">
                <ServiceIcon name={page.icon} className="h-3.5 w-3.5" strokeWidth={2} />
                {page.title} · {pillarLabel(page.pillar)}
              </p>
              <MaskText as="h1" text={page.heroTitle} className="display-heading mt-6 text-[clamp(2.5rem,5.2vw,5.25rem)] leading-[0.94] text-ink" />
              <motion.p variants={fadeUp} initial="hidden" animate="visible" className="mt-7 max-w-xl text-[17px] leading-relaxed text-muted md:text-lg">
                {page.heroCopy}
              </motion.p>
              <div className="mt-9 flex flex-wrap gap-3">
                <ButtonLink to="/contact">Start a project</ButtonLink>
                <ButtonLink to="/services" variant="secondary">
                  All services
                </ButtonLink>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-3xl bg-soft p-6 md:p-8">
                <div className="flex items-center justify-between">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-forest-800 text-lemon">
                    <ServiceIcon name={page.icon} className="h-7 w-7" />
                  </span>
                  <span className="label-mono text-muted">Capability stack</span>
                </div>
                <motion.ol className="mt-8 space-y-2" variants={staggerContainer(0.07, 0.2)} initial="hidden" animate="visible">
                  {page.capabilities.map((cap, i) =>
                  <motion.li
                    key={cap.title}
                    variants={{ hidden: { opacity: 0, x: 24 }, visible: { opacity: 1, x: 0, transition: { duration: 0.28, ease: EASE_OUT } } }}
                    className="flex items-center gap-3 rounded-xl border border-line bg-white px-4 py-3"
                    style={{ marginLeft: `${i * 12}px` }}>
                    
                      <span className="font-mono text-[11px] text-forest-700">{String(i + 1).padStart(2, '0')}</span>
                      <span className="text-[15px] font-medium text-ink">{cap.title}</span>
                      {i === page.capabilities.length - 1 && <span className="ml-auto h-2 w-2 rounded-full bg-lemon-600" aria-hidden="true" />}
                    </motion.li>
                  )}
                </motion.ol>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem → Solution */}
      <section className="bg-white pb-24 md:pb-32" aria-label="Problem and solution">
        <div className="container-page grid gap-4 md:grid-cols-2">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.4 }} className="rounded-3xl bg-mist p-8 md:p-12">
            <p className="label-mono text-muted">The problem</p>
            <h2 className="mt-4 font-display text-[clamp(1.75rem,2.8vw,2.5rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-ink">{page.problem.title}</h2>
            <p className="mt-4 text-[16px] leading-relaxed text-muted">{page.problem.body}</p>
            <ul className="mt-8 space-y-3">
              {page.problem.points.map((point) =>
              <li key={point} className="flex items-start gap-3 text-[15px] text-ink">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-faint/50 text-muted">
                    <XIcon className="h-3 w-3" aria-hidden="true" />
                  </span>
                  {point}
                </li>
              )}
            </ul>
          </motion.div>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: 0.08 }}
            className="rounded-3xl bg-forest-800 p-8 text-white md:p-12">
            
            <p className="label-mono text-lemon">Our solution</p>
            <h2 className="mt-4 font-display text-[clamp(1.75rem,2.8vw,2.5rem)] font-semibold leading-[1.05] tracking-[-0.03em]">{page.solution.title}</h2>
            <p className="mt-4 text-[16px] leading-relaxed text-white/80">{page.solution.body}</p>
            <ul className="mt-8 space-y-3">
              {page.solution.points.map((point) =>
              <li key={point} className="flex items-start gap-3 text-[15px]">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-lemon text-ink">
                    <CheckIcon className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
                  </span>
                  {point}
                </li>
              )}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="bg-soft py-24 md:py-32" aria-labelledby="service-capabilities">
        <div className="container-page grid gap-12 lg:grid-cols-12">
          <SectionHeading className="lg:col-span-4" id="service-capabilities" size="md" label="Capabilities" title="What we deliver." />
          <div className="grid gap-x-10 sm:grid-cols-2 lg:col-span-8">
            {page.capabilities.map((cap, i) =>
            <motion.div
              key={cap.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: i % 2 * 0.06 }}
              className="border-t border-line py-7">
              
                <p className="font-mono text-[12px] text-forest-700">{String(i + 1).padStart(2, '0')}</p>
                <h3 className="mt-2 font-display text-[24px] font-semibold tracking-[-0.02em] text-ink">{cap.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{cap.body}</p>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-white py-24 md:py-32" aria-labelledby="service-process">
        <div className="container-page">
          <SectionHeading id="service-process" size="md" label="Process" title="How we deliver it." />
          <motion.div
            className="relative mt-14"
            variants={staggerContainer(0.08)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}>
            
            <motion.span
              aria-hidden="true"
              className="absolute left-0 right-0 top-[19px] hidden h-px origin-left bg-forest-600 md:block"
              variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1, transition: { duration: 0.3, ease: EASE_OUT } } }} />
            
            <motion.ol className="relative grid gap-10 md:grid-cols-4 md:gap-6" variants={staggerContainer(0.08)}>
            {page.process.map((stage, i) =>
              <motion.li key={stage.title} variants={fadeUp} className="relative">
                <span className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-forest-700 bg-white font-mono text-[12px] text-forest-800">
                  {i + 1}
                  {i === page.process.length - 1 && <span className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full border-2 border-white bg-lemon" />}
                </span>
                <h3 className="mt-5 font-display text-[20px] font-semibold tracking-[-0.02em] text-ink">{stage.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{stage.body}</p>
              </motion.li>
              )}
            </motion.ol>
          </motion.div>
        </div>
      </section>

      {/* Technology & security */}
      <section className="bg-white pb-24 md:pb-32" aria-label="Technology and security">
        <div className="container-page grid gap-4 lg:grid-cols-2">
          <div className="rounded-3xl border border-line p-8 md:p-10">
            <h2 className="label-mono text-forest-700">Technology</h2>
            <motion.ul className="mt-6 flex flex-wrap gap-2" variants={staggerContainer(0.04)} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.6 }}>
              {page.technology.map((tech) =>
              <motion.li key={tech} variants={popIn} className="rounded-full border border-line bg-white px-4 py-2 text-[15px] font-medium text-ink">
                  {tech}
                </motion.li>
              )}
            </motion.ul>
          </div>
          <div className="rounded-3xl bg-soft p-8 md:p-10">
            <h2 className="label-mono text-forest-700">Security built in</h2>
            <ul className="mt-6 space-y-4">
              {page.security.map((item) =>
              <li key={item} className="flex items-start gap-3 text-[16px] text-ink">
                  <ShieldCheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-forest-700" aria-hidden="true" />
                  {item}
                </li>
              )}
            </ul>
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="border-t border-line bg-white py-16" aria-labelledby="service-industries">
        <div className="container-page flex flex-col gap-6 md:flex-row md:items-center md:gap-10">
          <h2 id="service-industries" className="label-mono shrink-0 text-muted">
            Relevant industries
          </h2>
          <ul className="flex flex-wrap gap-2">
            {page.industries.map((id) => {
              const industry = findIndustry(id);
              if (!industry) return null;
              return (
                <li key={id}>
                  <Link
                    to="/#industries"
                    className="group inline-flex items-center gap-1.5 rounded-full bg-forest-50 px-4 py-2 text-[14px] font-medium text-forest-800 transition-colors duration-200 hover:bg-forest-800 hover:text-white">
                    
                    {industry.name}
                    <ArrowUpRightIcon className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                  </Link>
                </li>);

            })}
          </ul>
        </div>
      </section>

      {/* Case study */}
      <section className="bg-soft py-24 md:py-32" aria-labelledby="service-case-study">
        <div className="container-page">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <SectionHeading className="lg:col-span-7" id="service-case-study" size="md" label="Case studies" title="From the field." />
            <p className="max-w-md text-[15px] leading-relaxed text-muted lg:col-span-5 lg:justify-self-end">
              Published case studies will appear here once approved by clients. The entry below is a placeholder showing the format.
            </p>
          </div>
          {study &&
          <div className="mt-14">
              <CaseStudyEntry study={study} index={0} />
            </div>
          }
        </div>
      </section>

      {/* Related services — internal linking */}
      <section className="bg-white py-16 md:py-20" aria-labelledby="related-services">
        <div className="container-page">
          <h2 id="related-services" className="label-mono text-muted">
            Related services
          </h2>
          <ul className="mt-6 grid gap-3 md:grid-cols-3">
            {relatedFallback.map((item) =>
            <li key={item.slug}>
                <Link
                to={`/services/${item.slug}`}
                data-cursor="open"
                className="group flex h-full items-center justify-between gap-4 rounded-2xl border border-line p-5 transition-colors duration-200 hover:border-forest-600">
                
                  <span className="flex items-center gap-3">
                    <ServiceIcon name={item.icon} className="h-5 w-5 text-forest-700" />
                    <span className="font-display text-[18px] font-semibold tracking-[-0.01em] text-ink">{item.title}</span>
                  </span>
                  <ArrowRightIcon className="h-4 w-4 text-forest-800 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              </li>
            )}
          </ul>
        </div>
      </section>

      <ProjectCTA />
    </>);

}