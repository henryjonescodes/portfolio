import { expect, test } from '@playwright/test';
import { distinctBoxes, openFirstEntry, openFirstEntrySampled, trackErrors, closeModal } from './helpers';

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

for (const path of ['/experience', '/projects']) {
  test.describe(`modal on ${path}`, () => {
    test('morphs open from the clicked entry and closes back', async ({ page }) => {
      const errors = trackErrors(page);
      await page.goto(path + LITE);
      await page.waitForTimeout(1500); // let paint-in settle
      const { source, boxes } = await openFirstEntrySampled(page, 1500);
      expect(boxes.length).toBeGreaterThan(5);
      // Starts nearer the clicked entry than where it ends, and interpolates rather than snapping.
      const dist = (b: { x: number; y: number }) => Math.hypot(b.x - source.x, b.y - source.y);
      expect(dist(boxes[0])).toBeLessThan(dist(boxes[boxes.length - 1]));
      expect(distinctBoxes(boxes)).toBeGreaterThan(2);

      await expect(page.getByTestId('modal-overlay')).toBeVisible();
      await closeModal(page);
      // The overlay may linger while children finish exiting, but must stop catching clicks.
      await expect(page.getByTestId('modal-overlay')).toHaveCSS('pointer-events', 'none');
      await expect(page.getByTestId('modal-overlay')).toHaveCount(0, { timeout: 15_000 });

      // The source entry is visible and clickable again.
      await expect(page.getByTestId('entry').first()).toHaveCSS('opacity', '1');
      expect(errors).toEqual([]);
    });

    test('the page is clickable right after closing', async ({ page }) => {
      await page.goto(path + LITE);
      await page.waitForTimeout(1500);
      await openFirstEntry(page);
      await page.waitForTimeout(1200);
      await closeModal(page);
      await page.waitForTimeout(800);
      // A real click (not forced) must reach the list, not a leftover overlay.
      await page.getByTestId('entry').nth(1).click({ timeout: 2_000 });
      await expect(page.getByTestId('modal-entry')).toBeVisible();
    });

    test('closing one entry and quickly opening another shows the second', async ({ page }) => {
      await page.goto(path + LITE);
      await page.waitForTimeout(1500);
      const second = page.getByTestId('entry').nth(1);
      const secondId = await second.getAttribute('data-entry-id');

      await openFirstEntry(page);
      await page.waitForTimeout(1200);
      await closeModal(page);
      await page.waitForTimeout(50);
      await second.click({ force: true });

      await page.waitForTimeout(1500);
      await expect(page.getByTestId('modal-entry')).toHaveAttribute('data-entry-id', secondId!);
    });
  });
}

test('debug flag shows the Leva panel, no flag hides it', async ({ page }) => {
  await page.goto('/about?lite=true&debug=true');
  await expect(page.getByText('Animation System')).toBeVisible();
  await page.goto('/about?lite=true');
  await expect(page.getByText('Animation System')).toHaveCount(0);
});

test('3D mode mounts a canvas without errors', async ({ page }) => {
  const errors = trackErrors(page);
  await page.goto('/');
  await expect(page.locator('canvas')).toHaveCount(1, { timeout: 20_000 });
  expect(errors.filter((e) => !/WebGL|GPU|GL_/i.test(e))).toEqual([]);
});
