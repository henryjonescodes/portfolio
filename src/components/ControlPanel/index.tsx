import cn from 'classnames';
import { motion } from 'framer-motion';
import { useId } from 'react';

import Background from '@components/Background';
import ControlKnob from '@components/ControlKnob';
import AnimatedLine from '@components/AnimatedLine';
import NavBarButton from '@components/NavBar/NavBarButton';
import NavBarItem from '@components/NavBar/NavbarItem';

import { useColors } from '@context/ColorsContext';
import { useControlPanel, type ControlPanelPage } from '@context/ControlPanelContext';
import {
  FONT_FAMILIES,
  PREFERENCE_RANGES,
  SOUND_KEYS,
  WAVEFORM_IDS,
  usePreferences,
  type FontFamilyId,
  type Preferences,
} from '@context/PreferencesContext';
import { useSettings } from '@context/SettingsContext';
import { useRovingFocus } from '@hooks/useRovingFocus';
import { useSound } from '@hooks/useSound';

import Bolt from '@assets/svg/icons/bolt.svg?react';
import Close from '@assets/svg/icons/x.svg?react';
import Locked from '@assets/svg/icons/locked.svg?react';
import Palette from '@assets/svg/icons/palette.svg?react';
import Trash from '@assets/svg/icons/trash.svg?react';
import Type from '@assets/svg/icons/type.svg?react';
import Unlocked from '@assets/svg/icons/unlocked.svg?react';

import styles from './control-panel.module.scss';
import { usePanelKnobs } from './usePanelKnobs';

const PREVIEW_DELAY_MS = 30;
const HUE_RANGE = { min: 0, max: 360, step: 1 };
const formatHue = (hue: number) => `${hue}\u00b0`;

const TABS: { id: ControlPanelPage; label: string; Icon: typeof Palette }[] = [
  { id: 'colour', label: 'Colour', Icon: Palette },
  { id: 'type', label: 'Type', Icon: Type },
  { id: 'fx', label: 'FX', Icon: Bolt },
];

type ControlPanelProps = {
  onClose: () => void;
  /** The debug lock lives on the 3D screen only. */
  showLock?: boolean;
  /** On the 3D screen: a strip naming what each of the model's knobs turns on this page. */
  knobStrip?: boolean;
};

/** Colour, Type and FX pages behind a tab row. Fills its parent, which sets the size. */
const ControlPanel = ({ onClose, showLock = false, knobStrip = false }: ControlPanelProps) => {
  const { page, setPage } = useControlPanel();
  const { resetColors } = useColors();
  const { resetPreferences } = usePreferences();
  const { toggleDebugMode, isDebugMode } = useSettings();
  // Both the 3D screen and the floating window can be mounted at once.
  const idPrefix = useId();
  const tabId = (id: ControlPanelPage) => `${idPrefix}-tab-${id}`;
  const panelId = `${idPrefix}-panel`;
  const roving = useRovingFocus(TABS.length, (i) => setPage(TABS[i].id));

  const reset = () => {
    if (page === 'colour') resetColors();
    else if (page === 'type') resetPreferences(['fontFamily', 'textScale']);
    else resetPreferences(['motionSpeed', 'crt', ...SOUND_KEYS]);
  };

  return (
    <div className={styles.panel}>
      <div className={styles.background}>
        <Background />
      </div>
      <motion.span className={styles.navbar}>
        <span className={styles.tabs} role="tablist" aria-label="Control panel pages">
          {TABS.map(({ id, label, Icon }, i) => (
            <NavBarItem
              key={id}
              mini
              label={label}
              Icon={Icon}
              selected={page === id}
              onClick={() => setPage(id)}
              itemRef={roving.itemRef(i)}
              tab={{
                id: tabId(id),
                controls: page === id ? panelId : undefined,
                onKeyDown: (e) => roving.onKeyDown(e, i),
              }}
            />
          ))}
        </span>
        {showLock && (
          <NavBarButton
            onClick={toggleDebugMode}
            Icon={Locked}
            ActiveIcon={Unlocked}
            active={isDebugMode}
            label="Debug tools"
          />
        )}
        <NavBarButton onClick={reset} Icon={Trash} label="Reset this page" />
        <NavBarButton onClick={onClose} Icon={Close} label="Close" filled />
        <AnimatedLine className={styles.border} borderWidth={5} horizontal drawOnMount />
      </motion.span>
      <div className={styles.body} role="tabpanel" id={panelId} aria-labelledby={tabId(page)}>
        {page === 'colour' && <ColourPage />}
        {page === 'type' && <TypePage />}
        {page === 'fx' && <FxPage />}
      </div>
      {knobStrip && <KnobStrip />}
    </div>
  );
};

const ColourPage = () => {
  const { primaryHues, setPrimaryHues } = useColors();
  const set = (key: keyof typeof primaryHues) => (hue: number) =>
    setPrimaryHues((prev) => ({ ...prev, [key]: hue }));

  return (
    <div className={styles.colourPicker}>
      <ControlKnob
        label="Foreground"
        {...HUE_RANGE}
        value={primaryHues.foregroundPrimary}
        format={formatHue}
        color="var(--foreground-primary)"
        onChange={set('foregroundPrimary')}
      />
      <ControlKnob
        label="Background"
        {...HUE_RANGE}
        value={primaryHues.backgroundPrimary}
        format={formatHue}
        color="var(--background-primary)"
        onChange={set('backgroundPrimary')}
      />
      <ControlKnob
        label="Accent"
        {...HUE_RANGE}
        value={primaryHues.accentPrimary}
        format={formatHue}
        color="var(--accent-primary)"
        onChange={set('accentPrimary')}
      />
    </div>
  );
};

const TypePage = () => {
  const { preferences, setPreference } = usePreferences();
  const families = Object.entries(FONT_FAMILIES) as [
    FontFamilyId,
    { label: string; css: string },
  ][];
  const roving = useRovingFocus(families.length, (i) =>
    setPreference('fontFamily', families[i][0]),
  );

  return (
    <div className={styles.controls}>
      <div role="radiogroup" aria-label="Font" className={styles.choices}>
        {families.map(([id, { label, css }], i) => {
          const chosen = preferences.fontFamily === id;
          return (
            <button
              key={id}
              ref={roving.itemRef(i)}
              type="button"
              role="radio"
              aria-checked={chosen}
              tabIndex={chosen ? 0 : -1}
              className={cn(styles.choice, { [styles.chosen]: chosen })}
              style={{ fontFamily: css }}
              onClick={() => setPreference('fontFamily', id)}
              onKeyDown={(e) => roving.onKeyDown(e, i)}
            >
              {label}
            </button>
          );
        })}
      </div>
      <RangeRow
        label="Text size"
        {...PREFERENCE_RANGES.textScale}
        value={preferences.textScale}
        format={(v) => `${Math.round(v * 100)}%`}
        onChange={(v) => setPreference('textScale', v)}
      />
    </div>
  );
};

const FxPage = () => {
  const { preferences, setPreference } = usePreferences();
  const play = useSound();
  // Every sound change plays a note so the new patch is heard straight away.
  const change = <K extends keyof Preferences>(key: K, value: Preferences[K]) => {
    setPreference(key, value);
    // Waits for the provider to hand the engine the new patch.
    window.setTimeout(() => play('click'), PREVIEW_DELAY_MS);
  };
  const roving = useRovingFocus(WAVEFORM_IDS.length, (i) => change('waveform', WAVEFORM_IDS[i]));
  const soundRange = (key: Extract<keyof Preferences, keyof typeof PREFERENCE_RANGES>) =>
    PREFERENCE_RANGES[key];

  return (
    <div className={cn(styles.controls, styles.scrolling)}>
      <RangeRow
        label="Motion speed"
        {...PREFERENCE_RANGES.motionSpeed}
        value={preferences.motionSpeed}
        format={(v) => `${v}x`}
        onChange={(v) => setPreference('motionSpeed', v)}
      />
      <RangeRow
        label="CRT intensity"
        {...PREFERENCE_RANGES.crt}
        value={preferences.crt}
        format={(v) => `${Math.round(v * 100)}%`}
        onChange={(v) => setPreference('crt', v)}
      />
      <h4 className={styles.sectionTitle}>Sound</h4>
      <button
        type="button"
        role="switch"
        aria-checked={preferences.sound}
        className={cn(styles.choice, { [styles.chosen]: preferences.sound })}
        onClick={() => change('sound', !preferences.sound)}
      >
        {preferences.sound ? 'Sound on' : 'Sound off'}
      </button>
      <RangeRow
        label="Volume"
        {...soundRange('volume')}
        value={preferences.volume}
        format={(v) => `${Math.round(v * 100)}%`}
        onChange={(v) => change('volume', v)}
      />
      <div role="radiogroup" aria-label="Waveform" className={cn(styles.choices, styles.wave)}>
        {WAVEFORM_IDS.map((id, i) => {
          const chosen = preferences.waveform === id;
          return (
            <button
              key={id}
              ref={roving.itemRef(i)}
              type="button"
              role="radio"
              aria-checked={chosen}
              tabIndex={chosen ? 0 : -1}
              className={cn(styles.choice, { [styles.chosen]: chosen })}
              onClick={() => change('waveform', id)}
              onKeyDown={(e) => roving.onKeyDown(e, i)}
            >
              {id}
            </button>
          );
        })}
      </div>
      <div className={styles.knobRow}>
        <ControlKnob
          label="Cutoff"
          {...soundRange('cutoff')}
          value={preferences.cutoff}
          format={(v) => `${v} Hz`}
          onChange={(v) => setPreference('cutoff', v)}
        />
        <ControlKnob
          label="Resonance"
          {...soundRange('resonance')}
          value={preferences.resonance}
          format={String}
          onChange={(v) => setPreference('resonance', v)}
        />
      </div>
      <RangeRow
        label="Release"
        {...soundRange('release')}
        value={preferences.release}
        format={(v) => `${Math.round(v * 1000)} ms`}
        onChange={(v) => change('release', v)}
      />
      <RangeRow
        label="Detune"
        {...soundRange('detune')}
        value={preferences.detune}
        format={(v) => `${v} ct`}
        onChange={(v) => change('detune', v)}
      />
    </div>
  );
};

type RangeRowProps = {
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  format: (value: number) => string;
  onChange: (value: number) => void;
};

const RangeRow = ({ label, min, max, step, value, format, onChange }: RangeRowProps) => {
  const id = useId();
  return (
    <div className={styles.row}>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type="range"
        className={styles.range}
        min={min}
        max={max}
        step={step}
        value={value}
        aria-valuetext={format(value)}
        onChange={(e) => onChange(parseFloat(e.target.value))}
      />
      <output htmlFor={id}>{format(value)}</output>
    </div>
  );
};

/** Labels for the model's three knobs, left to right, with the value each holds now. */
const KnobStrip = () => (
  <div className={styles.knobStrip} aria-hidden>
    {usePanelKnobs().map((k) => (
      <span key={k.label}>
        <b>{k.label}</b> {k.format(k.value)}
      </span>
    ))}
  </div>
);

export default ControlPanel;
