export const SITE_URL = 'https://ctrotech.com';
export const SITE_NAME = 'Ctrotech.com';
export const CONTACT_EMAIL = 'support@ctrotech.com';
export const DEFAULT_DESCRIPTION = 'Custom software, web and mobile development, AI automation, cybersecurity and cloud infrastructure. Ctrotech engineers the systems your business depends on.';

export function canonicalPath(value: string): string {
  const path = value.split(/[?#]/, 1)[0].replace(/\/{2,}/g, '/').toLowerCase();
  const clean = path.replace(/\/index(?:\.html)?\/?$/, '/').replace(/\.html\/?$/, '').replace(/\/+$/, '');
  return clean ? `/${clean.replace(/^\/+/, '')}` : '/';
}

export function absoluteUrl(path: string): string {
  return `${SITE_URL}${canonicalPath(path) === '/' ? '' : canonicalPath(path)}`;
}
