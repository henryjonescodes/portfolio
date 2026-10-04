import { RANGE, tune, type TunableSection } from './tunable';

const spring = (name: string, tension: number, friction: number, mass: number) => ({
  [`SPRING_${name}_TENSION`]: tune(undefined, tension, { min: 50, max: 500, step: 10 }, 'Tension'),
  [`SPRING_${name}_FRICTION`]: tune(undefined, friction, { min: 5, max: 50, step: 1 }, 'Friction'),
  [`SPRING_${name}_MASS`]: tune(undefined, mass, { min: 0.1, max: 5, step: 0.1 }, 'Mass'),
});

/** System-level tunables: the master speed, category bases, 3D springs and timeouts. */
export const SYSTEM_TUNABLES = {
  master: {
    title: '🎛️ Master Control',
    collapsed: false,
    values: {
      ANIMATION_MASTER_BASE: tune(
        undefined,
        0.3,
        RANGE.master,
        'Master Base Duration',
        'Single value to speed/slow ALL animations',
      ),
    },
  },
  categoryBases: {
    title: '📊 Category Bases',
    values: {
      PAGE_BASE_SCALAR: tune(undefined, 1.67, RANGE.base, 'Page', 'Multiplies master base'),
      MODAL_BASE_SCALAR: tune(undefined, 1.0, RANGE.base, 'Modal'),
      NAV_BASE_SCALAR: tune(undefined, 2.0, RANGE.base, 'Nav'),
      TEXT_BASE_SCALAR: tune(undefined, 0.67, RANGE.base, 'Text'),
      COMPONENT_BASE_SCALAR: tune(undefined, 1.0, RANGE.base, 'Component'),
    },
  },
  buttonSpring: {
    title: '🔘 3D Button Press Spring',
    values: spring('BUTTON', 300, 20, 1),
  },
  cameraSpring: {
    title: '🎥 Camera Zoom Spring',
    values: {
      ...spring('CAMERA', 170, 26, 1),
      CAMERA_LERP: tune(
        undefined,
        0.1,
        { min: 0.01, max: 1, step: 0.01 },
        'Follow Lerp',
        'Per-frame easing of the camera toward the spring position',
      ),
    },
  },
  constants: {
    title: '⚙️ System Constants',
    values: {
      MAP_SLIDER_CASCADE_DURATION_MS: tune(
        undefined,
        1000,
        { min: 0, max: 5000, step: 50 },
        'Map Slider > Cascade Duration (ms)',
        'Time between map slider items cascading',
      ),
      TIMEOUT_LITE_MODE_FALLBACK: tune(
        undefined,
        8000,
        { min: 1000, max: 30000, step: 1000 },
        'Lite Mode Fallback (ms)',
        'Loading time before falling back to lite mode',
      ),
      TIMEOUT_USER_INITIATED_FALLBACK: tune(
        undefined,
        30000,
        { min: 5000, max: 60000, step: 1000 },
        'User Initiated Fallback (ms)',
        'Loading time allowed after the user asks for 3D',
      ),
    },
  },
} satisfies Record<string, TunableSection>;
