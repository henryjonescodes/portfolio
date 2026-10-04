import cn from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import EntryMediaView from '@components/EntryMedia';
import ExperienceEntry from '@components/ExperienceEntry';
import type { EntryData } from '@components/ExperienceEntry/types';
import { useAnimations } from '@context/AnimationContext';
import { findEntry } from '@data/entries';
import { entryTitle, pageTitle } from '@data/pages';
import styles from './experience-entry-modal.module.scss';
import { ExperienceEntryModalContext } from './ExperienceEntryModalContext';

/** Query keys that describe the open modal, so a link can reopen it. */
const PARAMS = { entry: 'entry', effort: 'effort', size: 'size' } as const;

type ExperienceEntryModalProviderProps = {
  children: React.ReactNode;
};

export const ExperienceEntryModalProvider = ({ children }: ExperienceEntryModalProviderProps) => {
  const { TRANSITIONS } = useAnimations();
  const { pathname } = useLocation();
  // A shared link names the entry to open, read on the first render so the URL never sees
  // a closed modal in between. Read from the address bar, which the provider keeps current,
  // not the router's copy, which goes stale once the URL is replaced in place.
  const [linked] = useState(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const entry = findEntry(searchParams.get(PARAMS.entry) ?? '');
    const effort = searchParams.get(PARAMS.effort);
    return {
      entry: entry ?? null,
      effort: entry?.efforts?.some((e) => e.id === effort) ? effort : null,
      expanded: !!entry && searchParams.get(PARAMS.size) === 'full',
    };
  });
  const [selectedEntry, setSelectedEntry] = useState<EntryData | null>(linked.entry);
  const [pageOpen, setPageOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [expanded, setExpanded] = useState(linked.expanded);
  const [effortId, setEffortId] = useState<string | null>(linked.effort);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => () => clearTimeout(closeTimer.current), []);

  useEffect(() => {
    if (!selectedEntry || isClosing) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && closeModal();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  useEffect(() => {
    setPageOpen(selectedEntry != null && !isClosing);
  }, [selectedEntry, isClosing]);

  const open = (entry: EntryData, options: { effort?: string | null; expanded?: boolean } = {}) => {
    clearTimeout(closeTimer.current);
    setSelectedEntry(entry);
    setIsClosing(false);
    setExpanded(options.expanded ?? false);
    setEffortId(options.effort ?? null);
  };

  const openModal = (entry: EntryData, entryRef: React.RefObject<HTMLDivElement>) => {
    if (!entryRef.current) return;
    open(entry);
  };

  const openEffort = (entryId: string, nextEffortId: string) => {
    if (selectedEntry?.id === entryId && !isClosing) return setEffortId(nextEffortId);
    const entry = findEntry(entryId);
    // No list item to grow from here, so the entry opens in place over the page.
    if (entry) open(entry, { effort: nextEffortId });
  };

  const closeModal = () => {
    setIsClosing(true);
    setPageOpen(false);

    // Unmount once the layout morph back to the list has finished. isClosing stays
    // true so the fading overlay never blocks clicks while its children finish exiting.
    const totalDuration = (TRANSITIONS.MODAL.CONTAINER_ANIMATE.duration || 0) * 1000;
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setSelectedEntry(null), totalDuration);
  };

  // The address bar and tab title follow the open modal, so copying the URL shares it. The
  // URL is replaced in place rather than through the router, whose re-render mid-morph would
  // restart the layout animation; the router only reads it on arrival.
  const openId = selectedEntry && !isClosing ? selectedEntry.id : undefined;
  useEffect(() => {
    const url = new URL(window.location.href);
    const set = (key: string, value: string | null | undefined) =>
      value ? url.searchParams.set(key, value) : url.searchParams.delete(key);
    set(PARAMS.entry, openId);
    set(PARAMS.effort, openId && effortId);
    set(PARAMS.size, openId && expanded ? 'full' : null);
    if (url.href !== window.location.href)
      window.history.replaceState(window.history.state, '', url);

    const effortTitle = selectedEntry?.efforts?.find((e) => e.id === effortId)?.title;
    document.title =
      openId && selectedEntry ? entryTitle(selectedEntry.title, effortTitle) : pageTitle(pathname);
  }, [openId, effortId, expanded, selectedEntry, pathname]);

  return (
    <ExperienceEntryModalContext.Provider
      value={{
        selectedEntry,
        openModal,
        closeModal,
        pageOpen,
        effortId,
        setEffortId,
        openEffort,
      }}
    >
      {children}

      {/* Modal overlay rendered as sibling to page content */}
      <AnimatePresence>
        {selectedEntry && (
          <motion.div
            key="modal-overlay"
            data-testid="modal-overlay"
            className={styles.overlay}
            style={{ pointerEvents: isClosing ? 'none' : 'auto' }}
            onClick={closeModal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={TRANSITIONS.MODAL.CONTAINER_ANIMATE}
          >
            <div
              className={cn(styles.dialog, { [styles.expanded]: expanded })}
              role="dialog"
              aria-modal="true"
              aria-label={selectedEntry.title}
              onClick={(e) => {
                e.stopPropagation();
                if (e.target === e.currentTarget) closeModal();
              }}
            >
              <ExperienceEntry
                key={selectedEntry.id}
                data={selectedEntry}
                pageOpen={pageOpen}
                inList={false}
                modal
                onClose={closeModal}
                expanded={expanded}
                onToggleExpand={() => setExpanded((e) => !e)}
                effortId={effortId}
                onSelectEffort={setEffortId}
                onMention={openEffort}
                url={selectedEntry.url}
              >
                {selectedEntry.media && (
                  <div className={styles.media}>
                    <EntryMediaView media={selectedEntry.media} />
                  </div>
                )}
              </ExperienceEntry>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </ExperienceEntryModalContext.Provider>
  );
};
