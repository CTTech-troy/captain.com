import React from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { SystemDiagram } from './SystemDiagram';

export function IntroSection() {
  return (
    <section aria-labelledby="intro-title" className="relative bg-white py-24 md:py-36">
      <div className="container-page grid items-center gap-14 lg:grid-cols-12 lg:gap-8">
        <SectionHeading
          className="lg:col-span-5"
          id="intro-title"
          label="Ctrotech.com"
          title="Software is infrastructure."
          highlight={['infrastructure.']}
          support="We engineer digital systems that support operations, automate workflows, protect data and help businesses scale." />
        
        <div className="lg:col-span-7">
          <SystemDiagram />
        </div>
      </div>
    </section>);

}