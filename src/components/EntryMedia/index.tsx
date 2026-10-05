import GlitchMedia from '@components/GlitchMedia';
import type { EntryMedia } from '@components/ExperienceEntry/types';
import StripedPanel from '@components/StripedPanel';
import { sourcedRequests } from '@utils/requests';
import styles from './entry-media.module.scss';

/** An entry's looping video or still, with the site's glitch treatment. */
/** Where a video picks up: a frame to show until it decodes, and the time to play from. */
export type MediaStart = { poster: string; time: number };

const EntryMediaView = ({
  media,
  alt = '',
  start,
}: {
  media: EntryMedia;
  alt?: string;
  start?: MediaStart | null;
}) => {
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
          poster={start?.poster}
          onLoadedMetadata={(e) => {
            if (start) e.currentTarget.currentTime = start.time;
          }}
          style={{ objectPosition: media.objectPosition }}
        />
      }
    />
  ) : (
    <GlitchMedia img={<img src={media.img} alt={alt} />} />
  );
};

export default EntryMediaView;
