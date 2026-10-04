import { expect, test } from '@playwright/test';
import { applyMeta, resolveMeta, type ShareData } from '../netlify/share-meta';

const data: ShareData = {
  site: 'Henry Jones',
  routes: {
    '/': { title: 'Home', description: 'Home page' },
    '/experience': { title: 'Experience | Henry Jones', description: 'Where Henry worked' },
  },
  entries: {
    arbor: {
      title: 'Arbor | Henry Jones',
      description: 'Full stack engineer',
      efforts: {
        notifier: {
          title: 'User notifier at Arbor | Henry Jones',
          description: 'Emails "savings" & more',
        },
      },
    },
  },
};
const meta = (href: string) => resolveMeta(new URL(href, 'https://henryjones.xyz'), data);

test('share previews follow the route, entry and effort', () => {
  expect(meta('/experience/')?.title).toBe('Experience | Henry Jones');
  expect(meta('/experience?entry=arbor')?.title).toBe('Arbor | Henry Jones');
  expect(meta('/experience?entry=arbor&effort=notifier')?.title).toBe(
    'User notifier at Arbor | Henry Jones',
  );
  expect(meta('/experience?entry=nope')?.title).toBe('Experience | Henry Jones');
  expect(meta('/unknown')).toBeUndefined();
});

test('share previews rewrite the tags and escape their values', () => {
  const html = `<title>Old</title>
<meta name="description" content="old" />
<meta property="og:title" content="old" />
<meta property="og:description" content="old" />
<meta property="og:url" content="https://henryjones.xyz/" />`;
  const out = applyMeta(
    html,
    meta('/experience?entry=arbor&effort=notifier')!,
    'https://x.y/?a=1&b=2',
  );
  expect(out).toContain('<title>User notifier at Arbor | Henry Jones</title>');
  expect(out).toContain(
    '<meta property="og:description" content="Emails &quot;savings&quot; &amp; more" />',
  );
  expect(out).toContain('<meta property="og:url" content="https://x.y/?a=1&amp;b=2" />');
});
