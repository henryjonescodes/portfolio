/** Category bases every transition timing is a multiple of. */
export type BaseKey = 'PAGE' | 'MODAL' | 'NAV' | 'TEXT' | 'COMPONENT';

export type Range = { min: number; max: number; step: number };

export const RANGE = {
  standard: { min: 0, max: 5, step: 0.1 },
  extended: { min: 0, max: 10, step: 0.1 },
  fine: { min: 0, max: 5, step: 0.05 },
  base: { min: 0.5, max: 3, step: 0.1 },
  master: { min: 0.1, max: 3, step: 0.05 },
} as const satisfies Record<string, Range>;

/** A number the debug panel can adjust. With a base, the resolved value is `base * value`. */
export type Tunable = Range & {
  _tunable: true;
  base?: BaseKey;
  value: number;
  label: string;
  hint?: string;
};

export function tune(
  base: BaseKey | undefined,
  value: number,
  range: Range,
  label: string,
  hint?: string,
): Tunable {
  return { _tunable: true, base, value, ...range, label, hint };
}

export const isTunable = (field: unknown): field is Tunable =>
  typeof field === 'object' && field !== null && '_tunable' in field;

export type TransitionField = Tunable | string | number;
export type TransitionsConfig = Record<string, Record<string, Record<string, TransitionField>>>;

/** A titled group of system-level tunables (master speed, springs, timeouts). */
export type TunableSection = {
  title: string;
  collapsed?: boolean;
  values: Record<string, Tunable>;
};

/** Flat map of every tunable's current value, keyed as the debug panel keys them. */
export type TunableValues = Record<string, number>;

/** Key for a transition field: COMPONENT_ACTION_field, unique across the config. */
export const transitionKey = (component: string, action: string, field: string) =>
  `${component}_${action}_${field}`;
