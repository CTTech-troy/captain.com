import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { AppRoutes } from './AppRoutes';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Insights } from './pages/Insights';
import { Legal } from './pages/Legal';
import { ServiceDetail } from './pages/ServiceDetail';
import { ServicesIndex } from './pages/ServicesIndex';
import { NotFound } from './pages/NotFound';
const pages = { Home, About, Contact, Insights, Legal, ServiceDetail, ServicesIndex, NotFound };
export { seoPages, notFoundSeo } from './data/seo';
export { renderSeoHead, buildSitemapXml, ROBOTS_TXT } from './utils/seo';

export function render(path: string): string {
  const html = renderToString(<StaticRouter location={path}><AppRoutes pages={pages} /></StaticRouter>);
  if (html.includes('<!--$!-->') || html.includes('<!--$?-->')) {
    throw new Error(`Incomplete prerender for ${path}`);
  }
  return html;
}
