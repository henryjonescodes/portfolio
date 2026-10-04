import { motion } from 'framer-motion';
import { useContext, useRef, type ReactNode } from 'react';
import { ExperienceEntryModalContext } from '@components/ExperienceEntry/ExperienceEntryModalContext';
import { useAnimations } from '@context/AnimationContext';

type SourceButtonProps = {
  className?: string;
  onActivate: (el: HTMLButtonElement) => void;
  children: ReactNode;
};

/**
 * A link that a modal window opens from. The word leaves just ahead of its window, so it is
 * clear what opened, and returns once the window has zoomed back into it.
 */
const SourceButton = ({ className, onActivate, children }: SourceButtonProps) => {
  const { TRANSITIONS } = useAnimations();
  const ref = useRef<HTMLButtonElement>(null);
  const source = useContext(ExperienceEntryModalContext)?.source;
  const away = !!source && source === ref.current;
  return (
    <motion.button
      ref={ref}
      type="button"
      className={className}
      initial={false}
      animate={{ opacity: away ? 0 : 1, filter: away ? 'blur(3px)' : 'blur(0px)' }}
      transition={TRANSITIONS.MODAL.SOURCE_PRESENCE}
      onClick={(e) => {
        e.stopPropagation();
        onActivate(e.currentTarget);
      }}
    >
      {children}
    </motion.button>
  );
};

export default SourceButton;
