import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
const walk = d => fs.readdirSync(d,{withFileTypes:true}).flatMap(e=>{
  const p=path.join(d,e.name); return e.isDirectory()?walk(p):[p];});
const files = walk('public').filter(f=>/\.(png|jpe?g)$/i.test(f));
for (const f of files.sort()) {
  const m = await sharp(f).metadata();
  const kb = (fs.statSync(f).size/1024).toFixed(0);
  console.log(`${kb.padStart(6)}KB  ${(m.width+'x'+m.height).padEnd(11)} ${m.hasAlpha?'alpha':'     '}  ${f}`);
}
