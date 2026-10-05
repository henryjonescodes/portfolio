import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Page } from '@playwright/test';

const openPanel = async (page: Page) => {
  await page.goto('/about?lite=true');
  await page.getByRole('button', { name: 'Open control panel' }).click();
  const panel = page.getByRole('dialog', { name: 'Control panel' });
  await expect(panel).toBeVisible();
  return panel;
};

const fontFamily = (page: Page) =>
  page.evaluate(() => getComputedStyle(document.body).fontFamily);

test.describe('control panel', () => {
  test('tabs switch pages', async ({ page }) => {
    const panel = await openPanel(page);
    await expect(panel.getByLabel('Foreground')).toBeVisible();

    await panel.getByRole('link', { name: 'Type' }).click();
    await expect(panel.getByRole('radio', { name: 'IBM Plex Mono' })).toBeVisible();

    await panel.getByRole('link', { name: 'FX' }).click();
    await expect(panel.getByLabel('Motion speed')).toBeVisible();
    await expect(panel.getByLabel('CRT intensity')).toBeVisible();
  });

  test('the type family changes the page font and persists', async ({ page }) => {
    const panel = await openPanel(page);
    expect(await fontFamily(page)).toContain('Pixelify Sans');

    await panel.getByRole('link', { name: 'Type' }).click();
    await panel.getByRole('radio', { name: 'IBM Plex Mono' }).click();
    expect(await fontFamily(page)).toContain('IBM Plex Mono');

    await page.reload();
    expect(await fontFamily(page)).toContain('IBM Plex Mono');
  });

  test('the FX page drives the CRT custom property', async ({ page }) => {
    const panel = await openPanel(page);
    await panel.getByRole('link', { name: 'FX' }).click();
    await panel.getByLabel('CRT intensity').fill('0.5');
    const value = await page.evaluate(() =>
      document.documentElement.style.getPropertyValue('--crt-intensity'),
    );
    expect(value).toBe('0.5');
  });

  test('closes with Close and with Escape', async ({ page }) => {
    const panel = await openPanel(page);
    await panel.getByRole('button', { name: 'Close' }).click();
    await expect(panel).toBeHidden();

    await page.getByRole('button', { name: 'Open control panel' }).click();
    await expect(panel).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(panel).toBeHidden();
  });

  test('has no axe violations while open', async ({ page }) => {
    const panel = await openPanel(page);
    await page.waitForTimeout(2500);
    for (const tab of ['Colour', 'Type', 'FX']) {
      await panel.getByRole('link', { name: tab }).click();
      const results = await new AxeBuilder({ page }).include('[role="dialog"]').analyze();
      expect(results.violations.map((v) => `${tab} ${v.id}: ${v.nodes.length}`)).toEqual([]);
    }
  });
});
