import { expect, test } from '@playwright/test';
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
