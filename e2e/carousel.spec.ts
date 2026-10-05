import { expect, test } from '@playwright/test';
import { distinctBoxes, sampleBoxes, trackErrors } from './helpers';

test.describe('entry carousels on phones', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test('a tile opens the shared window full screen, shows its panels, and closes back', async ({
    page,
  }) => {
    const errors = trackErrors(page);
    await page.goto('/projects?lite=true');
    const tile = page.getByTestId('carousel-card').first();
    await expect(tile).toBeVisible();
    await page.waitForTimeout(1500);
    const source = (await tile.boundingBox())!;

    const boxes = await sampleBoxes(
      page,
      '[data-testid="modal-entry"]',
      1500,
      '[data-testid="carousel-card"]',
    );
    const first = boxes[0];
    const last = boxes[boxes.length - 1];
    expect(Math.abs(first.x - source.x)).toBeLessThan(source.width / 2);
    expect(last.width).toBeGreaterThan(source.width);
    expect(distinctBoxes(boxes)).toBeGreaterThan(2);
    // On phones the window is the whole screen, over the site nav.
    expect(last.y).toBeLessThan(1);
    expect(last.height).toBeGreaterThan(page.viewportSize()!.height - 2);

    const dialog = page.getByRole('dialog');
    await expect(dialog.getByRole('region', { name: 'Links' })).toBeVisible();
    await dialog.getByRole('button', { name: 'Close' }).click();
    await expect(page.getByTestId('modal-entry')).toHaveCount(0, { timeout: 5_000 });
    await expect(tile).toBeVisible();
    expect(errors).toEqual([]);
  });

  for (const path of ['/projects', '/experience']) {
    test(`${path}: the first tile is centred and the row runs edge to edge`, async ({ page }) => {
      await page.goto(`${path}?lite=true`);
      const tile = page.getByTestId('carousel-card').first();
      await expect(tile).toBeVisible();
      await page.waitForTimeout(1500);
      const vw = page.viewportSize()!.width;
      const t = (await tile.boundingBox())!;
      expect(Math.abs(t.x + t.width / 2 - vw / 2)).toBeLessThan(2);
      const row = (await tile.locator('xpath=../..').boundingBox())!;
      expect(row.x).toBeLessThanOrEqual(0.5);
      expect(row.width).toBeGreaterThanOrEqual(vw - 1);
    });
  }

  test('an open tile takes focus and the tiles behind it leave the tab order', async ({ page }) => {
    await page.goto('/projects?lite=true');
    await page.waitForTimeout(1500);
    await page.getByTestId('carousel-card').first().click();
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeFocused();
    await expect(dialog.getByRole('button', { name: 'Close' })).toBeVisible();
    // Tab and Shift+Tab both stay inside the dialog.
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Shift+Tab');
    const focusedInDialog = await page.evaluate(
      () => !!document.activeElement?.closest('[role="dialog"]'),
    );
    expect(focusedInDialog).toBe(true);
  });

  test('keyboard opens a tile, Escape closes it, and reduced motion still closes', async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/projects?lite=true');
    await page.waitForTimeout(1500);
    await page
      .getByRole('button', { name: /^Open / })
      .first()
      .focus();
    await page.keyboard.press('Enter');
    await expect(page.getByRole('dialog')).toBeVisible();
    await page.waitForTimeout(500);
    await page.keyboard.press('Escape');
    await expect(page.getByRole('dialog')).toHaveCount(0, { timeout: 3_000 });
  });
});

test('wide lite view keeps the projects list', async ({ page }) => {
  await page.goto('/projects?lite=true');
  await expect(page.getByTestId('entry').first()).toBeVisible();
  await expect(page.getByTestId('carousel-card')).toHaveCount(0);
});
