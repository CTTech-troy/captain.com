import images from '../generated/images.json';
import { servicePages } from './servicePages';
import { legalDocuments } from './site';
import { articles } from './insights';
import { caseStudies } from './caseStudies';
import { SITE_NAME, DEFAULT_DESCRIPTION, canonicalPath } from '../utils/siteIdentity';

export interface SeoImage { src: string; width: number; height: number; alt: string }
export interface PageSeo {
  path: string;
  title: string;
  description: string;
  indexable: boolean;
  status: number;
  images: SeoImage[];
  social: SeoImage;
  breadcrumbs: { name: string; path: string }[];
  serviceSlug?: string;
}
const logo = { src: '/images/ctrotech-logo.png', width: 512, height: 512, alt: 'Ctrotech company symbol' };
const home = { name: 'Home', path: '/' };
function page(path: string, title: string, description: string, label: string, indexable = true): PageSeo {
  return { path, title: `${title} | ${SITE_NAME}`, description, indexable, status: 200,
    images: [], social: images.hero.social, breadcrumbs: path === '/' ? [] : [home, { name: label, path }] };
}
export const seoPages: PageSeo[] = [
  { ...page('/', 'Software Development, AI & Cybersecurity', DEFAULT_DESCRIPTION, 'Home'),
    images: [images.hero, images.bestseller, images.anchor, images.brij] },
  { ...page('/about', 'About Our Software Engineering Company',
    'Meet Ctrotech: our approach to software engineering, security, AI and ongoing technology support for businesses, startups and enterprises.', 'About'),
    images: [images.about], social: images.about.social },
  page('/contact', 'Contact Us & Discuss Your Software Project',
    'Tell Ctrotech about your software project, goals and requirements. Start a conversation about development, AI, security or cloud infrastructure.', 'Contact'),
  page('/services', 'Software, AI, Security & Cloud Services',
    'Explore software development, web and mobile apps, AI automation, cybersecurity, cloud infrastructure and ongoing technology services from Ctrotech.', 'Services'),
  page('/insights', 'Engineering Insights',
    'Upcoming writing from Ctrotech on software engineering, AI automation, cybersecurity and cloud infrastructure. Explore the topics we plan to cover.', 'Insights', articles.length > 0),
  ...servicePages.map(service => {
    const path = `/services/${service.slug}`;
    const study = caseStudies.find(study => study.serviceSlugs.includes(service.slug));
    const image = study?.id === 'bestseller-auto-llc' ? images.bestseller : study?.id === 'anchor-news' ? images.anchor : study?.id === 'brij' ? images.brij : undefined;
    return { ...page(path, service.metaTitle, service.metaDescription, service.title),
      serviceSlug: service.slug, images: image ? [image] : [], social: image?.social ?? images.hero.social,
      breadcrumbs: [home, { name: 'Services', path: '/services' }, { name: service.title, path }] };
  }),
  ...legalDocuments.map(doc => page(`/legal/${doc.slug}`, doc.title, doc.summary, doc.title, false))
];
export const notFoundSeo: PageSeo = { ...page('/404', 'Page Not Found',
  'This page could not be found. Return to Ctrotech or explore our software, AI, cybersecurity and cloud services.', 'Page not found', false), status: 404, social: logo };
export function getPageSeo(path: string): PageSeo {
  return seoPages.find(page => page.path === canonicalPath(path)) ?? notFoundSeo;
}
