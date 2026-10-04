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
  scene: {
    title: '🎬 3D Scene',
    values: {
      DIR_LIGHT_X: tune(undefined, 5.2, { min: -20, max: 20, step: 0.1 }, 'Dir Light X'),
      DIR_LIGHT_Y: tune(undefined, 2.1, { min: -20, max: 20, step: 0.1 }, 'Dir Light Y'),
      DIR_LIGHT_Z: tune(undefined, 6.5, { min: -20, max: 20, step: 0.1 }, 'Dir Light Z'),
      DIR_LIGHT_INTENSITY: tune(
        undefined,
        0.4,
        { min: 0, max: 3, step: 0.1 },
        'Dir Light Intensity',
        'Brightness of the main light (creates shadows)',
      ),
      AMBIENT_INTENSITY: tune(
        undefined,
        0.7,
        { min: 0, max: 3, step: 0.1 },
        'Ambient Intensity',
        'Overall scene brightness (no shadows)',
      ),
      ROTATE_POLAR_LIMIT: tune(
        undefined,
        32,
        { min: 0, max: 90, step: 1 },
        'Vertical Limit (°)',
        'Max rotation up/down from center',
      ),
      ROTATE_AZIMUTH_LIMIT: tune(
        undefined,
        32,
        { min: 0, max: 90, step: 1 },
        'Horizontal Limit (°)',
        'Max rotation left/right from center',
      ),
      ...spring('ROTATE_SNAP', 600, 26, 2.5),
      ...spring('ROTATE_DRAG', 950, 26, 0.7),
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
      TIMEOUT_ZOOM_ANIMATION_LOCK: tune(
        undefined,
        500,
        { min: 0, max: 3000, step: 50 },
        'Zoom Animation Lock (ms)',
        'Page animations stay simplified this long after a fullscreen zoom toggle',
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
