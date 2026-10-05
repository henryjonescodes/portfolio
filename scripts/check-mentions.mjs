// Fails when an entry's subpage (an effort) is mentioned nowhere in the site's prose, since an
// effort is reached from the text that names it. Overview and Gallery are generic subpages and
// need no mention. Mentions are `{{entryId/effortId|text}}` anywhere under src/.
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { loadSiteData } from './lib/load-site-data.mjs';

const [{ experienceData }, { projectsData }] = await loadSiteData([
  '/src/data/experience.ts',
  '/src/data/projects.ts',
]);

const sources = execFileSync('git', ['ls-files', 'src'], { encoding: 'utf8' })
  .split('\n')
  .filter((f) => /\.(tsx?|md)$/.test(f));
const corpus = sources.map((f) => readFileSync(f, 'utf8')).join('\n');

const missing = [...Object.values(experienceData), ...Object.values(projectsData)].flatMap(
  (entry) =>
    (entry.efforts ?? [])
      .filter((effort) => !corpus.includes(`{{${entry.id}/${effort.id}|`))
      .map((effort) => `  ${entry.id}/${effort.id} (${effort.title})`),
);

if (missing.length) {
  console.error(
    `Subpages with no mention in the prose (add {{entry/effort|text}} where it is discussed):\n${missing.join('\n')}`,
  );
  process.exit(1);
}
console.log('mentions: every subpage is linked from the prose');
