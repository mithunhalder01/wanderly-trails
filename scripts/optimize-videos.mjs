// Local-only build tool. Ye deps jaan-boojh kar package.json me nahi hain —
// Vercel build par inhe install karna faltu hai (ffmpeg-static 78MB binary kheenchta hai).
// Chalane se pehle:  pnpm add -D sharp ffmpeg-static
// Kaam khatam hone ke baad: pnpm remove sharp ffmpeg-static ffprobe-static

import { execFileSync } from 'child_process';
import ffmpegPath from 'ffmpeg-static';
import fs from 'fs';
import path from 'path';
import os from 'os';

// Saare videos code me `muted` hain, isliye audio track (-an) poora hata rahe hain.
// CRF 30 background loops ke liye theek hai — koi inhe dhyan se dekhta nahi.
const CRF = 30;

const walk = (d) =>
  fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(d, e.name);
    return e.isDirectory() ? walk(p) : [p];
  });

const mb = (n) => (n / 1024 / 1024).toFixed(2).padStart(6) + 'MB';
let before = 0;
let after = 0;

for (const file of walk('public').filter((f) => f.endsWith('.mp4')).sort()) {
  const src = fs.statSync(file).size;
  const tmp = path.join(os.tmpdir(), `opt-${path.basename(file)}`);

  execFileSync(ffmpegPath, [
    '-y', '-i', file,
    '-c:v', 'libx264',
    '-profile:v', 'high',
    '-preset', 'slow',
    '-crf', String(CRF),
    '-pix_fmt', 'yuv420p',
    '-movflags', '+faststart',   // metadata aage — video turant chalna shuru karta hai
    '-an',                       // audio hata do
    tmp,
  ], { stdio: 'ignore' });

  const out = fs.statSync(tmp).size;
  if (out >= src) {
    console.log(`${mb(src)} -> SKIP (bada ho raha tha)  ${file}`);
    fs.unlinkSync(tmp);
    before += src;
    after += src;
    continue;
  }
  fs.copyFileSync(tmp, file);
  fs.unlinkSync(tmp);
  before += src;
  after += out;
  console.log(`${mb(src)} -> ${mb(out)}  ${file}`);
}

console.log(`\nTOTAL ${mb(before)} -> ${mb(after)}  (${(100 - (after / before) * 100).toFixed(1)}% chhota)`);
