import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Page } from '@playwright/test';

const openPanel = async (page: Page) => {
  await page.goto('/about?lite=true');
  await page.getByRole('button', { name: 'Open control panel' }).click();
  const panel = page.getByRole('dialog', { name: 'Control panel' });
  await expect(panel).toBeVisible();
  return panel;
};

const fontFamily = (page: Page) => page.evaluate(() => getComputedStyle(document.body).fontFamily);

test.describe('control panel', () => {
  test('tabs switch pages', async ({ page }) => {
    const panel = await openPanel(page);
    await expect(panel.getByLabel('Foreground')).toBeVisible();

    await panel.getByRole('tab', { name: 'Type' }).click();
    await expect(panel.getByRole('radio', { name: 'IBM Plex Mono' })).toBeVisible();

    await panel.getByRole('tab', { name: 'FX' }).click();
    await expect(panel.getByLabel('Motion speed')).toBeVisible();
    await expect(panel.getByLabel('CRT intensity')).toBeVisible();
  });

  test('the type family changes the page font and persists', async ({ page }) => {
    const panel = await openPanel(page);
    expect(await fontFamily(page)).toContain('Pixelify Sans');

    await panel.getByRole('tab', { name: 'Type' }).click();
    await panel.getByRole('radio', { name: 'IBM Plex Mono' }).click();
    expect(await fontFamily(page)).toContain('IBM Plex Mono');

    await page.reload();
    await expect.poll(() => fontFamily(page)).toContain('IBM Plex Mono');
  });

  test('the FX page drives the CRT custom property', async ({ page }) => {
    const panel = await openPanel(page);
    await panel.getByRole('tab', { name: 'FX' }).click();
    await panel.getByLabel('CRT intensity').fill('0.5');
    const value = await page.evaluate(() =>
      document.documentElement.style.getPropertyValue('--crt-intensity'),
    );
    expect(value).toBe('0.5');
  });

  test('the sound switch persists across reload', async ({ page }) => {
    const panel = await openPanel(page);
    await panel.getByRole('tab', { name: 'FX' }).click();
    const sound = panel.getByRole('switch');
    await expect(sound).toHaveAttribute('aria-checked', 'true');
    await sound.click();
    await expect(sound).toHaveAttribute('aria-checked', 'false');

    await page.reload();
    await expect(page.getByRole('button', { name: 'Sound off' })).toBeVisible();
    await page.getByRole('button', { name: 'Open control panel' }).click();
    await panel.getByRole('tab', { name: 'FX' }).click();
    await expect(panel.getByRole('switch')).toHaveAttribute('aria-checked', 'false');
  });

  test('the waveform row is keyboard operable', async ({ page }) => {
    const panel = await openPanel(page);
    await panel.getByRole('tab', { name: 'FX' }).click();
    await expect(panel.getByRole('radio', { name: 'square' })).toHaveAttribute(
      'aria-checked',
      'true',
    );
    await panel.getByRole('radio', { name: 'square' }).focus();
    await page.keyboard.press('ArrowRight');
    const saw = panel.getByRole('radio', { name: 'sawtooth' });
    await expect(saw).toBeFocused();
    await expect(saw).toHaveAttribute('aria-checked', 'true');
  });

  test('a knob turns with the arrow keys and applies its value', async ({ page }) => {
    const panel = await openPanel(page);
    const accent = () =>
      page.evaluate(() => document.documentElement.style.getPropertyValue('--accent-primary'));
    const knob = panel.getByRole('slider', { name: 'Accent' });
    const before = Number(await knob.getAttribute('aria-valuenow'));
    const colourBefore = await accent();

    await knob.focus();
    await page.keyboard.press('PageUp');
    await expect(knob).toHaveAttribute('aria-valuenow', String(before + 10));
    await expect.poll(accent).not.toBe(colourBefore);

    await page.keyboard.press('Home');
    await expect(knob).toHaveAttribute('aria-valuenow', '0');
    await page.keyboard.press('End');
    await expect(knob).toHaveAttribute('aria-valuenow', '360');
    await expect(knob).toHaveAttribute('aria-valuetext', '360\u00b0');
  });

  test('a knob follows a drag', async ({ page }) => {
    const panel = await openPanel(page);
    const knob = panel.getByRole('slider', { name: 'Foreground' });
    const before = Number(await knob.getAttribute('aria-valuenow'));
    const box = (await knob.boundingBox())!;
    const x = box.x + box.width / 2;
    const y = box.y + box.height / 2;

    await page.mouse.move(x, y);
    await page.mouse.down();
    await page.mouse.move(x, y - 45, { steps: 5 });
    await page.mouse.up();
    await expect(knob).toBeFocused();
    expect(Number(await knob.getAttribute('aria-valuenow'))).toBeGreaterThan(before + 30);
  });

  test('the sound knobs and mini sliders both drive preferences', async ({ page }) => {
    const panel = await openPanel(page);
    await panel.getByRole('tab', { name: 'FX' }).click();
    const cutoff = panel.getByRole('slider', { name: 'Cutoff' });
    await cutoff.focus();
    await page.keyboard.press('ArrowUp');
    await expect(cutoff).toHaveAttribute('aria-valuetext', /Hz$/);
    const value = Number(await cutoff.getAttribute('aria-valuenow'));
    await page.reload();
    await page.getByRole('button', { name: 'Open control panel' }).click();
    await panel.getByRole('tab', { name: 'FX' }).click();
    await expect(panel.getByRole('slider', { name: 'Cutoff' })).toHaveAttribute(
      'aria-valuenow',
      String(value),
    );
    await expect(panel.locator('input[type="range"]').first()).toBeVisible();
  });

  test('the nav speaker button toggles sound', async ({ page }) => {
    await page.goto('/about?lite=true');
    await page.getByRole('button', { name: 'Sound on' }).click();
    await expect(page.getByRole('button', { name: 'Sound off' })).toBeVisible();
    await page.getByRole('button', { name: 'Sound off' }).click();
    await expect(page.getByRole('button', { name: 'Sound on' })).toBeVisible();
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

  test('tabs and font choices are keyboard rows', async ({ page }) => {
    const panel = await openPanel(page);
    const colour = panel.getByRole('tab', { name: 'Colour' });
    await expect(colour).toBeFocused();
    await expect(colour).toHaveAttribute('aria-selected', 'true');
    await expect(panel.getByRole('tabpanel', { name: 'Colour' })).toBeVisible();

    await page.keyboard.press('ArrowRight');
    const type = panel.getByRole('tab', { name: 'Type' });
    await expect(type).toBeFocused();
    await expect(type).toHaveAttribute('aria-selected', 'true');
    await page.keyboard.press('ArrowLeft');
    await page.keyboard.press('ArrowLeft');
    await expect(panel.getByRole('tab', { name: 'FX' })).toBeFocused();

    await page.keyboard.press('ArrowLeft');
    await panel.getByRole('radio', { name: 'Pixelify Sans' }).focus();
    await page.keyboard.press('ArrowDown');
    const vt323 = panel.getByRole('radio', { name: 'VT323' });
    await expect(vt323).toBeFocused();
    await expect(vt323).toHaveAttribute('aria-checked', 'true');
  });

  test('focus stays inside and returns to the gear on close', async ({ page }) => {
    const panel = await openPanel(page);
    const first = panel.getByRole('tab', { name: 'Colour' });
    const last = panel.getByLabel('Accent');
    await expect(first).toBeFocused();
    await page.keyboard.press('Shift+Tab');
    await expect(last).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(first).toBeFocused();

    await page.keyboard.press('Escape');
    await expect(panel).toBeHidden();
    await expect(page.getByRole('button', { name: 'Open control panel' })).toBeFocused();
  });

  test('leaving full screen closes it for good', async ({ page }) => {
    test.skip(!!process.env.CI, 'needs the 3D scene, which CI runners cannot load in time');
    await page.goto('/about');
    await page.getByRole('button', { name: 'Full screen' }).click();
    await page.getByRole('button', { name: 'Open control panel' }).click();
    const panel = page.getByRole('dialog', { name: 'Control panel' });
    await expect(panel).toBeVisible();

    await page.getByRole('button', { name: 'Back to the device' }).click();
    await expect(panel).toBeHidden();
    await page.getByRole('button', { name: 'Full screen' }).click();
    await expect(page.getByRole('button', { name: 'Open control panel' })).toBeVisible();
    await expect(panel).toBeHidden();
  });

  test('has no axe violations while open', async ({ page }) => {
    const panel = await openPanel(page);
    await page.waitForTimeout(2500);
    for (const tab of ['Colour', 'Type', 'FX']) {
      await panel.getByRole('tab', { name: tab }).click();
      const results = await new AxeBuilder({ page }).include('[role="dialog"]').analyze();
      expect(results.violations.map((v) => `${tab} ${v.id}: ${v.nodes.length}`)).toEqual([]);
    }
  });
});
