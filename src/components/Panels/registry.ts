import type { ComponentType } from 'react';
import {
  GalleryPanelView,
  LinksPanelView,
  MediaPanelView,
  StatsPanelView,
  TextPanelView,
} from './panels';
import type { Panel, PanelType } from './types';

/** Maps each panel type to its view; the mapped type makes a missing registration a type error. */
export const PANEL_VIEWS: { [T in PanelType]: ComponentType<Extract<Panel, { type: T }>> } = {
  text: TextPanelView,
  media: MediaPanelView,
  gallery: GalleryPanelView,
  links: LinksPanelView,
  stats: StatsPanelView,
};
