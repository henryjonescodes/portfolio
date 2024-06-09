import React from 'react'
import styles from './hero.module.scss'
import background from '@assets/png/backgrounds/landing.webp'

const Hero = () => {
  return (
    <div className={styles.hero}>
      <h1>Henry Jones</h1>
      <h3>Creative Developer</h3>
      <img src={background} alt="Homepage background image" />
    </div>
  )
}

export default Hero
