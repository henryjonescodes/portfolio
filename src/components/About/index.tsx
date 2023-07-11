import styles from './about.module.scss'
import React, { useRef } from 'react'
import SnapCarousel from '@components/SnapCarousel/SnapCarousel'

const About = () => {
  const containerRef = useRef(null)

  return (
    <SnapCarousel ref={containerRef}>
      <SnapCarousel.Pane full color="#FDD692" containerRef={containerRef}>
        Box 1 (full)
      </SnapCarousel.Pane>
      <SnapCarousel.Pane
        full
        transLeft
        color="#C5E99B"
        containerRef={containerRef}
      >
        Box * (half)
      </SnapCarousel.Pane>
      <SnapCarousel.Pane
        full
        transLeft
        color="#ff00ff"
        containerRef={containerRef}
      >
        Box 2 (half)
      </SnapCarousel.Pane>
      <SnapCarousel.Pane full color="#84B1ED" containerRef={containerRef}>
        Box 3 (full)
      </SnapCarousel.Pane>
      <SnapCarousel.Pane
        full
        transLeft
        color="#67D5B5"
        containerRef={containerRef}
      >
        Box 4 (laugh)
      </SnapCarousel.Pane>
      <SnapCarousel.Pane full color="#FDD692" containerRef={containerRef}>
        Box 5 (full)
      </SnapCarousel.Pane>
      <SnapCarousel.Pane full color="#84B1ED" containerRef={containerRef}>
        Box 6 (full)
      </SnapCarousel.Pane>
    </SnapCarousel>
  )
}

export default About
