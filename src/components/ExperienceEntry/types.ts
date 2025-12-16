import React from "react";

export type ToolEntry = {
  Icon: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string;
    }
  >,
  label: string
}

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
  tools?: ToolEntry[]
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
