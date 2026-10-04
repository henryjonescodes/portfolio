import { folder } from 'leva';
import { forEachTunableTransition, SYSTEM_TUNABLES, type Tunable } from '@config/animation';

type Schema = Parameters<typeof folder>[0];

const control = (key: string, { value, min, max, step, label, hint }: Tunable, path = key) => ({
  value,
  min,
  max,
  step,
  label,
  hint: hint ? `${hint} | ${path}` : path,
});

function transitionFolders(): Schema {
  const components: Record<string, Record<string, Schema>> = {};
  forEachTunableTransition((key, tunable, [component, action, field]) => {
    components[component] ??= {};
    components[component][action] ??= {};
    components[component][action][key] = control(key, tunable, `${component}.${action}.${field}`);
  });
  return Object.fromEntries(
    Object.entries(components).map(([component, actions]) => [
      component,
      folder(
        Object.fromEntries(
          Object.entries(actions).map(([action, fields]) => [
            action,
            folder(fields, { collapsed: true }),
          ]),
        ),
        { collapsed: true },
      ),
    ]),
  );
}

/** The full Leva schema for the animation system, built once. */
export const ANIMATION_SCHEMA: Schema = {
  ...Object.fromEntries(
    Object.values(SYSTEM_TUNABLES).map((section) => [
      section.title,
      folder(
        Object.fromEntries(
          Object.entries(section.values).map(([key, t]) => [key, control(key, t as Tunable)]),
        ),
        { collapsed: 'collapsed' in section ? section.collapsed : true },
      ),
    ]),
  ),
  '✨ Transitions': folder(transitionFolders(), { collapsed: true }),
};
