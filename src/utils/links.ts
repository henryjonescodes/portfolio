/** Links that leave the app (other sites, and files like PDFs) open in a new tab. */
export const opensInNewTab = (href: string) => /^https?:\/\//.test(href) || /\.pdf$/i.test(href);

/** Anchor props for `href`, opening a new tab when the link leaves the app. */
export const linkProps = (href: string) =>
  opensInNewTab(href) ? { href, target: '_blank', rel: 'noopener noreferrer' } : { href };
