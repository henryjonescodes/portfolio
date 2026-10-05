import GlitchMedia from '@components/GlitchMedia';
import type { EntryMedia } from '@components/ExperienceEntry/types';
import StripedPanel from '@components/StripedPanel';
import { sourcedRequests } from '@utils/requests';
import styles from './entry-media.module.scss';

/** An entry's looping video or still, with the site's glitch treatment. */
const EntryMediaView = ({ media, alt = '' }: { media: EntryMedia; alt?: string }) => {
  if ('placeholder' in media) {
    const sourced = sourcedRequests[media.request];
    if (sourced)
      return (
        <EntryMediaView
          media={sourced.endsWith('.mp4') ? { video: sourced } : { img: sourced }}
          alt={media.placeholder}
        />
      );
    return (
      <StripedPanel
        className={styles.placeholder}
        tag="Image to come"
        role="img"
        aria-label={`Image to come: ${media.placeholder}`}
        data-request={media.request}
      >
        <span className={styles.brief}>{media.placeholder}</span>
      </StripedPanel>
    );
  }
  return 'video' in media ? (
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
    <GlitchMedia img={<img src={media.img} alt={alt} />} />
  );
};

export default EntryMediaView;
