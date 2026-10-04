import { expect, test } from '@playwright/test';
import {
  distinctBoxes,
  sampleBoxes,
  openFirstEntry,
  openFirstEntrySampled,
  trackErrors,
  closeModal,
} from './helpers';

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
      // Enough frames to see motion; slow CI runners deliver few animation frames.
      expect(boxes.length).toBeGreaterThanOrEqual(3);
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
  await page.waitForTimeout(2000);
  // Without ?debug=true no Leva panel may appear, including one auto-mounted by a stray useControls.
  await expect(page.getByText(/Animation System|3D Scene/)).toHaveCount(0);
  expect(errors.filter((e) => !/WebGL|GPU|GL_/i.test(e))).toEqual([]);
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

test('Escape closes the modal dialog', async ({ page }) => {
  await page.goto('/experience?lite=true');
  await page.waitForTimeout(1500);
  await openFirstEntry(page);
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.waitForTimeout(800);
  await page.keyboard.press('Escape');
  await expect(page.getByTestId('modal-overlay')).toHaveCSS('pointer-events', 'none');
});

test('open project shows its panels, and the modal expands and restores', async ({ page }) => {
  await page.goto('/projects?lite=true');
  await page.waitForTimeout(1500);
  await openFirstEntry(page);
  const dialog = page.getByRole('dialog');
  await expect(dialog.getByRole('region', { name: 'Links' })).toBeVisible({ timeout: 5_000 });
  await page.waitForTimeout(1200); // let the open morph and media settle before measuring

  const box = async () => (await page.getByTestId('modal-entry').boundingBox())!;
  // Wait for the open morph to settle before taking the cozy size.
  await expect.poll(async () => (await box()).width, { timeout: 5_000 }).toBeGreaterThan(0);
  await page.waitForTimeout(1200);
  const overlay = (await page.getByTestId('modal-overlay').boundingBox())!;
  const cozy = await box();

  await dialog.getByRole('button', { name: 'Expand' }).click();
  await expect
    .poll(async () => (await box()).width, { timeout: 5_000 })
    .toBeGreaterThanOrEqual(overlay.width - 2);
  expect((await box()).height).toBeGreaterThan(cozy.height);

  await dialog.getByRole('button', { name: 'Restore' }).click();
  await expect
    .poll(async () => Math.abs((await box()).width - cozy.width), { timeout: 5_000 })
    .toBeLessThan(4);
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

test.describe('projects carousel on phones', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test('a tile morphs into the page, shows its panels, and closes back', async ({ page }) => {
    const errors = trackErrors(page);
    await page.goto('/projects?lite=true');
    const tile = page.getByTestId('project-card').first();
    await expect(tile).toBeVisible();
    await page.waitForTimeout(1500);
    const source = (await tile.boundingBox())!;

    const boxes = await sampleBoxes(
      page,
      '[data-testid="project-card-open"]',
      1500,
      '[data-testid="project-card"]',
    );
    const first = boxes[0];
    const last = boxes[boxes.length - 1];
    expect(Math.abs(first.x - source.x)).toBeLessThan(source.width / 2);
    expect(last.width).toBeGreaterThan(source.width);
    expect(distinctBoxes(boxes)).toBeGreaterThan(2);

    const dialog = page.getByRole('dialog');
    await expect(dialog.getByRole('region', { name: 'Links' })).toBeVisible();
    await dialog.getByRole('button', { name: 'Close' }).click();
    await expect(page.getByTestId('project-card-open')).toHaveCount(0, { timeout: 5_000 });
    await expect(tile).toBeVisible();
    expect(errors).toEqual([]);
  });

  test('an open tile takes focus and the tiles behind it leave the tab order', async ({ page }) => {
    await page.goto('/projects?lite=true');
    await page.waitForTimeout(1500);
    await page.getByTestId('project-card').first().click();
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
  await expect(page.getByTestId('project-card')).toHaveCount(0);
});
