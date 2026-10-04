// Captures frames of the entry modal opening and closing, to judge the morph by eye. Writes to
// the OS temp folder, since Playwright wipes test-results on every run. Needs a dev server:
// `npm run dev`, then `npm run modal-frames -- [baseUrl] [label]`.
import { chromium } from '@playwright/test';
import { mkdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const base = process.argv[2] ?? 'http://localhost:5173';
const label = process.argv[3] ?? 'frames';
const out = join(tmpdir(), 'portfolio-modal-frames', label);
mkdirSync(out, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1100, height: 760 } });
await page.goto(`${base}/projects?lite=true`);
await page.waitForTimeout(2500);

const shoot = async (phase) => {
  for (let i = 0; i < 6; i++) {
    await page.screenshot({ path: `${out}/${phase}-${i}.png` });
    await page.waitForTimeout(90);
  }
};

await page.getByTestId('entry').first().click();
await shoot('open');
await page.waitForTimeout(1500);
await page.getByRole('dialog').getByRole('button', { name: 'Close' }).click();
await shoot('close');
await browser.close();
console.log(`wrote ${out}`);
