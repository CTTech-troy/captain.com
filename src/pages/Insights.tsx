import React from 'react';
import { Seo } from '../components/layout/Seo';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { MaskText } from '../components/ui/MaskText';
import { ButtonLink } from '../components/ui/ButtonLink';
import { CtrotechSymbol } from '../components/brand/CtrotechSymbol';
import { articles, insightCategories } from '../data/insights';

const CRUMBS = [
{ name: 'Home', path: '/' },
{ name: 'Insights', path: '/insights' }];


export function Insights() {
  return (
    <>
      <Seo path="/insights" />
      
      <section className="min-h-[80vh] bg-white pb-28 pt-28 md:pt-36">
        <div className="container-page">
          <Breadcrumbs items={CRUMBS} />
          <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-end">
            <MaskText
              as="h1"
              text="Notes from the engineering floor."
              highlight={['engineering']}
              className="display-heading text-[clamp(2.5rem,5.4vw,5.5rem)] leading-[0.94] text-ink lg:col-span-8" />
            
            <p className="text-[17px] leading-relaxed text-muted lg:col-span-4">
              Practical writing on building, securing and operating software — from the people who do it.
            </p>
          </div>

          {articles.length === 0 ?
          <div className="mt-16 grid gap-10 rounded-3xl bg-soft p-8 md:p-12 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <CtrotechSymbol size={48} className="text-forest-800" />
                <h2 className="mt-6 font-display text-[28px] font-semibold tracking-[-0.02em] text-ink">The first articles are being written.</h2>
                <p className="mt-3 text-[16px] leading-relaxed text-muted">
                  We will publish only when we have something genuinely useful to say. In the meantime, tell us what you are working on.
                </p>
                <div className="mt-8">
                  <ButtonLink to="/contact">Start a conversation</ButtonLink>
                </div>
              </div>
              <div className="lg:col-span-6 lg:col-start-7">
                <h2 className="label-mono text-forest-700">Topics we'll cover</h2>
                <ul className="mt-5 border-t border-line">
                  {insightCategories.map((category) =>
                <li key={category} className="flex items-center justify-between border-b border-line py-4 text-[16px] text-ink">
                      {category}
                      <span className="label-mono text-muted">Soon</span>
                    </li>
                )}
                </ul>
              </div>
            </div> :

          <ul className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {articles.map((article) =>
            <li key={article.slug} className="border-t border-line pt-6">
                  <p className="label-mono text-forest-700">{article.category}</p>
                  <h2 className="mt-3 font-display text-[22px] font-semibold tracking-[-0.02em] text-ink">{article.title}</h2>
                  <p className="mt-2 text-[15px] text-muted">{article.excerpt}</p>
                  <p className="mt-4 font-mono text-[12px] text-faint">
                    {article.publishedAt} · {article.readingTime}
                  </p>
                </li>
            )}
            </ul>
          }
        </div>
      </section>
    </>);

}