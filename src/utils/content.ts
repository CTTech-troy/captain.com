import { servicePages } from '../data/servicePages';
import { industries } from '../data/industries';
import { caseStudies } from '../data/caseStudies';
import { pillars } from '../data/capabilities';
import { legalDocuments } from '../data/site';
import type { CaseStudy, Industry, PillarId, ServicePage } from '../types/content';

export function findServicePage(slug: string | undefined): ServicePage | undefined {
  return servicePages.find((page) => page.slug === slug);
}

export function findIndustry(id: string): Industry | undefined {
  return industries.find((industry) => industry.id === id);
}

export function serviceTitle(slug: string): string {
  return findServicePage(slug)?.title ?? slug;
}

export function pillarLabel(id: PillarId): string {
  return pillars.find((pillar) => pillar.id === id)?.label ?? id;
}

export function caseStudiesForService(slug: string): CaseStudy[] {
  return caseStudies.filter((study) => study.serviceSlugs.includes(slug));
}

export function sitemapPaths(): string[] {
  return [
  '/',
  '/about',
  '/services',
  '/contact',
  '/insights',
  ...servicePages.map((page) => `/services/${page.slug}`),
  ...legalDocuments.map((doc) => `/legal/${doc.slug}`)];

}