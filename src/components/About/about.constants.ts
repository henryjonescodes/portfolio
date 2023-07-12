import { Variant } from "framer-motion"

export type ScrollCarouselPaneVariants = {
  visible: Variant
  hidden: Variant
}

export const CHILD_VARIANTS_SCALE: ScrollCarouselPaneVariants = {
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  hidden: { opacity: 0, scale: 0.1 },
}

export const CHILD_VARIANTS_LEFT: ScrollCarouselPaneVariants = {
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  hidden: { opacity: 0, x: -500 },
}
