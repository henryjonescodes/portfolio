import React from 'react';
import type { Panel } from '@components/Panels/types';

export type ToolEntry = {
  Icon: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string;
    }
  >;
  label: string;
};

/**
 * A preview: a looping video or a still image served from /public, or a placeholder that says
 * which image belongs there until it is supplied.
 */
export type EntryMedia =
  | { video: string; objectPosition?: string }
  | { img: string }
  | { placeholder: string; request: string; kind?: 'image' | 'icon' };

/**
 * A highlighted piece of work inside an entry (a project, a system, a responsibility). Shown
 * only in the open entry, one at a time, behind a small tab strip. Prose mentions an effort
 * with `{{entryId/effortId|text}}`.
 */
export type Effort = {
  id: string;
  title: string;
  /** Only when the effort has dates of its own; otherwise it shows none. */
  dateString?: string;
  startDate?: Date;
  endDate?: Date;
  /** Shown on the effort's key in the dock. */
  Icon?: ToolEntry['Icon'];
  /** Whether the icon is drawn with fills or strokes, which the theme colours differently. */
  paint?: 'fill' | 'stroke';
  summary: string;
  panels?: Panel[];
};

/** One gallery card. Shapes pack on a two-column grid: square, wide (2:1) or tall (1:2). */
export type GalleryItem = {
  media: EntryMedia;
  shape?: 'square' | 'wide' | 'tall';
  caption?: string;
};

// Base entry data type
export type EntryData = {
  id: string;
  title: string;
  subtitle?: string;
  description: string[];
  blurb?: string;
  startDate?: Date;
  endDate?: Date;
  url?: string;
  dateString?: string;
  tools?: ToolEntry[];
  media?: EntryMedia;
  /** Extra blocks shown only when the entry is open. */
  panels?: Panel[];
  efforts?: Effort[];
  /** Shown as the entry's Gallery subpage. */
  gallery?: GalleryItem[];
};

// Component props type
export type ExperienceEntryProps = {
  data: EntryData;
  borderWidth?: number;
  children?: React.ReactNode;
  entryRef?: React.RefObject<HTMLDivElement>;
  pageOpen?: boolean;
  inList?: boolean;
  isSelected?: boolean;
  /** Renders as the modal's window (drag, expand) instead of in place. */
  modal?: boolean;
  /** Positions the modal's window; the provider sets it over the source while opening and closing. */
  windowStyle?: React.CSSProperties;
  onLayoutAnimationComplete?: () => void;
  /** In the window's closed layout, keep the image pane (the source showed one) or collapse it. */
  mediaWhenClosed?: boolean;
  /** In a list item, show the media only when the list is laid out as tiles. */
  mediaInTilesOnly?: boolean;
  onClose?: () => void;
  /** Open entry fills the overlay instead of its cozy size. */
  expanded?: boolean;
  onToggleExpand?: () => void;
  effortId?: string | null;
  onSelectEffort?: (effortId: string | null) => void;
  onMention?: (entryId: string, effortId: string | null, source?: HTMLElement) => void;
} & (
  | {
      url?: string;
      onClick?: never;
    }
  | {
      onClick?: () => void;
      url?: never;
    }
);
