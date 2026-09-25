import { SITE_URL, canonicalPath } from './siteIdentity.ts';

/** Preserve asset/API casing and query strings; consolidate public-page aliases. */
export function canonicalRedirect(input: string): string | null {
  const url = new URL(input);
  const original = url.href;
  if (url.hostname === 'www.ctrotech.com' || url.hostname === 'ctrotech.com') {
    url.protocol = 'https:';
    url.host = new URL(SITE_URL).host;
  }
  const pathname = url.pathname;
  if (!/^\/(api|assets|images)(\/|$)/i.test(pathname) && (!/\.[^/]+$/.test(pathname) || /\.html\/?$/i.test(pathname))) {
    url.pathname = canonicalPath(pathname);
  }
  return url.href !== original ? url.href : null;
}
