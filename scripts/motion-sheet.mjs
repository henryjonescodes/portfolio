// Captures an animation in real time and lays the frames out as one contact sheet, to judge a
// morph or transition by eye. Animations are slowed through the site's own motion-speed
// preference so screenshots keep up; Playwright's fake clock does not drive Framer's value
// animations, so real time is the only faithful capture.
//
//   npm run motion-sheet -- --path /experience?lite=true --click "[data-testid=entry]"
//
// Options (all optional except a running dev server):
//   --base     dev server origin (default http://localhost:5173)
//   --path     page to load (default /experience?lite=true)
//   --click    selector clicked to start the animation (default the first entry)
//   --width    viewport width (default 375); --height (default 812)
//   --speed    motion speed while capturing; 0.5 plays at half speed (default 0.5)
//   --frames   screenshots to take (default 12); --cols sheet columns (default 6)
//   --out      folder for frames and sheet.png (default OS temp folder)
import { chromium } from '@playwright/test';
import { mkdirSync, readdirSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { parseArgs } from 'node:util';

const { values: o } = parseArgs({
  options: {
    base: { type: 'string', default: 'http://localhost:5173' },
    path: { type: 'string', default: '/experience?lite=true' },
    click: { type: 'string', default: '[data-testid=entry]' },
    width: { type: 'string', default: '375' },
    height: { type: 'string', default: '812' },
    speed: { type: 'string', default: '0.5' },
    frames: { type: 'string', default: '12' },
    cols: { type: 'string', default: '6' },
    out: { type: 'string', default: join(tmpdir(), 'portfolio-motion-sheet') },
  },
});

mkdirSync(o.out, { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: Number(o.width), height: Number(o.height) } });
const url = `${o.base}${o.path}`;
await page.goto(url);
await page.evaluate((speed) => {
  const key = Object.keys(localStorage).find((k) => /pref/i.test(k)) ?? 'preferences';
  const stored = JSON.parse(localStorage.getItem(key) ?? '{}');
  localStorage.setItem(key, JSON.stringify({ ...stored, motionSpeed: Number(speed) }));
}, o.speed);
await page.reload();
await page.waitForTimeout(6000);
await page.locator(o.click).first().click();
const names = [];
for (let i = 0; i < Number(o.frames); i++) {
  const name = `frame-${String(i).padStart(2, '0')}.png`;
  await page.screenshot({ path: join(o.out, name) });
  names.push(name);
}

const w = Math.min(200, Math.round(1400 / Number(o.cols)));
const cells = readdirSync(o.out)
  .filter((f) => names.includes(f))
  .sort()
  .map((f) => `<figure><img src="data:image/png;base64,${readFileSync(join(o.out, f)).toString('base64')}"><figcaption>${f}</figcaption></figure>`)
  .join('');
await page.setViewportSize({ width: Number(o.cols) * (w + 6), height: 600 });
await page.setContent(
  `<style>body{margin:0;background:#222;display:grid;grid-template-columns:repeat(${o.cols},${w}px);gap:6px;font:10px sans-serif;color:#ddd}figure{margin:0}img{width:${w}px;display:block}</style>${cells}`,
);
await page.waitForTimeout(300);
await page.screenshot({ path: join(o.out, 'sheet.png'), fullPage: true });
await browser.close();
console.log(`sheet: ${join(o.out, 'sheet.png')}  (${names.length} frames of ${url} at ${o.speed}x)`);
