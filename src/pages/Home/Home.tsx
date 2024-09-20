import React, { useRef } from 'react'
import Experience from './components/experience'
import Landing from './components/landing'
import styles from './home.module.scss'
import MapViewer from '@components/map-viewer'

const Home = () => {
  const wrapperRef = useRef(null)

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <Landing />
      <MapViewer />
      <Experience scrollParentRef={wrapperRef} />
    </div>
  )
}

export default Home
