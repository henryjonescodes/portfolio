import { expect, test } from '@playwright/test';
import { distinctBoxes, sampleBoxes, trackErrors } from './helpers';

test.describe('entry carousels on phones', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test('a tile opens the shared window full screen, shows its panels, and closes back', async ({
    page,
  }) => {
    const errors = trackErrors(page);
    await page.goto('/projects?lite=true');
    const tile = page.getByTestId('entry').first();
    await expect(tile).toBeVisible();
    await page.waitForTimeout(1500);
    const source = (await tile.boundingBox())!;

    const boxes = await sampleBoxes(
      page,
      '[data-testid="modal-entry"]',
      1500,
      '[data-testid="entry"]',
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
      const tile = page.getByTestId('entry').first();
      await expect(tile).toBeVisible();
      await page.waitForTimeout(1500);
      const vw = page.viewportSize()!.width;
      const t = (await tile.boundingBox())!;
      expect(Math.abs(t.x + t.width / 2 - vw / 2)).toBeLessThan(2);
      const row = (await page.getByTestId('entry-row').boundingBox())!;
      expect(row.x).toBeLessThanOrEqual(0.5);
      expect(row.width).toBeGreaterThanOrEqual(vw - 1);
    });
  }

  test('an open tile takes focus and the tiles behind it leave the tab order', async ({ page }) => {
    await page.goto('/projects?lite=true');
    await page.waitForTimeout(1500);
    await page.getByTestId('entry').first().click();
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

test('wide lite view keeps the projects list stacked', async ({ page }) => {
  await page.goto('/projects?lite=true');
  const entries = page.getByTestId('entry');
  await expect(entries.first()).toBeVisible();
  const [a, b] = [await entries.nth(0).boundingBox(), await entries.nth(1).boundingBox()];
  expect(b!.y).toBeGreaterThan(a!.y + a!.height - 1);
  expect(Math.abs(a!.x - b!.x)).toBeLessThan(1);
});

test('crossing the breakpoint keeps the same entry elements and switches the layout', async ({
  page,
}) => {
  const errors = trackErrors(page);
  await page.setViewportSize({ width: 1100, height: 800 });
  await page.goto('/experience?lite=true');
  const first = page.getByTestId('entry').first();
  await expect(first).toBeVisible();
  await page.waitForTimeout(1500);
  await first.evaluate((el) => el.setAttribute('data-same-node', 'yes'));
  const wide = (await first.boundingBox())!;
  expect(wide.width).toBeGreaterThan(500);

  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(800);
  const tile = (await first.boundingBox())!;
  expect(tile.width).toBeLessThan(390);
  await expect(page.locator('[data-same-node="yes"]')).toHaveCount(1);
  await expect(page.locator('[data-testid="entry"]').first()).toHaveAttribute(
    'data-same-node',
    'yes',
  );

  await page.setViewportSize({ width: 1100, height: 800 });
  await page.waitForTimeout(800);
  await expect(page.locator('[data-testid="entry"]').first()).toHaveAttribute(
    'data-same-node',
    'yes',
  );
  expect(errors).toEqual([]);
});
