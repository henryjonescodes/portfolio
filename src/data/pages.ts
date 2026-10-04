import { experienceData, experienceOrder } from './experience';
import { projectsData, projectsOrder } from './projects';

/** @public Also read by scripts/build-share-data.mjs. */
export const SITE_TITLE = 'Henry Jones';

const titles = (order: string[], data: Record<string, { title: string }>) =>
  order.map((id) => data[id].title).join(', ');

/** @public Each route's tab title and link preview; also read by scripts/build-share-data.mjs. */
export const pageMeta: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'Henry Jones, creative developer',
    description:
      'Shaping human-oriented digital experiences, from interactive 3D to iOS and the web.',
  },
  '/about': {
    title: `About | ${SITE_TITLE}`,
    description: 'Henry Jones is a creative developer based in New York City.',
  },
  '/experience': {
    title: `Experience | ${SITE_TITLE}`,
    description: `Where Henry has built things: ${titles(experienceOrder, experienceData)}.`,
  },
  '/projects': {
    title: `Projects | ${SITE_TITLE}`,
    description: `Projects by Henry Jones: ${titles(projectsOrder, projectsData)}.`,
  },
  '/links': {
    title: `Links | ${SITE_TITLE}`,
    description: 'Email, calendar, LinkedIn, Instagram, GitHub and resume.',
  },
};

/** The title of an open entry, or of one of its efforts. */
export const entryTitle = (entry: string, effort?: string) =>
  `${effort ? `${effort} at ${entry}` : entry} | ${SITE_TITLE}`;

export const pageTitle = (pathname: string) =>
  pageMeta[pathname.replace(/\/+$/, '') || '/']?.title ?? SITE_TITLE;
