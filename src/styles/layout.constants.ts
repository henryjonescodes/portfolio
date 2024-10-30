// designConstants.ts

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

type ZoomLevel = {
  fullScreen: number;
  handheld: number;
  wide: number; // Used for initialCameraPosition
};

// Zoom levels based on screen sizes
export const zoomLevels: Record<string, ZoomLevel> = {
  mobile: { fullScreen: 1.5, handheld: 6.5, wide: 4.2 },
  small: { fullScreen: 1.4, handheld: 3, wide: 4.2 },
  medium: { fullScreen: 1.3, handheld: 2.5, wide: 4.2 },
  compact: { fullScreen: 1.2, handheld: 2, wide: 4.2 },
  default: { fullScreen: 1.1, handheld: 2, wide: 4.2 },
  large: { fullScreen: 0.5, handheld: 2, wide: 4.2 },
  extraLarge: { fullScreen: 0.5, handheld: 2, wide: 4.2 },
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
