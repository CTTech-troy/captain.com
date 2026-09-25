import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, resolve, sep } from 'node:path';
import { pathToFileURL } from 'node:url';
import { canonicalRedirect } from '../src/utils/urlNormalization.ts';

const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.png': 'image/png', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.xml': 'application/xml', '.txt': 'text/plain; charset=utf-8' };
export function createPreviewServer() {
  const root = resolve('dist');
  return createServer(async (req, res) => {
    try {
      const url = new URL(req.url, 'http://localhost');
      if (!['GET', 'HEAD'].includes(req.method)) { res.writeHead(405); return res.end(); }
      const redirect = canonicalRedirect(url.href);
      if (redirect) { const target = new URL(redirect); res.writeHead(308, { Location: target.pathname + target.search }); return res.end(); }
      let path = decodeURIComponent(url.pathname);
      if (path === '/') path = '/index.html';
      else if (!extname(path)) path += '.html';
      let file = resolve(root, `.${path}`);
      if (!file.startsWith(root + sep)) { res.writeHead(400); return res.end(); }
      let status = 200;
      let body;
      try { body = await readFile(file); if (path === '/404.html') status = 404; }
      catch { status = 404; file = resolve(root, '404.html'); body = await readFile(file); }
      res.writeHead(status, { 'Content-Type': types[extname(file)] ?? 'application/octet-stream',
        'Cache-Control': file.includes(`${sep}assets${sep}`) ? 'public, max-age=31536000, immutable' : 'no-cache',
        ...(status === 404 ? { 'X-Robots-Tag': 'noindex' } : {}) });
      res.end(req.method === 'HEAD' ? undefined : body);
    } catch { res.writeHead(400); res.end('Bad request'); }
  });
}
if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const portIndex = process.argv.indexOf('--port');
  const port = Number(portIndex >= 0 ? process.argv[portIndex + 1] : 4173);
  createPreviewServer().listen(port, '127.0.0.1', () => console.log(`Production preview: http://127.0.0.1:${port}`));
}
