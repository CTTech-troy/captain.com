import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';
import { createServer } from 'vite';

const template = await readFile('dist/index.html', 'utf8');
const manifest = JSON.parse(await readFile('dist/.vite/manifest.json', 'utf8'));
const vite = await createServer({ server: { middlewareMode: true }, appType: 'custom', logLevel: 'error' });
try {
  const { render, seoPages, notFoundSeo, renderSeoHead, buildSitemapXml, ROBOTS_TXT } = await vite.ssrLoadModule('/src/entry-server.tsx');
  const result = [];
  for (const page of [...seoPages, notFoundSeo]) {
    const body = await render(page.path);
    const component = page.path === '/' ? 'Home' : page.path === '/services' ? 'ServicesIndex' : page.path.startsWith('/services/') ? 'ServiceDetail' : page.path.startsWith('/legal/') ? 'Legal' : page.path === '/404' ? 'NotFound' : page.path.slice(1).replace(/^./, x => x.toUpperCase());
    const entry = manifest[`src/pages/${component}.tsx`];
    const preload = entry ? `<link rel="modulepreload" href="/${entry.file}" />` : '';
    const fonts = Object.values(manifest).filter(asset => asset.file?.endsWith('.woff2') && /inter-(tight-)?latin-wght-normal/.test(asset.name ?? asset.src ?? '')).map(asset => `<link rel="preload" href="/${asset.file}" as="font" type="font/woff2" crossorigin />`).join('\n');
    const html = template.replace(/<title>.*?<\/title>/s, `${renderSeoHead(page)}\n${preload}\n${fonts}`)
      .replace('<div id="root"></div>', () => `<div id="root">${body}</div>`);
    const file = page.path === '/' ? 'dist/index.html' : `dist${page.path}.html`;
    await mkdir(dirname(file), { recursive: true });
    await writeFile(file, html);
    result.push({ path: page.path, file: file.replace('dist/', ''), title: page.title, indexable: page.indexable, status: page.status, bytes: Buffer.byteLength(html) });
  }
  await writeFile('dist/sitemap.xml', buildSitemapXml(seoPages));
  await writeFile('dist/robots.txt', ROBOTS_TXT);
  await mkdir('reports', { recursive: true });
  await writeFile('reports/seo-routes.json', JSON.stringify(result, null, 2) + '\n');
  console.log(`Generated ${result.length} HTML pages; ${seoPages.filter(p => p.indexable).length} canonical URLs in sitemap.xml.`);
} finally { await vite.close(); }
