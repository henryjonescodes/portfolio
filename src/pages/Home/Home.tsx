import React, { useRef } from 'react'
import styles from './home.module.scss'
import Experience from './components/experience'
import Landing from './components/landing'
import Locations from './components/locations'

const Home = () => {
  const wrapperRef = useRef(null)

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <Landing />
      <Locations />
      <Experience scrollParentRef={wrapperRef} />
    </div>
  )
}

export default Home
