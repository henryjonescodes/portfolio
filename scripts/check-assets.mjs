// Fails when a file in public or src/assets is referenced nowhere, so dead assets do not
// ship. Public files are matched by name (served by URL), src/assets files by import path.
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { basename } from 'node:path';

const tracked = (args) =>
  execFileSync('git', ['ls-files', ...args], { encoding: 'utf8' }).split('\n').filter(Boolean);

// Read by Netlify, not by the app.
const KEEP = new Set(['public/_redirects']);

const sources = tracked(['src', 'index.html', 'scripts']).filter((f) =>
  /\.(tsx?|s?css|html|m?js|json)$/.test(f),
);
const corpus = sources.map((f) => readFileSync(f, 'utf8')).join('\n');

const isJunk = (f) => f.endsWith('.DS_Store');
const unused = [
  ...tracked(['public']).filter((f) => !KEEP.has(f) && !isJunk(f) && !corpus.includes(basename(f))),
  ...tracked(['src/assets']).filter((f) => !isJunk(f) && !corpus.includes(f.slice('src/'.length))),
];

if (unused.length) {
  console.error(`Unreferenced assets:\n${unused.map((f) => `  ${f}`).join('\n')}`);
  process.exit(1);
}
console.log('assets: every file is referenced');
