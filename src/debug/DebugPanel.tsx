import { Leva, useControls } from 'leva';
import { useEffect } from 'react';
import { useAnimationTuning } from '@context/AnimationContext';
import { useSettings } from '@context/SettingsContext';
import type { TunableValues } from '@config/animation';
import { ANIMATION_SCHEMA } from './levaSchema';

/** Leva panel for `?debug=true`. Loaded lazily, so production bundles never include Leva. */
export default function DebugPanel() {
  const tune = useAnimationTuning();
  const values = useControls('Animation System', ANIMATION_SCHEMA, { collapsed: false });

  const { setUseOrbitControls } = useSettings();
  const { useOrbitControls } = useControls('3D Scene', { useOrbitControls: false });

  useEffect(() => {
    tune(values as TunableValues);
  }, [values, tune]);

  useEffect(() => {
    setUseOrbitControls(useOrbitControls);
  }, [useOrbitControls, setUseOrbitControls]);

  return <Leva collapsed oneLineLabels={false} theme={{ sizes: { rootWidth: '500px' } }} />;
}
