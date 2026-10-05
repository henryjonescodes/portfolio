import { useColors } from '@context/ColorsContext';
import { useControlPanel } from '@context/ControlPanelContext';
import {
  FONT_FAMILIES,
  PREFERENCE_RANGES,
  usePreferences,
  type FontFamilyId,
} from '@context/PreferencesContext';

/** One of the three controls the model's knobs turn, for whichever panel page is showing. */
export type PanelKnob = {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  set: (value: number) => void;
  format: (value: number) => string;
};

const FONTS = Object.keys(FONT_FAMILIES) as FontFamilyId[];
const percent = (v: number) => `${Math.round(v * 100)}%`;

/** The current page's three main controls, left to right, as the 3D knobs drive them. */
export function usePanelKnobs(): PanelKnob[] {
  const { page } = useControlPanel();
  const { primaryHues, setPrimaryHues } = useColors();
  const { preferences, setPreference } = usePreferences();

  const hue = (key: keyof typeof primaryHues, label: string): PanelKnob => ({
    label,
    value: primaryHues[key],
    min: 0,
    max: 360,
    step: 1,
    set: (v) => setPrimaryHues((prev) => ({ ...prev, [key]: v })),
    format: (v) => `${Math.round(v)}°`,
  });

  const range = (
    key: 'textScale' | 'motionSpeed' | 'crt' | 'volume' | 'cutoff',
    label: string,
    format: (v: number) => string,
  ): PanelKnob => ({
    label,
    value: preferences[key],
    ...PREFERENCE_RANGES[key],
    set: (v) => setPreference(key, v),
    format,
  });

  if (page === 'type')
    return [
      {
        label: 'Font',
        value: FONTS.indexOf(preferences.fontFamily),
        min: 0,
        max: FONTS.length - 1,
        step: 1,
        set: (v) => setPreference('fontFamily', FONTS[Math.round(v)]),
        format: (v) => FONT_FAMILIES[FONTS[Math.round(v)]].label,
      },
      range('textScale', 'Text size', percent),
      range('motionSpeed', 'Motion', (v) => `${v}x`),
    ];
  if (page === 'fx')
    return [
      range('crt', 'CRT', percent),
      range('volume', 'Volume', percent),
      range('cutoff', 'Cutoff', (v) => `${Math.round(v)} Hz`),
    ];
  return [
    hue('foregroundPrimary', 'Foreground'),
    hue('backgroundPrimary', 'Background'),
    hue('accentPrimary', 'Accent'),
  ];
}
