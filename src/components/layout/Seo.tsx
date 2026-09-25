import { useEffect } from 'react';
import { getPageSeo } from '../../data/seo';
import { absoluteUrl, metadataEntries, pageJsonLd, serializeJsonLd } from '../../utils/seo';

/** The same metadata is emitted into built HTML and updated on client navigation. */
export function Seo({ path }: { path: string }) {
  const page = getPageSeo(path);
  useEffect(() => {
    document.title = page.title;
    for (const [attribute, key, content] of metadataEntries(page)) {
      let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, key);
        document.head.appendChild(element);
      }
      element.content = content;
    }
    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (page.status === 404) canonical?.remove();
    else {
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.rel = 'canonical';
        document.head.appendChild(canonical);
      }
      canonical.href = absoluteUrl(page.path);
    }
    let schema = document.getElementById('page-schema') as HTMLScriptElement | null;
    if (!schema) {
      schema = document.createElement('script');
      schema.id = 'page-schema';
      schema.type = 'application/ld+json';
      document.head.appendChild(schema);
    }
    schema.textContent = serializeJsonLd(pageJsonLd(page));
  }, [page]);
  return null;
}
