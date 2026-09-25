import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from 'lucide-react';
import { Seo } from '../components/layout/Seo';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { MaskText } from '../components/ui/MaskText';
import { ServiceIcon } from '../components/ui/ServiceIcon';
import { ProjectCTA } from '../components/shared/ProjectCTA';
import { pillars } from '../data/capabilities';
import { servicePages } from '../data/servicePages';

const CRUMBS = [
{ name: 'Home', path: '/' },
{ name: 'Services', path: '/services' }];


export function ServicesIndex() {
  return (
    <>
      <Seo path="/services" />
      

      <section className="bg-white pb-16 pt-28 md:pb-20 md:pt-36">
        <div className="container-page">
          <Breadcrumbs items={CRUMBS} />
          <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-end">
            <MaskText
              as="h1"
              text="Every layer of the software your business runs on."
              highlight={['every', 'layer']}
              className="display-heading text-[clamp(2.5rem,5.4vw,5.5rem)] leading-[0.94] text-ink lg:col-span-8" />
            
            <p className="text-[17px] leading-relaxed text-muted lg:col-span-4">
              Thirteen disciplines, organised into five practices — so one team can take a system from idea to operation.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white pb-28 md:pb-36" aria-label="Services by practice">
        <div className="container-page">
          {pillars.map((pillar) => {
            const pages = servicePages.filter((page) => page.pillar === pillar.id);
            return (
              <div key={pillar.id} className="grid gap-6 border-t border-line py-10 lg:grid-cols-12 lg:gap-10 lg:py-14">
                <div className="lg:col-span-4">
                  <h2 className="display-heading text-3xl text-ink">{pillar.label}</h2>
                  <p className="mt-2 text-[15px] text-muted">{pillar.description}</p>
                </div>
                <ul className="lg:col-span-8">
                  {pages.map((page) =>
                  <li key={page.slug} className="border-b border-line last:border-b-0">
                      <Link
                      to={`/services/${page.slug}`}
                      data-cursor="open"
                      className="group -mx-4 flex items-center gap-5 rounded-2xl px-4 py-5 transition-colors duration-200 hover:bg-soft">
                      
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-forest-50 text-forest-800 transition-colors duration-200 group-hover:bg-forest-800 group-hover:text-lemon">
                          <ServiceIcon name={page.icon} className="h-5 w-5" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block font-display text-[20px] font-semibold tracking-[-0.02em] text-ink md:text-[24px]">{page.title}</span>
                          <span className="mt-0.5 block text-[14px] text-muted md:text-[15px]">{page.heroTitle}</span>
                        </span>
                        <ArrowRightIcon
                        className="h-5 w-5 shrink-0 text-forest-800 transition-transform duration-200 ease-out-strong group-hover:translate-x-1"
                        aria-hidden="true" />
                      
                      </Link>
                    </li>
                  )}
                </ul>
              </div>);

          })}
        </div>
      </section>

      <ProjectCTA />
    </>);

}