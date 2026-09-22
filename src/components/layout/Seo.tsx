import { useEffect } from 'react';
import type { JsonLd } from '../../utils/seo';
import { absoluteUrl, DEFAULT_OG_IMAGE, SITE_NAME } from '../../utils/seo';

interface SeoProps {
  title: string;
  description: string;
  path: string;
  type?: 'website' | 'article';
  jsonLd?: JsonLd[];
}

/**
 * Client-side head management (title, description, Open Graph, X cards,
 * canonical, JSON-LD). With SSR / static generation, render the same values
 * server-side from these props.
 */
export function Seo({ title, description, path, type = 'website', jsonLd = [] }: SeoProps) {
  const jsonLdString = JSON.stringify(jsonLd);

  useEffect(() => {
    const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
    const url = absoluteUrl(path);
    document.title = fullTitle;
    document.documentElement.lang = 'en';

    setMeta('name', 'description', description);
    setMeta('property', 'og:title', fullTitle);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', url);
    setMeta('property', 'og:type', type);
    setMeta('property', 'og:site_name', SITE_NAME);
    setMeta('property', 'og:image', DEFAULT_OG_IMAGE);
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', fullTitle);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', DEFAULT_OG_IMAGE);
    setCanonical(url);

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.dataset.seo = 'page';
    script.text = jsonLdString;
    document.head.appendChild(script);
    return () => script.remove();
  }, [title, description, path, type, jsonLdString]);

  return null;
}

function setMeta(attribute: 'name' | 'property', key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

function setCanonical(url: string) {
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.rel = 'canonical';
    document.head.appendChild(link);
  }
  link.href = url;
}