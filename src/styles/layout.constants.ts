// designConstants.ts

import { Vector3 } from "three";

export const borderRadiusCard: number = 16;
export const borderRadiusItem: number = 8;



// New screenWidths record for consolidated width values
export const screenWidths: Record<string, number> = {
  mobile: 550,
  small: 768,
  medium: 962,
  compact: 1200,
  default: 1536,
  large: 1750,
};

// Export old constants for backwards compatibility
export const widthMobile = screenWidths.mobile;
export const widthSmall = screenWidths.small;
export const widthMedium = screenWidths.medium;
export const widthCompact = screenWidths.compact;
export const widthDefault = screenWidths.default;
export const widthLarge = screenWidths.large;

export type ZoomLevel = {
  fullScreen: Vector3;
  handheld: Vector3;
  wide: Vector3; // Used for initialCameraPosition
};

// Zoom levels based on screen sizes
export const zoomLevels: Record<string, ZoomLevel> = {
  mobile: { 
    fullScreen: new Vector3(0, 1.5, 1.5), 
    handheld: new Vector3(0, 0, 5.8), 
    wide: new Vector3(0, 0, 5.8) 
  },
  small: { 
    fullScreen: new Vector3(0, 1.5, 1.4), 
    handheld: new Vector3(0, 0.5, 3.5),
    wide: new Vector3(0, 0, 4.5) 
  },
  medium: { 
    fullScreen: new Vector3(0, 1.5, 1.3), 
    handheld: new Vector3(0, 1, 3), 
    wide: new Vector3(0, 0, 4.2) 
  },
  compact: { 
    fullScreen: new Vector3(0, 1.5, 1.2), 
    handheld: new Vector3(0, 1.2, 2.5), 
    wide: new Vector3(0, 0, 4.2) 
  },
  default: { 
    fullScreen: new Vector3(0, 1.5, 1.1), 
    handheld: new Vector3(0, 1.2, 2.5), 
    wide: new Vector3(0, 0, 4.2) 
  },
  large: { 
    fullScreen: new Vector3(0, 1.5, 0.5), 
    handheld: new Vector3(0, 1.2, 2.5), 
    wide: new Vector3(0, 0, 4.2) 
  },
  extraLarge: { 
    fullScreen: new Vector3(0, 1.5, 0.5), 
    handheld: new Vector3(0, 1.2, 2.5), 
    wide: new Vector3(0, 0, 4.2) 
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
