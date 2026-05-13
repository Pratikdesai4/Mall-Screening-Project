import sharp from 'sharp';
import { readdir, stat } from 'node:fs/promises';
import { join, parse } from 'node:path';

const ASSETS = './assets';
const QUALITY = 78;

const files = await readdir(ASSETS);
const pngs = files.filter(f => f.toLowerCase().endsWith('.png'));

let totalIn = 0;
let totalOut = 0;

for (const file of pngs) {
    const input = join(ASSETS, file);
    const output = join(ASSETS, parse(file).name + '.webp');
    const inStat = await stat(input);
    await sharp(input)
        .webp({ quality: QUALITY, effort: 6 })
        .toFile(output);
    const outStat = await stat(output);
    totalIn += inStat.size;
    totalOut += outStat.size;
    const pct = ((1 - outStat.size / inStat.size) * 100).toFixed(1);
    console.log(`${file} ${(inStat.size/1024).toFixed(0)}KB -> ${parse(file).name}.webp ${(outStat.size/1024).toFixed(0)}KB (-${pct}%)`);
}

console.log(`\nTotal: ${(totalIn/1024/1024).toFixed(2)}MB -> ${(totalOut/1024/1024).toFixed(2)}MB (-${((1 - totalOut/totalIn)*100).toFixed(1)}%)`);
