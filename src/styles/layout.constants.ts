// designConstants.ts

import { Vector3 } from "@three";

export const borderRadiusCard: number = 16;
export const borderRadiusItem: number = 8;

export const screenSize = {
  height: 610,
  width: 685
}
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
export const widthTiny = screenWidths.tiny;
export const widthMobile = screenWidths.mobile;
export const widthSmall = screenWidths.small;
export const widthMedium = screenWidths.medium;
export const widthCompact = screenWidths.compact;
export const widthDefault = screenWidths.default;
export const widthLarge = screenWidths.large;

export type ZoomLevel = {
  fullScreen: Vector3;
  info: Vector3;
  handheld: Vector3;
  wide: Vector3; // Used for initialCameraPosition
};

export type ScreenWidthKey = 'tiny' | 'mobile' | 'small' | 'medium' | 'compact' | 'default' | 'large' | 'extraLarge';

export const ScreenWidthZoomPositions: Record<ScreenWidthKey, ZoomLevel> = {
  tiny: { 
    fullScreen: new Vector3(-0.7, 0, 1), 
    info: new Vector3(2.29, 0.5, 2.8), 
    handheld: new Vector3(-0.7, 0, 10), 
    wide: new Vector3(-0.5, 0, 12), 
  },
  mobile: { 
    fullScreen: new Vector3(-0.7, 0, 1), 
    info: new Vector3(2.29, 0.5, 2), 
    handheld: new Vector3(-0.6, 0, 6.5), 
    wide: new Vector3(0, 0, 8), 
  },
  small: { 
    fullScreen: new Vector3(-0.7, 0, 1), 
    info: new Vector3(2.29, 0.5, 2), 
    handheld: new Vector3(0, 0, 5), 
    wide: new Vector3(0, 0, 7), 
  },
  medium: { 
    fullScreen: new Vector3(-0.7, 0, 1), 
    info: new Vector3(1.5, 0.7, 2), 
    handheld: new Vector3(0, 0, 4),  
    wide: new Vector3(0, 0, 6), 
  },
  compact: { 
    fullScreen: new Vector3(-0.7, 0, 1), 
    info: new Vector3(1.5, 0.7, 2), 
    handheld: new Vector3(0, 0, 3.5),  
    wide: new Vector3(0, 0, 5), 
  },
  default: { 
    fullScreen: new Vector3(-0.7, 0, 1), 
    info: new Vector3(1.5, 0.7, 2), 
    handheld: new Vector3(0, 0, 3),  
    wide: new Vector3(0, 0, 5), 
  },
  large: { 
    fullScreen: new Vector3(-0.7, 0, 1), 
    info: new Vector3(1.5, 0.7, 2), 
    handheld: new Vector3(0, 0, 3),  
    wide: new Vector3(0, 0, 5), 
  },
  extraLarge: { 
    fullScreen: new Vector3(-0.7, 0, 1), 
    info: new Vector3(1.5, 0.7, 2), 
    handheld: new Vector3(0, 0, 3),  
    wide: new Vector3(0, 0, 5), 
  },
};


export const maxWidthPage: number = 2000;

export const spacingParagraph: number = 24;

export const pagePaddingLarge: string = "6.25rem";
export const pagePaddingDefault: string = "4rem";
export const pagePaddingCompact: string = "3.5rem";
export const pagePaddingSmall: string = "2.5rem";
export const pagePaddingMobile: string = "1.5rem";

export const paragraphSpacingLarge: string = "2rem";
export const paragraphSpacingSmall: string = "1.4rem";
