import type { KeyboardEvent } from 'react';

const FOCUSABLE = 'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])';

/** Keeps Tab and Shift+Tab cycling inside `container`, for modal dialogs. */
export function trapFocus(e: KeyboardEvent<HTMLElement>) {
  if (e.key !== 'Tab') return;
  // Only what is rendered: a control hidden by CSS (Expand on phones) is not a tab stop.
  const items = [...e.currentTarget.querySelectorAll<HTMLElement>(FOCUSABLE)].filter(
    (el) => el.getClientRects().length > 0,
  );
  if (!items.length) return;
  const first = items[0];
  const last = items[items.length - 1];
  const active = document.activeElement;
  if (e.shiftKey && (active === first || active === e.currentTarget)) {
    e.preventDefault();
    last.focus();
  } else if (!e.shiftKey && active === last) {
    e.preventDefault();
    first.focus();
  }
}
