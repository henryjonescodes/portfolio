import React from "react";

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
