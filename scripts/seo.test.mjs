import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { resolve } from 'node:path';
import { load } from 'cheerio';
import sharp from 'sharp';
import { createPreviewServer } from './preview.mjs';
import { canonicalRedirect } from '../src/utils/urlNormalization.ts';

const origin = 'https://ctrotech.com';
const routes = JSON.parse(await readFile('reports/seo-routes.json', 'utf8'));
const documents = new Map(await Promise.all(routes.map(async route => [route.path, load(await readFile(`dist/${route.file}`, 'utf8'))])));
const indexable = routes.filter(route => route.indexable);
const sitemap = load(await readFile('dist/sitemap.xml', 'utf8'), { xmlMode: true });
const robots = await readFile('dist/robots.txt', 'utf8');
const canonical = path => origin + (path === '/' ? '' : path);

for (const route of routes) {
  test(`SEO HTML: ${route.path}`, async () => {
    const $ = documents.get(route.path);
    assert.equal($('title').length, 1);
    assert.equal($('title').text(), route.title);
    assert.ok($('meta[name="description"]').attr('content')?.length > 40);
    assert.equal($('meta[name="robots"]').attr('content')?.startsWith('index,'), route.indexable);
    assert.equal($('h1').length, 1, 'one visible page heading');
    assert.ok($('#root main').text().trim().length > 80, 'content must be prerendered');
    assert.equal($('[hidden][id^="S:"]').length, 0, 'no deferred streaming content containers');
    for (const el of $('h1').parents().toArray()) {
      assert.ok(!/(?:^|;)opacity:0(?:;|$)/.test($(el).attr('style') ?? ''), 'page heading must be visible before JavaScript');
    }
    assert.equal($('link[rel="canonical"]').length, route.status === 404 ? 0 : 1);
    if (route.status !== 404) assert.equal($('link[rel="canonical"]').attr('href'), canonical(route.path));
    for (const field of ['title', 'description', 'url', 'type', 'image', 'image:width', 'image:height', 'image:alt']) {
      assert.equal($(`meta[property="og:${field}"]`).length, 1, `og:${field}`);
      assert.ok($(`meta[property="og:${field}"]`).attr('content'));
    }
    for (const field of ['title', 'description', 'image', 'image:alt', 'card']) assert.ok($(`meta[name="twitter:${field}"]`).attr('content'));
    assert.equal($('meta[property="og:url"]').attr('content'), canonical(route.path));
    const ogUrl = new URL($('meta[property="og:image"]').attr('content'));
    assert.equal(ogUrl.origin, origin);
    const og = await sharp(`dist${ogUrl.pathname}`).metadata();
    assert.equal(og.width, Number($('meta[property="og:image:width"]').attr('content')));
    assert.equal(og.height, Number($('meta[property="og:image:height"]').attr('content')));
    assert.equal($('#page-schema').length, 1);
    const schema = JSON.parse($('#page-schema').text());
    assert.equal(schema['@context'], 'https://schema.org');
    const types = schema['@graph'].map(item => item['@type']);
    if (route.status !== 404) {
      assert.ok(types.includes('WebSite'));
      assert.ok(types.includes('Organization'));
      assert.ok(types.some(type => ['WebPage', 'AboutPage', 'ContactPage'].includes(type)));
      if (route.path !== '/') assert.ok(types.includes('BreadcrumbList'));
      if (route.path.startsWith('/services/')) assert.ok(types.includes('Service'));
    }
    assert.ok(!types.includes('Article'), 'no published articles yet');
    assert.ok(!JSON.stringify(schema).includes('SearchAction'), 'no internal search');
    const ids = $('[id]').map((_, el) => $(el).attr('id')).get();
    assert.equal(new Set(ids).size, ids.length, 'no duplicate element IDs');
    for (const el of $('img').toArray()) {
      const img = $(el);
      assert.ok(img.attr('alt')?.trim(), 'descriptive alt text');
      assert.ok(Number(img.attr('width')) > 0 && Number(img.attr('height')) > 0, 'intrinsic dimensions');
      const src = img.attr('src');
      assert.ok(src.startsWith('/images/'), 'descriptive optimized asset path');
      await access(`dist${src}`);
      const info = await sharp(`dist${src}`).metadata();
      assert.equal(info.width, Number(img.attr('width')));
      assert.equal(info.height, Number(img.attr('height')));
      assert.ok(img.attr('srcset') && img.attr('sizes'), 'responsive variants');
      for (const candidate of img.attr('srcset').split(',')) await access(`dist${candidate.trim().split(' ')[0]}`);
      for (const ancestor of img.parents().toArray()) {
        const style = $(ancestor).attr('style') ?? '';
        assert.ok(!/(?:^|;)opacity:0(?:;|$)/.test(style), 'images must not start transparent');
        assert.ok(!/clip-path:inset\(0% 100%/.test(style), 'images must not start fully clipped');
      }
    }
  });
}

test('unique titles/descriptions and an exact indexable sitemap', () => {
  for (const property of ['title', 'description']) {
    const values = indexable.map(route => property === 'title' ? documents.get(route.path)('title').text() : documents.get(route.path)('meta[name="description"]').attr('content'));
    assert.equal(new Set(values).size, values.length, property);
  }
  const locations = sitemap('url > loc').map((_, el) => sitemap(el).text()).get();
  assert.deepEqual(locations.sort(), indexable.map(route => canonical(route.path)).sort());
  assert.ok(robots.includes(`Sitemap: ${origin}/sitemap.xml`));
  assert.ok(robots.includes('Allow: /'));
  assert.ok(!/Disallow:\s*\/\s*(?:\n|$)/.test(robots));
  assert.equal(sitemap('image\\:loc').length > 0, true);
});

test('all internal links, fragments and image sitemap URLs resolve', async () => {
  const inbound = new Set(['/']);
  for (const [path, $] of documents) {
    for (const link of $('a[href]').toArray()) {
      const href = $(link).attr('href');
      if (/^(mailto:|tel:|https?:\/\/)/.test(href) && !href.startsWith(origin)) continue;
      const url = new URL(href, canonical(path));
      assert.equal(url.origin, origin);
      const targetPath = url.pathname === '/' ? '/' : url.pathname.replace(/\/$/, '');
      const target = documents.get(targetPath);
      assert.ok(target, `${path} -> ${href} missing route`);
      if (url.hash) {
        const id = decodeURIComponent(url.hash.slice(1));
        assert.ok(target('[id]').toArray().some(el => target(el).attr('id') === id), `${path} -> ${href} missing anchor`);
      }
      inbound.add(targetPath);
    }
  }
  for (const route of indexable) assert.ok(inbound.has(route.path), `orphan page ${route.path}`);
  for (const el of sitemap('image\\:loc').toArray()) await access(resolve('dist', `.${new URL(sitemap(el).text()).pathname}`));
});

test('URL normalization has no redirect on canonical URLs and preserves queries/assets', () => {
  assert.equal(canonicalRedirect(`${origin}/about`), null);
  assert.equal(canonicalRedirect('http://www.ctrotech.com/SERVICES/Web-Development/?utm_source=test'), `${origin}/services/web-development?utm_source=test`);
  assert.equal(canonicalRedirect(`${origin}/About.html`), `${origin}/about`);
  assert.equal(canonicalRedirect(`${origin}/index.html`), `${origin}/`);
  assert.equal(canonicalRedirect(`${origin}/assets/File-ABC.js`), null);
  assert.equal(canonicalRedirect(`${origin}/api/contact`), null);
});

test('production artifacts serve real page, asset and 404 statuses', async t => {
  const server = createPreviewServer();
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  t.after(() => new Promise(resolve => { server.close(resolve); server.closeAllConnections(); }));
  const base = `http://127.0.0.1:${server.address().port}`;
  for (const route of routes) assert.equal((await fetch(`${base}${route.path}`)).status, route.status, route.path);
  for (const path of ['/not-a-real-page', '/services/missing', '/legal/missing', '/images/missing.webp', '/api/missing']) assert.equal((await fetch(base + path)).status, 404, path);
  for (const path of ['/robots.txt', '/sitemap.xml', '/images/ctrotech-logo.png']) assert.equal((await fetch(base + path)).status, 200, path);
  for (const [, $] of documents) for (const img of $('img').toArray()) assert.equal((await fetch(base + $(img).attr('src'))).status, 200);
  assert.equal((await fetch(`${base}/ABOUT/`, { redirect: 'manual' })).status, 308);
});
