import type { ServicePage } from '../types/content';
import type { PageSeo, SeoImage } from '../data/seo';
import { SITE_URL, SITE_NAME, CONTACT_EMAIL, DEFAULT_DESCRIPTION, absoluteUrl } from './siteIdentity';
export { SITE_URL, SITE_NAME, DEFAULT_DESCRIPTION, absoluteUrl } from './siteIdentity';
export type JsonLd = Record<string, unknown>;
const assetUrl = (src: string) => new URL(src, SITE_URL).href;
const escape = (value: string) => value.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);
export const ROBOTS_TXT = `User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${SITE_URL}/sitemap.xml\n`;
export const robotsFor = (page: PageSeo) => `${page.indexable ? 'index' : 'noindex'}, follow, max-image-preview:large`;

export function organizationJsonLd(): JsonLd {
  return { '@type': 'Organization', '@id': `${SITE_URL}/#organization`, name: SITE_NAME, url: SITE_URL,
    logo: { '@type': 'ImageObject', '@id': `${SITE_URL}/#logo`, url: `${SITE_URL}/images/ctrotech-logo.png`, contentUrl: `${SITE_URL}/images/ctrotech-logo.png`, width: 512, height: 512 },
    description: DEFAULT_DESCRIPTION, email: CONTACT_EMAIL,
    contactPoint: { '@type': 'ContactPoint', email: CONTACT_EMAIL, contactType: 'customer support' } };
}
export function websiteJsonLd(): JsonLd {
  return { '@type': 'WebSite', '@id': `${SITE_URL}/#website`, name: SITE_NAME, url: SITE_URL,
    publisher: { '@id': `${SITE_URL}/#organization` }, inLanguage: 'en' };
}
export function breadcrumbJsonLd(items: { name: string; path: string }[]): JsonLd {
  return { '@type': 'BreadcrumbList', '@id': `${absoluteUrl(items.at(-1)!.path)}#breadcrumb`,
    itemListElement: items.map((item, index) => ({ '@type': 'ListItem', position: index + 1, name: item.name, item: absoluteUrl(item.path) })) };
}
export function serviceJsonLd(page: ServicePage): JsonLd {
  return { '@type': 'Service', '@id': `${absoluteUrl(`/services/${page.slug}`)}#service`,
    name: page.title, serviceType: page.title, description: page.metaDescription,
    url: absoluteUrl(`/services/${page.slug}`), areaServed: 'Worldwide', provider: { '@id': `${SITE_URL}/#organization` } };
}
function imageObject(image: SeoImage): JsonLd {
  return { '@type': 'ImageObject', '@id': `${assetUrl(image.src)}#image`, url: assetUrl(image.src), contentUrl: assetUrl(image.src),
    caption: image.alt, width: image.width, height: image.height };
}
export function pageJsonLd(page: PageSeo): JsonLd {
  if (page.status === 404) return { '@context': 'https://schema.org', '@graph': [] };
  const url = absoluteUrl(page.path);
  const graph: JsonLd[] = [organizationJsonLd(), websiteJsonLd(), {
    '@type': page.path === '/about' ? 'AboutPage' : page.path === '/contact' ? 'ContactPage' : 'WebPage',
    '@id': `${url}#webpage`, url, name: page.title, description: page.description,
    inLanguage: 'en', isPartOf: { '@id': `${SITE_URL}/#website` }, about: { '@id': `${SITE_URL}/#organization` },
    ...(page.images.length ? { primaryImageOfPage: { '@id': `${assetUrl(page.images[0].src)}#image` } } : {}),
    ...(page.breadcrumbs.length ? { breadcrumb: { '@id': `${url}#breadcrumb` } } : {})
  }, ...page.images.map(imageObject)];
  if (page.breadcrumbs.length) graph.push(breadcrumbJsonLd(page.breadcrumbs));
  if (page.serviceSlug) graph.push({ '@type': 'Service', '@id': `${url}#service`,
    name: page.breadcrumbs.at(-1)!.name, serviceType: page.breadcrumbs.at(-1)!.name,
    description: page.description, url, areaServed: 'Worldwide', provider: { '@id': `${SITE_URL}/#organization` },
    mainEntityOfPage: { '@id': `${url}#webpage` } });
  return { '@context': 'https://schema.org', '@graph': graph };
}
export function metadataEntries(page: PageSeo): [string, string, string][] {
  return [
    ['name', 'description', page.description], ['name', 'robots', robotsFor(page)],
    ['property', 'og:title', page.title], ['property', 'og:description', page.description],
    ['property', 'og:type', 'website'], ['property', 'og:url', absoluteUrl(page.path)],
    ['property', 'og:site_name', SITE_NAME], ['property', 'og:locale', 'en_US'],
    ['property', 'og:image', assetUrl(page.social.src)], ['property', 'og:image:width', String(page.social.width)],
    ['property', 'og:image:height', String(page.social.height)], ['property', 'og:image:alt', page.social.alt],
    ['name', 'twitter:card', 'summary_large_image'], ['name', 'twitter:title', page.title],
    ['name', 'twitter:description', page.description], ['name', 'twitter:image', assetUrl(page.social.src)],
    ['name', 'twitter:image:alt', page.social.alt]
  ];
}
export const serializeJsonLd = (value: JsonLd) => JSON.stringify(value).replace(/</g, '\\u003c');
export function renderSeoHead(page: PageSeo): string {
  return [
    `<title>${escape(page.title)}</title>`,
    ...metadataEntries(page).map(([attribute, key, content]) => `<meta ${attribute}="${key}" content="${escape(content)}" />`),
    ...(page.status === 200 ? [`<link rel="canonical" href="${escape(absoluteUrl(page.path))}" />`] : []),
    `<script id="page-schema" type="application/ld+json">${serializeJsonLd(pageJsonLd(page))}</script>`
  ].join('\n    ');
}
export function buildSitemapXml(pages: PageSeo[]): string {
  const urls = pages.filter(page => page.indexable && page.status === 200).map(page =>
    `  <url><loc>${escape(absoluteUrl(page.path))}</loc>${page.images.map(image => `\n    <image:image><image:loc>${escape(assetUrl(image.src))}</image:loc></image:image>`).join('')}</url>`);
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${urls.join('\n')}\n</urlset>\n`;
}
