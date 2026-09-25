import React from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { CaseStudyEntry } from '../shared/CaseStudyEntry';
import { caseStudies } from '../../data/caseStudies';

export function CaseStudiesSection() {
  return (
    <section id="case-studies" aria-labelledby="case-studies-title" className="scroll-mt-20 bg-soft py-28 md:py-36">
      <div className="container-page">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <SectionHeading
            className="lg:col-span-7"
            id="case-studies-title"
            label="Case studies"
            title="Case studies, told in full." />
          
          <p className="max-w-md text-[15px] leading-relaxed text-muted lg:col-span-5 lg:justify-self-end">
            Ctrotech.com case studies are being prepared for publication with client approval. The entries below are clearly
            marked placeholders that show the format every study will follow — no clients or results are implied.
          </p>
        </div>
        <div className="mt-16 space-y-24 md:mt-20 md:space-y-32">
          {caseStudies.map((study, i) =>
          <CaseStudyEntry key={study.id} study={study} index={i} />
          )}
        </div>
      </div>
    </section>);

}