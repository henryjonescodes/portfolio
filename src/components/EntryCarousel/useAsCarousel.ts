import { usePage } from '@context/PageContext';
import { useWindowDimensions } from '@context/WindowDimensionContext';
import { screenWidths } from '@styles/layout.constants';

/** Phones get the carousel; the 3D screen and wider lite views keep the list. */
export function useAsCarousel() {
  const { embedded } = usePage();
  const { width } = useWindowDimensions();
  return !embedded && width < screenWidths.mobileLarge;
}
