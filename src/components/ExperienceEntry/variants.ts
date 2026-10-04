import type { Variants } from 'framer-motion';
import type { ResolvedAnimations } from '@config/animation';

/**
 * Variants for ExperienceEntry. List copies use the standard initial/animate/exit labels,
 * which paint text in; the modal copy uses modalAnimate/modalExit, which no variant here
 * defines, so its text appears without replaying the paint-in.
 */
export function buildEntryVariants(TRANSITIONS: ResolvedAnimations['TRANSITIONS']) {
  const headerText: Variants = {
    animate: { transition: TRANSITIONS.MODAL_HEADER.TEXT_ANIMATE },
  };

  const entryText: Variants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        ...TRANSITIONS.MODAL_TEXT.PAINT_ANIMATE,
        staggerChildren: TRANSITIONS.MODAL_TEXT.ANIMATE_STAGGER.staggerChildren,
      },
    },
    exit: { opacity: 0, transition: TRANSITIONS.MODAL_TEXT.PAINT_ANIMATE },
  };

  const modalContainer: Variants = {
    animate: { margin: '0 32px', transition: TRANSITIONS.MODAL.CONTAINER_ANIMATE },
    expanded: { margin: '0px', transition: TRANSITIONS.MODAL.CONTAINER_ANIMATE },
  };

  const tools: Variants = {
    animate: { transition: TRANSITIONS.EXPERIENCE.TOOLS_ANIMATE },
  };

  return { headerText, entryText, modalContainer, tools };
}
