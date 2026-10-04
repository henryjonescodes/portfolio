import type { CSSProperties } from 'react';

/**
 * Measures `el` against `root` in root's own CSS pixels, undoing any ancestor scale and
 * adding root's scroll, so the result can position an absolute child of root over `el`.
 */
export function boxWithin(
  el: Element,
  root: HTMLElement,
  size?: { width: number; height: number },
): CSSProperties {
  const rootRect = root.getBoundingClientRect();
  const rect = el.getBoundingClientRect();
  const scale = rootRect.width / root.offsetWidth || 1;
  return {
    top: (rect.top - rootRect.top) / scale + root.scrollTop,
    left: (rect.left - rootRect.left) / scale + root.scrollLeft,
    width: size?.width ?? rect.width / scale,
    height: size?.height ?? rect.height / scale,
  };
}
