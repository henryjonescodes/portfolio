import cn from 'classnames';
import { motion } from 'framer-motion';
import React from 'react';

import Background from '@components/Background';
import AnimatedLine from '@components/AnimatedLine';
import NavBarButton from '@components/NavBar/NavBarButton';
import NavBarItem from '@components/NavBar/NavbarItem';

import { useColors } from '@context/ColorsContext';
import { useControlPanel, type ControlPanelPage } from '@context/ControlPanelContext';
import { FONT_FAMILIES, usePreferences, type FontFamilyId } from '@context/PreferencesContext';
import { useSettings } from '@context/SettingsContext';

import Bolt from '@assets/svg/icons/bolt.svg?react';
import Close from '@assets/svg/icons/close-01.svg?react';
import Locked from '@assets/svg/icons/locked.svg?react';
import Palette from '@assets/svg/icons/palette.svg?react';
import Trash from '@assets/svg/icons/trash.svg?react';
import Type from '@assets/svg/icons/type.svg?react';
import Unlocked from '@assets/svg/icons/unlocked.svg?react';

import styles from './control-panel.module.scss';

const TABS: { id: ControlPanelPage; label: string; Icon: typeof Palette }[] = [
  { id: 'colour', label: 'Colour', Icon: Palette },
  { id: 'type', label: 'Type', Icon: Type },
  { id: 'fx', label: 'FX', Icon: Bolt },
];

type ControlPanelProps = {
  onClose: () => void;
  /** The debug lock lives on the 3D screen only. */
  showLock?: boolean;
};

/** Colour, Type and FX pages behind a tab row. Fills its parent, which sets the size. */
const ControlPanel = ({ onClose, showLock = false }: ControlPanelProps) => {
  const { page, setPage } = useControlPanel();
  const { resetColors } = useColors();
  const { resetPreferences } = usePreferences();
  const { toggleDebugMode, isDebugMode } = useSettings();

  const reset = () => {
    if (page === 'colour') resetColors();
    else if (page === 'type') resetPreferences(['fontFamily', 'textScale']);
    else resetPreferences(['motionSpeed', 'crt']);
  };

  return (
    <div className={styles.panel}>
      <div className={styles.background}>
        <Background />
      </div>
      <motion.span className={styles.navbar}>
        <span className={styles.tabs}>
          {TABS.map(({ id, label, Icon }) => (
            <NavBarItem
              key={id}
              mini
              label={label}
              Icon={Icon}
              selected={page === id}
              onClick={() => setPage(id)}
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
        <NavBarButton onClick={onClose} Icon={Close} label="Close" />
        <AnimatedLine className={styles.border} borderWidth={5} horizontal />
      </motion.span>
      <div className={styles.body} role="region" aria-label={`${page} settings`}>
        {page === 'colour' && <ColourPage />}
        {page === 'type' && <TypePage />}
        {page === 'fx' && <FxPage />}
      </div>
    </div>
  );
};

const ColourPage = () => {
  const { primaryHues, setPrimaryHues } = useColors();
  const set = (key: keyof typeof primaryHues) => (hue: number) =>
    setPrimaryHues((prev) => ({ ...prev, [key]: hue }));

  return (
    <div className={styles.colourPicker}>
      <HueSlider
        label="Foreground"
        hue={primaryHues.foregroundPrimary}
        className={styles.foreground}
        onChange={set('foregroundPrimary')}
      />
      <HueSlider
        label="Background"
        hue={primaryHues.backgroundPrimary}
        className={styles.backgroundHue}
        onChange={set('backgroundPrimary')}
      />
      <HueSlider
        label="Accent"
        hue={primaryHues.accentPrimary}
        className={styles.accent}
        onChange={set('accentPrimary')}
      />
    </div>
  );
};

const TypePage = () => {
  const { preferences, setPreference } = usePreferences();
  const families = Object.entries(FONT_FAMILIES) as [FontFamilyId, { label: string; css: string }][];

  return (
    <div className={styles.controls}>
      <div role="radiogroup" aria-label="Font" className={styles.choices}>
        {families.map(([id, { label, css }]) => (
          <button
            key={id}
            type="button"
            role="radio"
            aria-checked={preferences.fontFamily === id}
            className={cn(styles.choice, { [styles.chosen]: preferences.fontFamily === id })}
            style={{ fontFamily: css }}
            onClick={() => setPreference('fontFamily', id)}
          >
            {label}
          </button>
        ))}
      </div>
      <RangeRow
        label="Text size"
        min={0.8}
        max={1.4}
        step={0.1}
        value={preferences.textScale}
        format={(v) => `${Math.round(v * 100)}%`}
        onChange={(v) => setPreference('textScale', v)}
      />
    </div>
  );
};

const FxPage = () => {
  const { preferences, setPreference } = usePreferences();

  return (
    <div className={styles.controls}>
      <RangeRow
        label="Motion speed"
        min={0.5}
        max={2}
        step={0.25}
        value={preferences.motionSpeed}
        format={(v) => `${v}x`}
        onChange={(v) => setPreference('motionSpeed', v)}
      />
      <RangeRow
        label="CRT intensity"
        min={0}
        max={1}
        step={0.1}
        value={preferences.crt}
        format={(v) => `${Math.round(v * 100)}%`}
        onChange={(v) => setPreference('crt', v)}
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
  const id = React.useId();
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
        onChange={(e) => onChange(parseFloat(e.target.value))}
      />
      <output htmlFor={id}>{format(value)}</output>
    </div>
  );
};

type HueSliderProps = {
  label: string;
  hue: number;
  onChange: (newHue: number) => void;
  className: string;
};

const HueSlider = ({ label, hue, onChange, className }: HueSliderProps) => (
  <div className={cn(styles.hueSlider, className)}>
    <input
      type="range"
      min="0"
      max="360"
      value={hue}
      aria-label={label}
      onChange={(e) => onChange(parseInt(e.target.value, 10))}
      className={styles.slider}
    />
    <h4 className={styles.label}>{label}</h4>
  </div>
);

export default ControlPanel;
