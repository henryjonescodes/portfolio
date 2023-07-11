import React, { LegacyRef, useRef } from 'react'
import styles from './snap-carousel.module.scss'
import { motion, useInView } from 'framer-motion'

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

const CHILD_VARIANTS_SCALE = {
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  hidden: { opacity: 0, scale: 0.1 },
}

const CHILD_VARIANTS_LEFT = {
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  hidden: { opacity: 0, x: -500 },
}

type PaneProps = {
  color?: any
  full?: boolean
  half?: boolean
  transLeft?: boolean
  transScale?: boolean
  triggerOnce?: boolean
  children: React.ReactNode
  containerRef: React.MutableRefObject<any>
}

const Pane = ({
  color,
  full = false,
  half = false,
  transLeft = false,
  transScale = false,
  triggerOnce = false,
  children,
  containerRef,
}: PaneProps) => {
  const ref = useRef(null)

  const inView = useInView(ref, { once: triggerOnce, root: containerRef })

  return (
    <div
      className={styles.pane}
      ref={ref}
      style={{
        marginTop: 2,
        marginBottom: 2,
        height: full ? '100vh' : half ? '50vh' : 120,
        width: '100%',
        backgroundColor: color,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <motion.div
        style={{
          backgroundColor: 'white',
          zIndex: 40,
        }}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        variants={
          transLeft
            ? CHILD_VARIANTS_LEFT
            : transScale
            ? CHILD_VARIANTS_SCALE
            : CHILD_VARIANTS_SCALE
        }
      >
        <h2
          style={{
            marginLeft: 20,
            marginRight: 20,
            marginTop: 10,
            marginBottom: 10,
            fontSize: 43,
          }}
        >
          {children}
        </h2>
      </motion.div>
    </div>
  )
}

Pane.displayName = 'Pane'
SnapCarousel.Pane = Pane

export default SnapCarousel
