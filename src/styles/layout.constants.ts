export const screenSize = {
  height: 610,
  width: 685,
};
// New screenWidths record for consolidated width values
export const screenWidths: Record<string, number> = {
  tiny: 450,
  mobile: 550,
  mobileLarge: 700,
  small: 800,
  medium: 962,
  compact: 1200,
  default: 1536,
  large: 1750,
};

// Export old constants for backwards compatibility
export const widthMobile = screenWidths.mobile;
export const widthSmall = screenWidths.small;

/** A camera position as plain data; the 3D code turns it into a Vector3. */
export type Vec3 = [number, number, number];

export type ZoomLevel = {
  fullScreen: Vec3;
  info: Vec3;
  handheld: Vec3;
  wide: Vec3; // Used for initialCameraPosition
};

export type ScreenWidthKey =
  | 'tiny'
  | 'mobile'
  | 'small'
  | 'medium'
  | 'compact'
  | 'default'
  | 'large'
  | 'extraLarge';

export const ScreenWidthZoomPositions: Record<ScreenWidthKey, ZoomLevel> = {
  tiny: {
    fullScreen: [-0.7, 0, 1],
    info: [2.29, 0.5, 2.8],
    handheld: [0, 0, 10],
    wide: [0, 0, 13],
  },
  mobile: {
    fullScreen: [-0.7, 0, 1],
    info: [2.29, 0.5, 2],
    handheld: [0, 0, 7.5],
    wide: [0, 0, 8],
  },
  small: {
    fullScreen: [-0.7, 0, 1],
    info: [2.29, 0.5, 2],
    handheld: [0, 0, 5],
    wide: [0, 0, 7],
  },
  medium: {
    fullScreen: [-0.7, 0, 1],
    info: [1.5, 0.7, 2],
    handheld: [0, 0, 4],
    wide: [0, 0, 6],
  },
  compact: {
    fullScreen: [-0.7, 0, 1],
    info: [1.5, 0.7, 2],
    handheld: [0, 0, 3.5],
    wide: [0, 0, 5],
  },
  default: {
    fullScreen: [-0.7, 0, 1],
    info: [1.5, 0.7, 2],
    handheld: [0, 0, 3],
    wide: [0, 0, 5],
  },
  large: {
    fullScreen: [-0.7, 0, 1],
    info: [1.5, 0.7, 2],
    handheld: [0, 0, 3],
    wide: [0, 0, 5],
  },
  extraLarge: {
    fullScreen: [-0.7, 0, 1],
    info: [1.5, 0.7, 2],
    handheld: [0, 0, 3],
    wide: [0, 0, 5],
  },
};

export const landscapeZoomPositionOffset: number = 0.6;
