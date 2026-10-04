import GlitchMedia from '@components/GlitchMedia';
import type { EntryMedia } from '@components/ExperienceEntry/types';

/** An entry's looping video or still, with the site's glitch treatment. */
const EntryMediaView = ({ media, alt = '' }: { media: EntryMedia; alt?: string }) =>
  'video' in media ? (
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

export default EntryMediaView;
