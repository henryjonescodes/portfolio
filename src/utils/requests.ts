// Sourced content for placeholders and drafted prose: a file named by a request id in
// src/assets/requests replaces the mock with no code change.
const files = import.meta.glob<string>('/src/assets/requests/*.{jpg,png,webp,mp4}', {
  eager: true,
  query: '?url',
  import: 'default',
});

const texts = import.meta.glob<string>('/src/assets/requests/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
});

const idOf = (path: string) => path.slice(path.lastIndexOf('/') + 1).replace(/\.[^.]+$/, '');

/** Sourced file URLs by request id. */
export const sourcedRequests: Record<string, string> = Object.fromEntries(
  Object.entries(files).map(([path, url]) => [idOf(path), url]),
);

const approvedTexts: Record<string, string> = Object.fromEntries(
  Object.entries(texts).map(([path, text]) => [idOf(path), text.trim()]),
);

/** @public Every drafted text read so far, by request id; read by scripts/build-requests.mjs. */
export const draftRegistry = new Map<
  string,
  { request: string; text: string; approved: boolean }
>();

/** Drafted prose: the approved text from `<request>.md` when it exists, else the draft. */
export const draft = (request: string, text: string): string => {
  const approved = request in approvedTexts;
  const result = approved ? approvedTexts[request] : text;
  draftRegistry.set(request, { request, text: result, approved });
  return result;
};
