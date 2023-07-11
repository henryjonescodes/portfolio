import styles from './about.module.scss'

import React, { LegacyRef, useEffect, useRef, useState } from 'react'

import {
  motion,
  useTransform,
  useScroll,
  useMotionValueEvent,
} from 'framer-motion'
import { useWindowDimensions } from './../../context/WindowDimensionsContext'
import Box from './components/Box'

const LINE_VARIANTS = {
  visible: { height: '75vh', transition: { duration: 2 } },
  hidden: { height: '0vh' },
}

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
    <div ref={ref} {...props} className={styles.snapParent}>
      {props.children}
    </div>
  )
)

type ContainerProps = {
  children: React.ReactNode
}

const Container = ({ children }: ContainerProps) => {
  const windowSize = useWindowDimensions()
  const ref = useRef()
  const { scrollY, scrollYProgress } = useScroll()

  const pageRange = [0, 0.15, 0.3, 0.5, 0.7, 1]
  const lengthRange = ['75vh', '45vh', '50vh', '45vh', '50vh', '100vh']
  const calcHeight = useTransform(scrollYProgress, pageRange, lengthRange)

  const [scrollYValue, setScrollYValue] = useState(0)
  const [scrollYProgressValue, setScrollYProgressValue] = useState(0)

  const refreshPage = () => {
    window.location.reload()
  }

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrollYValue(latest)
  })
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    setScrollYProgressValue(latest)
  })

  return (
    // <div
    //   style={{
    //     position: 'relative',
    //   }}
    // >
    <>
      <div
        style={{
          position: 'fixed',
          top: 0,
          fontFamily: 'monospace',
          fontWeight: 600,
          zIndex: 50,
        }}
      >
        {'height: ' +
          calcHeight.get() +
          ' | y: ' +
          scrollYValue +
          ' | percentage: ' +
          (scrollYProgressValue * 100).toFixed(0) +
          '% | WindowSize h: ' +
          windowSize.height +
          ' w: ' +
          windowSize.width +
          '   '}
        <button onClick={refreshPage}>refresh</button>
      </div>
      <div
        style={{
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          zIndex: 20,
          pointerEvents: 'none',
        }}
      >
        <motion.div
          initial="hidden"
          animate="visible"
          variants={LINE_VARIANTS}
          style={{ backgroundColor: 'black', width: 3, height: calcHeight }}
        />
      </div>
      <SnapParent
        ref={ref}
        style={{
          position: 'absolute',
        }}
      >
        {children}
      </SnapParent>
    </>
    // </div>
  )
}

const About = () => {
  const containerRef = useRef(null)
  return (
    <div className={styles.wrapper} ref={containerRef}>
      <Container>
        <Box name="one" full color="#FDD692" containerRef={containerRef}>
          Box 1 (full)
        </Box>
        <Box
          name="two"
          half
          triggerOnce
          transLeft
          color="#C5E99B"
          containerRef={containerRef}
        >
          Box 2 (half)
        </Box>
        <Box name="three" full color="#84B1ED" containerRef={containerRef}>
          Box 3 (full)
        </Box>
        <Box
          name="four"
          half
          triggerOnce
          transLeft
          color="#67D5B5"
          containerRef={containerRef}
        >
          Box 4 (half)
        </Box>
        <Box full name="five" color="#FDD692" containerRef={containerRef}>
          Box 5 (full)
        </Box>
        <Box name="six" full color="#84B1ED" containerRef={containerRef}>
          Box 6 (full)
        </Box>
      </Container>
    </div>
  )
}

export default About
