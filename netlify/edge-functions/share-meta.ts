// Gives every shared link its own preview: the page's title, description and og:url follow
// the route and any entry or effort named in the query. Everything else passes through.
import data from '../share-data.json' with { type: 'json' };
import { applyMeta, resolveMeta, type ShareData } from '../share-meta.ts';

export default async (request: Request, context: { next: () => Promise<Response> }) => {
  const response = await context.next();
  if (!response.headers.get('content-type')?.includes('text/html')) return response;
  const url = new URL(request.url);
  const meta = resolveMeta(url, data as ShareData);
  if (!meta) return response;
  const html = applyMeta(await response.text(), meta, url.href);
  const headers = new Headers(response.headers);
  headers.delete('content-length');
  return new Response(html, { status: response.status, headers });
};

export const config = {
  path: '/*',
  excludedPath: [
    '/assets/*',
    '/3D/*',
    '/draco/*',
    '/gif/*',
    '/images/*',
    '/video/*',
    '/pdf/*',
    '/*.png',
    '/*.svg',
  ],
};
