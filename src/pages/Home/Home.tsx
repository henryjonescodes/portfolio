import React, { useRef } from 'react'
import styles from './home.module.scss'
import Hero from './components/hero'
import Blurb from './components/blurb'
import Experience from './components/experience'

const Home = () => {
  const wrapperRef = useRef(null)

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <Hero />
      <Blurb />
      <Experience scrollParentRef={wrapperRef} />
    </div>
  )
}

export default Home
