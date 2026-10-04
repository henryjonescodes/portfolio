import { expect, test } from '@playwright/test';
import { trackErrors } from './helpers';

const LITE = '?lite=true';

test.describe('lite mode pages', () => {
  for (const [path, heading] of [
    ['/about', /henry jones/i],
    ['/experience', /experience/i],
    ['/projects', /projects/i],
  ] as const) {
    test(`${path} renders its heading`, async ({ page }) => {
      const errors = trackErrors(page);
      await page.goto(path + LITE);
      await expect(page.locator('h1').first()).toHaveText(heading, { timeout: 15_000 });
      await page.waitForTimeout(1500);
      expect(errors).toEqual([]);
    });
  }
});

test('a new page starts scrolled to the top', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 500 });
  await page.goto('/experience?lite=true');
  await page.waitForTimeout(1500);
  const scroller = page.locator('[data-scroll-root]');
  await scroller.evaluate((el) => el.scrollTo(0, 400));
  expect(await scroller.evaluate((el) => el.scrollTop)).toBeGreaterThan(100);
  // Navigate inside the app (a fresh load would trivially start at the top).
  await page.evaluate(() => {
    window.history.pushState({}, '', '/projects?lite=true');
    window.dispatchEvent(new PopStateEvent('popstate'));
  });
  await expect(page.locator('h1').first()).toHaveText(/projects/i, { timeout: 10_000 });
  await expect.poll(() => scroller.evaluate((el) => el.scrollTop)).toBe(0);
});

test('map slider walks the bulge to a clicked stop and selects it', async ({ page }) => {
  await page.goto('/about?lite=true');
  const stops = page.locator('[class*="stop"]:visible');
  await expect(stops).toHaveCount(4);
  await page.waitForTimeout(1500);
  await stops.nth(3).click();
  await expect(page.locator('[class*="bulging"]')).toHaveCount(1);
  await expect(page.locator('[class*="bulging"]')).toHaveCount(0, { timeout: 5_000 });
  await expect(stops.nth(3)).toHaveClass(/selected/);
});

test('links page lists working links, including the resume', async ({ page, request }) => {
  const errors = trackErrors(page);
  await page.goto('/links?lite=true');
  const nav = page.getByRole('navigation', { name: 'Links' });
  await expect(nav.getByRole('link')).toHaveCount(6);
  const resume = nav.getByRole('link', { name: /resume/i });
  const href = (await resume.getAttribute('href'))!;
  expect((await request.get(href)).headers()['content-type']).toContain('pdf');
  await page.waitForTimeout(1500);
  expect(errors).toEqual([]);
});

test('about links to the links page and keeps the query', async ({ page }) => {
  await page.goto('/about?lite=true');
  await page.getByRole('link', { name: 'All links' }).click();
  await expect(page).toHaveURL(/\/links\?lite=true$/);
  await expect(page.getByRole('navigation', { name: 'Links' })).toBeVisible();
});
