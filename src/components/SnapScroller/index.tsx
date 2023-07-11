import styles from './about.module.scss'

import React, { LegacyRef, useRef } from 'react'

import Box from './components/Box'

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

const About = () => {
  const containerRef = useRef(null)

  return (
    <div className={styles.wrapper}>
      <SnapParent
        ref={containerRef}
        style={{
          position: 'absolute',
        }}
      >
        <Box full color="#FDD692" containerRef={containerRef}>
          Box 1 (full)
        </Box>
        <Box
          half
          triggerOnce
          transLeft
          color="#C5E99B"
          containerRef={containerRef}
        >
          Box 2 (half)
        </Box>
        <Box full color="#84B1ED" containerRef={containerRef}>
          Box 3 (full)
        </Box>
        <Box
          half
          triggerOnce
          transLeft
          color="#67D5B5"
          containerRef={containerRef}
        >
          Box 4 (half)
        </Box>
        <Box full color="#FDD692" containerRef={containerRef}>
          Box 5 (full)
        </Box>
        <Box full color="#84B1ED" containerRef={containerRef}>
          Box 6 (full)
        </Box>
      </SnapParent>
    </div>
  )
}

export default About
