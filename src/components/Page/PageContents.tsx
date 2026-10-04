import classNames from 'classnames';
import { motion } from 'framer-motion';
import { ReactNode, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useSettings } from '@context/SettingsContext';
import { useAnimations } from '@context/AnimationContext';
import styles from './page.module.scss';
import { usePage } from '@context/PageContext';

// Define the props interface
export type PageContentsProps = {
  className?: string; // Add an optional className prop
};

type Props = {
  children: ReactNode;
} & PageContentsProps;

const PageContents: React.FC<Props> = ({ children, className }) => {
  const { animationDisabled } = useSettings();
  const { embedded } = usePage();
  const { TRANSITIONS } = useAnimations();
  // Each page mounts fresh per route, and keeps the mode it mounted with through its exit,
  // so a zoom toggle mid-visit does not swap its variants.
  const [minimal] = useState(animationDisabled);

  // A page mounts once the previous one has gone, so start it scrolled to the top.
  const ref = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    ref.current?.closest('[data-scroll-root]')?.scrollTo(0, 0);
  }, []);

  const pageVariants = useMemo(
    () => ({
      initial: {
        opacity: 0,
      },
      animate: {
        opacity: 1,
        transition: !embedded
          ? TRANSITIONS.PAGE_CONTENTS.FULLSCREEN_ANIMATE
          : TRANSITIONS.PAGE_CONTENTS.EMBEDDED_ANIMATE,
      },
      exit: {
        opacity: 0,
        transition: TRANSITIONS.PAGE_CONTENTS.EXIT,
      },
    }),
    [embedded, TRANSITIONS],
  );

  const minimalPageVariants = useMemo(
    () => ({
      animate: {
        opacity: 0,
      },
      shown: {
        opacity: 1,
        transition: TRANSITIONS.PAGE_CONTENTS.MINIMAL_SHOWN,
      },
      removed: {
        opacity: 0,
        transition: TRANSITIONS.PAGE_CONTENTS.MINIMAL_REMOVED,
      },
    }),
    [TRANSITIONS],
  );

  const { initial, animate, exit, variants } = minimal
    ? { initial: 'animate', animate: 'shown', exit: 'removed', variants: minimalPageVariants }
    : { initial: 'initial', animate: 'animate', exit: 'exit', variants: pageVariants };

  return (
    <motion.div
      ref={ref}
      className={classNames(styles.pageContents, className)}
      variants={variants}
      initial={initial}
      animate={animate}
      exit={exit}
    >
      {children}
    </motion.div>
  );
};

export default PageContents;
