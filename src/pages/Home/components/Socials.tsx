import React from 'react'
import styles from './home-components.module.scss'
import Instagram from '@assets/svg/Instagram.svg'
import GitHub from '@assets/svg/GitHub.svg'

const Socials = () => {
  return (
    <div className={styles.socials}>
      <span>
        <Instagram />
        <GitHub />
      </span>
      <h3>Designed and implemented by Henry Jones</h3>
    </div>
  )
}

export default Socials
