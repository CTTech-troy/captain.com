import React from 'react';
import { Seo } from '../components/layout/Seo';
import { HeroSection } from '../components/home/HeroSection';
import { IntroSection } from '../components/home/IntroSection';
import { CapabilitiesSection } from '../components/home/CapabilitiesSection';
import { AIAutomationScene } from '../components/home/AIAutomationScene';
import { SecurityScene } from '../components/home/SecurityScene';
import { BusinessOSScene } from '../components/home/BusinessOSScene';
import { IndustriesSection } from '../components/home/IndustriesSection';
import { CaseStudiesSection } from '../components/home/CaseStudiesSection';
import { ApproachSection } from '../components/home/ApproachSection';
import { ProcessSection } from '../components/home/ProcessSection';
import { TechnologySection } from '../components/home/TechnologySection';
import { ManagedSection } from '../components/home/ManagedSection';
import { ProductsSection } from '../components/home/ProductsSection';
import { ProjectCTA } from '../components/shared/ProjectCTA';
import { DEFAULT_DESCRIPTION, organizationJsonLd, websiteJsonLd } from '../utils/seo';

export function Home() {
  return (
    <>
      <Seo
        title="Captain.com — We build the software businesses depend on"
        description={DEFAULT_DESCRIPTION}
        path="/"
        jsonLd={[organizationJsonLd(), websiteJsonLd()]} />
      
      <HeroSection />
      <IntroSection />
      <CapabilitiesSection />
      <AIAutomationScene />
      <SecurityScene />
      <BusinessOSScene />
      <IndustriesSection />
      <CaseStudiesSection />
      <ApproachSection />
      <ProcessSection />
      <TechnologySection />
      <ManagedSection />
      <ProductsSection />
      <ProjectCTA />
    </>);

}