import type { ServicePage } from '../types/content';

export const SITE_URL = 'https://captain.com';
export const SITE_NAME = 'Captain.com';
export const DEFAULT_DESCRIPTION =
'Captain.com designs, builds, secures and operates software systems for companies that need technology to perform, scale and stay ahead.';
/** Placeholder social image path — upload the final asset at deploy time. */
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;

export type JsonLd = Record<string, unknown>;

export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path === '/' ? '' : path}`;
}

export function organizationJsonLd(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    slogan: 'Software. Security. Intelligence.',
    description: DEFAULT_DESCRIPTION
  };
}

export function websiteJsonLd(): JsonLd {
  return { '@context': 'https://schema.org', '@type': 'WebSite', name: SITE_NAME, url: SITE_URL };
}

export function breadcrumbJsonLd(items: {name: string;path: string;}[]): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path)
    }))
  };
}

export function serviceJsonLd(page: ServicePage): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: page.title,
    serviceType: page.title,
    description: page.metaDescription,
    url: absoluteUrl(`/services/${page.slug}`),
    areaServed: 'Worldwide',
    provider: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL }
  };
}

/** Generates sitemap.xml content — emit at build time to /sitemap.xml. */
export function buildSitemapXml(paths: string[]): string {
  const urls = paths.map((path) => `  <url><loc>${absoluteUrl(path)}</loc></url>`).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;
}

/** robots.txt content — emit at build time to /robots.txt. */
export const ROBOTS_TXT = `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`;