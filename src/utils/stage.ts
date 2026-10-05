// A phone held upright shows the 3D stage turned 90 degrees clockwise (see `.rotated` in
// landing.module.scss), so its local x runs down the screen and its local y runs right to left.

/** Maps a client point into the stage's own frame, measured from the stage's top-left corner. */
export const toStagePoint = (
  clientX: number,
  clientY: number,
  rotated: boolean,
  rect?: DOMRect,
): [number, number] => {
  if (!rotated) return [clientX - (rect?.left ?? 0), clientY - (rect?.top ?? 0)];
  return [clientY - (rect?.top ?? 0), (rect?.right ?? window.innerWidth) - clientX];
};

/** Asks the browser to hold landscape; only Android in full screen agrees, so failure is normal. */
export const tryLockLandscape = (): Promise<boolean> => {
  const orientation = screen.orientation as ScreenOrientation & {
    lock?: (to: string) => Promise<void>;
  };
  if (!orientation?.lock) return Promise.resolve(false);
  return orientation.lock('landscape').then(
    () => true,
    () => false,
  );
};
