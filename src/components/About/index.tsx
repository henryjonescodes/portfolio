import styles from './about.module.scss'
import React, { useRef } from 'react'
import SnapCarousel from '@components/snap-carousel'
import Intro from './panes/intro'

const About = () => {
  const containerRef = useRef(null)

  return (
    <SnapCarousel ref={containerRef}>
      <Intro containerRef={containerRef} />
      <SnapCarousel.Pane color="#C5E99B" containerRef={containerRef}>
        Box * (half)
      </SnapCarousel.Pane>
      <SnapCarousel.Pane color="#ff00ff" containerRef={containerRef}>
        Box 2 (half)
      </SnapCarousel.Pane>
      <SnapCarousel.Pane color="#84B1ED" containerRef={containerRef}>
        Box 3 (full)
      </SnapCarousel.Pane>
      <SnapCarousel.Pane color="#67D5B5" containerRef={containerRef}>
        Box 4 (laugh)
      </SnapCarousel.Pane>
      <SnapCarousel.Pane color="#FDD692" containerRef={containerRef}>
        Box 5 (full)
      </SnapCarousel.Pane>
      <SnapCarousel.Pane color="#84B1ED" containerRef={containerRef}>
        Box 6 (full)
      </SnapCarousel.Pane>
    </SnapCarousel>
  )
}

export default About
