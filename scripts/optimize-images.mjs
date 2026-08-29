// Local-only build tool. Ye deps jaan-boojh kar package.json me nahi hain —
// Vercel build par inhe install karna faltu hai (ffmpeg-static 78MB binary kheenchta hai).
// Chalane se pehle:  pnpm add -D sharp ffmpeg-static
// Kaam khatam hone ke baad: pnpm remove sharp ffmpeg-static ffprobe-static

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

// PNG rehne wale: schema.org logo aur PDF export me WebP support bharosemand nahi.
// Ye sirf resize + recompress hote hain, format wahi rehta hai.
const KEEP_PNG = {
  'public/logo.png': 512,
  'public/favicon.png': 180,
};

const MAX_WIDTH = 1600;
const QUALITY = 80;

const walk = (d) =>
  fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(d, e.name);
    return e.isDirectory() ? walk(p) : [p];
  });

const kb = (n) => (n / 1024).toFixed(0).padStart(5) + 'KB';
let before = 0;
let after = 0;

for (const file of walk('public').filter((f) => /\.(png|jpe?g)$/i.test(f)).sort()) {
  // favicon_io/ browser aur PWA manifest ke liye hai — chhoti files, chhedna nahi.
  if (file.startsWith('public/favicon_io/')) continue;

  const src = fs.statSync(file).size;
  const meta = await sharp(file).metadata();
  const keepPng = KEEP_PNG[file];
  const width = Math.min(keepPng ?? MAX_WIDTH, meta.width);
  const out = keepPng ? file : file.replace(/\.(png|jpe?g)$/i, '.webp');

  const pipeline = sharp(file).resize({ width, withoutEnlargement: true });
  const buf = keepPng
    ? await pipeline.png({ compressionLevel: 9, palette: true }).toBuffer()
    : await pipeline.webp({ quality: QUALITY, alphaQuality: 90, effort: 6 }).toBuffer();

  fs.writeFileSync(out, buf);
  before += src;
  after += buf.length;
  console.log(`${kb(src)} -> ${kb(buf.length)}  ${path.basename(file)} -> ${path.basename(out)}`);
}

console.log(`\nTOTAL ${kb(before)} -> ${kb(after)}  (${(100 - (after / before) * 100).toFixed(1)}% chhota)`);
