import { expect, test } from '@playwright/test';
import {
  distinctBoxes,
  openFirstEntry,
  openFirstEntrySampled,
  trackErrors,
  closeModal,
} from './helpers';

const LITE = '?lite=true';

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

test('restoring from expanded never clips the window', async ({ page }) => {
  await page.goto('/experience?lite=true');
  await page.waitForTimeout(1500);
  await openFirstEntry(page);
  const dialog = page.getByRole('dialog');
  await page.waitForTimeout(1200);
  await dialog.getByRole('button', { name: 'Expand' }).click();
  await page.waitForTimeout(1200);

  // Every frame of the restore, the visible dialog area must still contain the window.
  const overhang = await page.evaluate(
    () =>
      new Promise<number>((resolve) => {
        const dlg = document.querySelector('[role="dialog"]') as HTMLElement;
        (dlg.querySelector('[aria-label="Restore"]') as HTMLElement).click();
        let worst = 0;
        const t0 = performance.now();
        const tick = () => {
          const d = dlg.getBoundingClientRect();
          const e = dlg.querySelector('[data-testid="modal-entry"]')!.getBoundingClientRect();
          worst = Math.max(worst, d.top - e.top, e.bottom - d.bottom);
          if (performance.now() - t0 < 900) requestAnimationFrame(tick);
          else resolve(worst);
        };
        requestAnimationFrame(tick);
      }),
  );
  expect(overhang).toBeLessThan(2);
});

test('opening the modal moves its content with the window, never ahead of it', async ({ page }) => {
  await page.goto('/projects?lite=true');
  await page.waitForTimeout(2000);
  type Frame = { t: number; box: number[]; inner: number[][] };
  const frames = await page.evaluate(
    () =>
      new Promise<Frame[]>((resolve) => {
        (document.querySelector('[data-testid="entry"]') as HTMLElement).click();
        const out: Frame[] = [];
        const t0 = performance.now();
        const tick = () => {
          const box = document.querySelector('[data-testid="modal-entry"]');
          const title =
            box &&
            [...box.querySelectorAll('h2')].find((h) => !h.closest('[class*="modalNavbar"]'));
          const firstLine = box?.querySelector('[class*="description"] p');
          if (box && title && firstLine) {
            const b = box.getBoundingClientRect();
            const rel = (el: Element) => {
              const r = el.getBoundingClientRect();
              return [r.top - b.top, b.bottom - r.bottom];
            };
            out.push({
              t: performance.now() - t0,
              box: [b.width, b.height],
              inner: [rel(title), rel(firstLine)],
            });
          }
          if (performance.now() - t0 < 1500) requestAnimationFrame(tick);
          else resolve(out);
        };
        tick();
      }),
  );
  expect(frames.length).toBeGreaterThanOrEqual(3);
  // Never outside the window, which is what clips.
  for (const f of frames) {
    for (const [top, bottom] of f.inner) expect(Math.min(top, bottom)).toBeGreaterThan(-2);
  }
  // The content settles when the window settles, not before it with a jump or after it.
  const round = (xs: number[]) => xs.map(Math.round).join();
  const settledAt = (pick: (f: Frame) => string) => {
    const last = pick(frames[frames.length - 1]);
    return frames.find((_, i) => frames.slice(i).every((g) => pick(g) === last))!.t;
  };
  const boxDone = settledAt((f) => round(f.box));
  const innerDone = settledAt((f) => round(f.inner.flat()));
  // Settling is only measurable to the frame, and slow runners deliver frames far apart.
  const gaps = frames
    .slice(1)
    .map((f, i) => f.t - frames[i].t)
    .sort((a, b) => a - b);
  const frameGap = gaps[Math.floor(gaps.length / 2)] ?? 16;
  expect(Math.abs(innerDone - boxDone)).toBeLessThan(Math.max(120, frameGap * 2.5));
});

test('efforts: tabs switch the open entry, and a mention opens its effort', async ({ page }) => {
  await page.goto('/experience?lite=true');
  await page.waitForTimeout(1500);
  await openFirstEntry(page);
  const dialog = page.getByRole('dialog');
  const tabs = dialog.getByRole('tablist', { name: 'Highlights' });
  await expect(tabs.getByRole('tab', { name: 'Overview' })).toHaveAttribute(
    'aria-selected',
    'true',
  );

  await tabs.getByRole('tab', { name: 'User notifier' }).click();
  await expect(dialog.getByRole('tabpanel')).toContainText('Notifications sent');
  await expect(dialog.getByText('unverified').first()).toBeVisible();

  await tabs.getByRole('tab', { name: 'Overview' }).click();
  await dialog.getByRole('button', { name: 'Almanac', exact: true }).click();
  await expect(tabs.getByRole('tab', { name: 'Almanac' })).toHaveAttribute('aria-selected', 'true');

  // List items show mentions as text, never as nested buttons.
  await closeModal(page);
  await expect(page.getByTestId('entry').first().getByRole('button')).toHaveCount(0);
});

test('efforts: a mention hands focus to the tab it selects', async ({ page }) => {
  await page.goto('/experience?lite=true');
  await page.waitForTimeout(1500);
  await openFirstEntry(page);
  const dialog = page.getByRole('dialog');
  await page.waitForTimeout(1500);
  await dialog.getByRole('button', { name: 'Almanac', exact: true }).focus();
  await page.keyboard.press('Enter');
  await expect(dialog.getByRole('tab', { name: 'Almanac' })).toBeFocused();
});

test('hero figures show their value with reduced motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/experience?lite=true');
  await openFirstEntry(page);
  const dialog = page.getByRole('dialog');
  await dialog.getByRole('tab', { name: 'User notifier' }).click();
  await expect(dialog.getByText('99.99%').first()).toBeVisible();
});

test('the open modal is shareable: its state is in the URL and a link reopens it', async ({
  page,
}) => {
  await page.goto('/experience?lite=true');
  await page.waitForTimeout(1500);
  await openFirstEntry(page);
  const dialog = page.getByRole('dialog');
  await expect(page).toHaveURL(/entry=arbor/);
  await dialog.getByRole('tab', { name: 'User notifier' }).click();
  await dialog.getByRole('button', { name: 'Expand' }).click();
  await expect(page).toHaveURL(/effort=notifier/);
  await expect(page).toHaveURL(/size=full/);
  await expect(page).toHaveTitle('User notifier at Arbor | Henry Jones');
  const shared = page.url();

  await closeModal(page);
  await expect(page).not.toHaveURL(/entry=/);
  await expect(page).toHaveURL(/lite=true/);
  await expect(page).toHaveTitle('Experience | Henry Jones');

  await page.goto(shared);
  await expect(page.getByRole('dialog')).toBeVisible();
  await expect(page.getByRole('tab', { name: 'User notifier' })).toHaveAttribute(
    'aria-selected',
    'true',
  );
  await expect(page.getByRole('dialog').getByRole('button', { name: 'Restore' })).toBeVisible();
});

test('a link names any entry, projects included', async ({ page }) => {
  await page.goto('/projects?lite=true&entry=thesis');
  await expect(page.getByRole('dialog', { name: 'Senior Thesis' })).toBeVisible();
});

test('after closing a shared entry, moving on does not reopen it', async ({ page }) => {
  await page.goto('/experience?lite=true&entry=arbor');
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  await page.waitForTimeout(1200);
  await closeModal(page);
  await expect(dialog).toHaveCount(0);
  await page.getByRole('link', { name: 'About' }).first().click();
  await expect(page).toHaveURL(/\/about\?lite=true$/);
  await page.waitForTimeout(1200);
  await expect(dialog).toHaveCount(0);
});

test('with reduced motion, and without a source, the modal still closes', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/experience?lite=true');
  await openFirstEntry(page);
  await page.waitForTimeout(800);
  await closeModal(page);
  await expect(page.getByRole('dialog')).toHaveCount(0, { timeout: 5_000 });

  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/experience?lite=true&entry=arbor');
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.waitForTimeout(800);
  await closeModal(page);
  await expect(page.getByRole('dialog')).toHaveCount(0, { timeout: 5_000 });
});
