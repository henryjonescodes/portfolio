import type { EntryMedia } from '@components/ExperienceEntry/types';

/** Columns a panel spans on the 6-column grid; every panel is full width on phones. */
export type PanelSpan = 'full' | 'twoThirds' | 'half' | 'third';

type PanelBase = {
  /** Shown in the panel's title bar; omit for a bare panel. */
  title?: string;
  span?: PanelSpan;
};

export type TextPanel = PanelBase & { type: 'text'; paragraphs: string[] };
export type MediaPanel = PanelBase & {
  type: 'media';
  media: EntryMedia;
  caption?: string;
  /** `contain` letterboxes screenshots; `cover` (default) fills the panel. */
  fit?: 'cover' | 'contain';
};
export type GalleryPanel = PanelBase & {
  type: 'gallery';
  images: { src: string; alt: string }[];
  columns?: 2 | 3 | 4;
};
export type LinksPanel = PanelBase & { type: 'links'; links: { label: string; href: string }[] };
export type StatsPanel = PanelBase & { type: 'stats'; items: { label: string; value: string }[] };

/** One block of an expanded entry. Add a type here and register its component in `registry.ts`. */
export type Panel = TextPanel | MediaPanel | GalleryPanel | LinksPanel | StatsPanel;
export type PanelType = Panel['type'];
