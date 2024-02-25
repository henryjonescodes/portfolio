import React from 'react'
import styles from './home.module.scss'
import Scroller from './components/Scroller'
import Hero from './components/hero'
import Socials from './components/Socials'

const Home = () => {
  return (
    <div className={styles.wrapper}>
      <Hero />
      <Scroller />
      <Socials />
    </div>
  )
}

export default Home
