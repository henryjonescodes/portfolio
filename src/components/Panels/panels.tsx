import cn from 'classnames';
import GlitchMedia from '@components/GlitchMedia';
import type { GalleryPanel, LinksPanel, MediaPanel, StatsPanel, TextPanel } from './types';
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
    {'video' in media ? (
      <GlitchMedia
        video={
          <video
            autoPlay
            loop
            muted
            playsInline
            src={media.video}
            style={{ objectPosition: media.objectPosition }}
          />
        }
      />
    ) : (
      <GlitchMedia img={<img src={media.img} alt={caption ?? ''} />} />
    )}
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
