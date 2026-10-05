import cn from 'classnames';
import { useEffect, useRef, type CSSProperties, type KeyboardEvent } from 'react';

import { useSound } from '@hooks/useSound';

import styles from './control-knob.module.scss';

/** Degrees from straight up to each end stop; the knob sweeps 270 degrees. */
const SWEEP = 135;
/** Pointer travel in pixels for a turn across the whole range. */
const DRAG_RANGE_PX = 180;
/** Wheel pixels for a turn across the whole range. */
const WHEEL_RANGE_PX = 1200;
/** Steps skipped by PageUp and PageDown. */
const PAGE_STEPS = 10;

const CENTRE = 32;
const ARC_RADIUS = 28;

type ControlKnobProps = {
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
  label: string;
  format?: (value: number) => string;
  /** CSS colour for the arc and notch; defaults to the accent colour. */
  color?: string;
  className?: string;
};

const decimals = (step: number) => (String(step).split('.')[1] ?? '').length;

const polar = (degrees: number) => {
  const radians = ((degrees - 90) * Math.PI) / 180;
  return [CENTRE + ARC_RADIUS * Math.cos(radians), CENTRE + ARC_RADIUS * Math.sin(radians)];
};

const arc = (from: number, to: number) => {
  const [x1, y1] = polar(from);
  const [x2, y2] = polar(to);
  return `M ${x1} ${y1} A ${ARC_RADIUS} ${ARC_RADIUS} 0 ${to - from > 180 ? 1 : 0} 1 ${x2} ${y2}`;
};

/** A rotary knob: pointer drag, wheel while focused, and the slider keys. */
const ControlKnob = ({
  value,
  min,
  max,
  step,
  onChange,
  label,
  format = String,
  color,
  className,
}: ControlKnobProps) => {
  const play = useSound();
  const knobRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; y: number; start: number } | null>(null);
  const latest = useRef({ value, min, max, step, onChange, play });
  latest.current = { value, min, max, step, onChange, play };

  const commit = (raw: number) => {
    const { value: current, min, max, step, onChange, play } = latest.current;
    const snapped = min + Math.round((Math.min(max, Math.max(min, raw)) - min) / step) * step;
    const next = Math.min(max, parseFloat(snapped.toFixed(decimals(step))));
    if (next === current) return;
    latest.current.value = next;
    onChange(next);
    play('toggle');
  };

  const span = max - min;
  const fraction = (value - min) / span;
  const angle = -SWEEP + fraction * SWEEP * 2;

  useEffect(() => {
    const el = knobRef.current;
    if (!el) return;
    // Only a focused knob takes the wheel, so scrolling a page of knobs still scrolls.
    const onWheel = (e: WheelEvent) => {
      if (document.activeElement !== el) return;
      e.preventDefault();
      const { value, min, max } = latest.current;
      commit(value - (e.deltaY / WHEEL_RANGE_PX) * (max - min));
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  const onKeyDown = (e: KeyboardEvent) => {
    const keys: Record<string, number> = {
      ArrowUp: step,
      ArrowRight: step,
      ArrowDown: -step,
      ArrowLeft: -step,
      PageUp: step * PAGE_STEPS,
      PageDown: -step * PAGE_STEPS,
    };
    if (e.key === 'Home') commit(min);
    else if (e.key === 'End') commit(max);
    else if (e.key in keys) commit(value + keys[e.key]);
    else return;
    e.preventDefault();
  };

  return (
    <div
      className={cn(styles.knob, className)}
      style={color ? ({ '--knob-color': color } as CSSProperties) : undefined}
    >
      <div
        ref={knobRef}
        className={styles.dial}
        role="slider"
        tabIndex={0}
        aria-label={label}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        aria-valuetext={format(value)}
        onKeyDown={onKeyDown}
        onPointerDown={(e) => {
          if (e.button !== 0) return;
          e.currentTarget.setPointerCapture(e.pointerId);
          e.currentTarget.focus();
          drag.current = { x: e.clientX, y: e.clientY, start: value };
        }}
        onPointerMove={(e) => {
          if (!drag.current) return;
          const { x, y, start } = drag.current;
          commit(start + ((e.clientX - x - (e.clientY - y)) / DRAG_RANGE_PX) * span);
        }}
        onPointerUp={() => (drag.current = null)}
        onPointerCancel={() => (drag.current = null)}
      >
        <svg viewBox="0 0 64 64" aria-hidden="true" focusable="false">
          <path className={styles.track} d={arc(-SWEEP, SWEEP)} />
          {fraction > 0 && <path className={styles.value} d={arc(-SWEEP, angle)} />}
          <g transform={`rotate(${angle} ${CENTRE} ${CENTRE})`}>
            <circle className={styles.body} cx={CENTRE} cy={CENTRE} r="20" />
            <line className={styles.notch} x1={CENTRE} y1="16" x2={CENTRE} y2="26" />
          </g>
        </svg>
      </div>
      <span className={styles.label}>{label}</span>
      <output className={styles.readout} aria-hidden="true">
        {format(value)}
      </output>
    </div>
  );
};

export default ControlKnob;
