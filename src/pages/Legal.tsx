import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Seo } from '../components/layout/Seo';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { NotFound } from './NotFound';
import { legalDocuments } from '../data/site';

export function Legal() {
  const { slug } = useParams();
  const doc = legalDocuments.find((d) => d.slug === slug);
  if (!doc) return <NotFound />;

  const crumbs = [
  { name: 'Home', path: '/' },
  { name: doc.title, path: `/legal/${doc.slug}` }];


  return (
    <>
      <Seo path={`/legal/${doc.slug}`} />
      <section className="min-h-[75vh] bg-white pb-28 pt-28 md:pt-36">
        <div className="container-page max-w-4xl">
          <Breadcrumbs items={crumbs} />
          <h1 className="display-heading mt-10 text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.95] text-ink">{doc.title}</h1>
          <p className="mt-6 text-[18px] leading-relaxed text-muted">{doc.summary}</p>
          <div className="mt-12 rounded-2xl border border-dashed border-forest-200 bg-soft p-6 md:p-8">
            <p className="label-mono text-forest-700">Document in preparation</p>
            <p className="mt-3 text-[16px] leading-relaxed text-ink/85">
              The full {doc.title.toLowerCase()} is being finalised and will be published here. For questions in the meantime
              {doc.slug === 'security' ? ', including responsible disclosure of a vulnerability,' : ''} please{' '}
              <Link to="/contact" className="font-medium text-forest-800 underline decoration-forest-200 underline-offset-4 hover:decoration-forest-800">
                contact us
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </>);

}