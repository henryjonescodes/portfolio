import cn from 'classnames';
import { LayoutGroup, motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import ListIcon from '@assets/svg/icons/list.svg?react';
import type { Effort } from '@components/ExperienceEntry/types';
import { useAnimations } from '@context/AnimationContext';
import styles from './efforts.module.scss';

type EffortNavProps = {
  /** Namespaces tab and panel ids when several entries are open. */
  idPrefix: string;
  efforts: Effort[];
  selected: string | null;
  onSelect: (effortId: string | null) => void;
};

/**
 * A dock: Overview plus one key per effort, a lit indicator under the current one and its
 * name beside the tray. Arrow keys move between keys.
 */
const EffortNav = ({ idPrefix, efforts, selected, onSelect }: EffortNavProps) => {
  const { TRANSITIONS } = useAnimations();
  const tabs: Effort[] = [
    { id: '', title: 'Overview', summary: '', Icon: ListIcon, paint: 'stroke' },
    ...efforts,
  ];
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const selectedIndex = Math.max(
    0,
    tabs.findIndex((t) => t.id === (selected ?? '')),
  );

  // A mention that switches tabs unmounts itself; hand focus to the key it selected.
  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current && document.activeElement === document.body)
      refs.current[selectedIndex]?.focus();
    mounted.current = true;
  }, [selectedIndex]);

  const select = (index: number) => onSelect(tabs[index].id || null);

  const onKeyDown = (e: React.KeyboardEvent, index: number) => {
    const step = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    const next = (index + step + tabs.length) % tabs.length;
    select(next);
    refs.current[next]?.focus();
  };

  return (
    <div className={styles.dock}>
      <LayoutGroup id={`${idPrefix}-dock`}>
        <div className={styles.tray} role="tablist" aria-label="Highlights">
          {tabs.map((tab, i) => {
            const active = i === selectedIndex;
            const { Icon } = tab;
            return (
              <button
                key={tab.id || 'overview'}
                ref={(el) => (refs.current[i] = el)}
                type="button"
                role="tab"
                id={`${idPrefix}-tab-${tab.id || 'overview'}`}
                aria-selected={active}
                aria-label={tab.title}
                title={tab.title}
                // Only an effort's view is a labelled panel; the overview is the entry itself.
                aria-controls={active && tab.id ? `${idPrefix}-panel` : undefined}
                tabIndex={active ? 0 : -1}
                className={cn(styles.key, {
                  [styles.active]: active,
                  [styles.stroke]: tab.paint === 'stroke',
                })}
                onClick={(e) => {
                  e.stopPropagation();
                  select(i);
                }}
                onKeyDown={(e) => onKeyDown(e, i)}
              >
                {Icon ? <Icon aria-hidden /> : <span aria-hidden>{tab.title[0]}</span>}
                {active && (
                  <motion.span
                    layoutId="indicator"
                    className={styles.indicator}
                    transition={TRANSITIONS.MODAL.CONTENT_ANIMATE}
                  />
                )}
              </button>
            );
          })}
        </div>
      </LayoutGroup>
      <span className={styles.current} aria-hidden>
        {tabs[selectedIndex].title}
      </span>
    </div>
  );
};

export default EffortNav;
