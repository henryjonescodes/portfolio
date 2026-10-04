import { useEffect, useRef } from 'react';
import GalleryIcon from '@assets/svg/icons/gallery.svg?react';
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
  /** Sits inside a title bar rather than as its own strip. */
  inline?: boolean;
};

/**
 * An open entry's subpages as the site's nav tabs: the home key for the overview, then each
 * effort and the gallery by name. Arrow keys move between tabs.
 */
const EffortNav = ({
  idPrefix,
  efforts,
  hasGallery,
  selected,
  onSelect,
  inline = false,
}: EffortNavProps) => {
  const tabs: { id: string; title: string; Icon?: Effort['Icon']; paint?: Effort['paint'] }[] = [
    { id: '', title: 'Overview', Icon: Home },
    ...efforts.map(({ id, title, Icon, paint }) => ({ id, title, Icon, paint })),
    ...(hasGallery ? [{ id: GALLERY, title: 'Gallery', Icon: GalleryIcon }] : []),
  ];
  const refs = useRef<(HTMLElement | null)[]>([]);
  const selectedIndex = Math.max(
    0,
    tabs.findIndex((t) => t.id === (selected ?? '')),
  );

  // A mention that switches tabs unmounts itself; hand focus to the tab it selected.
  const shown = useRef(selectedIndex);
  useEffect(() => {
    if (shown.current === selectedIndex) return;
    shown.current = selectedIndex;
    if (document.activeElement === document.body) refs.current[selectedIndex]?.focus();
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
    <div className={inline ? styles.inline : styles.subnav} role="tablist" aria-label="Sections">
      {tabs.map((tab, i) => (
        <NavBarItem
          key={tab.id || 'overview'}
          itemRef={(el) => (refs.current[i] = el)}
          label={tab.title}
          Icon={tab.Icon}
          // Inline in a window bar, the tabs are the main nav's own mini items.
          mini={inline}
          iconOnly={!inline && !tab.id}
          withIcon={!inline && !!tab.id && !!tab.Icon}
          strokeIcon={tab.paint === 'stroke'}
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
