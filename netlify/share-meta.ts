/** Shape of netlify/share-data.json, written by scripts/build-share-data.mjs. */
export type ShareData = {
  site: string;
  routes: Record<string, Meta>;
  entries: Record<string, { title: string; description: string; efforts: Record<string, Meta> }>;
};
type Meta = { title: string; description: string };

/** The preview for a URL: its route, narrowed to the entry and effort its query names. */
export function resolveMeta(url: URL, data: ShareData): Meta | undefined {
  const path = url.pathname.replace(/\/+$/, '') || '/';
  const route = data.routes[path];
  if (!route) return undefined;
  const entry = data.entries[url.searchParams.get('entry') ?? ''];
  if (!entry) return route;
  const effort = entry.efforts[url.searchParams.get('effort') ?? ''];
  if (effort)
    return {
      title: `${effort.title} at ${entry.title} | ${data.site}`,
      description: effort.description,
    };
  return { title: `${entry.title} | ${data.site}`, description: entry.description };
}

const escape = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Rewrites the page's title, description and Open Graph tags in place. */
export function applyMeta(html: string, meta: Meta, url: string): string {
  const title = escape(meta.title);
  const description = escape(meta.description);
  const tag = (attr: string, key: string, value: string) => (out: string) =>
    out.replace(
      new RegExp(`(<meta ${attr}="${key}" content=")[^"]*(")`),
      (_, open, close) => `${open}${value}${close}`,
    );
  return [
    (out: string) => out.replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`),
    tag('name', 'description', description),
    tag('property', 'og:title', title),
    tag('property', 'og:description', description),
    tag('property', 'og:url', escape(url)),
  ].reduce((out, apply) => apply(out), html);
}
