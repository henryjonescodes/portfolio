import React from 'react'
import styles from './home.module.scss'
import Scroller from './experience/Scroller'
import Socials from './components/Socials'
import Hero from './components/Hero'
import Blurb from './components/Blurb'

const Home = () => {
  return (
    <div className={styles.wrapper}>
      {/* <Hero /> */}
      <Blurb />
      <Scroller />
      <Socials />
    </div>
  )
}

export default Home
