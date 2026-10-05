// Captures frames of the entry modal opening and closing at phone and desktop widths, to judge
// the morph by eye. Time is stepped with Playwright's fake clock, so every frame lands at a
// known moment of the animation however slow the machine is. Needs a dev server:
// `npm run dev`, then `npm run modal-frames -- [baseUrl] [outDir]`. The default folder is in the
// OS temp folder, since Playwright wipes test-results on every run.
import { chromium } from '@playwright/test';
import { mkdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const base = process.argv[2] ?? 'http://localhost:5173';
const out = process.argv[3] ?? join(tmpdir(), 'portfolio-modal-frames');

const VIEWPORTS = {
  phone: { width: 375, height: 812 },
  desktop: { width: 1280, height: 800 },
};
const PATHS = ['experience', 'projects'];
const STEP = Number(process.env.STEP ?? 50);
const STEPS = Number(process.env.STEPS ?? 12);

const browser = await chromium.launch();
for (const [name, viewport] of Object.entries(VIEWPORTS)) {
  for (const path of PATHS) {
    const dir = join(out, `${name}-${path}`);
    mkdirSync(dir, { recursive: true });
    const page = await browser.newPage({ viewport });
    await page.clock.install();
    await page.goto(`${base}/${path}?lite=true`);
    await page.clock.runFor(3000);

    const shoot = async (phase) => {
      for (let i = 0; i <= STEPS; i++) {
        await page.screenshot({ path: join(dir, `${phase}-${String(i * STEP).padStart(3, '0')}ms.png`) });
        await page.clock.runFor(STEP);
      }
    };

    await page.getByTestId('entry').first().click();
    await shoot('open');
    await page.clock.runFor(1500);
    await page.getByRole('dialog').getByRole('button', { name: 'Close' }).click();
    await shoot('close');
    await page.close();
  }
}
await browser.close();
console.log(`wrote ${out}`);
