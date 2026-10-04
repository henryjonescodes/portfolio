import cn from 'classnames';
import type { ReactNode } from 'react';
import { useExperienceEntryModal } from '@components/ExperienceEntry/ExperienceEntryModalContext';
import SourceButton from './SourceButton';
import styles from './entry-link.module.scss';

type EntryLinkProps = {
  entryId: string;
  effortId?: string;
  className?: string;
  children: ReactNode;
};

/** Opens an entry's modal from anywhere; the window zooms out of the link and back into it. */
const EntryLink = ({ entryId, effortId, className, children }: EntryLinkProps) => {
  const { openEntry } = useExperienceEntryModal();
  return (
    <SourceButton
      className={cn(styles.link, className)}
      onActivate={(el) => openEntry(entryId, effortId, el)}
    >
      {children}
    </SourceButton>
  );
};

export default EntryLink;
