import { mkdir, readFile, writeFile, stat } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import sharp from 'sharp';

const definitions = [
  ['hero', 'hero.png', 'ctrotech-software-platform-preview', 'Ctrotech website preview with software operations and AI interfaces'],
  ['about', 'd74a7a7b-9317-4843-9dd3-a4b64fd0884f.jpg', 'software-engineering-collaboration', 'People collaborating around a table in a bright workspace — illustrative image'],
  ['bestseller', 'img1.png', 'bestseller-auto-vehicle-search', 'Bestseller Auto website showing vehicle listings, search filters and shipping navigation'],
  ['anchor', 'img2.png', 'anchor-news-publishing-interface', 'Anchor News homepage with news categories, a lead story and latest headlines'],
  ['brij', 'img3.png', 'brij-logistics-tracking-interface', 'Brij logistics website with a delivery truck, shipment tracking and scheduling']
];
await mkdir('public/images', { recursive: true });
await mkdir('src/generated', { recursive: true });
const assets = {};
const report = [];
for (const [key, file, slug, alt] of definitions) {
  const input = await readFile(`public/${file}`);
  const hash = createHash('sha256').update(input).update('webp82-jpeg84-v1').digest('hex').slice(0, 10);
  const metadata = await sharp(input).metadata();
  const widths = [...new Set([480, 800, 1200, Math.min(1600, metadata.width)].filter(w => w <= metadata.width))].sort((a,b) => a-b);
  const variants = [];
  for (const width of widths) {
    const name = `${slug}-${width}-${hash}.webp`;
    const buffer = await sharp(input).rotate().resize({ width, withoutEnlargement: true }).webp({ quality: 82, effort: 5 }).toBuffer();
    await writeFile(`public/images/${name}`, buffer);
    variants.push({ src: `/images/${name}`, width, bytes: buffer.length });
  }
  const selected = variants.find(v => v.width === 1200) ?? variants.at(-1);
  const height = Math.round(selected.width * metadata.height / metadata.width);
  const socialName = `${slug}-social-${hash}.jpg`;
  const social = await sharp(input).rotate().resize({ width: 1200, withoutEnlargement: true }).jpeg({ quality: 84, mozjpeg: true }).toBuffer({ resolveWithObject: true });
  await writeFile(`public/images/${socialName}`, social.data);
  assets[key] = { src: selected.src, width: selected.width, height, alt,
    srcSet: variants.map(v => `${v.src} ${v.width}w`).join(', '),
    social: { src: `/images/${socialName}`, width: social.info.width, height: social.info.height, alt } };
  report.push({ image: key, originalBytes: input.length, optimizedBytes: selected.bytes, savingsPercent: Math.round((1-selected.bytes/input.length)*100) });
}
const logo = await sharp(await readFile('public/favicon.svg')).resize(512,512).png().toBuffer();
await writeFile('public/images/ctrotech-logo.png', logo);
await writeFile('src/generated/images.json', JSON.stringify(assets, null, 2) + '\n');
await mkdir('reports', { recursive: true });
await writeFile('reports/image-optimization.json', JSON.stringify(report, null, 2) + '\n');
console.table(report);
