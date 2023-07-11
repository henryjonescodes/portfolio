import { motion, useInView } from 'framer-motion'
import styles from './about-components.module.scss'
import React, { useEffect, useRef } from 'react'

const CHILD_VARIANTS_SCALE = {
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  hidden: { opacity: 0, scale: 0.1 },
}

const CHILD_VARIANTS_LEFT = {
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  hidden: { opacity: 0, x: -500 },
}

type Props = {
  color?: any
  full?: boolean
  half?: boolean
  transLeft?: boolean
  transScale?: boolean
  triggerOnce?: boolean
  children: React.ReactNode
  containerRef: React.MutableRefObject<any>
}

const Box = ({
  color,
  full = false,
  half = false,
  transLeft = false,
  transScale = false,
  triggerOnce = false,
  children,
  containerRef,
}: Props) => {
  const ref = useRef(null)

  const inView = useInView(ref, { once: triggerOnce, root: containerRef })

  return (
    <div
      className={styles.snapChildCenter}
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

export default Box
