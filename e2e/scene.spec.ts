import { expect, Page, test } from '@playwright/test';
import { trackErrors } from './helpers';

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

test('lite mode never downloads three.js or the 3D scene', async ({ page }) => {
  const requested: string[] = [];
  page.on('request', (req) => requested.push(req.url()));
  await page.goto('/about?lite=true');
  await expect(page.locator('h1').first()).toBeVisible();
  await page.waitForTimeout(2000);
  const threeish = requested.filter((u) =>
    /react-three|\/three[._-]|three\.module|\/Scene[.-]/.test(u),
  );
  expect(threeish).toEqual([]);
});

test('full screen is in the URL, so a refresh stays full screen', async ({ page }) => {
  await page.goto('/about?view=full');
  await expect(page.getByRole('button', { name: 'Back to the device' })).toBeVisible({
    timeout: 20_000,
  });
  await expect(page).toHaveURL(/view=full/);
  await page.reload();
  await expect(page.getByRole('button', { name: 'Back to the device' })).toBeVisible({
    timeout: 20_000,
  });
});

test.describe('3D on phones', () => {
  test.use({
    viewport: { width: 375, height: 812 },
    isMobile: true,
    hasTouch: true,
    userAgent:
      'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
  });

  const enter3D = async (page: Page) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'View in 3D' }).click();
    await expect(page.locator('canvas')).toHaveCount(1, { timeout: 20_000 });
    // Lets the camera settle at wide zoom.
    await page.waitForTimeout(6000);
  };

  test('phones start in lite mode, and the nav offers 3D', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveURL(/lite=true/);
    await expect(page.getByRole('button', { name: 'View in 3D' })).toBeVisible();
  });

  test('3D on an upright phone turns the stage to landscape and survives a reload', async ({
    page,
  }) => {
    test.skip(!!process.env.CI, 'needs the 3D scene, which CI runners cannot load in time');
    await enter3D(page);
    await expect(page).not.toHaveURL(/lite=true/);
    const stage = page.locator('[class*="rotated"]');
    await expect(stage).toHaveCount(1);
    expect(await stage.evaluate((el) => getComputedStyle(el).transform)).toBe(
      'matrix(0, 1, -1, 0, 375, 0)',
    );
    // The renderer sizes to the stage's landscape frame, not its sideways bounding box.
    expect(
      await page.locator('canvas').evaluate((c: HTMLCanvasElement) => c.width > c.height),
    ).toBe(true);
    await page.screenshot({ path: 'test-results/phone-3d.png' });

    await page.reload();
    await expect(page.locator('canvas')).toHaveCount(1, { timeout: 20_000 });
    await expect(page).not.toHaveURL(/lite=true/);
    await expect(stage).toHaveCount(1);
  });

  test('a tap on a 3D button lands on it in the turned stage', async ({ page }) => {
    test.skip(!!process.env.CI, 'needs the 3D scene, which CI runners cannot load in time');
    await enter3D(page);
    // The About pad on the mixer, where the turned stage draws it at wide zoom.
    await page.mouse.click(172, 518);
    await expect(page).toHaveURL(/\/about/);
  });

  test('the nav inside the turned 3D screen is clickable', async ({ page }) => {
    test.skip(!!process.env.CI, 'needs the 3D scene, which CI runners cannot load in time');
    await enter3D(page);
    await page.getByText('Experience', { exact: true }).first().click();
    await expect(page).toHaveURL(/\/experience/);
  });
});

test("the info screen names what the model's knobs turn, and follows the panel's page", async ({
  page,
}) => {
  test.skip(!!process.env.CI, 'needs the 3D scene, which CI runners cannot load in time');
  await page.goto('/');
  await expect(page.locator('canvas')).toHaveCount(1, { timeout: 20_000 });
  const strip = page.locator('[class*=knobStrip]');
  await expect(strip).toContainText('Foreground', { timeout: 20_000 });
  await expect(strip).toContainText('Accent');
  await page.getByRole('tab', { name: 'FX' }).first().click({ force: true });
  await expect(strip).toContainText('Volume');
  await expect(strip).toContainText('Cutoff');
});
