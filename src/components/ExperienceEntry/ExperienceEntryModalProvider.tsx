import cn from 'classnames';
import { motion, useReducedMotion } from 'framer-motion';
import React, { useEffect, useRef, useState, type CSSProperties } from 'react';
import { useLocation } from 'react-router-dom';
import EntryMediaView from '@components/EntryMedia';
import ExperienceEntry from '@components/ExperienceEntry';
import type { EntryData } from '@components/ExperienceEntry/types';
import { useAnimations } from '@context/AnimationContext';
import { GALLERY } from '@components/Efforts/subpages';
import { findEntry } from '@data/entries';
import { entryTitle, pageTitle } from '@data/pages';
import { trapFocus } from '@utils/focus';
import { boxWithin } from '@utils/geometry';
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
      effort:
        entry?.efforts?.some((e) => e.id === effort) ||
        (effort === GALLERY && !!entry?.gallery?.length)
          ? effort
          : null,
      expanded: !!entry && searchParams.get(PARAMS.size) === 'full',
    };
  });
  const [selectedEntry, setSelectedEntry] = useState<EntryData | null>(linked.entry);
  const [pageOpen, setPageOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [expanded, setExpanded] = useState(linked.expanded);
  const [effortId, setEffortId] = useState<string | null>(linked.effort);
  // The element the window grows out of and shrinks back into (a list item or a link), and
  // its box within the dialog. Like the phone carousel: the window mounts over the source,
  // opens to its own place, and on close morphs back and unmounts when the morph ends.
  const [source, setSource] = useState<HTMLElement | null>(null);
  const [from, setFrom] = useState<CSSProperties | null>(null);
  // A link is not the window's shape, so the window zooms out of its centre instead, kept in
  // its open layout, rather than squashing a layout morph into a word.
  const [zoom, setZoom] = useState<{ x: number; y: number } | null>(null);
  // Whether the source shows an image; if not, the closed window hides its image pane too, so
  // the pane grows in as it opens instead of popping in.
  const [sourceHasMedia, setSourceHasMedia] = useState(true);
  const stageRef = useRef<HTMLDivElement>(null);
  // Read by animation callbacks, which can fire from a window that a newer open replaced.
  const closingRef = useRef(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  // With reduced motion the layout snaps and may not report completion, so close outright.
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!selectedEntry || isClosing) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && closeModal();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  // Open after the window has rendered over its source, so the morph has an origin.
  useEffect(() => {
    setPageOpen(selectedEntry != null && !isClosing);
  }, [selectedEntry, isClosing]);

  const open = (
    entry: EntryData,
    options: {
      effort?: string | null;
      expanded?: boolean;
      source?: HTMLElement;
      zoom?: boolean;
    } = {},
  ) => {
    const el = options.source ?? null;
    const stage = stageRef.current;
    const box = el && stage ? (boxWithin(el, stage) as Record<string, number>) : null;
    setSource(el);
    setSourceHasMedia(!!el?.querySelector('img, video, [role="img"]'));
    setZoom(
      options.zoom && box ? { x: box.left + box.width / 2, y: box.top + box.height / 2 } : null,
    );
    setFrom(!options.zoom && box ? box : null);
    setSelectedEntry(entry);
    closingRef.current = false;
    setIsClosing(false);
    setExpanded(options.expanded ?? false);
    setEffortId(options.effort ?? null);
  };

  const openModal = (entry: EntryData, entryRef: React.RefObject<HTMLDivElement>) => {
    if (entryRef.current) open(entry, { source: entryRef.current });
  };

  const openEntry = (entryId: string, nextEffortId: string | null = null, el?: HTMLElement) => {
    if (selectedEntry?.id === entryId && !isClosing) return setEffortId(nextEffortId);
    const entry = findEntry(entryId);
    if (entry) open(entry, { effort: nextEffortId, source: el, zoom: true });
  };

  const finishClose = () => {
    setSelectedEntry(null);
    // Focus goes back to whatever opened the window.
    if (source?.isConnected) source.focus({ preventScroll: true });
  };

  // Focus moves into the window as it opens, for keyboards and screen readers.
  useEffect(() => {
    if (pageOpen) dialogRef.current?.focus({ preventScroll: true });
  }, [pageOpen]);

  const closeModal = () => {
    closingRef.current = true;
    setIsClosing(true);
    setPageOpen(false);
    const dialog = dialogRef.current;
    if (!dialog) return finishClose();
    // A zoomed window zooms back through its own animation; a morph lands on its source.
    if (zoom) return;
    if (!reduceMotion && source?.isConnected) return setFrom(boxWithin(source, dialog));
    // Nothing to land on (a shared link, or a source that went away) or reduced motion:
    // shrink and fade about the middle instead of snapping shut.
    setZoom({ x: dialog.clientWidth / 2, y: dialog.clientHeight / 2 + dialog.scrollTop });
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

    const effortTitle =
      effortId === GALLERY
        ? 'Gallery'
        : selectedEntry?.efforts?.find((e) => e.id === effortId)?.title;
    document.title =
      openId && selectedEntry ? entryTitle(selectedEntry.title, effortTitle) : pageTitle(pathname);
  }, [openId, effortId, expanded, selectedEntry, pathname]);

  const overlay = selectedEntry && (
    <div
      data-testid="modal-overlay"
      className={styles.overlay}
      style={{ pointerEvents: isClosing ? 'none' : 'auto' }}
      onClick={closeModal}
    >
      <motion.div
        className={styles.backdrop}
        initial={{ opacity: 0 }}
        animate={{ opacity: pageOpen ? 1 : 0 }}
        transition={TRANSITIONS.MODAL.CONTAINER_ANIMATE}
      />
      <motion.div
        ref={dialogRef}
        className={cn(styles.dialog, { [styles.expanded]: expanded })}
        style={zoom ? { transformOrigin: `${zoom.x}px ${zoom.y}px` } : undefined}
        initial={zoom ? { scale: 0.1, opacity: 0 } : false}
        animate={zoom && isClosing ? { scale: 0.1, opacity: 0 } : { scale: 1, opacity: 1 }}
        transition={{
          ...TRANSITIONS.MODAL.CONTAINER_ANIMATE,
          // The word leads on the way in; on the way out the window goes first.
          delay: zoom && !isClosing ? TRANSITIONS.MODAL.SOURCE_LEAD.delay : 0,
        }}
        onAnimationComplete={() => {
          if (zoom && closingRef.current) finishClose();
        }}
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
        onKeyDown={trapFocus}
        aria-label={selectedEntry.title}
        onClick={(e) => {
          e.stopPropagation();
          if (e.target === e.currentTarget) closeModal();
        }}
      >
        <ExperienceEntry
          key={selectedEntry.id}
          data={selectedEntry}
          pageOpen={pageOpen || !!zoom}
          inList={false}
          modal
          mediaWhenClosed={sourceHasMedia}
          windowStyle={
            !pageOpen && !zoom && from
              ? { ...from, position: 'absolute', margin: 0, minHeight: 0 }
              : undefined
          }
          onLayoutAnimationComplete={() => {
            if (closingRef.current) finishClose();
          }}
          onClose={closeModal}
          expanded={expanded}
          onToggleExpand={() => setExpanded((e) => !e)}
          effortId={effortId}
          onSelectEffort={setEffortId}
          onMention={openEntry}
          url={selectedEntry.url}
        >
          {selectedEntry.media && (
            <div className={styles.media}>
              <EntryMediaView media={selectedEntry.media} />
            </div>
          )}
        </ExperienceEntry>
      </motion.div>
    </div>
  );

  return (
    <ExperienceEntryModalContext.Provider
      value={{
        selectedEntry,
        openModal,
        closeModal,
        pageOpen,
        effortId,
        setEffortId,
        openEntry,
        source: selectedEntry ? source : null,
      }}
    >
      {children}

      {/* Same box as the dialog, always mounted, so a source can be measured before opening. */}
      <div ref={stageRef} className={styles.stage} aria-hidden />

      {/* Modal overlay rendered as sibling to page content. Closing ends in the window's own
          animation, so it unmounts at once, like the phone carousel's. */}
      {overlay}
    </ExperienceEntryModalContext.Provider>
  );
};
