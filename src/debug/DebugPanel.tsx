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

  const { setUseOrbitControls, setGlobalRotation } = useSettings();
  const { useOrbitControls, globalRotation } = useControls('3D Scene Toggles', {
    useOrbitControls: false,
    globalRotation: { value: false, hint: 'Rotate the whole scene with mouse drag' },
  });

  useEffect(() => {
    tune(values as TunableValues);
  }, [values, tune]);

  useEffect(() => {
    setUseOrbitControls(useOrbitControls);
    setGlobalRotation(globalRotation);
  }, [useOrbitControls, globalRotation, setUseOrbitControls, setGlobalRotation]);

  return <Leva collapsed oneLineLabels={false} theme={{ sizes: { rootWidth: '500px' } }} />;
}
