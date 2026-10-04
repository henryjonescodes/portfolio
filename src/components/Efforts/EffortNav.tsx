import { useEffect, useRef } from 'react';
import Home from '@assets/svg/icons/home.svg?react';
import type { Effort } from '@components/ExperienceEntry/types';
import NavBarItem from '@components/NavBar/NavbarItem';
import { GALLERY } from './subpages';
import styles from './efforts.module.scss';

type EffortNavProps = {
  /** Namespaces tab and panel ids when several entries are open. */
  idPrefix: string;
  efforts: Effort[];
  hasGallery: boolean;
  selected: string | null;
  onSelect: (subpageId: string | null) => void;
};

/**
 * An open entry's subpages as the site's nav tabs: the home key for the overview, then each
 * effort and the gallery by name. Arrow keys move between tabs.
 */
const EffortNav = ({ idPrefix, efforts, hasGallery, selected, onSelect }: EffortNavProps) => {
  const tabs = [
    { id: '', title: 'Overview' },
    ...efforts.map(({ id, title }) => ({ id, title })),
    ...(hasGallery ? [{ id: GALLERY, title: 'Gallery' }] : []),
  ];
  const refs = useRef<(HTMLElement | null)[]>([]);
  const selectedIndex = Math.max(
    0,
    tabs.findIndex((t) => t.id === (selected ?? '')),
  );

  // A mention that switches tabs unmounts itself; hand focus to the tab it selected.
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
    <div className={styles.subnav} role="tablist" aria-label="Sections">
      {tabs.map((tab, i) => (
        <NavBarItem
          key={tab.id || 'overview'}
          itemRef={(el) => (refs.current[i] = el)}
          label={tab.title}
          Icon={tab.id ? undefined : Home}
          iconOnly={!tab.id}
          mini={false}
          selected={i === selectedIndex}
          onClick={() => select(i)}
          tab={{
            id: `${idPrefix}-tab-${tab.id || 'overview'}`,
            // Only a subpage's view is a labelled panel; the overview is the entry itself.
            controls: i === selectedIndex && tab.id ? `${idPrefix}-panel` : undefined,
            onKeyDown: (e) => onKeyDown(e, i),
          }}
        />
      ))}
    </div>
  );
};

export default EffortNav;
