import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { openFirstEntry } from './helpers';

test.describe('accessibility', () => {
  for (const path of ['/', '/about', '/experience', '/projects', '/links']) {
    test(`${path} has no axe violations in lite mode`, async ({ page }) => {
      await page.goto(`${path}?lite=true`);
      await page.waitForTimeout(2500); // let paint-in finish so contrast is measured on final colours
      const results = await new AxeBuilder({ page }).analyze();
      expect(results.violations.map((v) => `${v.id}: ${v.nodes.length}`)).toEqual([]);
    });
  }

  test('the open modal has no axe violations', async ({ page }) => {
    await page.goto('/experience?lite=true');
    await page.waitForTimeout(1500);
    await openFirstEntry(page);
    await page.waitForTimeout(2500);
    const results = await new AxeBuilder({ page }).include('[role="dialog"]').analyze();
    expect(results.violations.map((v) => `${v.id}: ${v.nodes.length}`)).toEqual([]);
  });
});
