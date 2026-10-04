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

/** A project's preview: a looping video or a still image, served from /public. */
export type EntryMedia = { video: string; objectPosition?: string } | { img: string };

/**
 * A highlighted piece of work inside an entry (a project, a system, a responsibility). Shown
 * only in the open entry, one at a time, behind a small tab strip. Prose mentions an effort
 * with `{{entryId/effortId|text}}`.
 */
export type Effort = {
  id: string;
  title: string;
  summary: string;
  panels?: Panel[];
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
