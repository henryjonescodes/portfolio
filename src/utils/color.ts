import { colord, extend } from 'colord';
import mixPlugin from 'colord/plugins/mix';

// colord's mix plugin backs the hue mixing in ColorsProvider.
extend([mixPlugin]);

export type ColorHex = `#${string}`;

// Functions to adjust saturation and lightness
export const adjustSaturation = (color: string, amount: number): ColorHex => {
  return colord(color)
    .saturate(amount / 100)
    .toHex() as ColorHex;
};

export const adjustLightness = (color: string, amount: number): ColorHex => {
  return colord(color)
    .lighten(amount / 100)
    .toHex() as ColorHex;
};
