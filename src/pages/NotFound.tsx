import React from 'react';
import { Seo } from '../components/layout/Seo';
import { CtrotechSymbol } from '../components/brand/CtrotechSymbol';
import { ButtonLink } from '../components/ui/ButtonLink';

export function NotFound() {
  return (
    <>
      <Seo path="/404" />
      <section className="flex min-h-[80vh] items-center bg-white pb-20 pt-32">
        <div className="container-page">
          <CtrotechSymbol size={64} draw className="text-forest-800" />
          <p className="label-mono mt-8 text-forest-700">Error 404</p>
          <h1 className="display-heading mt-4 text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.94] text-ink">This route isn’t on the map.</h1>
          <p className="mt-6 max-w-lg text-[17px] leading-relaxed text-muted">
            The page may have moved or never existed. Head back to the start, or explore what we build.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink to="/">Back to home</ButtonLink>
            <ButtonLink to="/services" variant="secondary">
              Explore services
            </ButtonLink>
          </div>
        </div>
      </section>
    </>);

}