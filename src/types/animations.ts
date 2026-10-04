/**
 * Type definitions for the animation system.
 */

import type { DEFAULT_CATEGORY_SCALARS } from '@config/new-animations';

/** Framer Motion transition configuration */
export type TransitionConfig = {
  duration?: number;
  delay?: number;
  delayChildren?: number;
  staggerChildren?: number;
  ease?: string | number[];
  type?: 'spring' | 'tween' | 'inertia';
  when?: 'beforeChildren' | 'afterChildren';
};

/** Category base durations derived from master */
export type AnimationBases = {
  PAGE_BASE: number;
  MODAL_BASE: number;
  NAV_BASE: number;
  TEXT_BASE: number;
  COMPONENT_BASE: number;
};

/** Spring physics configuration for react-spring */
export type SpringConfig = {
  tension: number;
  friction: number;
  mass: number;
};

/** Base type - Derived from AnimationBases keys */
export type BaseType = keyof AnimationBases;

/** Category base scalars - Auto-derived from config via typeof */
export type CategoryBaseScalars = typeof DEFAULT_CATEGORY_SCALARS;

// ============================================================================
// TRANSITIONS_CONFIG types (nested architecture)
// ============================================================================

export type ScalarField = {
  _type: 'scalar';
  base?: BaseType;
  value: number;
  min: number;
  max: number;
  step: number;
  label?: string;
  hint?: string;
};

export type ConstantField = {
  _type: 'constant';
  value: number;
};

export type TransitionField = ScalarField | ConstantField | string | number;

export type TransitionAction = { [key: string]: TransitionField };

export type TransitionComponent = { [action: string]: TransitionAction };

export type TransitionsConfig = { [component: string]: TransitionComponent };
