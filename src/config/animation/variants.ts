import type { Transition, Variants } from 'framer-motion';

/** The site's standard fade: hidden on `initial`, in on `animate`, out on `exit`. */
export const fade = (animate?: Transition, exit?: Transition): Variants => ({
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: animate },
  exit: { opacity: 0, transition: exit },
});
