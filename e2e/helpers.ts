import { expect, type Page } from '@playwright/test';

type Box = { x: number; y: number; width: number; height: number };

/** Collects console errors and uncaught exceptions for the life of the page. */
export function trackErrors(page: Page) {
  const errors: string[] = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  page.on('pageerror', (err) => errors.push(err.message));
  return errors;
}

/**
 * Samples an element's bounding box every animation frame for `ms`, starting
 * immediately. Used to prove a transition actually interpolates instead of snapping.
 */
async function sampleBoxes(
  page: Page,
  selector: string,
  ms: number,
  clickSelector?: string,
): Promise<Box[]> {
  return page.evaluate(
    ([sel, duration, clickSel]) =>
      new Promise<Box[]>((resolve) => {
        if (clickSel) (document.querySelector(clickSel as string) as HTMLElement).click();
        const out: Box[] = [];
        const start = performance.now();
        const tick = () => {
          const el = document.querySelector(sel as string);
          if (el) {
            const r = el.getBoundingClientRect();
            out.push({ x: r.x, y: r.y, width: r.width, height: r.height });
          }
          if (performance.now() - start < (duration as number)) requestAnimationFrame(tick);
          else resolve(out);
        };
        tick();
      }),
    [selector, ms, clickSelector] as const,
  );
}

export function distinctBoxes(boxes: Box[]) {
  return new Set(boxes.map((b) => [b.x, b.y, b.width, b.height].map(Math.round).join(','))).size;
}

export async function openFirstEntry(page: Page, index = 0) {
  const entry = page.getByTestId('entry').nth(index);
  await expect(entry).toBeVisible();
  const source = (await entry.boundingBox())!;
  await entry.click();
  return { entry, source };
}

/** Clicks the first list entry in-page and samples the modal from the very next frame. */
export async function openFirstEntrySampled(page: Page, ms: number) {
  const entry = page.getByTestId('entry').first();
  await expect(entry).toBeVisible();
  const source = (await entry.boundingBox())!;
  const boxes = await sampleBoxes(page, '[data-testid="modal-entry"]', ms, '[data-testid="entry"]');
  return { source, boxes };
}

export async function closeModal(page: Page) {
  await page.getByTestId('modal-overlay').getByRole('button', { name: 'Close' }).click();
}
