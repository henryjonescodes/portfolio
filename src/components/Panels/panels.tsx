import cn from 'classnames';
import EntryMediaView from '@components/EntryMedia';
import HeroNumber from '@components/HeroNumber';
import { linkProps } from '@utils/links';
import type {
  GalleryPanel,
  HeroPanel,
  LinksPanel,
  MediaPanel,
  StatsPanel,
  TextPanel,
} from './types';
import styles from './panels.module.scss';

export const TextPanelView = ({ paragraphs }: TextPanel) => (
  <div className={styles.text}>
    {paragraphs.map((p) => (
      <p key={p}>{p}</p>
    ))}
  </div>
);

export const MediaPanelView = ({ media, caption, fit = 'cover' }: MediaPanel) => (
  <figure className={cn(styles.media, styles[fit])}>
    <EntryMediaView media={media} alt={caption} />
    {caption && <figcaption>{caption}</figcaption>}
  </figure>
);

export const GalleryPanelView = ({ images, columns = 3 }: GalleryPanel) => (
  <div className={styles.gallery} style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
    {images.map((image) => (
      <img key={image.src} src={image.src} alt={image.alt} loading="lazy" />
    ))}
  </div>
);

export const LinksPanelView = ({ links }: LinksPanel) => (
  <ul className={styles.links}>
    {links.map((link) => {
      return (
        <li key={link.href}>
          <a className={styles.link} {...linkProps(link.href)}>
            {link.label}
          </a>
        </li>
      );
    })}
  </ul>
);

export const StatsPanelView = ({ items }: StatsPanel) => (
  <dl className={styles.stats}>
    {items.map((item) => (
      <div key={item.label}>
        <dt>{item.label}</dt>
        <dd>{item.value}</dd>
      </div>
    ))}
  </dl>
);

export const HeroPanelView = ({ items }: HeroPanel) => (
  <div className={styles.hero}>
    {items.map((item) => (
      <HeroNumber key={item.label} {...item} />
    ))}
  </div>
);
