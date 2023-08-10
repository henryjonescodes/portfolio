import React from 'react'
import styles from './socials-email.module.scss'

export const Email = () => {
  return (
    <div className={styles.email}>
      <div className={styles.emailBar} />
      <span className={styles.emailContent}>
        <h3>henryjonescodes@gmail.com</h3>
      </span>
    </div>
  )
}
