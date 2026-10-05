// Sourced media for placeholders: a file named by a request id in src/assets/requests replaces
// the placeholder with no code change.
const files = import.meta.glob<string>('/src/assets/requests/*.{jpg,png,webp,mp4}', {
  eager: true,
  query: '?url',
  import: 'default',
});

/** Sourced file URLs by request id. */
export const sourcedRequests: Record<string, string> = Object.fromEntries(
  Object.entries(files).map(([path, url]) => [
    path.slice(path.lastIndexOf('/') + 1).replace(/\.[^.]+$/, ''),
    url,
  ]),
);
