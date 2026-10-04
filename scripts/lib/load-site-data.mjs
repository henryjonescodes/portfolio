// Loads the site's data modules through Vite, so path aliases and SVG imports resolve. The
// Sass export the config runs at startup is skipped, since data needs no styles.
import { createServer } from 'vite';

export async function loadSiteData(paths) {
  process.env.SKIP_SASS_EXPORT = '1';
  const server = await createServer({
    appType: 'custom',
    logLevel: 'error',
    server: { middlewareMode: true, hmr: false },
  });
  try {
    return await Promise.all(paths.map((p) => server.ssrLoadModule(p)));
  } finally {
    await server.close();
  }
}
