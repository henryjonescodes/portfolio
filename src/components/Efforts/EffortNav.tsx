import cn from 'classnames';
import { useEffect, useRef } from 'react';
import type { Effort } from '@components/ExperienceEntry/types';
import styles from './efforts.module.scss';

type EffortNavProps = {
  /** Namespaces tab and panel ids when several entries are open. */
  idPrefix: string;
  efforts: Effort[];
  selected: string | null;
  onSelect: (effortId: string | null) => void;
};

/** Overview plus one tab per effort; arrow keys move between tabs. */
const EffortNav = ({ idPrefix, efforts, selected, onSelect }: EffortNavProps) => {
  const tabs = [{ id: null, title: 'Overview' }, ...efforts];
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  // A mention that switches tabs unmounts itself; hand focus to the tab it selected.
  const selectedIndex = tabs.findIndex((t) => t.id === selected);
  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current && document.activeElement === document.body)
      refs.current[selectedIndex]?.focus();
    mounted.current = true;
  }, [selectedIndex]);

  const onKeyDown = (e: React.KeyboardEvent, index: number) => {
    const step = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    const next = (index + step + tabs.length) % tabs.length;
    onSelect(tabs[next].id);
    refs.current[next]?.focus();
  };

  return (
    <div className={styles.nav} role="tablist" aria-label="Highlights">
      {tabs.map((tab, i) => {
        const active = tab.id === selected;
        return (
          <button
            key={tab.id ?? 'overview'}
            ref={(el) => (refs.current[i] = el)}
            type="button"
            role="tab"
            id={`${idPrefix}-tab-${tab.id ?? 'overview'}`}
            aria-selected={active}
            // Only an effort's view is a labelled panel; the overview is the entry itself.
            aria-controls={active && tab.id ? `${idPrefix}-panel` : undefined}
            tabIndex={active ? 0 : -1}
            className={cn(styles.tab, { [styles.active]: active })}
            onClick={(e) => {
              e.stopPropagation();
              onSelect(tab.id);
            }}
            onKeyDown={(e) => onKeyDown(e, i)}
          >
            {tab.title}
          </button>
        );
      })}
    </div>
  );
};

export default EffortNav;
