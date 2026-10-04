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
  const { experienceData, experienceOrder } = await server.ssrLoadModule('/src/data/experience.ts');
  const { projectsData, projectsOrder } = await server.ssrLoadModule('/src/data/projects.ts');

  // Mentions read as their text, and list bullets lose their leading dash.
  const plain = (text = '') =>
    text
      .replace(/\{\{[\w-]+\/[\w-]+\|([^}]+)\}\}/g, '$1')
      .replace(/^\s*[—-]\s*/, '')
      .trim();

  const entry = (e) => ({
    title: e.title,
    description: plain(e.blurb ?? e.description[0]),
    efforts: Object.fromEntries(
      (e.efforts ?? []).map((f) => [f.id, { title: f.title, description: plain(f.summary) }]),
    ),
  });
  const titles = (order, data) => order.map((id) => data[id].title).join(', ');

  const shareData = {
    site: 'Henry Jones',
    routes: {
      '/': {
        title: 'Henry Jones, creative developer',
        description:
          'Shaping human-oriented digital experiences, from interactive 3D to iOS and the web.',
      },
      '/about': {
        title: 'About | Henry Jones',
        description: 'Henry Jones is a creative developer based in New York City.',
      },
      '/experience': {
        title: 'Experience | Henry Jones',
        description: `Where Henry has built things: ${titles(experienceOrder, experienceData)}.`,
      },
      '/projects': {
        title: 'Projects | Henry Jones',
        description: `Projects by Henry Jones: ${titles(projectsOrder, projectsData)}.`,
      },
      '/links': {
        title: 'Links | Henry Jones',
        description: 'Email, calendar, LinkedIn, Instagram, GitHub and resume.',
      },
    },
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
