/**
 * Animation timing for the whole site. All durations are in seconds (Framer Motion's unit);
 * springs, timeouts and the map cascade are in react-spring units and milliseconds.
 *
 * Defaults resolve once at module load. With `?debug=true` the lazily loaded debug panel
 * feeds Leva values back through AnimationProvider, so production never loads Leva.
 */
export { SYSTEM_TUNABLES } from './system';
export * from './tunable';
export * from './resolve';
export * from './variants';
