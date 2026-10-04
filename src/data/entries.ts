import type { EntryData } from '@components/ExperienceEntry/types';
import { experienceData } from './experience';
import { projectsData } from './projects';

/** Any experience or project entry by id, for links that name one. */
export const findEntry = (id: string): EntryData | undefined =>
  experienceData[id] ?? projectsData[id];
