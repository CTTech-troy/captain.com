import images from '../generated/images.json';
import type { CaseStudy } from '../types/content';

/**
 * PLACEHOLDER ENTRIES. These demonstrate the case-study format only.
 * They are not real Ctrotech.com projects and contain no real clients or results.
 * Replace with published, client-approved case studies (isPlaceholder: false).
 */
export const caseStudies: CaseStudy[] = [
{
  id: 'bestseller-auto-llc',
  isPlaceholder: true,
  title: 'Vehicle discovery and shipping experience',
  client: 'Bestseller Auto LLC',
  industry: 'Shipping and automotive retail',
  challenge: 'Bestseller Auto needed a cleaner way to showcase available inventory, help buyers compare vehicles, and make international shipping and next-step communication feel seamless from browsing through purchase inquiry.',
  solution: 'Ctrotech.com shaped a customer-facing marketplace experience built around searchable inventory, brand and category browsing, shipping destination guidance, and clear lead capture that turns interest into dealership conversations.',
  technology: ['React', 'TypeScript', 'Search UX', 'Inventory browsing', 'Lead capture', 'Shipping workflow'],
  security: 'Customer lead data, inquiry requests and shipping conversations were handled through clear contact flows and protected dealership processes designed to keep buyer information organized and trusted.',
  results: 'The dealership now communicates a stronger, more credible purchasing journey for both local and international buyers, making it easier to discover vehicles and move toward the next step with confidence.',
  image: images.bestseller.src,
  imageAlt: images.bestseller.alt,
  imageSrcSet: images.bestseller.srcSet,
  imageWidth: images.bestseller.width,
  imageHeight: images.bestseller.height,
  architecture: ['Vehicle catalog', 'Search & filters', 'Shipping guidance', 'Lead capture'],
  serviceSlugs: ['web-development', 'business-operating-systems', 'seo', 'digital-creative']
},
{
  id: 'anchor-news',
  isPlaceholder: true,
  title: 'Real-time newsroom and publishing platform',
  client: 'Anchor News',
  industry: 'Media and news publishing',
  challenge: 'Anchor News needed a digital publishing system that could handle fast-moving breaking stories, structured category coverage, and multiple editorial streams without sacrificing speed, clarity, or trust.',
  solution: 'Ctrotech.com designed a newsroom experience built for live updates, topic-driven navigation, and clear audience engagement across breaking, business, technology, world, sports, and AI coverage.',
  technology: ['React', 'TypeScript', 'Editorial CMS', 'Live publishing', 'SEO', 'Content operations'],
  security: 'Editorial controls, review workflows, and content governance were built into the operating model so stories could move quickly without compromising accuracy or credibility.',
  results: 'The newsroom now presents a more cohesive, scalable publishing experience that supports rapid coverage, audience retention, and content organization at scale.',
  image: images.anchor.src,
  imageAlt: images.anchor.alt,
  imageSrcSet: images.anchor.srcSet,
  imageWidth: images.anchor.width,
  imageHeight: images.anchor.height,
  architecture: ['Editorial dashboard', 'Category routing', 'Live stories', 'Audience engagement'],
  serviceSlugs: ['web-development', 'ai-automation', 'business-operating-systems', 'seo', 'digital-creative']
},
{
  id: 'brij',
  isPlaceholder: true,
  title: 'Logistics brand clarity and customer confidence',
  client: 'Brij',
  industry: 'Logistics and transport',
  challenge: 'Brij needed a clearer digital presence to explain its logistics services, create more trust with customers, and make complex delivery and operations messaging easier to understand at a glance.',
  solution: 'Ctrotech.com designed a cleaner, more credible logistics-facing web experience that sharpens the brand story, strengthens trust signals, and helps prospective clients understand the company’s offer more quickly.',
  technology: ['React', 'TypeScript', 'Logistics UX', 'Brand design', 'Service clarity', 'Conversion-focused front-end'],
  security: 'The experience was built around clear communication, professionalism, and a trusted customer journey that helps logistics buyers feel confident in the service and the process.',
  results: 'Brij now presents a stronger, more credible logistics brand that makes its service proposition easier to understand and more convincing to new customers.',
  image: images.brij.src,
  imageAlt: images.brij.alt,
  imageSrcSet: images.brij.srcSet,
  imageWidth: images.brij.width,
  imageHeight: images.brij.height,
  architecture: ['Brand positioning', 'Service clarity', 'Customer trust', 'Delivery messaging'],
  serviceSlugs: ['web-development', 'ai-automation', 'seo', 'digital-creative']
}];