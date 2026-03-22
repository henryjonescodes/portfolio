/**
 * Type definitions for the animation system.
 *
 * Types are auto-derived from the actual configuration to maintain DRY principles.
 */

import type {
  DEFAULT_CATEGORY_SCALARS,
  DEFAULT_TRANSITION_SCALARS,
} from "@config/new-animations";

/** Framer Motion transition configuration */
export type TransitionConfig = {
  duration?: number;
  delay?: number;
  delayChildren?: number;
  staggerChildren?: number;
  ease?: string | number[];
  type?: "spring" | "tween" | "inertia";
  when?: "beforeChildren" | "afterChildren";
};

/** Category base durations derived from master */
export type AnimationBases = {
  PAGE_BASE: number; // Page-level transitions (slower, emphasized)
  MODAL_BASE: number; // Modal/dialog animations
  NAV_BASE: number; // Navigation items and menus
  TEXT_BASE: number; // Text effects (typewriter, reveals)
  COMPONENT_BASE: number; // Generic components (borders, boxes, etc)
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

/** Transition scalars - Auto-derived from config via typeof */
export type TransitionScalars = typeof DEFAULT_TRANSITION_SCALARS;

/** Pre-scaled values - Same keys as TransitionScalars but already multiplied by base */
export type ScaledTransitionValues = Record<keyof TransitionScalars, number>;

// ============================================================================
// TRANSITIONS_CONFIG types (new nested architecture)
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
