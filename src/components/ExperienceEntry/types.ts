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
  overlayStyle?: React.CSSProperties;
  dateString?: string;
  onClose?: () => void;
  /** Open entry fills the overlay instead of its cozy size. */
  expanded?: boolean;
  onToggleExpand?: () => void;
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
