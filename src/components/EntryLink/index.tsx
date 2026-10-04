import cn from 'classnames';
import type { ReactNode } from 'react';
import { useExperienceEntryModal } from '@components/ExperienceEntry/ExperienceEntryModalContext';
import styles from './entry-link.module.scss';

type EntryLinkProps = {
  entryId: string;
  effortId?: string;
  className?: string;
  children: ReactNode;
};

/** Opens an entry's modal from anywhere; the window zooms out of the link. */
const EntryLink = ({ entryId, effortId, className, children }: EntryLinkProps) => {
  const { openEntry } = useExperienceEntryModal();
  return (
    <button
      type="button"
      className={cn(styles.link, className)}
      onClick={(e) => {
        e.stopPropagation();
        const r = e.currentTarget.getBoundingClientRect();
        openEntry(entryId, effortId, { x: r.left + r.width / 2, y: r.top + r.height / 2 });
      }}
    >
      {children}
    </button>
  );
};

export default EntryLink;
