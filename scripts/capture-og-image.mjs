// Captures public/og-image.png (1200x630) from a running dev server: `npm run dev`, then
// `npm run og-image`. Pass a base URL to capture another server.
import { chromium } from '@playwright/test';

const base = process.argv[2] ?? 'http://localhost:5173';
const browser = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader'] });
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.goto(`${base}/`);
await page.waitForSelector('canvas');
await page.waitForTimeout(9000); // the scene loads, the camera settles and the menu paints in
await page.screenshot({ path: 'public/og-image.png' });
await browser.close();
console.log('wrote public/og-image.png');
