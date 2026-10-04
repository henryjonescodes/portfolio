import cn from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import EntryMediaView from '@components/EntryMedia';
import ExperienceEntry from '@components/ExperienceEntry';
import type { EntryData } from '@components/ExperienceEntry/types';
import { useAnimations } from '@context/AnimationContext';
import { findEntry } from '@data/entries';
import styles from './experience-entry-modal.module.scss';
import { ExperienceEntryModalContext } from './ExperienceEntryModalContext';

/** Query keys that describe the open modal, so a link can reopen it. */
const PARAMS = { entry: 'entry', effort: 'effort', size: 'size' } as const;
const SITE_TITLE = 'Henry Jones';

type ExperienceEntryModalProviderProps = {
  children: React.ReactNode;
};

export const ExperienceEntryModalProvider = ({ children }: ExperienceEntryModalProviderProps) => {
  const { TRANSITIONS } = useAnimations();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedEntry, setSelectedEntry] = useState<EntryData | null>(null);
  const [pageOpen, setPageOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [effortId, setEffortId] = useState<string | null>(null);
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

  // A shared link reopens the entry it names, once, on arrival.
  useEffect(() => {
    const entry = findEntry(searchParams.get(PARAMS.entry) ?? '');
    if (!entry) return;
    const effort = searchParams.get(PARAMS.effort);
    open(entry, {
      effort: entry.efforts?.some((e) => e.id === effort) ? effort : null,
      expanded: searchParams.get(PARAMS.size) === 'full',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // The address bar and tab title follow the open modal, so copying the URL shares it.
  const openId = pageOpen ? selectedEntry?.id : undefined;
  useEffect(() => {
    setSearchParams(
      (params) => {
        const next = new URLSearchParams(params);
        const set = (key: string, value: string | null | undefined) =>
          value ? next.set(key, value) : next.delete(key);
        set(PARAMS.entry, openId);
        set(PARAMS.effort, openId && effortId);
        set(PARAMS.size, openId && expanded ? 'full' : null);
        return next.toString() === params.toString() ? params : next;
      },
      { replace: true },
    );
    const effortTitle = selectedEntry?.efforts?.find((e) => e.id === effortId)?.title;
    document.title = openId
      ? [effortTitle, selectedEntry?.title, SITE_TITLE].filter(Boolean).join(' | ')
      : SITE_TITLE;
  }, [openId, effortId, expanded, selectedEntry, setSearchParams]);

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
