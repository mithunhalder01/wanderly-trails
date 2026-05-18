import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const contentPath = path.join(__dirname, "../src/data/content.json");
const repoRootContentPath = path.join(__dirname, "../../src/data/content.json");

console.log({
  nextAppContentPath: contentPath,
  repoRootContentPath,
});

for (const p of [contentPath, repoRootContentPath]) {
  try {
    await fs.access(p);
    const raw = await fs.readFile(p, 'utf-8');
    const json = JSON.parse(raw);
    console.log('READ OK:', p, 'destinations:', json?.destinations?.length, 'packages:', json?.packages?.length);
  } catch (e) {
    console.log('READ FAIL:', p, String(e?.message || e));
  }
}

