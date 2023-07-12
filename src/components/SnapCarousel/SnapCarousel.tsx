import React, { LegacyRef, useRef } from 'react'
import styles from './snap-carousel.module.scss'
import { Variant, Variants, motion, useInView } from 'framer-motion'
import cn from 'classnames'
import {
  CHILD_VARIANTS_SCALE,
  ScrollCarouselPaneVariants,
} from '@components/About/about.constants'

const SnapParent = React.forwardRef(
  (
    {
      ...props
    }: React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >,
    ref: LegacyRef<HTMLDivElement>
  ) => (
    <div ref={ref} {...props} className={styles.carousel}>
      {props.children}
    </div>
  )
)

type CarouselProps = {
  children: React.ReactNode
  ref: React.Ref<HTMLDivElement>
}

const SnapCarousel = ({ children, ref }: CarouselProps) => {
  return (
    <div className={styles.wrapper}>
      <SnapParent
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
