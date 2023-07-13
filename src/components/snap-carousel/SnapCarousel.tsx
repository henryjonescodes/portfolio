import React, { LegacyRef, useRef } from 'react'
import styles from './snap-carousel.module.scss'
import { Variant, Variants, motion, useInView } from 'framer-motion'
import cn from 'classnames'
import {
  CHILD_VARIANTS_SCALE,
  ScrollCarouselPaneVariants,
} from '@components/About/about.constants'

export type SnapParentModes = 'vertical' | 'horizontal'

type SnapParentProps = {
  mode: SnapParentModes
} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>

type CarouselProps = {
  mode?: SnapParentModes
  children: React.ReactNode
  ref: React.Ref<HTMLDivElement>
}

const SnapParent = React.forwardRef(
  (
    { mode = 'vertical', ...props }: SnapParentProps,
    ref: LegacyRef<HTMLDivElement>
  ) => (
    <div
      ref={ref}
      {...props}
      className={cn({
        [styles.carousel]: true,
        [styles.carousel_vertical]: mode === 'vertical',
        [styles.carousel_horizontal]: mode === 'horizontal',
      })}
    >
      {props.children}
    </div>
  )
)

const SnapCarousel = ({ children, ref, mode }: CarouselProps) => {
  return (
    <div className={styles.wrapper}>
      <SnapParent
        mode={mode}
        ref={ref}
        style={{
          position: 'absolute',
        }}
      >
        {children}
      </SnapParent>
    </div>
  )
}

// ? these variants should have a third member and transition for left and right separately
export type SnapCarouselPaneProps = {
  children: React.ReactNode
  containerRef: React.MutableRefObject<HTMLDivElement>

  color?: any
  triggerOnce?: boolean

  className?: string
  contentClassName?: string
  contentVariants?: ScrollCarouselPaneVariants
}

const Pane = ({
  color,

  triggerOnce = false,
  children,
  containerRef,

  className,
  contentClassName,

  contentVariants = null,
}: SnapCarouselPaneProps) => {
  const ref = useRef(null)

  const inView = useInView(ref, { once: triggerOnce, root: containerRef })

  return (
    <div
      className={cn({
        [styles.pane]: true,
        [className]: !!className,
      })}
      ref={ref}
      style={{ backgroundColor: color }}
    >
      <motion.div
        className={cn({
          [styles.paneContent]: true,
          [contentClassName]: !!contentClassName,
        })}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        variants={contentVariants}
      >
        {children}
      </motion.div>
    </div>
  )
}

Pane.displayName = 'Pane'
SnapCarousel.Pane = Pane

export default SnapCarousel
