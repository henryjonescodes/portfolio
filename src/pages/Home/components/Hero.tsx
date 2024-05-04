import React from 'react'
import styles from './home-components.module.scss'
import background from '@assets/landing-background.png'

const Hero = () => {
  return (
    <div className={styles.hero}>
      <h1>Henry Jones</h1>
      <h3>Creative Developer</h3>
      <img src={background} />
    </div>
  )
}

export default Hero
