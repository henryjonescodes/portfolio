/**
 * Logs only with `?debug=true` in the URL. Reads the URL directly so it works in every
 * provider, including the ones mounted above SettingsProvider.
 */
export function debugLog(scope: string, ...args: unknown[]) {
  if (new URLSearchParams(window.location.search).get('debug') !== 'true') return;
  console.log(`[${scope}]`, ...args);
}
