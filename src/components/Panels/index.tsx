import cn from 'classnames';
import { motion } from 'framer-motion';
import { useMemo, type ComponentType } from 'react';
import { useAnimations } from '@context/AnimationContext';
import { PANEL_VIEWS } from './registry';
import type { Panel } from './types';
import styles from './panels.module.scss';

export type { Panel } from './types';

/** Lays panels out on a 6-column grid of small windows, fading in one after another. */
const PanelGrid = ({ panels }: { panels: Panel[] }) => {
  const { TRANSITIONS } = useAnimations();
  const variants = useMemo(
    () => ({
      grid: { hidden: {}, shown: { transition: TRANSITIONS.PANELS.STAGGER } },
      panel: {
        hidden: { opacity: 0, y: 8 },
        shown: { opacity: 1, y: 0, transition: TRANSITIONS.PANELS.PANEL },
      },
    }),
    [TRANSITIONS],
  );

  return (
    <motion.div className={styles.grid} variants={variants.grid} initial="hidden" animate="shown">
      {panels.map((panel, i) => {
        const View = PANEL_VIEWS[panel.type] as ComponentType<Panel>;
        return (
          <motion.section
            key={`${panel.type}-${i}`}
            className={cn(styles.panel, styles[panel.span ?? 'full'])}
            variants={variants.panel}
            aria-label={panel.title}
          >
            {panel.title && <header className={styles.titleBar}>{panel.title}</header>}
            <div className={styles.body}>
              <View {...panel} />
            </div>
          </motion.section>
        );
      })}
    </motion.div>
  );
};

export default PanelGrid;
