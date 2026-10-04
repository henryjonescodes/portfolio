// Writes netlify/share-data.json: the titles and summaries the share-meta edge function puts
// into link previews. Loads the site's data through Vite so aliases and SVG imports resolve.
// Runs before every build (`npm run share-data`).
import { writeFileSync } from 'node:fs';
import { createServer } from 'vite';

const server = await createServer({
  appType: 'custom',
  logLevel: 'error',
  server: { middlewareMode: true, hmr: false },
});

try {
  const { experienceData } = await server.ssrLoadModule('/src/data/experience.ts');
  const { projectsData } = await server.ssrLoadModule('/src/data/projects.ts');
  const { pageMeta, entryTitle, SITE_TITLE } = await server.ssrLoadModule('/src/data/pages.ts');

  // Mentions read as their text, and list bullets lose their leading dash.
  const plain = (text = '') =>
    text
      .replace(/\{\{[\w-]+(?:\/[\w-]+)?\|([^}]+)\}\}/g, '$1')
      .replace(/^\s*[—-]\s*/, '')
      .trim();

  const entry = (e) => ({
    title: entryTitle(e.title),
    description: plain(e.blurb ?? e.description[0]),
    efforts: Object.fromEntries(
      (e.efforts ?? []).map((f) => [
        f.id,
        { title: entryTitle(e.title, f.title), description: plain(f.summary) },
      ]),
    ),
  });

  const shareData = {
    site: SITE_TITLE,
    routes: pageMeta,
    entries: Object.fromEntries(
      [...Object.values(experienceData), ...Object.values(projectsData)].map((e) => [
        e.id,
        entry(e),
      ]),
    ),
  };

  writeFileSync('netlify/share-data.json', `${JSON.stringify(shareData, null, 2)}\n`);
  console.log(`share data: ${Object.keys(shareData.entries).length} entries`);
} finally {
  await server.close();
}
